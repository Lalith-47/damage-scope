import os
import uuid
import json
import asyncio
from concurrent.futures import ThreadPoolExecutor
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, BackgroundTasks, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from PIL import Image, ImageDraw

from database import engine, Base, get_db
from models import AssessmentJob
from schemas import (
    JobStatusResponse, AssessmentDetail, AssessmentSummary,
    RecommendationItem, BuildingDetection, AssessmentHistoryItem
)
from inference import ModelInferenceEngine
from recommendations import compute_recommendations
from pdf_generator import generate_pdf_report

UPLOAD_DIR = os.getenv("UPLOAD_DIR", os.path.join(os.path.dirname(__file__), "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

executor = ThreadPoolExecutor(max_workers=2)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables
    Base.metadata.create_all(bind=engine)
    # Pre-load ONNX models once at startup
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    ModelInferenceEngine.get_instance(models_dir)
    yield

app = FastAPI(title="DamageScope API", version="1.0.0", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static uploads directory for serving satellite images
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

def run_inference_background(job_id: str, pre_path: str, post_path: str):
    from database import SessionLocal
    db = SessionLocal()
    try:
        engine_inst = ModelInferenceEngine.get_instance()
        buildings, summary_counts = engine_inst.run_assessment(pre_path, post_path)

        total_b = summary_counts.get("total_buildings", 0)
        no_d = summary_counts.get("no_damage", 0)
        min_d = summary_counts.get("minor_damage", 0)
        maj_d = summary_counts.get("major_damage", 0)
        des_d = summary_counts.get("destroyed", 0)

        if total_b > 0:
            pct_no = round((no_d / total_b) * 100.0, 2)
            pct_min = round((min_d / total_b) * 100.0, 2)
            pct_maj = round((maj_d / total_b) * 100.0, 2)
            pct_des = round((des_d / total_b) * 100.0, 2)
            pct_maj_des = round(((maj_d + des_d) / total_b) * 100.0, 2)
            pct_min_maj = round(((min_d + maj_d) / total_b) * 100.0, 2)
        else:
            pct_no = pct_min = pct_maj = pct_des = pct_maj_des = pct_min_maj = 0.0

        summary_stats = {
            "total_buildings": total_b,
            "no_damage": no_d,
            "minor_damage": min_d,
            "major_damage": maj_d,
            "destroyed": des_d,
            "pct_no_damage": pct_no,
            "pct_minor_damage": pct_min,
            "pct_major_damage": pct_maj,
            "pct_destroyed": pct_des,
            "pct_major_plus_destroyed": pct_maj_des,
            "pct_minor_plus_major": pct_min_maj
        }

        recs = compute_recommendations(summary_stats)
        risk_level = recs.get("zone_level", "LOW")

        job = db.query(AssessmentJob).filter(AssessmentJob.job_id == job_id).first()
        if job:
            job.status = "completed"
            job.total_buildings = total_b
            job.no_damage_count = no_d
            job.minor_damage_count = min_d
            job.major_damage_count = maj_d
            job.destroyed_count = des_d
            job.risk_level = risk_level
            job.results_json = json.dumps({"buildings": buildings, "summary": summary_stats})
            job.recommendations_json = json.dumps(recs)
            db.commit()
    except Exception as e:
        print(f"Error processing job {job_id}: {str(e)}")
        job = db.query(AssessmentJob).filter(AssessmentJob.job_id == job_id).first()
        if job:
            job.status = "failed"
            job.error_message = str(e)
            db.commit()
    finally:
        db.close()


def generate_sample_satellite_pair() -> tuple[str, str]:
    """Generates synthetic 1024x1024 satellite pre/post image pair for testing."""
    sample_pre_path = os.path.join(UPLOAD_DIR, "sample_pre.png")
    sample_post_path = os.path.join(UPLOAD_DIR, "sample_post.png")

    import numpy as np
    np.random.seed(42)
    width, height = 1024, 1024
    
    # Base terrain green with texture
    pre_arr = np.zeros((height, width, 3), dtype=np.uint8)
    pre_arr[:, :, 0] = np.clip(np.random.normal(50, 8, (height, width)), 0, 255)
    pre_arr[:, :, 1] = np.clip(np.random.normal(90, 10, (height, width)), 0, 255)
    pre_arr[:, :, 2] = np.clip(np.random.normal(60, 8, (height, width)), 0, 255)

    post_arr = pre_arr.copy()
    
    # Road network
    pre_arr[490:530, :, :] = 120
    pre_arr[:, 490:530, :] = 120
    post_arr[490:530, :, :] = 95
    post_arr[:, 490:530, :] = 95

    pre_img = Image.fromarray(pre_arr)
    post_img = Image.fromarray(post_arr)
    
    draw_pre = ImageDraw.Draw(pre_img)
    draw_post = ImageDraw.Draw(post_img)

    spacing_x = 1024 // 5
    spacing_y = 1024 // 4

    for r in range(1, 4):
        for c in range(1, 5):
            idx = (r - 1) * 4 + (c - 1)
            cx, cy = spacing_x * c, spacing_y * r
            w, h = 84, 74
            rect = [cx - w//2, cy - h//2, cx + w//2, cy + h//2]
            
            # Pre: pristine tile roof
            draw_pre.rectangle(rect, fill=(215, 85, 65), outline=(240, 240, 240), width=3)
            
            # Post: multi-category damage patterns
            pattern = idx % 4
            if pattern == 0:
                # No damage
                draw_post.rectangle(rect, fill=(215, 85, 65), outline=(240, 240, 240), width=3)
            elif pattern == 1:
                # Minor damage (slight roof discoloration)
                draw_post.rectangle(rect, fill=(175, 95, 55), outline=(210, 190, 110), width=2)
            elif pattern == 2:
                # Major damage (structural crack & dark crater)
                draw_post.rectangle(rect, fill=(90, 55, 40), outline=(160, 90, 40), width=2)
                draw_post.rectangle([cx - w//4, cy - h//4, cx + w//2, cy + h//2], fill=(45, 35, 30))
            else:
                # Destroyed (complete rubble & dark ash)
                draw_post.rectangle(rect, fill=(28, 26, 26), outline=(55, 45, 45), width=1)
                draw_post.ellipse([cx - w//3, cy - h//3, cx + w//3, cy + h//3], fill=(12, 12, 12))

    pre_img.save(sample_pre_path, "PNG")
    post_img.save(sample_post_path, "PNG")

    return sample_pre_path, sample_post_path


@app.post("/api/assess", response_model=JobStatusResponse)
async def create_assessment(
    background_tasks: BackgroundTasks,
    pre_image: UploadFile = File(...),
    post_image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    job_id = str(uuid.uuid4())
    pre_filename = f"{job_id}_pre.png"
    post_filename = f"{job_id}_post.png"

    pre_path = os.path.join(UPLOAD_DIR, pre_filename)
    post_path = os.path.join(UPLOAD_DIR, post_filename)

    with open(pre_path, "wb") as f:
        f.write(await pre_image.read())
    with open(post_path, "wb") as f:
        f.write(await post_image.read())

    job = AssessmentJob(
        job_id=job_id,
        status="processing",
        pre_image_path=pre_path,
        post_image_path=post_path
    )
    db.add(job)
    db.commit()

    # Submit background processing task
    executor.submit(run_inference_background, job_id, pre_path, post_path)

    return JobStatusResponse(
        job_id=job_id,
        status="processing",
        message="Assessment job initiated successfully."
    )


@app.post("/api/assess/sample", response_model=JobStatusResponse)
async def create_sample_assessment(db: Session = Depends(get_db)):
    """Triggers an assessment job using synthetic satellite sample image pair."""
    job_id = str(uuid.uuid4())
    sample_pre, sample_post = generate_sample_satellite_pair()

    pre_filename = f"{job_id}_pre.png"
    post_filename = f"{job_id}_post.png"
    pre_path = os.path.join(UPLOAD_DIR, pre_filename)
    post_path = os.path.join(UPLOAD_DIR, post_filename)

    # Copy samples to unique job files
    with open(sample_pre, "rb") as sf, open(pre_path, "wb") as df:
        df.write(sf.read())
    with open(sample_post, "rb") as sf, open(post_path, "wb") as df:
        df.write(sf.read())

    job = AssessmentJob(
        job_id=job_id,
        status="processing",
        pre_image_path=pre_path,
        post_image_path=post_path
    )
    db.add(job)
    db.commit()

    executor.submit(run_inference_background, job_id, pre_path, post_path)

    return JobStatusResponse(
        job_id=job_id,
        status="processing",
        message="Sample satellite assessment job initiated."
    )


@app.get("/api/assess/{job_id}", response_model=JobStatusResponse)
async def get_assessment_status(job_id: str, db: Session = Depends(get_db)):
    job = db.query(AssessmentJob).filter(AssessmentJob.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Assessment job not found.")

    if job.status == "processing":
        return JobStatusResponse(job_id=job_id, status="processing", message="Inference in progress...")

    if job.status == "failed":
        return JobStatusResponse(job_id=job_id, status="failed", message=job.error_message or "Assessment failed.")

    # Completed
    res_data = json.loads(job.results_json) if job.results_json else {}
    recs_data = json.loads(job.recommendations_json) if job.recommendations_json else {}

    pre_url = f"/uploads/{os.path.basename(job.pre_image_path)}" if job.pre_image_path else ""
    post_url = f"/uploads/{os.path.basename(job.post_image_path)}" if job.post_image_path else ""

    summary_schema = AssessmentSummary(**res_data.get("summary", {}))
    recommendations_schema = RecommendationItem(**recs_data)
    buildings_schema = [BuildingDetection(**b) for b in res_data.get("buildings", [])]

    detail = AssessmentDetail(
        job_id=job.job_id,
        created_at=job.created_at.isoformat(),
        status=job.status,
        pre_image_url=pre_url,
        post_image_url=post_url,
        summary=summary_schema,
        risk_level=job.risk_level,
        recommendations=recommendations_schema,
        buildings=buildings_schema
    )

    return JobStatusResponse(
        job_id=job_id,
        status="completed",
        message="Assessment completed successfully.",
        data=detail
    )


@app.get("/api/assessments", response_model=list[AssessmentHistoryItem])
async def list_assessments(db: Session = Depends(get_db)):
    jobs = db.query(AssessmentJob).order_by(AssessmentJob.created_at.desc()).all()
    history = []
    for j in jobs:
        history.append(AssessmentHistoryItem(
            job_id=j.job_id,
            created_at=j.created_at.isoformat(),
            status=j.status,
            total_buildings=j.total_buildings,
            no_damage_count=j.no_damage_count,
            minor_damage_count=j.minor_damage_count,
            major_damage_count=j.major_damage_count,
            destroyed_count=j.destroyed_count,
            risk_level=j.risk_level
        ))
    return history


@app.delete("/api/assessments/{job_id}")
async def delete_assessment(job_id: str, db: Session = Depends(get_db)):
    job = db.query(AssessmentJob).filter(AssessmentJob.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Assessment job not found.")

    if job.pre_image_path and os.path.exists(job.pre_image_path):
        try: os.remove(job.pre_image_path)
        except Exception: pass
    if job.post_image_path and os.path.exists(job.post_image_path):
        try: os.remove(job.post_image_path)
        except Exception: pass

    db.delete(job)
    db.commit()
    return {"message": f"Assessment {job_id} deleted successfully."}


@app.get("/api/assessments/{job_id}/pdf")
async def download_pdf_report(job_id: str, db: Session = Depends(get_db)):
    job = db.query(AssessmentJob).filter(AssessmentJob.job_id == job_id).first()
    if not job or job.status != "completed":
        raise HTTPException(status_code=404, detail="Completed assessment job not found.")

    res_data = json.loads(job.results_json) if job.results_json else {}
    recs_data = json.loads(job.recommendations_json) if job.recommendations_json else {}

    payload = {
        "job_id": job.job_id,
        "created_at": job.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "risk_level": job.risk_level,
        "summary": res_data.get("summary", {}),
        "recommendations": recs_data
    }

    pdf_bytes = generate_pdf_report(payload, job.pre_image_path, job.post_image_path)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=DamageScope_Report_{job_id[:8]}.pdf"
        }
    )

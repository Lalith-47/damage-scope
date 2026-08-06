from pydantic import BaseModel
from typing import List, Dict, Optional

class BuildingDetection(BaseModel):
    id: int
    polygon: List[List[int]]  # [[x1, y1], [x2, y2], ...]
    bbox: List[int]           # [x_min, y_min, x_max, y_max]
    damage_class: str        # 'no-damage', 'minor-damage', 'major-damage', 'destroyed'
    confidence: float
    confidences: Dict[str, float]
    damage_color: str        # hex color code

class RecommendationItem(BaseModel):
    priority: str
    zone_level: str
    title: str
    recommendations: List[str]

class AssessmentSummary(BaseModel):
    total_buildings: int
    no_damage: int
    minor_damage: int
    major_damage: int
    destroyed: int
    pct_no_damage: float
    pct_minor_damage: float
    pct_major_damage: float
    pct_destroyed: float
    pct_major_plus_destroyed: float

class AssessmentDetail(BaseModel):
    job_id: str
    created_at: str
    status: str
    pre_image_url: str
    post_image_url: str
    summary: AssessmentSummary
    risk_level: str
    recommendations: RecommendationItem
    buildings: List[BuildingDetection]

class JobStatusResponse(BaseModel):
    job_id: str
    status: str
    message: Optional[str] = None
    data: Optional[AssessmentDetail] = None

class AssessmentHistoryItem(BaseModel):
    job_id: str
    created_at: str
    status: str
    total_buildings: int
    no_damage_count: int
    minor_damage_count: int
    major_damage_count: int
    destroyed_count: int
    risk_level: str

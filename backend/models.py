import datetime
from sqlalchemy import Column, String, Integer, DateTime, Text
from database import Base

class AssessmentJob(Base):
    __tablename__ = "assessments"

    job_id = Column(String(36), primary_key=True, index=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    status = Column(String(20), default="processing", index=True)
    
    pre_image_path = Column(String(255), nullable=True)
    post_image_path = Column(String(255), nullable=True)
    
    total_buildings = Column(Integer, default=0)
    no_damage_count = Column(Integer, default=0)
    minor_damage_count = Column(Integer, default=0)
    major_damage_count = Column(Integer, default=0)
    destroyed_count = Column(Integer, default=0)
    
    risk_level = Column(String(20), default="LOW")
    
    results_json = Column(Text, nullable=True)
    recommendations_json = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)

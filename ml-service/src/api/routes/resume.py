# backend/ml-service/src/api/routes/resume.py

from fastapi import APIRouter
from pydantic import BaseModel
from src.ml.nlp_pipeline import parse_resume, extract_skills_from_description
from src.ml.similarity import calculate_similarity

router = APIRouter()

# ---------- Request Models ----------
class ResumeRequest(BaseModel):
    text: str

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

# ---------- Routes ----------
@router.post("/analyze-resume")
def analyze_resume(req: ResumeRequest):
    parsed = parse_resume(req.text)
    return {"resume": parsed}

@router.post("/match-job")
def match_job(req: MatchRequest):
    parsed_resume = parse_resume(req.resume_text)
    job_skills = extract_skills_from_description(req.job_description)

    score, matched, missing = calculate_similarity(
        parsed_resume.get("skills", []),
        job_skills,
        return_details=True
    )

    return {
        "resume": parsed_resume,
        "job_description": {"skills": job_skills},
        "analysis": {
            "score": score,
            "matched_skills": matched,
            "missing_skills": missing,
            "match_level": (
                "High" if score >= 75 else
                "Medium" if score >= 50 else
                "Low"
            )
        }
    }

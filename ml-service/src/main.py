# ml-service/src/main.py

from fastapi import FastAPI
from pydantic import BaseModel

# Import the functions you built from your ml package
from .ml.nlp_pipeline import parse_resume, extract_skills_from_description
from .ml.similarity import calculate_similarity

# Initialize the FastAPI app
app = FastAPI()

# Define the structure of the incoming request data
class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

@app.get("/")
def read_root():
    """A simple endpoint to confirm the service is running."""
    return {"status": "ML Service is running"}

@app.post("/analyze")
def analyze_documents(request: AnalysisRequest):
    """
    The main endpoint to analyze a resume against a job description.
    """
    # Use your functions to process the data
    resume_skills = parse_resume(request.resume_text).get("skills", [])
    job_skills = extract_skills_from_description(request.job_description)
    match_score = calculate_similarity(resume_skills, job_skills)

    # Return the final analysis
    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "match_score": match_score
    }
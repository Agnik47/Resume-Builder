# backend/ml-service/src/main.py

from fastapi import FastAPI
# from src.api.routes import resume
from api.routes import resume
# resume import from api routes
from ml.output import generate_complete_report

app = FastAPI(title="ML Resume Service")

# Register routes
app.include_router(resume.router, prefix="/resume", tags=["Resume Analysis"])

@app.get("/")
def root():
    return {"message": "ML Resume Service is running 🚀"}

@app.post("/generate-report")
def generate_report(resume_text: str, job_description: str, target_role: str):
    report = generate_complete_report(resume_text, job_description, target_role)
    return report
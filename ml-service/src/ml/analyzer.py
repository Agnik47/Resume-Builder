# backend/src/ml/analyzer.py

from src.ml.nlp_pipeline import parse_resume, extract_skills_from_description
from src.ml.similarity import calculate_similarity

def analyze_resume_vs_job(resume_text: str, job_description: str) -> dict:
    """
    End-to-end analyzer that:
    1. Parses the resume for name and skills.
    2. Extracts required skills from the job description.
    3. Calculates similarity, matched, and missing skills.
    """
    # Parse resume
    parsed_resume = parse_resume(resume_text)
    resume_skills = parsed_resume.get("skills", [])

    # Extract job description skills
    job_skills = extract_skills_from_description(job_description)

    # Calculate similarity score
    similarity_score, matched, missing = calculate_similarity(resume_skills, job_skills, return_details=True)

    return {
        "resume": parsed_resume,
        "job_description": {"skills": job_skills},
        "analysis": {
            "score": similarity_score,
            "matched_skills": matched,
            "missing_skills": missing
        }
    }

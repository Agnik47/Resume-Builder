# backend/src/ml/analyzer.py

from ml.nlp_pipeline import parse_resume, extract_skills_from_description
from ml.similarity import calculate_similarity

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
    
    print(f"Resume Skills: {resume_skills}")

    return {
        "resume": parsed_resume,
        "job_description": {"skills": job_skills},
        "analysis": {
            "score": similarity_score,
            "matched_skills": matched,
            "missing_skills": missing
        }
    }


resume_text = """John Doe
    Software Engineer
    Skills: Python, Java, SQL
    Experience: 5 years in software development."""
    
job_description = """We are looking for a Software Engineer with skills in Python, Docker, Kubernetes, and AWS."""
    
result = analyze_resume_vs_job(resume_text, job_description)
print(result)
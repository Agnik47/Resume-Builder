# backend/tests/test_nlp_basic.py

from src.ml.nlp_pipeline import parse_resume, extract_skills_from_description
from src.ml.similarity import similarity_details

def test_parse_resume_basic():
    text = "Alice\nSoftware Engineer\nSkills: Python, Django\nExperience: 3 years"
    res = parse_resume(text)
    assert "python" in [s.lower() for s in res["skills"]]

def test_extract_job_skills():
    jd = "We need Python, Django, Docker"
    skills = extract_skills_from_description(jd)
    assert "python" in skills

def test_similarity_details():
    res_sk = ["python", "django"]
    job_sk = ["python", "docker"]
    details = similarity_details(res_sk, job_sk)
    assert "score" in details and "matched_skills" in details

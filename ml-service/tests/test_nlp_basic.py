# backend/tests/test_nlp_basic.py
# import parse_resume, extract_skills_from_description

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from ml.nlp_pipeline import parse_resume, extract_skills_from_description
from ml.similarity import calculate_similarity as similarity_details

def test_parse_resume_basic():
    text = "Alice\nSoftware Engineer\nSkills: Python, Django\nExperience: 3 years"
    res = parse_resume(text)
    assert "python" in [s.lower() for s in res["skills"]]
    print(res)

def test_extract_job_skills():
    jd = "We need Python, Django, Docker"
    skills = extract_skills_from_description(jd)
    assert "python" in skills
    print(skills)

def test_similarity_details():
    res_sk = ["python", "django"]
    job_sk = ["python", "docker"]
    details = similarity_details(res_sk, job_sk)
    print (details)
    # assert "score" in details and "matched_skills" in details

if __name__ == '__main__':
    print("Running NLP basic tests...")
    test_parse_resume_basic()
    test_extract_job_skills()
    test_similarity_details()
    print("All tests passed!")


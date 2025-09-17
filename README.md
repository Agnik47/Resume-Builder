Markdown

# NLP Resume Analysis Module

A self-contained Python module for parsing resumes and scoring them against job descriptions using spaCy and Sentence-Transformers. This module is a core component of the **SkillMentor AI** project.

---

## 🚀 Quick Start

For teammates already familiar with the project, here's how to get up and running quickly.

```bash
# 1. Install all dependencies using Poetry
poetry install

# 2. Download the required spaCy model
poetry run python -m spacy download en_core_web_lg
The Sentence-Transformer model is included in the src/ml/model_weights/ directory and does not require a separate download.

⚙️ Module API / How to Use
The module provides two primary functions.

1. Parsing a Resume
This function takes raw resume text and returns a structured dictionary containing the candidate's name and a list of identified skills.

File: src/ml/nlp_pipeline.py

Function: parse_resume(resume_text: str) -> dict

Example:

Python

from src.ml.nlp_pipeline import parse_resume

resume = """
John Doe | New York, NY | 555-123-4567

A software engineer with experience in Python and Django.
Core Skills: Python, JavaScript, SQL, React, Docker.
"""

parsed_data = parse_resume(resume)
print(parsed_data)

# Expected Output:
# {'skills': ['docker', 'django', 'javascript', 'python', 'react', 'sql'], 'name': 'John Doe'}
2. Calculating Similarity
This function takes two lists of skills (one from a resume, one from a job description) and returns a similarity score from 0 to 100.

File: src/ml/similarity.py

Function: calculate_similarity(resume_skills: list, job_skills: list) -> int

Example:

Python

from src.ml.nlp_pipeline import extract_skills_from_description
from src.ml.similarity import calculate_similarity

# Assume 'parsed_data' is from the example above
resume_skills = parsed_data['skills']

job_description = "We need a Python developer with FastAPI and SQL experience. Docker is a plus."
job_skills = extract_skills_from_description(job_description)

score = calculate_similarity(resume_skills, job_skills)
print(f"Match Score: {score}%")

# Expected Output:
# Match Score: 81% (or a similar high score)
🛠️ Technology Stack
Dependency Management: Poetry

Core NLP: spaCy (en_core_web_lg)

Semantic Similarity: Sentence-Transformers (all-MiniLM-L6-v2)

All project dependencies are defined in the pyproject.toml file.
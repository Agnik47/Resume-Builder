# backend/src/ml/similarity.py

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

# This section is updated to find and load the model from your local folder
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "model_weights", "all-MiniLM-L6-v2")

try:
    print(f"Loading model from local path: {model_path}")
    model = SentenceTransformer(model_path)
except Exception as e:
    print(f"Error loading SentenceTransformer model from local path: {e}")
    model = None


def calculate_similarity(resume_skills: list[str], job_skills: list[str], return_details: bool = False):
    """
    Calculates the semantic similarity score between resume skills and job skills.

    Args:
        resume_skills (list): Skills extracted from resume
        job_skills (list): Skills extracted from job description
        return_details (bool): If True, also return matched & missing skills

    Returns:
        int OR (int, list, list): similarity score (0-100),
                                  matched skills (if return_details=True),
                                  missing skills (if return_details=True)
    """
    if not model or not resume_skills or not job_skills:
        if return_details:
            return 0, [], job_skills
        return 0

    # Encode skill sets
    resume_embedding = model.encode(" ".join(resume_skills))
    job_embedding = model.encode(" ".join(job_skills))

    resume_embedding = np.array(resume_embedding).reshape(1, -1)
    job_embedding = np.array(job_embedding).reshape(1, -1)

    sim_score = cosine_similarity(resume_embedding, job_embedding)[0][0]
    score_as_percent = int((sim_score + 1) / 2 * 100)  # Convert -1→1 to 0→100

    # Clamp value between 0 and 100
    score_as_percent = max(0, min(100, score_as_percent))

    if return_details:
        matched = list(set(resume_skills).intersection(set(job_skills)))
        missing = list(set(job_skills) - set(resume_skills))
        return score_as_percent, sorted(matched), sorted(missing)

    return score_as_percent

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

def calculate_similarity(resume_skills: list[str], job_skills: list[str]) -> int:
    """
    Calculates the semantic similarity score between resume skills and job skills.
    """
    if not model or not resume_skills or not job_skills:
        return 0

    resume_embedding = model.encode(' '.join(resume_skills))
    job_embedding = model.encode(' '.join(job_skills))
    
    resume_embedding = np.array(resume_embedding).reshape(1, -1)
    job_embedding = np.array(job_embedding).reshape(1, -1)
    
    sim_score = cosine_similarity(resume_embedding, job_embedding)[0][0]
    
    score_as_percent = int((sim_score + 1) / 2 * 100)
    
    return max(0, min(100, score_as_percent))
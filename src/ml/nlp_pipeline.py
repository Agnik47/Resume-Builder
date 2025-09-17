# backend/src/ml/nlp_pipeline.py

import spacy
from spacy.matcher import Matcher  # Import the Matcher
from .preprocess import clean_text

# Load the large spaCy model
try:
    nlp = spacy.load("en_core_web_lg")
except OSError:
    print("Downloading 'en_core_web_lg' model...")
    spacy.cli.download("en_core_web_lg")
    nlp = spacy.load("en_core_web_lg")

# --- UPDATED SKILL EXTRACTION ---
SKILLS_LIST = [
    "python", "java", "c++", "javascript", "react", "angular", "vue", "node.js",
    "sql", "mongodb", "postgresql", "docker", "kubernetes", "aws", "azure", "gcp",
    "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
    "data analysis", "pandas", "numpy", "api", "fastapi", "flask", "django"
]

# Initialize the Matcher with the shared vocabulary
matcher = Matcher(nlp.vocab)

# Create case-insensitive patterns for each skill
for skill in SKILLS_LIST:
    # A pattern can be a list of dictionaries, one for each token.
    # We create a pattern for each skill, tokenizing it first.
    pattern = [{"LOWER": token.lower_} for token in nlp(skill)]
    matcher.add(skill, [pattern]) # Use the skill string as the rule ID

def parse_resume(resume_text: str) -> dict:
    """
    Parses a resume text to extract skills, names, and organizations.
    """
    cleaned_text = clean_text(resume_text)
    doc = nlp(cleaned_text)
    
    extracted_entities = {
        "skills": [],
        "name": ""
    }
    
    # --- UPDATED TO USE THE MATCHER ---
    matches = matcher(doc)
    skills_found = set()
    for match_id, start, end in matches:
        # Get the string representation of the match ID (which is the skill)
        skill_name = nlp.vocab.strings[match_id]
        skills_found.add(skill_name)
    # --- END UPDATE ---
            
    # Extract name using NER
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not extracted_entities["name"]:
            extracted_entities["name"] = ent.text
            
    extracted_entities["skills"] = sorted(list(skills_found))
    
    return extracted_entities

def extract_skills_from_description(job_description: str) -> list[str]:
    """
    Extracts known skills from a job description using the matcher.
    """
    cleaned_text = clean_text(job_description)
    doc = nlp(cleaned_text)
    
    matches = matcher(doc)
    skills_found = set()
    for match_id, start, end in matches:
        skill_name = nlp.vocab.strings[match_id]
        skills_found.add(skill_name)
            
    return sorted(list(skills_found))
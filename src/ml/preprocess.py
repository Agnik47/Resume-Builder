# backend/src/ml/preprocess.py

import re

def clean_text(text: str) -> str:
    """
    Cleans the input text by removing extra whitespace, newlines, 
    and special characters to prepare it for NLP processing.

    Args:
        text (str): The raw text from the resume.

    Returns:
        str: The cleaned text.
    """
    # Replace multiple spaces and newlines with a single space
    text = re.sub(r'\s+', ' ', text).strip()
    
    # You can add more specific cleaning rules here. For example,
    # this rule removes characters that are not letters, numbers,
    # or common punctuation used in resumes.
    text = re.sub(r'[^a-zA-Z0-9\s@\.\-\+_]', '', text) 
    
    return text
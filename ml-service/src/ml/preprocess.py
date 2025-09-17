import re

def clean_text(text: str) -> str:
    """
    Cleans input text by normalizing whitespace and keeping useful symbols
    for programming skills (like +, #).
    """
    # Replace multiple spaces and newlines with a single space
    text = re.sub(r'\s+', ' ', text).strip()

    # Allow common tech-related characters (#, +, @, -, _, .)
    text = re.sub(r'[^a-zA-Z0-9\s@\.\-\+_#]', '', text)

    # Normalize to lowercase for consistency
    text = text.lower()

    return text

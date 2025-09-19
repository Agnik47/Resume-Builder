# backend/src/ml/ats_checker.py
import re
import joblib
import os
import spacy
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, Any, List

# --- Configuration ---
# Path to the pre-trained TF-IDF vectorizer for ATS
ATS_VECTORIZER_PATH = 'src/ml/data_model/ats_vectorizer.pkl'
# Path to the pre-processed list of keywords/skills from job descriptions
JOB_KEYWORDS_PATH = 'src/ml/data_model/job_keywords.pkl' 

class ATSChecker:
    """
    Analyzes a resume against a job description to provide an ATS score and optimization tips.
    Uses a dedicated TF-IDF model for accurate keyword and phrase matching.
    """
    def __init__(self, vectorizer_path: str = ATS_VECTORIZER_PATH, job_keywords_path: str = JOB_KEYWORDS_PATH):
        """
        Initializes the ATS checker by loading pre-trained models.
        
        Args:
            vectorizer_path (str): Path to the saved TF-IDF vectorizer.
            job_keywords_path (str): Path to a list of extracted job-specific keywords.
        """
        if not os.path.exists(vectorizer_path) or not os.path.exists(job_keywords_path):
            raise FileNotFoundError("ATS models not found. Please run train_models.py first to create them.")
        
        # Load the dedicated vectorizer for ATS
        self.vectorizer = joblib.load(vectorizer_path)
        # Load the pre-processed list of important keywords from job descriptions
        self.job_keywords = joblib.load(job_keywords_path)

        # Load a pre-trained spaCy model for NER (Named Entity Recognition)
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("Downloading spacy model 'en_core_web_sm'...")
            from spacy.cli import download
            download("en_core_web_sm")
            self.nlp = spacy.load("en_core_web_sm")

    def _calculate_keyword_match_score(self, resume_text: str, job_description_text: str) -> float:
        """
        Calculates a semantic similarity score using the dedicated TF-IDF model.
        """
        # Transform the texts using the ATS-specific vectorizer
        resume_vector = self.vectorizer.transform([resume_text])
        job_description_vector = self.vectorizer.transform([job_description_text])

        # Compute cosine similarity
        cosine_sim = float(cosine_similarity(resume_vector, job_description_vector)[0][0])
        
        # Scale and return the score as a percentage
        return round(cosine_sim * 100, 2)

    def _get_missing_keywords(self, resume_text: str) -> List[str]:
        """
        Identifies important keywords from the pre-processed job keywords list
        that are missing from the resume.
        """
        resume_text_lower = resume_text.lower()
        missing = []
        
        for keyword in self.job_keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', resume_text_lower):
                continue
            else:
                missing.append(keyword)
        
        # Return a sample of the most relevant missing keywords
        return missing[:10]

    def _analyze_quantifiable_achievements(self, resume_text: str) -> List[str]:
        """
        Checks for the presence of quantifiable achievements in the resume.
        This uses simple regex to find numbers and percentage signs.
        """
        feedback = []
        patterns = [
            r'\d+%?(\s\w+)?\s(increase|decrease)',
            r'reduced .* by \d+%?',
            r'managed team of \d+',
            r'generated \$\d+'
        ]
        
        for pattern in patterns:
            if re.search(pattern, resume_text, re.IGNORECASE):
                return [] # Found at least one, so no feedback needed
        
        feedback.append("Your resume lacks quantifiable achievements. Add metrics like percentages, numbers, and dollar amounts to highlight your impact.")
        return feedback

    def get_ats_report(self, resume_text: str, job_description_text: str) -> Dict[str, Any]:
        """
        Generates a comprehensive ATS report with a score and actionable feedback.
        """
        keyword_score = self._calculate_keyword_match_score(resume_text, job_description_text)
        missing_keywords = self._get_missing_keywords(resume_text)
        quantifiable_feedback = self._analyze_quantifiable_achievements(resume_text)
        
        suggestions = []
        if keyword_score < 70:
            suggestions.append({
                "type": "Keyword Match",
                "message": "Your resume's keyword match is low. Focus on incorporating terms directly from the job description."
            })
            
        if missing_keywords:
            suggestions.append({
                "type": "Missing Keywords",
                "message": f"Incorporate the following keywords to improve your match: {', '.join(missing_keywords)}."
            })
            
        suggestions.extend([{"type": "Achievement", "message": msg} for msg in quantifiable_feedback])
            
        report = {
            'ats_score': keyword_score,
            'suggestions': suggestions,
        }
        print(report)
        return report

if __name__ == "__main__":
    checker = ATSChecker()
    resume_text = "Paste your resume text here."
    job_description_text = "Paste the job description here."
    report = checker.get_ats_report(resume_text, job_description_text)
    print(report)
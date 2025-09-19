# Career/project recommendation models

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os

class CareerRecommender:
    """
    A content-based career recommendation system that suggests roles based on skill similarity.
    """
    def __init__(self, job_data_path, vectorizer_path=None):
        """
        Initializes the recommender with job data and a pre-trained TF-IDF vectorizer.

        Args:
            job_data_path (str): Path to the CSV file containing job role data.
            vectorizer_path (str, optional): Path to the saved TF-IDF vectorizer.
                                            If None, a new vectorizer is trained.
        """
        if not os.path.exists(job_data_path):
            raise FileNotFoundError(f"Job data file not found at {job_data_path}")
        
        self.jobs_df = pd.read_csv(job_data_path)
        self.vectorizer = TfidfVectorizer(stop_words='english', token_pattern=r'(?u)\b[a-zA-Z0-9_]{2,}\b')
        self.job_vectors = None

        if vectorizer_path and os.path.exists(vectorizer_path):
            # Load pre-trained vectorizer and job vectors for faster startup
            self.vectorizer = joblib.load(vectorizer_path)
            self.job_vectors = self.vectorizer.transform(self.jobs_df['combined_text'])
            print("Loaded pre-trained vectorizer and job vectors.")
        else:
            # If no pre-trained vectorizer, train one from scratch
            raise ValueError("No pre-trained vectorizer found. Please train the model first using the `train()` method.")
            
    def get_recommendations(self, student_skills, top_n=5):
        """
        Recommends career roles based on student's skills.

        Args:
            student_skills (str): A string of skills from the student's resume.
            top_n (int): The number of top recommendations to return.

        Returns:
            list: A list of dictionaries, each containing 'role_title' and 'match_score'.
        """
        if not self.job_vectors is None:
            # Vectorize the student's skills
            student_vector = self.vectorizer.transform([student_skills])

            # Calculate cosine similarity between student's skills and all job roles
            similarity_scores = cosine_similarity(student_vector, self.job_vectors).flatten()

            # Get the indices of the top N most similar jobs
            top_indices = similarity_scores.argsort()[-top_n:][::-1]

            # Collect the recommendations
            recommendations = []
            for i in top_indices:
                role_title = self.jobs_df.iloc[i]['role_title']
                match_score = float(similarity_scores[i])
                recommendations.append({
                    'role_title': role_title,
                    'match_score': match_score
                })

            return recommendations
        else:
            print("Model not trained. Please run the train() method first.")
            return []

if __name__ == '__main__':    
    
    recommender = CareerRecommender(job_data_path='src/ml/data_model/job_roles_dataset_expanded.csv', vectorizer_path='src/ml/data_model/vectorizer.pkl')
    print("\n--- Career Recommender Initialized ---")
    print(recommender.jobs_df)
    
    student_skills_input = "python, machine learning, deep learning, sql, data visualization"
    student_skills_input = "agile"
    
    print("\n--- Making a recommendation for student with skills: ---")
    print(student_skills_input)
    
    recommendations = recommender.get_recommendations(student_skills=student_skills_input)
    
    print("\nTop Career Recommendations:")
    for rec in recommendations:
        print(f"- Role: {rec['role_title']} | Match Score: {rec['match_score']:.2f}")
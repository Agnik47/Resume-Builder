# Skill gap analysis logic

# backend/src/ml/skill_gap_analysis.py
from typing import List, Dict

class SkillGapAnalyzer:
    """
    A utility class to analyze a student's skills against a target job's requirements.
    It identifies missing skills and provides a clear list of what needs to be learned.
    """
    def __init__(self, job_data_model: Dict[str, List[str]]):
        """
        Initializes the analyzer with a pre-loaded model of job skills.
        
        Args:
            job_data_model (Dict[str, List[str]]): A dictionary mapping job roles to their required skills.
                                                    This model is generated and passed from a central data loading script.
        """
        if not job_data_model:
            raise ValueError("Job data model cannot be empty. It must be provided to the analyzer.")
        self.job_data_model = job_data_model

    def analyze(self, student_skills: List[str], target_role: str) -> Dict[str, List[str]]:
        """
        Performs the core skill gap analysis.
        
        Args:
            student_skills (List[str]): A list of skills extracted from the student's resume.
            target_role (str): The target job role (e.g., 'Data Scientist').
            
        Returns:
            Dict[str, List[str]]: A dictionary containing lists of existing and missing skills.
        """
        if target_role not in self.job_data_model:
            return {
                "status": "error",
                "message": f"Target role '{target_role}' not found in our database.",
                "missing_skills": [],
                "existing_skills": student_skills
            }

        required_skills = set(self.job_data_model[target_role])
        student_skills_set = {skill.strip().lower() for skill in student_skills}
        
        # Identify missing skills by finding the difference between the sets
        missing_skills_set = required_skills - student_skills_set
        
        # Find which of the student's skills match the required skills
        existing_skills_set = student_skills_set.intersection(required_skills)

        # Return the results in a clear dictionary format
        return {
            "status": "success",
            "message": "Skill gap analysis complete.",
            "missing_skills": sorted(list(missing_skills_set)),
            "existing_skills": sorted(list(existing_skills_set))
        }

# Example of how to use this class
if __name__ == '__main__':
    # --- Sample Data Model (This is what you'd load from a file) ---
    # This data would be pre-processed and saved by train_models.py
    job_skills_model = {
        'data scientist': ['python', 'r', 'sql', 'machine learning', 'tensorflow', 'pytorch', 'data visualization'],
        'frontend developer': ['javascript', 'react', 'html', 'css', 'api', 'tailwind css'],
        'ux/ui designer': ['figma', 'sketch', 'user research', 'prototyping', 'adobe xd']
    }

    # Instantiate the analyzer with the data model
    analyzer = SkillGapAnalyzer(job_data_model=job_skills_model)

    # --- Sample Student and Target Role ---
    student_skills = ['Python', 'SQL', 'HTML', 'Data Visualization']
    target_role = 'data scientist'

    # Perform the analysis
    analysis_result = analyzer.analyze(student_skills=student_skills, target_role=target_role)

    # Print the results
    print(f"Analysis for target role: '{target_role}'")
    print("---")
    print(f"Missing Skills: {analysis_result['missing_skills']}")
    print(f"Existing Skills: {analysis_result['existing_skills']}")
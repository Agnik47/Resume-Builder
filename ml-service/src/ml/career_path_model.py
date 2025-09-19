# Generates career roadmaps & timelines based on user skills

import os
import google.generativeai as genai
from typing import List, Dict, Any

class CareerPathGenerator:
    """
    An AI-powered agent that generates a personalized, step-by-step career roadmap.
    It acts as a career coach, using the Gemini API to create actionable plans.
    """
    def __init__(self, api_key: str):
        """
        Initializes the CareerPathGenerator with a Gemini API key.
        
        Args:
            api_key (str): Your Google Gemini API key.
        """
        # Configure the Gemini API client
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    def _generate_roadmap_prompt(self, student_skills: List[str], missing_skills: List[str], target_role: str, timeline_months: int) -> str:
        """
        Crafts a detailed, context-aware prompt for the Gemini agent.
        
        Args:
            student_skills (List[str]): List of skills the student possesses.
            missing_skills (List[str]): List of skills identified as missing.
            target_role (str): The target job role (e.g., 'Frontend Developer').
            timeline_months (int): The target timeline for the roadmap in months.
            
        Returns:
            str: The final prompt string.
        """
        # A master instruction to set the agent's persona and objective
        system_instruction = (
            "You are an empathetic and highly skilled career coach. Your goal is to create a "
            "clear, motivating, and highly practical career roadmap for a student. "
            "The roadmap must be a step-by-step plan that bridges their current skills "
            "to the skills required for their target job. Structure the plan by week. "
            "Include a mix of learning, project-building, and networking activities. "
            "Be encouraging and use clear, actionable language. Do not use complex technical jargon. "
        )

        # Crafting the user prompt with all the provided context
        prompt = (
            f"{system_instruction}\n\n"
            f"### Student Profile:\n"
            f"- **Current Skills:** {', '.join(student_skills) if student_skills else 'None listed'}\n"
            f"- **Target Job Role:** {target_role}\n"
            f"- **Missing Skills to Learn:** {', '.join(missing_skills) if missing_skills else 'None'}\n"
            f"- **Target Timeline:** {timeline_months} months\n\n"
            f"### Task: Generate a personalized {timeline_months}-month roadmap.\n"
            f"Provide a weekly breakdown focusing on the following phases:\n"
            f"1.  **Foundational Learning:** Begin with core concepts and skills.\n"
            f"2.  **Practical Application:** Work on small projects to apply what is learned.\n"
            f"3.  **Advanced Topics:** Dive into more complex skills and concepts.\n"
            f"4.  **Portfolio and Interview Prep:** Build a capstone project and prepare for the job market.\n\n"
            f"For each week, provide a title and a short list of actionable steps. "
            f"For example:\n\n"
            f"**Month 1, Week 1: Foundations of {target_role}**\n"
            f"- Master the basics of {missing_skills[0]} through an online course.\n"
            f"- Read a beginner's guide on {target_role} principles.\n"
            f"- Set up your development environment and create a 'Hello World' project."
        )
        
        return prompt

    def generate_roadmap(self, student_skills: List[str], missing_skills: List[str], target_role: str, timeline_months: int = 3) -> Dict[str, Any]:
        """
        Generates a career roadmap based on student's profile and goals.
        
        Args:
            student_skills (List[str]): List of skills from the resume.
            missing_skills (List[str]): List of skills from the gap analysis.
            target_role (str): The target career role.
            timeline_months (int): The duration of the roadmap.
            
        Returns:
            dict: The generated roadmap content and metadata.
        """
        try:
            prompt = self._generate_roadmap_prompt(student_skills, missing_skills, target_role, timeline_months)
            
            # The agent makes a call to the Gemini API
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    # A low temperature ensures a more structured and less 'creative' output
                    temperature=0.4, 
                ),
            )
            
            # Clean and format the generated content
            roadmap_content = response.text.strip()
            
            return {
                'status': 'success',
                'target_role': target_role,
                'timeline': f"{timeline_months} months",
                'roadmap': roadmap_content,
                'source_model': 'Gemini 1.5 Pro'
            }

        except Exception as e:
            return {
                'status': 'error',
                'message': f"An error occurred while generating the roadmap: {e}",
                'roadmap': None
            }

# Example of how this class is used in your FastAPI backend
if __name__ == '__main__':
    # You would load the API key from an environment variable in a real application
    GEMINI_API_KEY = "AIzaSyAa_E87lm7tBt_5aJijHoP52Q5yRdVkY_U"
    if not GEMINI_API_KEY:
        print("Error: GEMINI_API_KEY environment variable is not set. Exiting.")
        exit()

    # Instantiate the career path generator
    generator = CareerPathGenerator(api_key=GEMINI_API_KEY)

    # Sample inputs (these would come from your other ML modules)
    student_skills_sample = ['Python', 'SQL', 'Data Analysis', 'Pandas', 'Matplotlib']
    missing_skills_sample = ['Machine Learning', 'TensorFlow', 'PyTorch', 'Statistical Modeling']
    target_role_sample = 'Data Scientist'
    timeline_months_sample = 3

    # Generate the roadmap
    print("--- Generating Personalized Career Roadmap ---")
    roadmap_report = generator.generate_roadmap(
        student_skills=student_skills_sample,
        missing_skills=missing_skills_sample,
        target_role=target_role_sample,
        timeline_months=timeline_months_sample
    )

    # Print the result
    print(roadmap_report['roadmap'])
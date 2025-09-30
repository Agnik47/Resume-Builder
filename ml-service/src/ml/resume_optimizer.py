# Role-based resume suggestions

# backend/src/ml/resume_optimizer.py
import logging
import os
import google.generativeai as genai
from typing import List, Dict, Any

class ResumeOptimizer:
    def __init__(self, api_key: str):
        # Configure the Gemini API client
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    def _generate_prompt(self, resume_text: str, job_description: str, optimization_target: str) -> str:
        # A master prompt that guides the AI's behavior
        system_instruction = (
            "You are a professional resume optimization expert. Your goal is to rewrite and "
            "provide detailed suggestions for improving a resume to perfectly match a job description. "
            "You must be factual, concise, and use action-oriented language. "
            "Always include quantifiable achievements where possible. "
            "Only focus on the requested optimization target. Provide the output in a clean, readable format."
        )

        # Crafting the user prompt based on the target
        if optimization_target == 'summary':
            prompt = (
                f"{system_instruction}\n\n"
                f"### Task: Generate a professional summary.\n"
                f"Create a compelling professional summary (4-5 sentences) for the resume below, "
                f"tailored specifically to the given job description. "
                f"Include years of experience and top skills.\n\n"
                f"**Resume Content:**\n{resume_text}\n\n"
                f"**Job Description:**\n{job_description}"
            )
        elif optimization_target == 'experience':
            prompt = (
                f"{system_instruction}\n\n"
                f"### Task: Rewrite experience bullet points.\n"
                f"Rewrite the following experience section bullet points to be more impactful and relevant "
                f"to the job description. Use strong action verbs and quantify achievements. "
                f"Return the rewritten bullet points only.\n\n"
                f"**Resume Experience Section:**\n{resume_text}\n\n"
                f"**Job Description:**\n{job_description}"
            )
        elif optimization_target == 'skills':
            prompt = (
                f"{system_instruction}\n\n"
                f"### Task: Suggest missing skills.\n"
                f"Analyze the job description and the provided resume. List 10 to 15 key skills from the job description "
                f"that are missing or underrepresented in the resume. Also, suggest up to 5 related technical or soft skills "
                f"that would make the candidate a stronger fit for the role.\n\n"
                f"**Resume Skills Section:**\n{resume_text}\n\n"
                f"**Job Description:**\n{job_description}"
            )
        else:
            raise ValueError("Invalid optimization target. Choose from 'summary', 'experience', or 'skills'.")

        return prompt

    def optimize_resume_section(self, resume_text: str, job_description: str, optimization_target: str) -> Dict[str, Any]:
        try:
            prompt = self._generate_prompt(resume_text, job_description, optimization_target)
            
            # The agent makes a call to the Gemini API
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.2, 
                ),
            )
            
            # Check for a valid response before accessing its properties
            if not response.text:
                raise ValueError("Gemini API returned an empty response.")
                
            optimized_content = response.text.strip()
            
            return {
                'status': 'success',
                'optimization_target': optimization_target,
                'optimized_content': optimized_content,
                'source_model': 'Gemini 1.5 Pro'
            }       # This `except` block is your key to identifying errors
        except genai.types.generation_types.StopCandidateException as e:
            # This specific exception is for content blocked by safety filters.
            return {
                'status': 'error',
                'message': "Content was blocked by safety filters. Please try rephrasing your input. 🛡️",
                'error_details': str(e),
                'optimized_content': None
            }
        except Exception as e:
            # Catch all other exceptions and provide a detailed report.
            return {
                'status': 'error',
                'message': "An unexpected error occurred during optimization. Please check your API key and connection.",
                'error_details': str(e),
                'optimized_content': None,
            }

# Example of how this class is used in your FastAPI backend
if __name__ == '__main__':
    # You would load the API key from an environment variable in a real application
    GEMINI_API_KEY = "APIKEY"
    if not GEMINI_API_KEY:
        print("Error: GEMINI_API_KEY environment variable is not set. Exiting.")
        exit()

    # Instantiate the optimizer agent
    optimizer = ResumeOptimizer(api_key=GEMINI_API_KEY)

    # Sample data
    sample_resume = """
    John Doe
    Experience
    Senior Software Engineer at Tech Corp (2020-Present)
    * Wrote code for web services.
    * Helped with bug fixes.
    * Used Python.
    Skills: Python, Java, SQL, AWS, Docker
    """
    
    sample_job_description = """
    Job Title: Senior Backend Developer
    Company: Innovate Solutions
    We are seeking a Senior Backend Developer with 5+ years of experience in Python. 
    The ideal candidate will design and implement RESTful APIs, manage cloud infrastructure on AWS, 
    and build scalable microservices. Experience with database optimization and CI/CD pipelines is required.
    """

    # --- Optimize a section of the resume ---
    print("--- Optimizing Professional Summary ---")
    summary_optimization = optimizer.optimize_resume_section(
        resume_text=sample_resume,
        job_description=sample_job_description,
        optimization_target='summary'
    )
    print(summary_optimization['optimized_content'])

    print("\n--- Optimizing Experience Bullet Points ---")
    experience_optimization = optimizer.optimize_resume_section(
        resume_text=sample_resume,
        job_description=sample_job_description,
        optimization_target='experience'
    )
    print(experience_optimization['optimized_content'])
    
    print("\n--- Suggesting Missing Skills ---")
    skills_optimization = optimizer.optimize_resume_section(
        resume_text=sample_resume,
        job_description=sample_job_description,
        optimization_target='skills'
    )
    print(skills_optimization['optimized_content'])

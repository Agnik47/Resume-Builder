from ml.ats_checker import ATSChecker
from ml.career_path_model import CareerPathGenerator
from ml.recommendation import CareerRecommender
from ml.resume_optimizer import ResumeOptimizer
from ml.skill_gap_analysis import SkillGapAnalyzer

from ml.analyzer import analyze_resume_vs_job

import json

job_skills_model = {
    "data scientist": [
        "python", "r", "sql", "machine learning", "deep learning",
        "tensorflow", "pytorch", "scikit-learn", "numpy", "pandas",
        "matplotlib", "seaborn", "data visualization", "statistics",
        "natural language processing", "big data", "hadoop", "spark",
        "cloud platforms", "data wrangling", "feature engineering"
    ],
    "frontend developer": [
        "javascript", "typescript", "react", "vue.js", "angular",
        "html", "css", "sass", "tailwind css", "bootstrap",
        "next.js", "redux", "api integration", "graphql", "webpack",
        "responsive design", "testing (jest, cypress)", "ui frameworks",
        "cross-browser compatibility", "version control (git)"
    ],
    "backend developer": [
        "python", "java", "c#", "node.js", "express.js",
        "spring boot", "django", "flask", "sql", "postgresql",
        "mongodb", "redis", "docker", "kubernetes", "rest api",
        "graphql", "microservices", "authentication", "testing (pytest, junit)",
        "cloud services (aws, gcp, azure)"
    ],
    "full stack developer": [
        "javascript", "typescript", "react", "angular", "vue.js",
        "node.js", "express.js", "django", "flask", "spring boot",
        "html", "css", "sass", "bootstrap", "tailwind css",
        "sql", "postgresql", "mongodb", "graphql", "rest api",
        "docker", "kubernetes", "git", "cloud platforms"
    ],
    "ux/ui designer": [
        "figma", "sketch", "adobe xd", "invision", "illustrator",
        "photoshop", "wireframing", "prototyping", "user research",
        "information architecture", "interaction design", "visual design",
        "design systems", "usability testing", "accessibility (a11y)",
        "mobile design", "responsive design", "motion design"
    ],
    "devops engineer": [
        "linux", "bash", "python", "docker", "kubernetes",
        "terraform", "ansible", "jenkins", "gitlab ci/cd", "prometheus",
        "grafana", "aws", "gcp", "azure", "system monitoring",
        "networking", "load balancing", "scalability", "cloud security"
    ],
    "cybersecurity analyst": [
        "network security", "penetration testing", "firewalls", "ids/ips",
        "wireshark", "nmap", "kali linux", "python", "siem tools",
        "incident response", "threat analysis", "cryptography",
        "vulnerability scanning", "ethical hacking", "cloud security",
        "compliance (GDPR, HIPAA)", "risk assessment", "osint"
    ],
    "ai/ml engineer": [
        "python", "r", "c++", "machine learning", "deep learning",
        "tensorflow", "pytorch", "keras", "scikit-learn", "huggingface",
        "nlp", "computer vision", "reinforcement learning", "mllib",
        "sql", "data preprocessing", "cloud ml services",
        "mlops", "feature engineering", "model deployment"
    ],
    "project manager": [
        "project planning", "scrum", "kanban", "agile methodology",
        "jira", "confluence", "trello", "microsoft project", "stakeholder management",
        "risk management", "budgeting", "time management",
        "communication", "leadership", "quality assurance",
        "change management", "resource allocation"
    ],
    "business analyst": [
        "requirement gathering", "sql", "excel", "tableau",
        "power bi", "data analysis", "process modeling",
        "uml diagrams", "stakeholder communication",
        "business process management", "agile methodology",
        "user stories", "gap analysis", "documentation"
    ],
    "cloud engineer": [
        "aws", "gcp", "azure", "terraform", "cloudformation",
        "docker", "kubernetes", "linux", "python", "boto3",
        "ci/cd pipelines", "cloud networking", "serverless architecture",
        "monitoring", "iam", "cost optimization"
    ],
    "qa engineer": [
        "manual testing", "automated testing", "selenium", "cypress",
        "junit", "pytest", "api testing", "performance testing",
        "load testing", "test planning", "bug tracking",
        "jira", "test automation frameworks", "ci/cd integration",
        "security testing", "mobile testing"
    ]
}


def generate_complete_report(resume_text: str, job_description: str, target_role: str) -> dict:
    """
    Generates a comprehensive report including resume analysis, skill gap analysis,
    career recommendations, ATS score, and a career roadmap.

    Args:
        resume_text (str): The text of the candidate's resume.
        job_description (str): The text of the job description.
        target_role (str): The desired career role for roadmap generation.

    Returns:
        dict: A comprehensive report with all analyses and recommendations.
    """
    # Step 1: Analyze Resume vs Job Description
    analysis_result = analyze_resume_vs_job(resume_text, job_description)
    resume_skills = analysis_result['resume'].get('skills', [])
    job_skills = analysis_result['job_description'].get('skills', [])
    missing_skills = analysis_result['analysis'].get('missing_skills', [])

    # Step 2: Skill Gap Analysis
    skill_gap_analyzer = SkillGapAnalyzer(job_skills_model)
    skill_gap_report = skill_gap_analyzer.analyze(resume_skills, target_role)

    # Step 3: Career Recommendations
    recommender = CareerRecommender(job_data_path='src/ml/data_model/job_roles_dataset_expanded.csv', vectorizer_path='src/ml/data_model/vectorizer.pkl')
    recommendations = recommender.get_recommendations(", ".join(resume_skills), top_n=5)

    # Step 4: ATS Score
    ats_checker = ATSChecker()
    ats_score = ats_checker.get_ats_report(resume_text, job_description)

    # Step 5: Career Roadmap Generation
    roadmap_generator = CareerPathGenerator(api_key="YOUR_GEMINI_API_KEY")
    roadmap = roadmap_generator.generate_roadmap(resume_skills, missing_skills, target_role, timeline_months=3)
    
    # Step 6: Resume Optimization Suggestions
    resume_optimizer = ResumeOptimizer(api_key='YOUR_API_KEY')
    optimization_suggestions_sum = resume_optimizer.optimize_resume_section(resume_text, job_description, optimization_target='summary')
    optimization_suggestions_exp = resume_optimizer.optimize_resume_section(resume_text, job_description, optimization_target='experience')
    optimization_suggestions_skills = resume_optimizer.optimize_resume_section(resume_text, job_description, optimization_target='skills')

    # Compile the complete report
    complete_report = {
        "resume_analysis": analysis_result,
        "skill_gap_analysis": skill_gap_report,
        "career_recommendations": recommendations,
        "ats_score": ats_score,
        "career_roadmap": roadmap,
        "resume_optimization": {
            "summary": optimization_suggestions_sum,
            "experience": optimization_suggestions_exp,
            "skills": optimization_suggestions_skills
        }
    }

    return complete_report

if __name__ == '__main__':
    # Example usage
    resume_text = """John Doe
    Software Engineer
    Skills: Python, Java, SQL
    Experience: 5 years in software development."""
    
    job_description = """We are looking for a Software Engineer with skills in Python, Docker, Kubernetes, and AWS."""
    
    target_role = "Senior Software Engineer"
    
    report = generate_complete_report(resume_text, job_description, target_role)
    
    import json
    print(json.dumps(report, indent=4))
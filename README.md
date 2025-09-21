# 🌟 SkillAdvisor AI  

<p align="center">
  <img src="images/dashboard.jpg" alt="SkillAdvisor AI Dashboard" width="650"/>
</p>  

<p align="center">
  <b>🚀 Unlock Your Career Potential with AI-powered Insights</b><br/>
  Build a standout resume, discover your strengths, and plan your next career move – all in one place.
</p>  

---

<p align="center">
  <a href="https://github.com/Agnik47/Resume-Builder/stargazers"><img src="https://img.shields.io/github/stars/Agnik47/Resume-Builder?color=yellow&style=for-the-badge" alt="Stars"/></a>
  <a href="https://github.com/Agnik47/Resume-Builder/network/members"><img src="https://img.shields.io/github/forks/Agnik47/Resume-Builder?color=blue&style=for-the-badge" alt="Forks"/></a>
  <a href="https://github.com/Agnik47/Resume-Builder/issues"><img src="https://img.shields.io/github/issues/Agnik47/Resume-Builder?color=red&style=for-the-badge" alt="Issues"/></a>
  <a href="https://github.com/Agnik47/Resume-Builder/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Agnik47/Resume-Builder?color=green&style=for-the-badge" alt="License"/></a>
</p>  

---

## ✨ Features  

- 📄 **Effortless Resume Upload & Parsing** – Upload PDF/DOCX/TXT resumes, get instant structured insights.  
- 🧩 **Skill Gap Analysis** – See what skills you lack and how to acquire them.  
- 🎯 **Career Path Recommendations** – AI-tailored paths based on your skills & interests.  
- 🏆 **ATS Compatibility Check** – Get an ATS score + suggestions to improve chances.  
- 💼 **Job & Skill Matching** – Match current skills to jobs & learning resources.  
- 📊 **Interactive Dashboard** – Visualize analytics & growth in a sleek UI.  
- 🔒 **Privacy First** – Your data stays with you.  

<p align="center">
  <img src="images/analyzer_dashboard.jpg" alt="Analytics Dashboard" width="600"/>
</p>  

---

## 🎥 Demo & Preview  

| Resume Analyzer | Career Path Roadmap | Skill Gap Insights |
|-----------------|----------------------|-------------------|
| <img src="images/resume_analyzer.jpg" width="300"/> | <img src="images/roadmap.jpg" width="300"/> | <img src="images/skill_gap.jpg" width="300"/> |

🚀 *Coming soon: Live demo link & walkthrough video*  

---

## 📂 Project Structure  

<details>
<summary>Click to Expand 📁</summary>



## Project Structure

The project is organized into three main parts for clarity and scalability:

```
Resume-Builder/
│
├── Backend/         # Node.js/Express backend API
│   ├── src/
│   │   ├── api/routes/     # API route definitions
│   │   ├── config/         # Database and app config
│   │   ├── controller/     # Request controllers
│   │   ├── middleware/     # Auth and other middleware
│   │   ├── models/         # Mongoose models
│   │   └── services/       # Business logic/services
│   ├── index.js            # Entry point
│   └── package.json        # Backend dependencies
│
├── frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   └── assets/         # Static assets
│   ├── public/             # Public files
│   ├── index.html          # Main HTML file
│   └── package.json        # Frontend dependencies
│
├── ml-service/      # Python ML microservice
│   ├── src/
│   │   ├── api/routes/     # FastAPI route definitions
│   │   └── ml/             # ML models, pipeline, utils
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # ML service docs
│
└── package.json     # Root config (optional)
```

---



## Tech Stack

SkillAdvisor AI leverages a robust, modern stack:

- **Frontend**: React, Vite, Redux, CSS Modules
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **ML Service**: Python, FastAPI, scikit-learn, spaCy, NLTK, pandas
- **Deployment**: Vercel (backend), local/VM (ML service), Netlify/Vercel (frontend)

---



## Getting Started

Ready to try it out? Here’s how you can get SkillAdvisor AI running locally:

### Prerequisites
- Node.js (v16 or newer)
- Python (3.10 or newer)
- MongoDB (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/Agnik47/Resume-Builder.git
cd Resume-Builder
```

### 2. Start the Backend
```bash
cd Backend
npm install
# Don’t forget to set your MongoDB URI in src/config/database.js
npm start
```

### 3. Fire Up the ML Service
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### 4. Launch the Frontend
```bash
cd frontend
npm install
npm run dev
```


Once all services are running, open your browser and head to the local address shown in your terminal (usually `http://localhost:5173` for the frontend). You’re all set!

---



## Backend API

The backend, built with Express.js, handles authentication, resume uploads, user management, and communication with the ML service. Below are some of the main endpoints:

- `POST /api/user/register` – Register a new user
- `POST /api/user/login` – User login
- `POST /api/resume/upload` – Upload and parse a resume
- `POST /api/matchSkills` – Get a skill gap analysis for a given resume and target job
- `GET /api/careerPath` – Receive personalized career path recommendations
- `POST /api/matchJob` – Find jobs that match your skills

All endpoints return JSON responses. See the `/Backend/src/api/routes/` directory for detailed route definitions and request/response formats.

---



## ML Service

The ML microservice is the intelligence engine of SkillAdvisor AI. Built with FastAPI, it provides:

- **Resume Parsing & Analysis** (`analyzer.py`): Extracts structured data from resumes using NLP.
- **ATS Compatibility Check** (`ats_checker.py`): Scores resumes for ATS friendliness and provides actionable feedback.
- **Career Path Prediction** (`career_path_model.py`): Suggests optimal career paths based on user data and job market trends.
- **Skill Gap Detection** (`skill_gap_analysis.py`): Compares user skills to target roles and identifies gaps.

### ML Pipeline Overview
1. **Preprocessing**: Cleans and tokenizes resume text.
2. **Skill Extraction**: Uses NLP to identify hard and soft skills.
3. **Similarity Analysis**: Compares user profile to job requirements using vectorization and similarity metrics.
4. **Recommendation Engine**: Suggests jobs, skills, and learning resources.

All ML endpoints are exposed via REST and are documented in `/ml-service/src/api/routes/`.

---



## Frontend

The frontend, built with React and Vite, offers:

- **Resume Upload Form**: Drag-and-drop or select your resume for instant analysis.
- **Personal Dashboard**: View analytics, recommendations, and track your progress over time.
- **Skill Gap & Career Path Visualizations**: Interactive charts and graphs to help you understand your strengths and opportunities.
- **Responsive UI**: Works seamlessly on desktop, tablet, and mobile.

---



## Contributing

We welcome contributions of all kinds! Here’s how you can get involved:

1. **Fork** this repository
2. **Create a branch** for your feature or fix (`git checkout -b feature/your-feature`)
3. **Write clear, well-documented code** and add tests if possible
4. **Commit** your changes (`git commit -m 'Describe your change'`)
5. **Push** to your branch (`git push origin feature/your-feature`)
6. **Open a Pull Request** and describe your changes and motivation

### Contribution Ideas
- Add new resume parsing features or support for more file types
- Improve the ML models or add new recommendation algorithms
- Enhance the frontend UI/UX
- Write documentation or tutorials

---



## License

This project is open source and available under the MIT License. Use it, share it, and help us make career guidance smarter for everyone!

---

*SkillAdvisor AI is built with ❤️ by passionate developers and data scientists. We hope it helps you take the next step in your career journey!*

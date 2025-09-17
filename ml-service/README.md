
# 📌 ML-Service (Resume Intelligence Engine)

This service provides **NLP-powered resume analysis and job matching** APIs.  
It extracts skills from resumes, compares them against job descriptions, and returns a **match score + skill gap insights**.

---

## 🚀 Features
- 🔎 **Resume Parsing** → Extracts candidate name, skills, and experience.  
- 📂 **Job Description Analysis** → Extracts required skills from job postings.  
- 🎯 **Similarity Scoring** → Calculates resume-job match score with matched/missing skills.  
- 📑 **Extensible Skills Database** → Skills managed via `skills.json` (easy to update).  
- ⚡ **FastAPI Endpoints** → Clean REST APIs for backend integration.  

---

## 📂 Project Structure
```

ml-service/
├── src/
│   ├── main.py                # FastAPI entrypoint with API routes
│   ├── ml/
│   │   ├── nlp\_pipeline.py    # Resume parsing, skill extraction
│   │   ├── similarity.py      # Similarity scoring
│   │   ├── analyzer.py        # Orchestrates resume vs job analysis
│   │   ├── preprocess.py      # Text cleaning utilities
│   │   ├── skills.json        # Extensible skill database
│   │   └── model\_weights/     # Pretrained models (ignored in Git)
│   └── tests/                 # Pytest-based unit tests
├── pyproject.toml             # Poetry dependencies
├── Dockerfile                 # Container setup
└── README.md                  # This file

````

---

## ⚙️ Setup

### 1️⃣ Install Dependencies
```bash
poetry install
````

### 2️⃣ Run Service

```bash
poetry run uvicorn src.main:app --reload --port 8000
```

Service will be available at:
👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🛠️ API Endpoints

### 🔹 Analyze Resume

**POST** `/resume/analyze-resume`

**Request:**

```json
{
  "resume_text": "John Doe, Software Engineer... Python, Django, AWS..."
}
```

**Response:**

```json
{
  "name": "John Doe",
  "skills": ["python", "django", "aws"]
}
```

---

### 🔹 Match Resume to Job

**POST** `/resume/match-job`

**Request:**

```json
{
  "resume_text": "John Doe, Software Engineer... Python, Django, AWS...",
  "job_description": "Looking for backend developer skilled in Python, FastAPI, AWS..."
}
```

**Response:**

```json
{
  "similarity_score": 92,
  "matched_skills": ["python", "aws"],
  "missing_skills": ["fastapi"]
}
```

---

## 🧪 Run Tests

```bash
poetry run pytest -q
```

---

## 📌 Notes

* Skills list can be expanded via `skills.json`.
* `model_weights/` is **ignored in Git** (too large, handled separately).
* To integrate, the **Node.js backend** should call these APIs from `analysis.service.js`.

---



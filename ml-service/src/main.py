# backend/ml-service/src/main.py

from fastapi import FastAPI
from src.api.routes import resume

app = FastAPI(title="ML Resume Service")

# Register routes
app.include_router(resume.router, prefix="/resume", tags=["Resume Analysis"])

@app.get("/")
def root():
    return {"message": "ML Resume Service is running 🚀"}

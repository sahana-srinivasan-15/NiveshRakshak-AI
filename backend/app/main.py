from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="NiveshRakshak AI API",
    description="Investor Safety Copilot for SANGYAN Hackathon (SNTC, IIT BHU Varanasi & SEBI/NSDL)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "app": "NiveshRakshak AI",
        "tagline": "Before You Trust. Check with AI.",
        "status": "active",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

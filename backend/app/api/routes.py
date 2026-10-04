from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, List
from app.models.schemas import (
    AnalyzeRequest, AnalyzeResponse,
    ExplainRequest, ExplainResponse,
    ClaimCheckRequest, ClaimCheckResponse,
    GrievanceSituation, GrievanceResponse,
    DemoScenario
)
from app.core.ai_service import ai_service
from app.core.ocr_service import extract_text_from_image
from app.core.grievance_guide import get_grievance_guide
from app.data.demo_scenarios import DEMO_SCENARIOS

router = APIRouter(prefix="/api")

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_message_endpoint(req: AnalyzeRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    result = await ai_service.analyze_message(req.text, context=req.context, language=req.language or "en")
    return result

@router.post("/analyze-image")
async def analyze_image_endpoint(file: UploadFile = File(...), language: Optional[str] = Form("en")):
    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    
    extracted_text, boxes = extract_text_from_image(contents, filename=file.filename or "")
    result = await ai_service.analyze_message(extracted_text, context="image_ocr", language=language or "en")
    
    # Return both the standard analysis response and OCR metadata
    res_dict = result.model_dump()
    res_dict["ocr_boxes"] = boxes
    return res_dict

@router.post("/explain", response_model=ExplainResponse)
async def explain_text_endpoint(req: ExplainRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    return await ai_service.explain_text(req.text, language=req.language or "en")

@router.post("/check-claim", response_model=ClaimCheckResponse)
async def check_claim_endpoint(req: ClaimCheckRequest):
    if not req.claim_text or not req.claim_text.strip():
        raise HTTPException(status_code=400, detail="Claim text cannot be empty.")
    return await ai_service.check_claim(req.claim_text)

@router.post("/grievance-guide", response_model=GrievanceResponse)
async def grievance_guide_endpoint(req: GrievanceSituation):
    return get_grievance_guide(req.situation_id)

@router.get("/scenarios", response_model=List[DemoScenario])
async def list_demo_scenarios():
    return DEMO_SCENARIOS

@router.get("/dashboard/stats")
async def get_dashboard_stats():
    return {
        "scans_completed": 1482,
        "critical_alerts": 412,
        "high_alerts": 538,
        "caution_alerts": 364,
        "low_alerts": 168,
        "top_patterns": [
            {"pattern": "Guaranteed Returns", "count": 784, "percentage": 52.9, "severity": "critical"},
            {"pattern": "Fake SEBI / Regulatory Claims", "count": 622, "percentage": 41.9, "severity": "critical"},
            {"pattern": "Urgency & Artificial Scarcity", "count": 589, "percentage": 39.7, "severity": "high"},
            {"pattern": "Personal UPI / Account Demands", "count": 510, "percentage": 34.4, "severity": "critical"},
            {"pattern": "Suspicious Phishing URLs", "count": 443, "percentage": 29.8, "severity": "high"},
            {"pattern": "Credential & OTP Solicitations", "count": 289, "percentage": 19.5, "severity": "critical"}
        ],
        "sources_breakdown": [
            {"source": "WhatsApp", "count": 632, "share": 42.6},
            {"source": "Telegram", "count": 481, "share": 32.4},
            {"source": "Instagram / Social Ads", "count": 245, "share": 16.5},
            {"source": "SMS / Unsolicited Call", "count": 124, "share": 8.5}
        ]
    }

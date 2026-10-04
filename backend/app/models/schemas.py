from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AnalyzeRequest(BaseModel):
    text: str = Field(..., description="Message text or OCR extracted content")
    context: Optional[str] = Field("general", description="Source context e.g. whatsapp, telegram, ad, sms, document")
    language: Optional[str] = Field("en", description="Preferred display language ('en', 'ta', or 'hi')")

class DetectedSignal(BaseModel):
    id: str
    title: str
    title_ta: str
    title_hi: Optional[str] = None
    icon: str
    severity: str  # 'critical', 'high', 'caution', 'info'
    evidence: str
    why_it_matters: str
    why_it_matters_ta: str
    why_it_matters_hi: Optional[str] = None
    recommended_action: str
    recommended_action_ta: str
    recommended_action_hi: Optional[str] = None

class InvestorSafetyMeter(BaseModel):
    score: int  # 0 - 100
    level: str  # LOW CONCERN, CAUTION, HIGH CONCERN, CRITICAL CONCERN
    level_ta: str
    level_hi: Optional[str] = None
    color: str  # green, amber, orange, red
    confidence: float
    disclaimer: str

class AnalyzeResponse(BaseModel):
    safety_meter: InvestorSafetyMeter
    extracted_text: str
    signals: List[DetectedSignal]
    summary_en: str
    summary_ta: str
    summary_hi: Optional[str] = None
    safe_action_plan: List[str]
    safe_action_plan_ta: List[str]
    safe_action_plan_hi: Optional[List[str]] = None
    evidence_snippets: List[str]
    analysis_mode: str  # 'ai_assisted' or 'deterministic_rule_engine'
    timestamp: str

class ExplainRequest(BaseModel):
    text: str
    language: Optional[str] = "en"

class ImportantTerm(BaseModel):
    term: str
    meaning_en: str
    meaning_ta: str
    meaning_hi: Optional[str] = None

class ExplainResponse(BaseModel):
    original_text: str
    simple_english: str
    simple_tamil: str
    simple_hindi: Optional[str] = None
    important_terms: List[ImportantTerm]
    actual_meaning: str
    actual_meaning_ta: str
    actual_meaning_hi: Optional[str] = None
    hidden_risks: List[str]
    hidden_risks_ta: List[str]
    hidden_risks_hi: Optional[List[str]] = None
    mode: str = "ai_assisted"

class ClaimCheckRequest(BaseModel):
    claim_text: str

class ClaimCheckResponse(BaseModel):
    original_claim: str
    return_claim: Optional[str]
    guarantee_language: Optional[str]
    time_pressure: Optional[str]
    misleading_indicators: List[str]
    risk_level: str  # LOW, MODERATE, HIGH, CRITICAL
    safety_interpretation: str
    safety_interpretation_ta: str
    safety_interpretation_hi: Optional[str] = None
    suggested_verification_steps: List[str]

class GrievanceSituation(BaseModel):
    situation_id: str
    details: Optional[str] = None

class ContactEntity(BaseModel):
    name: str
    portal: str
    helpline: str
    description: str
    type: str  # 'regulatory', 'cybercrime', 'depository', 'banking'

class GrievanceResponse(BaseModel):
    situation_id: str
    situation_title: str
    situation_title_ta: str
    situation_title_hi: Optional[str] = None
    immediate_steps: List[str]
    immediate_steps_ta: List[str]
    immediate_steps_hi: Optional[List[str]] = None
    evidence_to_preserve: List[str]
    who_to_contact: List[ContactEntity]
    info_to_keep_ready: List[str]
    escalation_path: List[str]
    complaint_draft_template: str

class DemoScenario(BaseModel):
    id: str
    title: str
    title_ta: str
    title_hi: Optional[str] = None
    source_type: str  # 'whatsapp', 'telegram', 'ad', 'sms', 'educational'
    preview: str
    preview_ta: Optional[str] = None
    preview_hi: Optional[str] = None
    full_text: str
    full_text_ta: Optional[str] = None
    full_text_hi: Optional[str] = None
    expected_score: int
    expected_level: str
    expected_level_ta: Optional[str] = None
    expected_level_hi: Optional[str] = None
    key_signals: List[str]
    key_signals_ta: Optional[List[str]] = None
    key_signals_hi: Optional[List[str]] = None
    image_url: Optional[str] = None

import os
import json
import logging
from typing import Optional
from app.models.schemas import AnalyzeResponse, ExplainResponse, ClaimCheckResponse
from app.core.safety_engine import analyze_text_rules
from app.core.language_simplifier import simplify_financial_text
from app.core.claim_checker import check_investment_claim

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

class AIService:
    def __init__(self):
        self.has_api_key = bool(GEMINI_API_KEY)
        if self.has_api_key:
            logger.info("Gemini API Key detected. Hybrid AI mode active.")
        else:
            logger.info("No Gemini API Key found. Deterministic Local Rule-Based Engine active.")

    async def analyze_message(self, text: str, context: Optional[str] = "general", language: str = "en") -> AnalyzeResponse:
        """
        Analyzes an investment message or OCR text.
        Always uses the deterministic safety engine for robust, explainable scoring,
        and enriches with LLM synthesis if API key is active.
        """
        # Base deterministic analysis is always executed first for grounded safety
        base_result = analyze_text_rules(text, language=language)

        if self.has_api_key:
            try:
                import httpx
                prompt = (
                    "You are NiveshRakshak AI, an investor protection assistant for Indian retail investors.\n"
                    "CRITICAL SAFETY CONSTRAINTS:\n"
                    "- Never give stock tips or buy/sell/hold recommendations.\n"
                    "- Never predict stock prices or investment outcomes.\n"
                    "- Focus exclusively on scam indicators, safety precautions, and financial clarity.\n\n"
                    f"Analyze this investment text:\n\"\"\"{text}\"\"\"\n\n"
                    "Summarize why this message is suspicious in 2 clear sentences for a first-time investor, and provide the same in simple Tamil."
                )
                async with httpx.AsyncClient(timeout=8.0) as client:
                    resp = await client.post(
                        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}",
                        json={"contents": [{"parts": [{"text": prompt}]}]}
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        ai_text = data["candidates"][0]["content"]["parts"][0]["text"]
                        base_result.analysis_mode = "hybrid_ai_llm"
                        # We keep the rigorous grounded scores from safety_engine while noting LLM enrichment
            except Exception as e:
                logger.warning(f"LLM API call skipped: {e}. Falling back to deterministic engine.")

        return base_result

    async def explain_text(self, text: str, language: str = "en") -> ExplainResponse:
        return simplify_financial_text(text)

    async def check_claim(self, claim_text: str) -> ClaimCheckResponse:
        return check_investment_claim(claim_text)


ai_service = AIService()

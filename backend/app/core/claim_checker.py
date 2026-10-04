import re
from typing import Optional, List
from app.models.schemas import ClaimCheckResponse

def check_investment_claim(claim_text: str) -> ClaimCheckResponse:
    text = claim_text.strip()
    lower = text.lower()

    # 1. Return claim extraction
    return_match = re.search(r'(\b\d{1,3}%\s*(?:returns?|profit|gain|roi|monthly|weekly|daily|yearly|p\.a\.)?\b|\bdouble\s*(?:your)?\s*money\b|\b2x|\b3x|\b10x)', lower)
    return_claim = return_match.group(0).strip() if return_match else None

    # 2. Guarantee language extraction
    guarantee_match = re.search(r'\b(guaranteed|assured|sure[\s-]?shot|100%\s*guarantee|no\s*loss|risk[\s-]?free|zero\s*risk|fixed\s*return)\b', lower)
    guarantee_language = guarantee_match.group(0).strip() if guarantee_match else None

    # 3. Time horizon / pressure
    time_match = re.search(r'\b(in\s*\d+\s*(?:days?|weeks?|months?|hours?)|daily|per\s*day|per\s*month|monthly|within\s*\d+\s*(?:days?|hours?)|today)\b', lower)
    time_pressure = time_match.group(0).strip() if time_match else None

    # 4. Misleading signals
    misleading: List[str] = []
    if guarantee_language and return_claim:
        misleading.append("Combines specific high return promise with absolute guarantee language.")
    elif guarantee_language:
        misleading.append("Promising guaranteed returns is prohibited for market-linked investments under SEBI regulations.")

    if re.search(r'\b(sebi\s*approved|nsdl\s*certified|govt\s*approved)\b', lower):
        misleading.append("Uses regulatory names (SEBI/NSDL/Govt) to manufacture false credibility.")

    if re.search(r'\b(ai\s*(?:trading|bot|platform|algorithm)|secret\s*formula|insider)\b', lower):
        misleading.append("Claims proprietary 'AI Bot' or 'secret algorithm' eliminates market risk.")

    if re.search(r'\b(only\s*\d+\s*slots?|hurry|closing|before\s*\d+)\b', lower):
        misleading.append("Applies psychological urgency or artificial scarcity.")

    # 5. Risk Level Calculation
    risk_score = 0
    if guarantee_language:
        risk_score += 45
    if return_claim:
        # Check if unrealistic (e.g. > 15% per year or any monthly claim)
        if any(w in lower for w in ["monthly", "daily", "week", "double", "30%", "40%", "50%", "100%"]):
            risk_score += 40
        else:
            risk_score += 15
    if time_pressure:
        risk_score += 15
    if len(misleading) > 1:
        risk_score += 20

    if risk_score >= 70:
        risk_level = "CRITICAL"
        interpretation_en = (
            "High-risk claim requiring urgent independent verification. "
            "Promising guaranteed fixed returns on equity or automated trading violates SEBI regulatory guidelines. "
            "Do not transfer capital based on this claim."
        )
        interpretation_ta = (
            "மிக அதிக ஆபத்துள்ள வாக்குறுதி. பங்குச்சந்தை அல்லது வர்த்தகத்தில் நிலையான லாபத்தை உறுதியளிப்பது SEBI விதிகளுக்கு எதிரானது. "
            "இந்த வாக்குறுதியை நம்பி எவருக்கும் பணம் அனுப்பாதீர்கள்."
        )
        interpretation_hi = (
            "अत्यधिक जोखिम भरा दावा जिसके लिए तत्काल स्वतंत्र सत्यापन आवश्यक है। "
            "शेयर बाजार या स्वचालित ट्रेडिंग में निश्चित गारंटीड रिटर्न का वादा करना सेबी (SEBI) नियमों का उल्लंघन है। "
            "इस दावे के आधार पर किसी को पैसे न भेजें।"
        )
    elif risk_score >= 40:
        risk_level = "HIGH"
        interpretation_en = (
            "Concerning claim detected. High return expectations without explicit disclosure of capital risk indicators "
            "require strict independent verification with registered intermediaries."
        )
        interpretation_ta = (
            "கவனிக்கத்தக்க ஆபத்துக் காரணி. அசல் பண இழப்பு அபாயத்தை மறைத்து லாபத்தை மட்டும் முன்னிலைப்படுத்துவது எச்சரிக்கைக்குரியது."
        )
        interpretation_hi = (
            "चिंताजनक दावा मिला। मूल पूंजी के नुकसान के जोखिम को बताए बिना उच्च रिटर्न का वादा "
            "पंजीकृत मध्यस्थों के साथ कड़े स्वतंत्र सत्यापन की मांग करता है।"
        )
    elif risk_score >= 20:
        risk_level = "MODERATE"
        interpretation_en = (
            "Moderate caution advised. Verify whether the offering entity is a SEBI-registered Research Analyst or Portfolio Manager."
        )
        interpretation_ta = (
            "மிதமான எச்சரிக்கை தேவை. ஆலோசனை வழங்கும் நபர் SEBI-யில் பதிவு செய்துள்ளாரா எனச் சரிபார்க்கவும்."
        )
        interpretation_hi = (
            "मध्यम सावधानी आवश्यक है। जाँचें कि क्या पेशकश करने वाली संस्था SEBI पंजीकृत रिसर्च एनालिस्ट या पोर्टफोलियो मैनेजर है।"
        )
    else:
        risk_level = "LOW"
        interpretation_en = (
            "No aggressive guarantee or misleading claims detected. Standard market risk disclosures apply."
        )
        interpretation_ta = (
            "ஆபத்தான வாக்குறுதிகள் கண்டறியப்படவில்லை. சாதாரண சந்தை இடர் விதிகளுக்கு உட்பட்டது."
        )
        interpretation_hi = (
            "कोई आक्रामक गारंटी या भ्रामक दावा नहीं मिला। मानक बाजार जोखिम नियम लागू होते हैं।"
        )

    verification_steps = [
        "Check entity registration on official SEBI database (sebi.gov.in -> Recognised Intermediaries).",
        "Demand written Risk Disclosure Document before committing any funds.",
        "Refuse any request to transfer money into an individual's personal savings or UPI account.",
        "Remember: Even top-performing mutual funds fluctuate with markets and cannot guarantee returns."
    ]

    return ClaimCheckResponse(
        original_claim=text,
        return_claim=return_claim,
        guarantee_language=guarantee_language,
        time_pressure=time_pressure,
        misleading_indicators=misleading,
        risk_level=risk_level,
        safety_interpretation=interpretation_en,
        safety_interpretation_ta=interpretation_ta,
        safety_interpretation_hi=interpretation_hi,
        suggested_verification_steps=verification_steps
    )

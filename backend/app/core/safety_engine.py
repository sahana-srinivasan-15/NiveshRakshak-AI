import re
from typing import List, Dict, Any, Tuple
from app.models.schemas import DetectedSignal, InvestorSafetyMeter, AnalyzeResponse
import datetime

RULES = [
    {
        "id": "guaranteed_returns",
        "title": "Guaranteed or Assured Returns",
        "title_ta": "உறுதியளிக்கப்பட்ட வருமானம் (Guaranteed Returns)",
        "title_hi": "गारंटीड रिटर्न (Guaranteed Returns)",
        "icon": "ShieldAlert",
        "severity": "critical",
        "weight": 35,
        "patterns": [
            r"\b(?:guaranteed|assured|sure[\s-]?shot|100%\s*guarantee|fixed\s*return|zero\s*risk|risk[\s-]?free)\b",
            r"\b(?:guarantee\s*return|guaranteed\s*profit|no\s*loss)\b",
            r"\b(?:100%\s*safe\s*investment)\b",
            r"गारंटी|निश्चित\s*रिटर्न|बिना\s*जोखिम|सुरक्षित\s*निवेश"
        ],
        "why_it_matters": "Legitimate market-linked investments (stocks, mutual funds) inherently fluctuate and cannot guarantee profits. SEBI explicitly prohibits intermediaries from promising fixed or guaranteed returns.",
        "why_it_matters_ta": "பங்குச்சந்தை மற்றும் மியூச்சுவல் ஃபண்ட் முதலீடுகளில் லாபத்தை ஒருபோதும் 100% உறுதியாகக் கூற முடியாது. SEBI விதிமுறைகளின்படி எவரும் நிலையான லாபத்தை உறுதி அளிக்கக் கூடாது.",
        "why_it_matters_hi": "बाजार से जुड़े वास्तविक निवेश (शेयर, म्यूचुअल फंड) में उतार-चढ़ाव होता है और इनमें मुनाफे की गारंटी नहीं दी जा सकती। SEBI नियमों के तहत गारंटीड रिटर्न का वादा करना पूरी तरह प्रतिबंधित है।",
        "recommended_action": "Do not commit funds. Ask for SEBI registration certificate and verify it on the official SEBI directory.",
        "recommended_action_ta": "பணம் அனுப்ப வேண்டாம். SEBI பதிவுச் சான்றிதழைப் பெற்று, அதிகாரப்பூர்வ SEBI தளத்தில் சரிபார்க்கவும்.",
        "recommended_action_hi": "पैसे न भेजें। SEBI पंजीकरण प्रमाणपत्र माँगें और आधिकारिक SEBI पोर्टल (sebi.gov.in) पर उसकी पुष्टि करें।"
    },
    {
        "id": "unrealistic_returns",
        "title": "Unrealistic Return Claims (Double Money / Sky-high ROI)",
        "title_ta": "நம்பமுடியாத அதிக லாப வாக்குறுதி",
        "title_hi": "अवास्तविक रिटर्न का दावा (पैसा दोगुना / अत्यधिक लाभ)",
        "icon": "TrendingUp",
        "severity": "critical",
        "weight": 30,
        "patterns": [
            r"\b(?:double\s*(?:your)?\s*money|2x\s*in\s*\d+|triple\s*money|10x|100x)\b",
            r"\b(?:\d{2,3}%\s*(?:monthly|weekly|daily|per\s*month|per\s*day))\b",
            r"\b(?:30%|40%|50%|100%|200%|300%|500%)\s*(?:monthly|return|profit|gain)\b",
            r"पैसा\s*दोगुना|30%\s*रिटर्न|40%\s*रिटर्न|दोगुना"
        ],
        "why_it_matters": "Extraordinary returns (e.g. 20-50% per month) mathematically exceed any legitimate financial instrument in the world. Such claims are standard indicators of Ponzi or advance-fee scams.",
        "why_it_matters_ta": "மாதந்தோறும் 20% முதல் 50% வரை அசாதாரண லாபம் என்பது சாத்தியமற்றது. இது போன்ற வாக்குறுதிகள் பொதுமக்களை ஏமாற்றும் திட்டங்களில் பயன்படுத்தப்படுகின்றன.",
        "why_it_matters_hi": "प्रति माह 20-50% जैसा असामान्य रिटर्न दुनिया के किसी भी वास्तविक वित्तीय साधन में संभव नहीं है। ऐसे दावे पोंजी स्कीम या धोखाधड़ी का स्पष्ट संकेत होते हैं।",
        "recommended_action": "Pause immediately. Understand that high return claims without corresponding transparent market risk disclosures are major red flags.",
        "recommended_action_ta": "உடனடியாக எச்சரிக்கையாக இருங்கள். அதீத லாப வாக்குறுதிகள் பெரும்பாலும் ஏமாற்று வேலையாகவே இருக்கும்.",
        "recommended_action_hi": "तुरंत रुकें। समझें कि बिना किसी जोखिम प्रकटीकरण के उच्च रिटर्न का दावा एक बड़ा चेतावनी संकेत (Red Flag) है।"
    },
    {
        "id": "urgency_scarcity",
        "title": "Urgency & Artificial Scarcity Tactics",
        "title_ta": "அவசரப்படுத்தும் தந்திரங்கள் (Urgency & Limited Slots)",
        "title_hi": "तुरंत भुगतान का दबाव (Urgency & Limited Slots)",
        "icon": "Clock",
        "severity": "high",
        "weight": 20,
        "patterns": [
            r"\b(?:only\s*\d+\s*slots?\s*left|limited\s*time\s*offer|offer\s*expires|hurry\s*up|act\s*now|pay\s*today|before\s*\d+\s*(?:pm|am))\b",
            r"\b(?:last\s*chance|closing\s*soon|within\s*\d+\s*(?:minutes|hours))\b",
            r"\b(?:instant\s*activation|seats?\s*filling\s*fast)\b",
            r"सीमित\s*स्लॉट|तुरंत\s*भेजें|अभी\s*सक्रिय|जल्दी\s*करें|अंतिम\s*अवसर"
        ],
        "why_it_matters": "Scammers create artificial psychological panic so victims don't take time to consult family, verify credentials, or consult SEBI databases.",
        "why_it_matters_ta": "முதலீட்டாளர்கள் சுயமாக யோசிக்கவோ, குடும்பத்தினருடன் பேசவோ அல்லது அதிகாரப்பூர்வமாக சரிபார்க்கவோ நேரம் தராமல் அவசரப்படுத்துவது மோசடிக்காரர்களின் முக்கிய தந்திரம்.",
        "why_it_matters_hi": "जल्दबाजी का दबाव इसलिए बनाया जाता है ताकि निवेशक परिवार से सलाह न ले सकें या SEBI पोर्टल पर सत्यापन न कर सकें।",
        "recommended_action": "Never make financial transfers under time pressure. Legitimate regulated investments do not vanish in 15 minutes.",
        "recommended_action_ta": "அவசரத்தில் எவருக்கும் பணம் அனுப்பாதீர்கள். நியாயமான முதலீடுகள் சில நிமிடங்களில் மறைந்துவிடாது.",
        "recommended_action_hi": "दबाव में आकर कभी भी पैसे ट्रांसफर न करें। वास्तविक कानूनी निवेश 15 मिनट में गायब नहीं होते।"
    },
    {
        "id": "personal_account_upi",
        "title": "Personal Account / Direct UPI Payment Request",
        "title_ta": "தனிநபர் கணக்கு / UPI-க்கு பணம் கோருதல்",
        "title_hi": "व्यक्तिगत खाता / सीधे UPI पर भुगतान की माँग",
        "icon": "CreditCard",
        "severity": "critical",
        "weight": 35,
        "patterns": [
            r"\b(?:gpay|phonepe|paytm|upi\s*id|personal\s*account|saving(?:s)?\s*account)\b.*?(?:pay|transfer|send|deposit)",
            r"(?:pay|transfer|send|deposit).*?\b(?:₹\s*[\d,]+|\d+\s*(?:inr|rs|rupees))\b.*?\b(?:today|now|immediately|account|upi)\b",
            r"\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|apl|ibl)\b",
            r"तुरंत\s*₹[\d,]+\s*भेजें|खाता\s*सक्रिय\s*करने|UPI\s*पर\s*भेजें"
        ],
        "why_it_matters": "SEBI registered brokers and funds collect client funds exclusively in designated corporate client bank accounts, NEVER in personal saving accounts or individual UPI IDs.",
        "why_it_matters_ta": "SEBI அங்கீகாரம் பெற்ற நிறுவனங்கள் ஒருபோதும் தனிநபர் சேமிப்புக் கணக்கிலோ அல்லது தனிநபர் UPI முகவரியிலோ முதலீட்டுப் பணத்தை வாங்காது.",
        "why_it_matters_hi": "SEBI पंजीकृत ब्रोकर या फंड केवल अधिकृत कॉर्पोरेट खातों में ही धन स्वीकार करते हैं, कभी भी व्यक्तिगत बचत खाते या निजी UPI ID पर नहीं।",
        "recommended_action": "Strictly do NOT send money. Verified brokers only receive funds through linked trading bank accounts or authenticated netbanking gateways.",
        "recommended_action_ta": "தனிநபர் பெயருக்கு ஒருபோதும் பணம் அனுப்பாதீர்கள். அதிகாரப்பூர்வ வர்த்தகக் கணக்கு மூலமே பணம் செலுத்தப்பட வேண்டும்.",
        "recommended_action_hi": "व्यक्तिगत नाम पर बिल्कुल पैसे न भेजें। अधिकृत ब्रोकर केवल लिंक किए गए डीमैट ट्रेडिंग बैंक खाते से ही राशि लेते हैं।"
    },
    {
        "id": "fake_regulatory_claim",
        "title": "Fake Regulatory Claim or SEBI/NSDL Impersonation",
        "title_ta": "போலி SEBI / NSDL ஒழுங்குமுறை உரிமைகோரல்",
        "title_hi": "फर्जी विनियामक दावा या SEBI/NSDL का नाम लेना",
        "icon": "Award",
        "severity": "critical",
        "weight": 35,
        "patterns": [
            r"\b(?:sebi\s*approved\s*(?:ai|bot|plan|scheme|club|trader|returns))\b",
            r"\b(?:nsdl\s*certified\s*(?:scheme|profit|crypto))\b",
            r"\b(?:official\s*sebi\s*(?:director|officer|partner|channel|group))\b",
            r"\b(?:govt\s*approved\s*trading\s*bot)\b",
            r"\b(?:sebi\s*guaranteed)\b",
            r"SEBI\s*स्वीकृत|SEBI\s*प्रमाणित|सरकार\s*मान्यता\s*प्राप्त"
        ],
        "why_it_matters": "SEBI regulates securities markets and registers intermediaries, but NEVER 'approves' specific trading schemes, AI bots, Telegram groups, or guarantees profits.",
        "why_it_matters_ta": "SEBI சந்தையை மட்டுமே ஒழுங்குபடுத்துகிறது. அது எந்த ஒரு குறிப்பிட்ட AI பாட், டெலிகிராம் குழு அல்லது முதலீட்டுத் திட்டத்திற்கும் தனிப்பட்ட ஒப்புதல் அளிக்காது.",
        "why_it_matters_hi": "SEBI बाजार का नियमन करती है, लेकिन वह कभी भी किसी विशेष ट्रेडिंग स्कीम, AI बॉट, टेलीग्राम ग्रुप या मुनाफे को 'स्वीकृत' या गारंटी नहीं देती।",
        "recommended_action": "Verify any alleged registration number directly at sebi.gov.in under 'Recognised Intermediaries'. Do not trust certificates forwarded on social media.",
        "recommended_action_ta": "கூறப்படும் பதிவு எண்ணை sebi.gov.in இணையதளத்தில் நேரடியாகச் சரிபார்க்கவும். வாட்ஸ்அப்பில் வரும் சான்றிதழ்களை நம்பாதீர்கள்.",
        "recommended_action_hi": "कथित पंजीकरण संख्या को सीधे sebi.gov.in पर 'Recognised Intermediaries' में सत्यापित करें।"
    },
    {
        "id": "credential_otp_request",
        "title": "Request for OTP, PIN, Password, or Banking Credentials",
        "title_ta": "OTP / கடவுச்சொல் / PIN கேட்கும் ஆபத்து",
        "title_hi": "OTP, PIN, पासवर्ड या बैंकिंग विवरण माँगना",
        "icon": "KeyRound",
        "severity": "critical",
        "weight": 40,
        "patterns": [
            r"\b(?:share\s*otp|enter\s*pin|send\s*password|login\s*credentials|verification\s*code|netbanking\s*password)\b",
            r"\b(?:provide\s*otp|forward\s*the\s*sms|card\s*cvv)\b",
            r"OTP\s*साझा\s*करें|OTP\s*भेजें|पासवर्ड\s*बताएँ"
        ],
        "why_it_matters": "No legitimate financial institution, exchange, SEBI, or depository official will EVER ask for your OTP, MPIN, trading password, or CVV.",
        "why_it_matters_ta": "எந்தவொரு வங்கியோ அல்லது SEBI அதிகாரியோ உங்கள் OTP, PIN அல்லது கடவுச்சொல்லை ஒருபோதும் கேட்க மாட்டார்கள்.",
        "why_it_matters_hi": "कोई भी वैध बैंक, SEBI या वित्तीय संस्थान कभी भी आपका OTP, MPIN, ट्रेडिंग पासवर्ड या CVV नहीं माँगता।",
        "recommended_action": "Never share OTP or PIN under any circumstance. If shared, immediately block your bank account and card via netbanking or call 1930.",
        "recommended_action_ta": "எந்த காரணத்திற்காகவும் OTP-யை பகிர வேண்டாம். தவறுதலாகப் பகிர்ந்திருந்தால் உடனடியாக வங்கிக்குத் தகவல் தெரிவிக்கவும்.",
        "recommended_action_hi": "किसी भी परिस्थिति में OTP या PIN साझा न करें। यदि साझा किया है, तो तुरंत 1930 पर कॉल करें और बैंक खाता ब्लॉक करें।"
    },
    {
        "id": "suspicious_links",
        "title": "Suspicious URL / Unofficial Link / Phishing Domain",
        "title_ta": "சந்தேகத்திற்குரிய இணைய இணைப்பு (Suspicious Link)",
        "title_hi": "संदिग्ध लिंक या अनधिकृत फ़िशिंग डोमेन",
        "icon": "ExternalLink",
        "severity": "high",
        "weight": 25,
        "patterns": [
            r"(?:https?:\/\/)?(?:bit\.ly|tinyurl\.com|t\.me\/|wa\.me\/|cutt\.ly|is\.gd|rb\.gy)\/[a-zA-Z0-9_\-]+",
            r"(?:https?:\/\/)?[a-zA-Z0-9\-]+\.(?:xyz|top|club|vip|buzz|live|online|cc|work|click)\b",
            r"(?:https?:\/\/)?[a-zA-Z0-9\-]+(?:sebi|nsdl|bse|nse)[a-zA-Z0-9\-]*\.(?:com|org|net|in)"
        ],
        "why_it_matters": "Shortened or typosquatted URLs often route investors to fake clone portals designed to steal banking credentials or siphon deposits.",
        "why_it_matters_ta": "சுருக்கப்பட்ட அல்லது போலியான இணைய இணைப்புகள் உங்கள் வங்கி விவரங்களைத் திருடும் போலி இணையதளங்களுக்கு அழைத்துச் செல்லலாம்.",
        "why_it_matters_hi": "छोटे किए गए या मिलते-जुलते नाम वाले लिंक निवेशकों को क्लोन वेबसाइटों पर ले जाते हैं ताकि बैंक क्रेडेंशियल चुराए जा सकें।",
        "recommended_action": "Do not click unverified links. Access official services solely by typing the authentic domain (e.g. sebi.gov.in, nsdl.co.in) into your browser.",
        "recommended_action_ta": "தெரியாத இணைப்புகளை கிளிக் செய்யாதீர்கள். அதிகாரப்பூர்வ தளங்களை உலாவியில் நேரடியாக தட்டச்சு செய்து பார்வையிடவும்.",
        "recommended_action_hi": "अज्ञात लिंक पर क्लिक न करें। हमेशा ब्राउज़र में प्रामाणिक डोमेन (जैसे sebi.gov.in) स्वयं टाइप करके ही पोर्टल खोलें।"
    },
    {
        "id": "unregistered_advisor",
        "title": "Unregistered Tip Provider / Insider Leak Claim",
        "title_ta": "பதிவு செய்யப்படாத பங்குச்சந்தை ஆலோசகர்",
        "title_hi": "गैर-पंजीकृत सलाहकार / इनसाइडर टिप का दावा",
        "icon": "AlertTriangle",
        "severity": "high",
        "weight": 20,
        "patterns": [
            r"\b(?:insider\s*(?:leak|tip|info)|100%\s*sure\s*call|jackpot\s*share|multibagger\s*leak|pump\s*(?:and|&)\s*dump)\b",
            r"\b(?:vip\s*trading\s*channel|vip\s*group|exclusive\s*calls|operator\s*stock)\b"
        ],
        "why_it_matters": "SEBI strictly mandates that only SEBI Registered Investment Advisers (RIA) or Research Analysts (RA) may provide research. Unregulated tip channels frequently run pump-and-dump manipulation.",
        "why_it_matters_ta": "SEBI-யில் பதிவு செய்த ஆலோசகர்கள் மட்டுமே பரிந்துரைகள் வழங்க முடியும். சமூக ஊடகங்களில் வரும் 'ஜாக்பாட்' பரிந்துரைகள் மோசடியானவை.",
        "why_it_matters_hi": "SEBI केवल पंजीकृत सलाहकारों (RIA) या विश्लेषकों (RA) को ही शोध और सिफारिशें देने की अनुमति देता है। सोशल मीडिया पर गैर-पंजीकृत चैनल निवेशकों को फँसाते हैं।",
        "recommended_action": "Check the adviser's SEBI registration number against the SEBI Registered Intermediaries portal before acting on any advice.",
        "recommended_action_ta": "எந்தவொரு ஆலோசனையையும் ஏற்கும் முன், ஆலோசகர் SEBI-யில் முறையாகப் பதிவு செய்யப்பட்டுள்ளாரா என்பதைச் சரிபார்க்கவும்.",
        "recommended_action_hi": "किसी भी सलाह पर अमल करने से पहले SEBI पोर्टल पर सलाहकार की पंजीकरण संख्या अवश्य जाँचें।"
    }
]

LEGITIMATE_INDICATORS = [
    r"\binvestments?\s*(?:are)?\s*subject\s*to\s*market\s*risks?\b",
    r"\bread\s*all\s*scheme[\s-]related\s*documents?\s*carefully\b",
    r"\bpast\s*performance\s*(?:is\s*not|does\s*not\s*guarantee)\b",
    r"\bmutual\s*funds?\s*do\s*not\s*guarantee\b",
    r"\bamfi\s*registered\b",
    r"\bnav\s*(?:can|may)\s*(?:go\s*up|fluctuate)\b"
]


def extract_evidence(text: str, patterns: List[str]) -> str:
    """Finds exact matching phrase or sentence snippet in the text."""
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            # Try to grab surrounding sentence or line
            start = max(0, text.rfind('\n', 0, match.start()) + 1)
            end = text.find('\n', match.end())
            if end == -1:
                end = len(text)
            snippet = text[start:end].strip()
            if len(snippet) > 160:
                # Truncate nicely
                s_start = max(0, match.start() - 30)
                s_end = min(len(text), match.end() + 50)
                snippet = "..." + text[s_start:s_end].strip() + "..."
            return snippet
    return ""


def analyze_text_rules(text: str, language: str = "en") -> AnalyzeResponse:
    detected_signals: List[DetectedSignal] = []
    total_score = 0
    raw_snippets: List[str] = []

    # Check for legitimate disclosure signals
    legit_matches = 0
    for pat in LEGITIMATE_INDICATORS:
        if re.search(pat, text, re.IGNORECASE):
            legit_matches += 1

    # Check each suspicious rule
    for rule in RULES:
        matched = False
        for pat in rule["patterns"]:
            if re.search(pat, text, re.IGNORECASE):
                matched = True
                break
        
        if matched:
            evidence = extract_evidence(text, rule["patterns"])
            if evidence:
                raw_snippets.append(evidence)
            
            sig = DetectedSignal(
                id=rule["id"],
                title=rule["title"],
                title_ta=rule["title_ta"],
                title_hi=rule.get("title_hi"),
                icon=rule["icon"],
                severity=rule["severity"],
                evidence=evidence if evidence else "Pattern detected in text",
                why_it_matters=rule["why_it_matters"],
                why_it_matters_ta=rule["why_it_matters_ta"],
                why_it_matters_hi=rule.get("why_it_matters_hi"),
                recommended_action=rule["recommended_action"],
                recommended_action_ta=rule["recommended_action_ta"],
                recommended_action_hi=rule.get("recommended_action_hi")
            )
            detected_signals.append(sig)
            total_score += rule["weight"]

    # Offset score if legitimate disclosures are present
    if legit_matches >= 2 and total_score < 40:
        total_score = max(5, total_score - (legit_matches * 12))
    elif legit_matches >= 3 and total_score >= 40:
        total_score = max(20, total_score - 20)

    # If no suspicious signals and clean text
    if not detected_signals:
        if legit_matches > 0:
            final_score = 12
        else:
            final_score = 18
    else:
        final_score = min(98, max(25, total_score))

    # Determine safety level
    if final_score <= 30:
        level = "LOW CONCERN"
        level_ta = "குறைந்த கவலை (பாதுகாப்பானது)"
        level_hi = "कम चिंता (Low Concern)"
        color = "emerald"
    elif final_score <= 60:
        level = "CAUTION"
        level_ta = "எச்சரிக்கை தேவை (Caution)"
        level_hi = "सावधानी (Caution)"
        color = "amber"
    elif final_score <= 80:
        level = "HIGH CONCERN"
        level_ta = "அதிக கவலை (High Concern)"
        level_hi = "उच्च चिंता (High Concern)"
        color = "orange"
    else:
        level = "CRITICAL CONCERN"
        level_ta = "மிக தீவிரக் கவலை (Critical Concern)"
        level_hi = "गंभीर चिंता (Critical Concern)"
        color = "red"

    disclaimer = (
        "This score reflects risk indicators detected in the submitted content. "
        "It is not a legal or regulatory determination that the sender or investment is fraudulent. "
        "Always verify independently on official SEBI (sebi.gov.in) and NSDL registries."
    )

    safety_meter = InvestorSafetyMeter(
        score=final_score,
        level=level,
        level_ta=level_ta,
        level_hi=level_hi,
        color=color,
        confidence=0.92 if len(detected_signals) > 0 else 0.85,
        disclaimer=disclaimer
    )

    # Build safe action plan
    safe_plan_en = [
        "Pause before transferring any money or committing your savings.",
        "Verify the intermediary identity independently on the official SEBI Portal (sebi.gov.in) under Recognised Intermediaries.",
        "Never share OTP, PIN, passwords, or send funds to personal savings/UPI accounts.",
        "Preserve screenshots, message timestamps, sender handles, and bank transaction reference IDs (UTR).",
        "If you suspect fraud, report immediately to the National Cyber Crime Helpline (1930) or file on SEBI SCORES (scores.sebi.gov.in)."
    ]

    safe_plan_ta = [
        "பணம் அனுப்புவதற்கு அல்லது சேமிப்பை முதலீடு செய்வதற்கு முன் சிறிது நேரம் சிந்தித்து முடிவெடுக்கவும்.",
        "அதிகாரப்பூர்வ SEBI இணையதளத்தில் (sebi.gov.in) சம்பந்தப்பட்ட நிறுவனம் முறையாகப் பதிவு செய்யப்பட்டுள்ளதா எனச் சரிபார்க்கவும்.",
        "எந்த காரணத்திற்காகவும் OTP, PIN, கடவுச்சொற்களை பகிராதீர்கள்; தனிநபர் வங்கிக் கணக்குகளுக்குப் பணம் அனுப்பாதீர்கள்.",
        "ஆதாரங்களாக ஸ்கிரீன்ஷாட்கள், செய்தி அனுப்பியவரின் விவரங்கள் மற்றும் பணப்பரிவர்த்தனை எண்களை (UTR) பாதுகாத்து வைக்கவும்.",
        "மோசடி நடந்ததாக சந்தேகம் எழுந்தால், தேசிய சைபர் கிரைம் உதவி எண் 1930-க்கு அழைக்கவும் அல்லது SEBI SCORES தளத்தில் புகார் அளிக்கவும்."
    ]

    safe_plan_hi = [
        "पैसा ट्रांसफर करने या अपनी बचत लगाने से पहले कुछ समय रुकें।",
        "आधिकारिक SEBI पोर्टल (sebi.gov.in) पर संबंधित इकाई की पंजीकरण स्थिति की स्वतंत्र रूप से जाँच करें।",
        "कभी भी OTP, PIN, पासवर्ड साझा न करें या व्यक्तिगत बचत/UPI खातों में पैसे न भेजें।",
        "स्क्रीनशॉट, संदेश का समय, प्रेषक का नंबर और बैंक संदर्भ संख्या (UTR) सुरक्षित रखें।",
        "धोखाधड़ी का संदेह होने पर तुरंत राष्ट्रीय साइबर हेल्पलाइन (1930) पर कॉल करें या SEBI SCORES (scores.sebi.gov.in) पर शिकायत दर्ज करें।"
    ]

    # Summaries
    if final_score >= 80:
        sum_en = f"Critical risk indicators detected ({len(detected_signals)} major flags). The message exhibits classic patterns of aggressive unauthorized investment schemes with unrealistic promises."
        sum_ta = f"மிக ஆபத்தான காரணிகள் ({len(detected_signals)} எச்சரிக்கைகள்) கண்டறியப்பட்டுள்ளன. நம்பமுடியாத லாப வாக்குறுதிகள் மற்றும் தீவிர அவசரப்படுத்தும் தந்திரங்கள் இதில் உள்ளன."
        sum_hi = f"गंभीर जोखिम संकेतक मिले ({len(detected_signals)} प्रमुख चेतावनियाँ)। यह संदेश अवास्तविक वादों और अत्यधिक दबाव वाली अनधिकृत योजनाओं के पैटर्न दर्शाता है।"
    elif final_score >= 61:
        sum_en = f"High-concern signals detected ({len(detected_signals)} flags). Several elements require thorough independent verification before any financial engagement."
        sum_ta = f"அதிக எச்சரிக்கை தேவைப்படும் சமிக்ஞைகள் ({len(detected_signals)}) கண்டறியப்பட்டுள்ளன. எந்தவொரு பரிவர்த்தனையையும் செய்வதற்கு முன் முழுமையாகச் சரிபார்க்கவும்."
        sum_hi = f"उच्च चिंता वाले संकेत मिले ({len(detected_signals)} चेतावनियाँ)। किसी भी वित्तीय निर्णय से पहले स्वतंत्र सत्यापन अनिवार्य है।"
    elif final_score >= 31:
        sum_en = "Moderate risk indicators detected. Proceed with strict caution and verify regulatory credentials."
        sum_ta = "மிதமான எச்சரிக்கை காரணிகள் உள்ளன. கவனமாகச் செயல்பட்டு, நிறுவனத்தின் அங்கீகாரத்தை உறுதிப்படுத்தவும்."
        sum_hi = "मध्यम जोखिम संकेतक मिले। पूरी सावधानी बरतें और नियामक मान्यता की जाँच करें।"
    else:
        sum_en = "Low concern detected. The message follows standard financial communication patterns or educational guidelines with standard risk disclosures."
        sum_ta = "குறைந்த கவலை நிலை. இந்த தகவல் சாதாரண நிதி வழிகாட்டுதல்கள் மற்றும் இடர் எச்சரிக்கைகளுடன் கூடியதாக உள்ளது."
        sum_hi = "कम चिंता का स्तर। यह संदेश मानक वित्तीय संचार पैटर्न और जोखिम चेतावनियों के अनुरूप प्रतीत होता है।"

    return AnalyzeResponse(
        safety_meter=safety_meter,
        extracted_text=text,
        signals=detected_signals,
        summary_en=sum_en,
        summary_ta=sum_ta,
        summary_hi=sum_hi,
        safe_action_plan=safe_plan_en,
        safe_action_plan_ta=safe_plan_ta,
        safe_action_plan_hi=safe_plan_hi,
        evidence_snippets=raw_snippets,
        analysis_mode="deterministic_rule_engine",
        timestamp=datetime.datetime.now().isoformat()
    )

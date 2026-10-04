import re
from typing import List
from app.models.schemas import ExplainResponse, ImportantTerm

KNOWN_TERMS = {
    "market volatility": {
        "en": "How fast and unpredictably stock or fund prices rise and fall.",
        "ta": "பங்கு அல்லது நிதி விலைகள் எவ்வளவு வேகமாக மற்றும் எதிர்பாராதவிதமாக ஏறி இறங்குகின்றன என்பது."
    },
    "liquidity": {
        "en": "How easily and quickly your investment can be converted into ready cash without loss.",
        "ta": "உங்கள் முதலீட்டை எவ்வளவு எளிதாகவும் விரைவாகவும் ரொக்கப் பணமாக மாற்ற முடியும் என்பது."
    },
    "capital risk": {
        "en": "The danger that you might lose a portion or all of the original money you put in.",
        "ta": "நீங்கள் போட்ட அசல் பணத்தில் ஒரு பகுதியை அல்லது முழுவதையும் இழக்கும் ஆபத்து."
    },
    "exit load": {
        "en": "A small penalty fee charged by the mutual fund if you withdraw money before a set period.",
        "ta": "குறிப்பிட்ட காலத்திற்கு முன்பே முதலீட்டுப் பணத்தை எடுத்தால் விதிக்கப்படும் சிறிய அபராதக் கட்டணம்."
    },
    "nav": {
        "en": "Net Asset Value: The per-unit market price of a mutual fund scheme.",
        "ta": "மியூச்சுவல் ஃபண்டின் ஒரு யூனிட்டின் தற்போதைய சந்தை மதிப்பு."
    },
    "derivatives": {
        "en": "High-risk trading contracts (Futures & Options) where 90%+ retail traders lose capital.",
        "ta": "பங்குச்சந்தை எதிர்கால ஒப்பந்தங்கள் (F&O). இதில் 90%-க்கும் மேற்பட்ட தனிநபர் வர்த்தகர்கள் நஷ்டமடைகிறார்கள்."
    },
    "lock-in period": {
        "en": "A fixed duration during which you are legally not allowed to withdraw your invested money.",
        "ta": "முதலீடு செய்த பணத்தை குறிப்பிட்ட காலம் வரை வெளியே எடுக்க முடியாத கட்டாயக் காலம்."
    },
    "expense ratio": {
        "en": "The annual percentage fee deducted by fund managers to manage your investment.",
        "ta": "உங்கள் முதலீட்டை நிர்வகிக்க ஃபண்ட் மேனேஜர்கள் கழித்துக் கொள்ளும் வருடாந்திர கட்டண விகிதம்."
    }
}

PRESET_EXPLANATIONS = [
    {
        "keywords": ["market volatility", "liquidity constraints", "volatility and liquidity"],
        "simple_en": "The value of your investment can go up or down unpredictably. Also, you may not always be able to sell it quickly to get cash when you need it.",
        "simple_ta": "உங்கள் முதலீட்டின் மதிப்பு திடீரென உயரலாம் அல்லது குறையலாம். மேலும் அவசர தேவைக்கு உடனடியாக விற்றுப் பணமாக்க முடியாமல் போகலாம்.",
        "actual_meaning": "You might lose money in the short term, and if market conditions are bad, buyers might not be available immediately.",
        "actual_meaning_ta": "குறுகிய காலத்தில் உங்கள் முதலீட்டுப் பணம் குறைய வாய்ப்புள்ளது; சந்தை மோசமாக இருந்தால் உடனடியாக விற்க ஆள் கிடைக்காமல் போகலாம்.",
        "terms": ["market volatility", "liquidity"],
        "hidden_risks": [
            "If an emergency happens, you might be forced to sell at a loss or wait several days for your cash.",
            "Historical performance does not cushion against sudden economic drops."
        ],
        "hidden_risks_ta": [
            "அவசர மருத்துவச் செலவு போன்ற நேரங்களில் நஷ்டத்திற்கு விற்க வேண்டிய சூழல் வரலாம்.",
            "கடந்த கால லாபம் எதிர்காலத்திலும் தொடரும் என்று எதிர்பார்க்க முடியாது."
        ]
    },
    {
        "keywords": ["9 out of 10", "individual traders", "f&o segment", "derivatives"],
        "simple_en": "Official SEBI data shows that 90% of regular people trading in futures and options lose their hard-earned money, losing an average of ₹50,000+ per year.",
        "simple_ta": "SEBI புள்ளிவிவரங்களின்படி, F&O (ஃபியூச்சர்ஸ் & ஆப்ஷன்ஸ்) வர்த்தகம் செய்யும் 10-ல் 9 பேர் தங்களது பணத்தை இழக்கிறார்கள்.",
        "actual_meaning": "Trading in derivatives is not a casual way to make income; the odds are heavily against retail traders who lack institutional risk systems.",
        "actual_meaning_ta": "F&O என்பது தினசரி வருமானம் ஈட்டும் எளிய வழி அல்ல; அனுபவமில்லாத சாதாரண மக்களுக்கு இதில் நஷ்டமே அதிகம் ஏற்படுகிறது.",
        "terms": ["derivatives", "capital risk"],
        "hidden_risks": [
            "Losses can exceed your initial margin deposit if market moves sharply against you.",
            "Transaction charges, brokerage, and taxes accumulate rapidly even on losing trades."
        ],
        "hidden_risks_ta": [
            "சந்தை திடீரென எதிர்த்திசையில் சென்றால், நீங்கள் முதலீடு செய்த தொகையை விட அதிக நஷ்டம் ஏற்படலாம்.",
            "நஷ்டம் ஏற்பட்டாலும் கூட தரகு கட்டணங்கள் மற்றும் வரிகளை நீங்கள் செலுத்த வேண்டும்."
        ]
    },
    {
        "keywords": ["exit load", "redeemed within", "allotment", "redemption"],
        "simple_en": "If you take your money out before the specified period (like 1 year), the fund company will cut a fee (usually 1%) from your payout.",
        "simple_ta": "குறிப்பிட்ட காலத்திற்குள் (உதாரணமாக 1 ஆண்டிற்குள்) உங்கள் முதலீட்டுப் பணத்தை வெளியே எடுத்தால், 1% அபராதக் கட்டணம் பிடித்தம் செய்யப்படும்.",
        "actual_meaning": "This fund is designed for patient money; taking money out early directly eats into your returns.",
        "actual_meaning_ta": "இந்த முதலீடு நீண்ட காலத்திற்கு மட்டுமே உகந்தது; அவசரமாக எடுத்தால் லாபத்தில் நஷ்டம் ஏற்படும்.",
        "terms": ["exit load", "liquidity"],
        "hidden_risks": [
            "Even if the fund is underperforming, leaving early triggers the fee.",
            "Taxes on short-term withdrawals are typically higher than long-term holds."
        ],
        "hidden_risks_ta": [
            "ஃபண்ட் சரியாக லாபம் தரவில்லை என்றாலும் கூட, முன்கூட்டியே வெளியேறினால் அபராதம் செலுத்த வேண்டும்.",
            "குறுகிய காலத்தில் பணத்தை எடுக்கும் போது வரி விகிதமும் அதிகமாக இருக்கும்."
        ]
    }
]


def simplify_financial_text(text: str) -> ExplainResponse:
    lower_text = text.lower()

    # Check matching presets
    for preset in PRESET_EXPLANATIONS:
        if any(kw in lower_text for kw in preset["keywords"]):
            matched_terms = []
            for t in preset["terms"]:
                if t in KNOWN_TERMS:
                    matched_terms.append(ImportantTerm(
                        term=t.title(),
                        meaning_en=KNOWN_TERMS[t]["en"],
                        meaning_ta=KNOWN_TERMS[t]["ta"]
                    ))

            return ExplainResponse(
                original_text=text,
                simple_english=preset["simple_en"],
                simple_tamil=preset["simple_ta"],
                important_terms=matched_terms,
                actual_meaning=preset["actual_meaning"],
                actual_meaning_ta=preset["actual_meaning_ta"],
                hidden_risks=preset["hidden_risks"],
                hidden_risks_ta=preset["hidden_risks_ta"],
                mode="deterministic_financial_lexicon"
            )

    # General fallback for any input text
    found_terms: List[ImportantTerm] = []
    for term, data in KNOWN_TERMS.items():
        if term in lower_text:
            found_terms.append(ImportantTerm(
                term=term.title(),
                meaning_en=data["en"],
                meaning_ta=data["ta"]
            ))

    if not found_terms:
        found_terms.append(ImportantTerm(
            term="Capital Risk",
            meaning_en="The danger that you might lose a portion or all of your invested money.",
            meaning_ta="முதலீடு செய்த பணத்தை இழக்க நேரிடும் அபாயம்."
        ))
        found_terms.append(ImportantTerm(
            term="Market Volatility",
            meaning_en="Price changes driven by economic news and trading demand.",
            meaning_ta="செய்திகள் மற்றும் வர்த்தக தேவைக்கேற்ப விலையில் ஏற்படும் திடீர் மாற்றங்கள்."
        ))

    simple_en = (
        "In simple words: This statement highlights conditions, costs, or risks you agree to. "
        "Your money can fluctuate based on market movements, and you might face fees or wait periods if you try to withdraw early."
    )
    simple_ta = (
        "எளிய தமிழில்: இந்த அறிக்கை நீங்கள் ஏற்கும் நிபந்தனைகள் மற்றும் நிதி அபாயங்களை விளக்குகிறது. "
        "சந்தை மாற்றங்களால் உங்கள் பணத்தின் மதிப்பு மாறலாம்; அவசரமாகப் பணத்தை எடுக்க முயன்றால் கட்டணம் அல்லது காத்திருப்பு காலம் இருக்கலாம்."
    )
    actual_meaning = "The institution is legally protecting itself by stating that financial gains are never guaranteed and capital can decline."
    actual_meaning_ta = "லாபத்திற்கு எந்த உத்தரவாதமும் இல்லை என்பதையும், அசல் குறைய வாய்ப்புள்ளது என்பதையும் நிறுவனம் சட்டப்பூர்வமாகத் தெரிவிக்கிறது."

    hidden_risks = [
        "Unplanned early withdrawals may attract exit penalties or unfavourable sell rates.",
        "Your total returns after inflation, taxes, and hidden platform fees might be lower than expected."
    ]
    hidden_risks_ta = [
        "திடீரென பணத்தை திரும்பப் பெறும்போது அபராதம் அல்லது குறைந்த விலை கிடைக்கலாம்.",
        "பணவீக்கம், வரி மற்றும் கட்டணங்கள் கழிந்த பிறகு நீங்கள் பெறும் நிகர லாபம் குறைவாக இருக்கலாம்."
    ]

    return ExplainResponse(
        original_text=text,
        simple_english=simple_en,
        simple_tamil=simple_ta,
        important_terms=found_terms,
        actual_meaning=actual_meaning,
        actual_meaning_ta=actual_meaning_ta,
        hidden_risks=hidden_risks,
        hidden_risks_ta=hidden_risks_ta,
        mode="deterministic_financial_lexicon"
    )

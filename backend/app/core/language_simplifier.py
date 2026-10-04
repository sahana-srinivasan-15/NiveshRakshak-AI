import re
from typing import List
from app.models.schemas import ExplainResponse, ImportantTerm

KNOWN_TERMS = {
    "market volatility": {
        "en": "How fast and unpredictably stock or fund prices rise and fall.",
        "ta": "பங்கு அல்லது நிதி விலைகள் எவ்வளவு வேகமாக மற்றும் எதிர்பாராதவிதமாக ஏறி இறங்குகின்றன என்பது.",
        "hi": "शेयर या फंड की कीमतों में अचानक और अप्रत्याशित उतार-चढ़ाव होना।"
    },
    "liquidity": {
        "en": "How easily and quickly your investment can be converted into ready cash without loss.",
        "ta": "உங்கள் முதலீட்டை எவ்வளவு எளிதாகவும் விரைவாகவும் ரொக்கப் பணமாக மாற்ற முடியும் என்பது.",
        "hi": "बिना किसी नुकसान के अपने निवेश को तुरंत नकदी में बदलने की आसानी।"
    },
    "capital risk": {
        "en": "The danger that you might lose a portion or all of the original money you put in.",
        "ta": "நீங்கள் போட்ட அசல் பணத்தில் ஒரு பகுதியை அல்லது முழுவதையும் இழக்கும் ஆபத்து.",
        "hi": "वह जोखिम जिसमें आपकी लगाई गई मूल पूंजी का एक हिस्सा या पूरा पैसा डूब सकता है।"
    },
    "exit load": {
        "en": "A small penalty fee charged by the mutual fund if you withdraw money before a set period.",
        "ta": "குறிப்பிட்ட காலத்திற்கு முன்பே முதலீட்டுப் பணத்தை எடுத்தால் விதிக்கப்படும் சிறிய அபராதக் கட்டணம்.",
        "hi": "निर्धारित समय से पहले पैसा निकालने पर म्यूचुअल फंड द्वारा काटा जाने वाला छोटा जुर्माना शुल्क।"
    },
    "nav": {
        "en": "Net Asset Value: The per-unit market price of a mutual fund scheme.",
        "ta": "மியூச்சுவல் ஃபண்டின் ஒரு யூனிட்டின் தற்போதைய சந்தை மதிப்பு.",
        "hi": "नेट एसेट वैल्यू: म्यूचुअल फंड योजना की प्रति यूनिट का वर्तमान बाजार मूल्य।"
    },
    "derivatives": {
        "en": "High-risk trading contracts (Futures & Options) where 90%+ retail traders lose capital.",
        "ta": "பங்குச்சந்தை எதிர்கால ஒப்பந்தங்கள் (F&O). இதில் 90%-க்கும் மேற்பட்ட தனிநபர் வர்த்தகர்கள் நஷ்டமடைகிறார்கள்.",
        "hi": "अत्यधिक जोखिम वाले ट्रेडिंग अनुबंध (F&O) जिसमें 90% से अधिक खुदरा निवेशक अपनी पूंजी गंवाते हैं।"
    },
    "lock-in period": {
        "en": "A fixed duration during which you are legally not allowed to withdraw your invested money.",
        "ta": "முதலீடு செய்த பணத்தை குறிப்பிட்ட காலம் வரை வெளியே எடுக்க முடியாத கட்டாயக் காலம்.",
        "hi": "एक निश्चित समय अवधि जिसके दौरान आप कानूनी रूप से अपना निवेशित पैसा नहीं निकाल सकते।"
    },
    "expense ratio": {
        "en": "The annual percentage fee deducted by fund managers to manage your investment.",
        "ta": "உங்கள் முதலீட்டை நிர்வகிக்க ஃபண்ட் மேனேஜர்கள் கழித்துக் கொள்ளும் வருடாந்திர கட்டண விகிதம்.",
        "hi": "आपके निवेश का प्रबंधन करने के लिए फंड प्रबंधकों द्वारा काटा जाने वाला वार्षिक प्रतिशत शुल्क।"
    }
}

PRESET_EXPLANATIONS = [
    {
        "keywords": ["market volatility", "liquidity constraints", "volatility and liquidity"],
        "simple_en": "The value of your investment can go up or down unpredictably. Also, you may not always be able to sell it quickly to get cash when you need it.",
        "simple_ta": "உங்கள் முதலீட்டின் மதிப்பு திடீரென உயரலாம் அல்லது குறையலாம். மேலும் அவசர தேவைக்கு உடனடியாக விற்றுப் பணமாக்க முடியாமல் போகலாம்.",
        "simple_hi": "आपके निवेश का मूल्य अप्रत्याशित रूप से घट-बढ़ सकता है। इसके अलावा, ज़रूरत पड़ने पर इसे तुरंत नकद में बदलना हमेशा संभव नहीं हो सकता है।",
        "actual_meaning": "You might lose money in the short term, and if market conditions are bad, buyers might not be available immediately.",
        "actual_meaning_ta": "குறுகிய காலத்தில் உங்கள் முதலீட்டுப் பணம் குறைய வாய்ப்புள்ளது; சந்தை மோசமாக இருந்தால் உடனடியாக விற்க ஆள் கிடைக்காமல் போகலாம்.",
        "actual_meaning_hi": "अल्पकाल में आपको नुकसान हो सकता है, और यदि बाजार की स्थिति खराब है, तो खरीदार तुरंत उपलब्ध नहीं हो सकते हैं।",
        "terms": ["market volatility", "liquidity"],
        "hidden_risks": [
            "If an emergency happens, you might be forced to sell at a loss or wait several days for your cash.",
            "Historical performance does not cushion against sudden economic drops."
        ],
        "hidden_risks_ta": [
            "அவசர மருத்துவச் செலவு போன்ற நேரங்களில் நஷ்டத்திற்கு விற்க வேண்டிய சூழல் வரலாம்.",
            "கடந்த கால லாபம் எதிர்காலத்திலும் தொடரும் என்று எதிர்பார்க்க முடியாது."
        ],
        "hidden_risks_hi": [
            "आपात स्थिति में, आपको नुकसान पर बेचने या नकदी के लिए कई दिनों तक प्रतीक्षा करने के लिए मजबूर होना पड़ सकता है।",
            "पिछला अच्छा प्रदर्शन अचानक आई आर्थिक मंदी से सुरक्षा की गारंटी नहीं देता है।"
        ]
    },
    {
        "keywords": ["9 out of 10", "individual traders", "f&o segment", "derivatives"],
        "simple_en": "Official SEBI data shows that 90% of regular people trading in futures and options lose their hard-earned money, losing an average of ₹50,000+ per year.",
        "simple_ta": "SEBI புள்ளிவிவரங்களின்படி, F&O (ஃபியூச்சர்ஸ் & ஆப்ஷன்ஸ்) வர்த்தகம் செய்யும் 10-ல் 9 பேர் தங்களது பணத்தை இழக்கிறார்கள்.",
        "simple_hi": "आधिकारिक SEBI अध्ययन के अनुसार, फ्यूचर्स एंड ऑप्शंस (F&O) में ट्रेडिंग करने वाले 10 में से 9 व्यक्तिगत निवेशक अपनी गाढ़ी कमाई गंवा देते हैं (औसतन ₹50,000+ प्रति वर्ष)।",
        "actual_meaning": "Trading in derivatives is not a casual way to make income; the odds are heavily against retail traders who lack institutional risk systems.",
        "actual_meaning_ta": "F&O என்பது தினசரி வருமானம் ஈட்டும் எளிய வழி அல்ல; அனுபவமில்லாத சாதாரண மக்களுக்கு இதில் நஷ்டமே அதிகம் ஏற்படுகிறது.",
        "actual_meaning_hi": "डेरिवेटिव्स में ट्रेडिंग कोई आसान आय का साधन नहीं है; संस्थागत प्रणालियों के बिना खुदरा निवेशकों के पक्ष में संभावनाएं बहुत कम होती हैं।",
        "terms": ["derivatives", "capital risk"],
        "hidden_risks": [
            "Losses can exceed your initial margin deposit if market moves sharply against you.",
            "Transaction charges, brokerage, and taxes accumulate rapidly even on losing trades."
        ],
        "hidden_risks_ta": [
            "சந்தை திடீரென எதிர்த்திசையில் சென்றால், நீங்கள் முதலீடு செய்த தொகையை விட அதிக நஷ்டம் ஏற்படலாம்.",
            "நஷ்டம் ஏற்பட்டாலும் கூட தரகு கட்டணங்கள் மற்றும் வரிகளை நீங்கள் செலுத்த வேண்டும்."
        ],
        "hidden_risks_hi": [
            "यदि बाजार तेजी से आपके विपरीत जाता है, तो नुकसान आपकी प्रारंभिक मार्जिन राशि से भी अधिक हो सकता है।",
            "घाटे वाले ट्रेडों पर भी ब्रोकरेज, टैक्स और एक्सचेंज शुल्क तेज़ी से जमा होते हैं।"
        ]
    },
    {
        "keywords": ["exit load", "redeemed within", "allotment", "redemption"],
        "simple_en": "If you take your money out before the specified period (like 1 year), the fund company will cut a fee (usually 1%) from your payout.",
        "simple_ta": "குறிப்பிட்ட காலத்திற்குள் (உதாரணமாக 1 ஆண்டிற்குள்) உங்கள் முதலீட்டுப் பணத்தை வெளியே எடுத்தால், 1% அபராதக் கட்டணம் பிடித்தம் செய்யப்படும்.",
        "simple_hi": "यदि आप निर्दिष्ट समय (जैसे 1 वर्ष) से पहले अपना पैसा निकालते हैं, तो फंड कंपनी आपके भुगतान में से एक शुल्क (आमतौर पर 1%) काट लेगी।",
        "actual_meaning": "This fund is designed for patient money; taking money out early directly eats into your returns.",
        "actual_meaning_ta": "இந்த முதலீடு நீண்ட காலத்திற்கு மட்டுமே உகந்தது; அவசரமாக எடுத்தால் லாபத்தில் நஷ்டம் ஏற்படும்.",
        "actual_meaning_hi": "यह फंड धैर्यवान निवेशकों के लिए है; समय से पहले पैसा निकालने से आपका शुद्ध रिटर्न सीधे कम हो जाता है।",
        "terms": ["exit load", "liquidity"],
        "hidden_risks": [
            "Even if the fund is underperforming, leaving early triggers the fee.",
            "Taxes on short-term withdrawals are typically higher than long-term holds."
        ],
        "hidden_risks_ta": [
            "ஃபண்ட் சரியாக லாபம் தரவில்லை என்றாலும் கூட, முன்கூட்டியே வெளியேறினால் அபராதம் செலுத்த வேண்டும்.",
            "குறுகிய காலத்தில் பணத்தை எடுக்கும் போது வரி விகிதமும் அதிகமாக இருக்கும்."
        ],
        "hidden_risks_hi": [
            "भले ही फंड अच्छा प्रदर्शन न कर रहा हो, जल्दी बाहर निकलने पर यह शुल्क काटा जाएगा।",
            "अल्पकालिक निकासी पर कर की दरें आमतौर पर दीर्घकालिक होल्डिंग्स की तुलना में अधिक होती हैं।"
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
                        meaning_ta=KNOWN_TERMS[t]["ta"],
                        meaning_hi=KNOWN_TERMS[t].get("hi")
                    ))

            return ExplainResponse(
                original_text=text,
                simple_english=preset["simple_en"],
                simple_tamil=preset["simple_ta"],
                simple_hindi=preset.get("simple_hi"),
                important_terms=matched_terms,
                actual_meaning=preset["actual_meaning"],
                actual_meaning_ta=preset["actual_meaning_ta"],
                actual_meaning_hi=preset.get("actual_meaning_hi"),
                hidden_risks=preset["hidden_risks"],
                hidden_risks_ta=preset["hidden_risks_ta"],
                hidden_risks_hi=preset.get("hidden_risks_hi"),
                mode="deterministic_financial_lexicon"
            )

    # General fallback for any input text
    found_terms: List[ImportantTerm] = []
    for term, data in KNOWN_TERMS.items():
        if term in lower_text:
            found_terms.append(ImportantTerm(
                term=term.title(),
                meaning_en=data["en"],
                meaning_ta=data["ta"],
                meaning_hi=data.get("hi")
            ))

    if not found_terms:
        found_terms.append(ImportantTerm(
            term="Capital Risk",
            meaning_en="The danger that you might lose a portion or all of your invested money.",
            meaning_ta="முதலீடு செய்த பணத்தை இழக்க நேரிடும் அபாயம்.",
            meaning_hi="वह जोखिम जिसमें आपकी लगाई गई मूल पूंजी का नुकसान हो सकता है।"
        ))
        found_terms.append(ImportantTerm(
            term="Market Volatility",
            meaning_en="Price changes driven by economic news and trading demand.",
            meaning_ta="செய்திகள் மற்றும் வர்த்தக தேவைக்கேற்ப விலையில் ஏற்படும் திடீர் மாற்றங்கள்.",
            meaning_hi="आर्थिक समाचारों और मांग के अनुसार कीमतों में होने वाले उतार-चढ़ाव।"
        ))

    simple_en = (
        "In simple words: This statement highlights conditions, costs, or risks you agree to. "
        "Your money can fluctuate based on market movements, and you might face fees or wait periods if you try to withdraw early."
    )
    simple_ta = (
        "எளிய தமிழில்: இந்த அறிக்கை நீங்கள் ஏற்கும் நிபந்தனைகள் மற்றும் நிதி அபாயங்களை விளக்குகிறது. "
        "சந்தை மாற்றங்களால் உங்கள் பணத்தின் மதிப்பு மாறலாம்; அவசரமாகப் பணத்தை எடுக்க முயன்றால் கட்டணம் அல்லது காத்திருப்பு காலம் இருக்கலாம்."
    )
    simple_hi = (
        "सरल शब्दों में: यह कथन उन शर्तों, लागतों या जोखिमों पर प्रकाश डालता है जिनसे आप सहमत होते हैं। "
        "बाजार की गतिविधियों के आधार पर आपके पैसे का मूल्य घट-बढ़ सकता है, और समय से पहले निकासी करने पर आपको जुर्माना या प्रतीक्षा अवधि का सामना करना पड़ सकता है।"
    )
    actual_meaning = "The institution is legally protecting itself by stating that financial gains are never guaranteed and capital can decline."
    actual_meaning_ta = "லாபத்திற்கு எந்த உத்தரவாதமும் இல்லை என்பதையும், அசல் குறைய வாய்ப்புள்ளது என்பதையும் நிறுவனம் சட்டப்பூர்வமாகத் தெரிவிக்கிறது."
    actual_meaning_hi = "संस्था कानूनी रूप से यह स्पष्ट कर रही है कि वित्तीय लाभ की कभी कोई गारंटी नहीं होती है और मूल पूंजी घट सकती है।"

    hidden_risks = [
        "Unplanned early withdrawals may attract exit penalties or unfavourable sell rates.",
        "Your total returns after inflation, taxes, and hidden platform fees might be lower than expected."
    ]
    hidden_risks_ta = [
        "திடீரென பணத்தை திரும்பப் பெறும்போது அபராதம் அல்லது குறைந்த விலை கிடைக்கலாம்.",
        "பணவீக்கம், வரி மற்றும் கட்டணங்கள் கழிந்த பிறகு நீங்கள் பெறும் நிகர லாபம் குறைவாக இருக்கலாம்."
    ]
    hidden_risks_hi = [
        "असमंजस या जल्दबाजी में की गई निकासी पर एग्जिट पेनल्टी या प्रतिकूल दरें लग सकती हैं।",
        "मुद्रास्फीति, कर और छिपे हुए शुल्कों के बाद आपका शुद्ध रिटर्न उम्मीद से कम हो सकता है।"
    ]

    return ExplainResponse(
        original_text=text,
        simple_english=simple_en,
        simple_tamil=simple_ta,
        simple_hindi=simple_hi,
        important_terms=found_terms,
        actual_meaning=actual_meaning,
        actual_meaning_ta=actual_meaning_ta,
        actual_meaning_hi=actual_meaning_hi,
        hidden_risks=hidden_risks,
        hidden_risks_ta=hidden_risks_ta,
        hidden_risks_hi=hidden_risks_hi,
        mode="deterministic_financial_lexicon"
    )

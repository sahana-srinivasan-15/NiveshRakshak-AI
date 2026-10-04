from typing import List
from app.models.schemas import DemoScenario

DEMO_SCENARIOS: List[DemoScenario] = [
    DemoScenario(
        id="demo-1",
        title="Guaranteed-Return Investment Scam",
        title_ta="உறுதியளிக்கப்பட்ட அதிக லாப மோசடி (Guaranteed 30%)",
        title_hi="गारंटीड रिटर्न निवेश धोखाधड़ी (Guaranteed Return Scam)",
        source_type="whatsapp",
        preview="Congratulations! You have been selected for a special investment opportunity. Guaranteed 30% return in 7 days...",
        preview_ta="வாழ்த்துக்கள்! சிறப்பு முதலீட்டு வாய்ப்பிற்கு நீங்கள் தேர்ந்தெடுக்கப்பட்டுள்ளீர்கள். 7 நாட்களில் 30% லாபம் நிச்சயம்...",
        preview_hi="बधाई हो! आपको एक विशेष निवेश अवसर के लिए चुना गया है। 7 दिनों में 30% रिटर्न की गारंटी...",
        full_text=(
            "Congratulations! You have been selected for a special investment opportunity.\n"
            "Guaranteed 30% return in 7 days.\n"
            "Limited slots available!\n"
            "Send ₹10,000 immediately to activate your account.\n"
            "Share OTP for verification."
        ),
        full_text_ta=(
            "வாழ்த்துக்கள்! சிறப்பு முதலீட்டு வாய்ப்பிற்கு நீங்கள் தேர்ந்தெடுக்கப்பட்டுள்ளீர்கள்.\n"
            "7 நாட்களில் 30% லாபம் நிச்சயம் உத்தரவாதம்.\n"
            "வரையறுக்கப்பட்ட இடங்கள் மட்டுமே உள்ளன!\n"
            "உங்கள் கணக்கைச் செயல்படுத்த உடனடியாக ₹10,000 அனுப்பவும்.\n"
            "சரிபார்ப்பிற்கு உங்கள் OTP-ஐப் பகிரவும்."
        ),
        full_text_hi=(
            "बधाई हो! आपको एक विशेष निवेश अवसर के लिए चुना गया है।\n"
            "7 दिनों में 30% रिटर्न की गारंटी।\n"
            "सीमित स्लॉट उपलब्ध हैं!\n"
            "अपना खाता सक्रिय करने के लिए तुरंत ₹10,000 भेजें।\n"
            "सत्यापन के लिए OTP साझा करें।"
        ),
        expected_score=94,
        expected_level="CRITICAL CONCERN",
        expected_level_ta="மிக தீவிரக் கவலை (Critical Concern)",
        expected_level_hi="गंभीर चिंता (Critical Concern)",
        key_signals=["Guaranteed Returns", "Urgent Payment Pressure", "OTP Request", "Advance Fee"],
        key_signals_ta=["உறுதியளிக்கப்பட்ட லாபம்", "அவசர கட்டணக் கோரிக்கை", "OTP கோருதல்", "முன்பணக் கட்டணம்"],
        key_signals_hi=["गारंटीड रिटर्न", "तुरंत भुगतान का दबाव", "OTP की माँग", "अग्रिम खाता शुल्क"]
    ),
    DemoScenario(
        id="demo-2",
        title="Fake Regulatory Authority Impersonation",
        title_ta="போலி SEBI / NSDL அதிகாரி போலியாக்கம்",
        title_hi="फर्जी नियामक प्राधिकरण (SEBI/NSDL) का प्रतिरूपण",
        source_type="telegram",
        preview="Official SEBI & NSDL Approved Elite Wealth Advisory. Senior Director shares insider tips...",
        preview_ta="அதிகாரப்பூர்வ SEBI & NSDL குழு. மூத்த இயக்குநர் மூலம் இன்சைடர் பங்குகள் தகவல்...",
        preview_hi="आधिकारिक SEBI और NSDL अनुमोदित वेल्थ डेस्क। वरिष्ठ निदेशक से अंदरूनी टिप्स...",
        full_text=(
            "🏛️ OFFICIAL SEBI & NSDL WEALTH DESK 🏛️\n\n"
            "Approved by SEBI Institutional Advisory Board.\n"
            "Headed by Senior SEBI Director Dr. R. K. Sharma.\n\n"
            "Get 100% sure-shot insider calls and multibagger penny stocks before public market opening.\n"
            "Guaranteed 200% profit within 14 trading days.\n\n"
            "To join our exclusive VIP Insider Group, forward your full name, PAN, and deposit ₹25,000 verification security fee to GPay: 9840291823.\n"
            "Official Govt Certificate will be dispatched via speed post."
        ),
        full_text_ta=(
            "🏛️ அதிகாரப்பூர்வ SEBI & NSDL வெல்த் பிரிவு 🏛️\n\n"
            "SEBI நிறுவன ஆலோசனைக் குழுவால் அங்கீகரிக்கப்பட்டது.\n"
            "முன்னாள் SEBI இயக்குநர் தலைமையில் இயங்குகிறது.\n\n"
            "சந்தை திறப்பதற்கு முன் 100% உறுதியான இன்சைடர் குறிப்புகளைப் பெறுங்கள்.\n"
            "14 வர்த்தக நாட்களில் 200% லாபம் நிச்சயம்.\n\n"
            "எங்கள் விஐபி குழுவில் சேர உங்கள் பான் அட்டை மற்றும் ₹25,000 சரிபார்ப்புக் கட்டணத்தை இந்த GPay எண்ணிற்கு அனுப்பவும்: 9840291823."
        ),
        full_text_hi=(
            "🏛️ आधिकारिक SEBI एवं NSDL वेल्थ डेस्क 🏛️\n\n"
            "SEBI संस्थागत सलाहकार बोर्ड द्वारा अनुमोदित।\n"
            "वरिष्ठ सेबी निदेशक डॉ. आर. के. शर्मा के नेतृत्व में।\n\n"
            "बाजार खुलने से पहले 100% सटीक इनसाइडर कॉल और मल्टीबैगर शेयर प्राप्त करें।\n"
            "14 कारोबारी दिनों में 200% मुनाफे की गारंटी।\n\n"
            "विशेष VIP ग्रुप में शामिल होने के लिए अपना पूरा नाम, PAN और ₹25,000 सुरक्षा शुल्क इस GPay नंबर पर भेजें: 9840291823।"
        ),
        expected_score=92,
        expected_level="CRITICAL CONCERN",
        expected_level_ta="மிக தீவிரக் கவலை (Critical Concern)",
        expected_level_hi="गंभीर चिंता (Critical Concern)",
        key_signals=["SEBI Impersonation", "Guaranteed Profits", "Insider Tip Claims", "Personal Phone Transfer", "Sensitive Info Solicitation"],
        key_signals_ta=["SEBI போலியாக்கம்", "உறுதியளிக்கப்பட்ட லாபம்", "ரகசியப் பங்குத் தகவல்", "தனிநபர் தொலைபேசி பணப்பரிமாற்றம்"],
        key_signals_hi=["SEBI प्रतिरूपण", "गारंटीड मुनाफा", "इनसाइडर टिप्स का दावा", "व्यक्तिगत फ़ोन ट्रांसफर", "संवेदनशील डेटा माँग"]
    ),
    DemoScenario(
        id="demo-3",
        title="Urgent WhatsApp Investment Offer with Pressure",
        title_ta="அவசரப்படுத்தும் வாட்ஸ்அப் முதலீட்டு சலுகை",
        title_hi="व्हाट्सएप पर तत्काल दबाव वाला निवेश प्रस्ताव",
        source_type="whatsapp",
        preview="URGENT: Last chance! Double your money in 7 days with our special IPO allotment quota...",
        preview_ta="அவசரம்: கடைசி வாய்ப்பு! சிறப்பு IPO ஒதுக்கீடு மூலம் 7 நாட்களில் உங்கள் பணம் இரட்டிப்பாகும்...",
        preview_hi="अत्यावश्यक: अंतिम अवसर! हमारे विशेष IPO कोटे से 7 दिनों में अपना पैसा दोगुना करें...",
        full_text=(
            "⚡ LAST CHANCE - CLOSING IN 45 MINUTES ⚡\n\n"
            "Secret institutional pre-IPO allotment quota unlocked!\n"
            "Double your money (2x) in just 7 days guaranteed upon listing.\n\n"
            "Seats filling extremely fast! Only 2 slots remaining.\n"
            "Send ₹15,000 immediately to reserve your allocation. If you delay past 5:30 PM, your slot will be transferred to the next waiting investor.\n"
            "Deposit now to PhonePe: 9940182736@ybl"
        ),
        full_text_ta=(
            "⚡ கடைசி வாய்ப்பு - இன்னும் 45 நிமிடங்களில் முடிவடைகிறது ⚡\n\n"
            "ரகசிய நிறுவன ரீதியான ப்ரீ-IPO ஒதுக்கீடு திறக்கப்பட்டுள்ளது!\n"
            "பங்குச் சந்தையில் பட்டியலிடப்பட்ட 7 நாட்களில் உங்கள் பணம் 2 மடங்காக மாறும்.\n\n"
            "இடங்கள் வேகமாக நிரம்புகின்றன! 2 இடங்கள் மட்டுமே மீதமுள்ளன.\n"
            "உங்கள் இடத்தை உறுதிசெய்ய உடனடியாக ₹15,000 அனுப்பவும். தாமதித்தால் மற்றவருக்கு வழங்கப்படும்.\n"
            "இப்போதே PhonePe மூலம் செலுத்தவும்: 9940182736@ybl"
        ),
        full_text_hi=(
            "⚡ अंतिम अवसर - केवल 45 मिनट शेष ⚡\n\n"
            "विशेष संस्थागत प्री-IPO कोटा उपलब्ध!\n"
            "लिस्टिंग पर मात्र 7 दिनों में अपने पैसे को 2 गुना करने की गारंटी।\n\n"
            "स्लॉट बहुत तेजी से भर रहे हैं! केवल 2 सीटें बाकी हैं।\n"
            "अपना आवंटन सुरक्षित करने के लिए तुरंत ₹15,000 भेजें। देरी करने पर स्लॉट अगले निवेशक को दे दिया जाएगा।\n"
            "अभी PhonePe पर भुगतान करें: 9940182736@ybl"
        ),
        expected_score=88,
        expected_level="CRITICAL CONCERN",
        expected_level_ta="மிக தீவிரக் கவலை (Critical Concern)",
        expected_level_hi="गंभीर चिंता (Critical Concern)",
        key_signals=["Double Your Money", "Severe Time Pressure", "Artificial Scarcity", "Personal UPI Payment"],
        key_signals_ta=["பணம் இரட்டிப்பு", "கடும் நேர அழுத்தம்", "செயற்கையான அவசரம்", "தனிநபர் UPI"],
        key_signals_hi=["पैसा दोगुना करने का वादा", "कड़ा समय दबाव", "कृत्रिम कमी", "व्यक्तिगत UPI भुगतान"]
    ),
    DemoScenario(
        id="demo-4",
        title="Suspicious Investment Ad with Phishing URL",
        title_ta="மோசடி இணைய இணைப்புடன் கூடிய முதலீட்டு விளம்பரம்",
        title_hi="फ़िशिंग लिंक वाला संदिग्ध निवेश विज्ञापन",
        source_type="ad",
        preview="Part-time stock rating task. Daily salary ₹5,000. Register with SEBI fast login link...",
        preview_ta="பகுதிநேர பங்கு மதிப்பீடு பணி. தினசரி வருமானம் ₹5,000. போலி இணையதள பதிவு...",
        preview_hi="पार्ट-टाइम स्टॉक रेटिंग कार्य। दैनिक आय ₹5,000। लिंक पर रजिस्टर करें...",
        full_text=(
            "💼 WORK FROM HOME - SEBI CERTIFIED PART TIME EARNING 💼\n\n"
            "Earn ₹3,000 to ₹8,000 daily by rating stock recommendations and merchant trading apps.\n"
            "Zero investment needed initially. Immediate withdrawal.\n\n"
            "Register now on our verified portal:\n"
            "👉 http://sebi-secure-portal.vip/login-auth.html\n\n"
            "Enter your mobile number and share the 6-digit OTP verification code with our online customer care to activate your bonus wallet of ₹500."
        ),
        full_text_ta=(
            "💼 வீட்டிலிருந்தே வேலை - SEBI சான்றளிக்கப்பட்ட பகுதி நேர வருமானம் 💼\n\n"
            "பங்குப் பரிந்துரைகளை மதிப்பிடுவதன் மூலம் தினமும் ₹3,000 முதல் ₹8,000 வரை சம்பாதிக்கலாம்.\n"
            "ஆரம்ப முதலீடு தேவையில்லை. உடனடியாகப் பணம் எடுக்கலாம்.\n\n"
            "இப்போதே பதிவு செய்யவும்:\n"
            "👉 http://sebi-secure-portal.vip/login-auth.html\n\n"
            "உங்கள் மொபைல் எண்ணை உள்ளிட்டு, ₹500 போனஸைப் பெற உங்கள் 6-இலக்க OTP-ஐப் பகிரவும்."
        ),
        full_text_hi=(
            "💼 घर बैठे कार्य - SEBI प्रमाणित पार्ट-टाइम कमाई 💼\n\n"
            "स्टॉक सुझावों को रेट करके प्रतिदिन ₹3,000 से ₹8,000 कमाएं।\n"
            "शुरुआत में कोई निवेश नहीं। तत्काल निकासी।\n\n"
            "हमारे पोर्टल पर अभी पंजीकरण करें:\n"
            "👉 http://sebi-secure-portal.vip/login-auth.html\n\n"
            "अपना मोबाइल नंबर दर्ज करें और ₹500 बोनस वॉलेट सक्रिय करने के लिए 6-अंकीय OTP ग्राहक सेवा से साझा करें।"
        ),
        expected_score=96,
        expected_level="CRITICAL CONCERN",
        expected_level_ta="மிக தீவிரக் கவலை (Critical Concern)",
        expected_level_hi="गंभीर चिंता (Critical Concern)",
        key_signals=["OTP Request", "Suspicious Phishing URL", "Fake SEBI Branding", "Advance-Fee Job Scam"],
        key_signals_ta=["OTP கோருதல்", "மோசடி இணைய முகவரி", "போலி SEBI பிராண்டிங்", "முன்பண மோசடி"],
        key_signals_hi=["OTP की माँग", "संदिग्ध फ़िशिंग लिंक", "फर्जी SEBI ब्रांडिंग", "अग्रिम शुल्क नौकरी धोखाधड़ी"]
    ),
    DemoScenario(
        id="demo-5",
        title="Legitimate Educational Financial Message",
        title_ta="சட்டப்பூர்வமான மியூச்சுவல் ஃபண்ட் கல்வி தகவல்",
        title_hi="वैध शैक्षिक वित्तीय जागरूकता संदेश",
        source_type="educational",
        preview="Mutual fund investments are subject to market risks. Read all scheme related documents carefully...",
        preview_ta="மியூச்சுவல் ஃபண்ட் முதலீடுகள் சந்தை அபாயங்களுக்கு உட்பட்டவை. முதலீடு செய்வதற்கு முன் ஆவணங்களை கவனமாகப் படிக்கவும்...",
        preview_hi="म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। योजना से जुड़े सभी दस्तावेजों को ध्यान से पढ़ें...",
        full_text=(
            "📢 Investor Awareness Initiative\n\n"
            "Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.\n\n"
            "Past performance does not guarantee future results. Net Asset Values (NAV) of schemes can fluctuate based on broader securities market movements.\n\n"
            "Always verify your financial intermediary's AMFI ARN or SEBI Registration Number directly at amfiindia.com or sebi.gov.in.\n"
            "Issued in public interest for retail investor education."
        ),
        full_text_ta=(
            "📢 முதலீட்டாளர் விழிப்புணர்வு முன்முயற்சி\n\n"
            "மியூச்சுவல் ஃபண்ட் முதலீடுகள் சந்தை அபாயங்களுக்கு உட்பட்டவை. முதலீடு செய்வதற்கு முன் திட்டம் தொடர்பான அனைத்து ஆவணங்களையும் கவனமாகப் படிக்கவும்.\n\n"
            "கடந்த கால செயல்பாடு எதிர்கால வருமானத்திற்கு உத்தரவாதம் அளிக்காது.\n\n"
            "உங்கள் இடைத்தரகரின் AMFI ARN அல்லது SEBI பதிவு எண்ணை amfiindia.com அல்லது sebi.gov.in இல் எப்போதும் சரிபார்க்கவும்.\n"
            "சில்லறை முதலீட்டாளர்களின் விழிப்புணர்விற்காக பொது நலன் கருதி வெளியிடப்பட்டது."
        ),
        full_text_hi=(
            "📢 निवेशक जागरूकता पहल\n\n"
            "म्यूचुअल फंड निवेश बाजार के जोखिमों के अधीन हैं। निवेश करने से पहले योजना से संबंधित सभी दस्तावेजों को ध्यान से पढ़ें।\n\n"
            "पिछला प्रदर्शन भविष्य के परिणामों की गारंटी नहीं देता है। योजनाओं का शुद्ध परिसंपत्ति मूल्य (NAV) बाजार की गतिविधियों के आधार पर घट-बढ़ सकता है।\n\n"
            "हमेशा अपने वित्तीय मध्यस्थ के AMFI ARN या SEBI पंजीकरण संख्या को सीधे amfiindia.com या sebi.gov.in पर सत्यापित करें।\n"
            "खुदरा निवेशक शिक्षा हेतु जनहित में जारी।"
        ),
        expected_score=12,
        expected_level="LOW CONCERN",
        expected_level_ta="குறைந்த கவலை (Low Concern)",
        expected_level_hi="कम चिंता (Low Concern)",
        key_signals=["Standard Regulatory Disclaimers", "No Guaranteed Claims", "Promotes Verification", "Low Risk"],
        key_signals_ta=["சட்டரீதியான எச்சரிக்கை வாசகங்கள்", "உறுதியற்ற நேர்மையான தகவல்", "சரிபார்ப்பை ஊக்குவித்தல்", "குறைந்த இடர்"],
        key_signals_hi=["मानक नियामक अस्वीकरण", "कोई गारंटीड दावा नहीं", "सत्यापन को बढ़ावा", "कम जोखिम"]
    )
]

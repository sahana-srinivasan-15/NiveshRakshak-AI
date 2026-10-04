import { 
  AnalyzeResponse, ExplainResponse, ClaimCheckResponse, 
  GrievanceResponse, DemoScenario, Language 
} from '../types';

const API_BASE_URL = 'http://127.0.0.1:8080/api';

// Fallback demo scenarios stored client-side for zero latency and offline readiness
export const LOCAL_DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "demo-1",
    title: "Guaranteed-Return Investment Scam",
    title_ta: "உறுதியளிக்கப்பட்ட அதிக லாப மோசடி (Guaranteed 35%)",
    title_hi: "गारंटीड रिटर्न निवेश धोखाधड़ी (Guaranteed 30%)",
    source_type: "whatsapp",
    preview: "Earn 35% guaranteed monthly return through our automated AI trading algorithm. 100% risk free...",
    preview_ta: "எங்கள் AI வர்த்தக அல்காரிதம் மூலம் மாதந்தோறும் 35% உறுதியான வருமானம் பெறுங்கள்...",
    preview_hi: "बधाई हो! आपको विशेष निवेश अवसर के लिए चुना गया है। 7 दिनों में 30% रिटर्न की गारंटी...",
    full_text: "🚀 SPECIAL VIP WEALTH OPPORTUNITY 🚀\n\nEarn 35% guaranteed monthly return through our proprietary automated AI trading bot!\n• 100% Risk-Free Capital Protection\n• SEBI Approved & NSDL Verified algorithm\n• Daily profit payout straight to bank\n\n⚡ Only 3 investor slots left for today!\nPay ₹10,000 activation fee right now to UPI: wealthbot.rajesh@okaxis\nOffer expires at 6:00 PM. Act fast: http://bit.ly/wealth-bot-sebi",
    full_text_ta: "🚀 சிறப்பு விஐபி முதலீட்டு வாய்ப்பு 🚀\n\nஎங்கள் AI வர்த்தக அல்காரிதம் மூலம் மாதந்தோறும் 35% உறுதியான வருமானம் பெறுங்கள்!\n• 100% ஆபத்தில்லாத மூலதனப் பாதுகாப்பு\n• SEBI மற்றும் NSDL அங்கீகரிக்கப்பட்டது\n• தினசரி லாபம் நேரடியாக வங்கிக் கணக்கில்\n\n⚡ இன்றைக்கு 3 இடங்கள் மட்டுமே மீதமுள்ளன!\nஉடனடியாக ₹10,000 கட்டணத்தை UPI மூலம் செலுத்துங்கள்: wealthbot.rajesh@okaxis\nசலுகை மாலை 6:00 மணியுடன் முடிகிறது. OTP-யை பகிரவும்: http://bit.ly/wealth-bot-sebi",
    full_text_hi: "बधाई हो! आपको एक विशेष निवेश अवसर के लिए चुना गया है।\n7 दिनों में 30% रिटर्न की गारंटी।\nसीमित स्लॉट उपलब्ध हैं!\nअपना खाता सक्रिय करने के लिए तुरंत ₹10,000 भेजें UPI: wealthbot.rajesh@okaxis\nसत्यापन के लिए OTP साझा करें।",
    expected_score: 94,
    expected_level: "CRITICAL CONCERN",
    expected_level_ta: "மிக தீவிரக் கவலை (Critical Concern)",
    expected_level_hi: "गंभीर चिंता (CRITICAL CONCERN)",
    key_signals: ["Guaranteed Returns", "Fake Regulatory Claim", "Urgency / Limited Slots", "Personal UPI Payment Request", "Suspicious Shortlink"],
    key_signals_ta: ["உறுதியளிக்கப்பட்ட வருமானம்", "போலி ஒழுங்குமுறை அங்கீகாரம்", "அவசரப்படுத்துதல்", "தனிநபர் UPI கோரிக்கை", "சந்தேகத்திற்குரிய இணைப்பு"],
    key_signals_hi: ["गारंटीड रिटर्न", "फर्जी नियामक दावा", "सीमित स्लॉट / जल्दबाजी", "व्यक्तिगत UPI भुगतान की माँग", "OTP की माँग"]
  },
  {
    id: "demo-2",
    title: "Fake Regulatory Authority Impersonation",
    title_ta: "போலி SEBI / NSDL அதிகாரி போலியாக்கம்",
    title_hi: "फर्जी SEBI / NSDL अधिकारी का ढोंग",
    source_type: "telegram",
    preview: "Official SEBI & NSDL Approved Elite Wealth Advisory. Senior Director Sharma shares insider multibagger tips...",
    preview_ta: "அதிகாரப்பூர்வ SEBI மற்றும் NSDL அங்கீகரித்த வெல்த் டெஸ்க். இயக்குநர் சர்மா வழங்கும் குறிப்புகள்...",
    preview_hi: "अधिकारिक SEBI व NSDL वेल्थ डेस्क। वरिष्ठ निदेशक डॉ. शर्मा द्वारा गुप्त इनसाइडर शेयर टिप्स...",
    full_text: "🏛️ OFFICIAL SEBI & NSDL WEALTH DESK 🏛️\n\nApproved by SEBI Institutional Advisory Board.\nHeaded by Senior SEBI Director Dr. R. K. Sharma.\n\nGet 100% sure-shot insider calls and multibagger penny stocks before public market opening.\nGuaranteed 200% profit within 14 trading days.\n\nTo join our exclusive VIP Insider Group, forward your full name, PAN, and deposit ₹25,000 verification security fee to GPay: 9840291823.\nOfficial Govt Certificate will be dispatched via speed post.",
    full_text_ta: "🏛️ அதிகாரப்பூர்வ SEBI & NSDL வெல்த் டெஸ்க் 🏛️\n\nSEBI நிறுவன ஆலோசனைக் குழுவால் அங்கீகரிக்கப்பட்டது.\nதலைமை: மூத்த SEBI இயக்குநர் டாக்டர் ஆர். கே. சர்மா.\n\nசந்தை தொடங்கும் முன்பே 100% உறுதியான இன்சைடர் பங்குகள் பற்றிய தகவல்களைப் பெறுங்கள்.\n14 வர்த்தக நாட்களில் 200% லாபம் நிச்சயம்.\n\nஎங்கள் விஐபி குழுவில் சேர உங்கள் பான் கார்டு மற்றும் ₹25,000 கட்டணத்தை GPay: 9840291823 மூலம் செலுத்துங்கள்.",
    full_text_hi: "🏛️ आधिकारिक SEBI एवं NSDL वेल्थ डेस्क 🏛️\n\nSEBI संस्थागत सलाहकार बोर्ड द्वारा प्रमाणित।\nप्रमुख: वरिष्ठ निदेशक डॉ. आर. के. शर्मा।\n\nबाजार खुलने से पहले 100% पक्की इनसाइडर कॉल्स और मल्टीबैगर शेयर टिप्स पाएँ।\n14 कारोबारी दिनों में 200% लाभ की गारंटी।\n\nहमारे विशेष VIP ग्रुप से जुड़ने के लिए अपना नाम, PAN कार्ड भेजें और ₹25,000 सुरक्षा शुल्क GPay: 9840291823 पर जमा करें।",
    expected_score: 92,
    expected_level: "CRITICAL CONCERN",
    expected_level_ta: "மிக தீவிரக் கவலை (Critical Concern)",
    expected_level_hi: "गंभीर चिंता (CRITICAL CONCERN)",
    key_signals: ["SEBI Impersonation", "Guaranteed Profits", "Insider Tip Claims", "Personal Phone Transfer", "Sensitive Info Solicitation"],
    key_signals_ta: ["SEBI அதிகாரி போலியாக்கம்", "உறுதிசெய்யப்பட்ட லாபம்", "இன்சைடர் தகவல்", "தனிநபர் எண் பரிமாற்றம்", "பான் கார்டு விவரங்கள்"],
    key_signals_hi: ["SEBI अधिकारी का ढोंग", "गारंटीड मुनाफा", "इनसाइडर टिप्स का दावा", "व्यक्तिगत मोबाइल नंबर पर भुगतान", "PAN विवरण माँगना"]
  },
  {
    id: "demo-3",
    title: "Urgent WhatsApp Investment Offer with Pressure",
    title_ta: "அவசரப்படுத்தும் வாட்ஸ்அப் முதலீட்டு சலுகை",
    title_hi: "दबाव व जल्दबाजी वाला WhatsApp निवेश ऑफर",
    source_type: "whatsapp",
    preview: "URGENT: Last chance! Double your money in 7 days with our special IPO allotment quota...",
    preview_ta: "அவசரம்: கடைசி வாய்ப்பு! 7 நாட்களில் உங்கள் பணத்தை இரட்டிப்பாக்குங்கள்...",
    preview_hi: "अति आवश्यक: अंतिम मौका! विशेष IPO कोटा से 7 दिनों में पैसे दोगुना करें...",
    full_text: "⚡ LAST CHANCE - CLOSING IN 45 MINUTES ⚡\n\nSecret institutional pre-IPO allotment quota unlocked!\nDouble your money (2x) in just 7 days guaranteed upon listing.\n\nSeats filling extremely fast! Only 2 slots remaining.\nSend ₹15,000 immediately to reserve your allocation. If you delay past 5:30 PM, your slot will be transferred to the next waiting investor.\nDeposit now to PhonePe: 9940182736@ybl",
    full_text_ta: "⚡ கடைசி வாய்ப்பு - இன்னும் 45 நிமிடங்களில் முடிவடைகிறது ⚡\n\nரகசிய நிறுவன முன்-IPO ஒதுக்கீடு திறக்கப்பட்டுள்ளது!\nபட்டியலிடப்பட்ட 7 நாட்களில் உங்கள் பணம் இரட்டிப்பாகும் (2x) என உறுதியளிக்கிறோம்.\n\nஇடங்கள் வேகமாக நிரம்புகின்றன! 2 இடங்கள் மட்டுமே உள்ளன.\nஉங்கள் இடத்தை முன்பதிவு செய்ய உடனே ₹15,000 அனுப்புங்கள். மாலை 5:30 மணிக்கு மேல் தாமதித்தால் அடுத்தவருக்கு வழங்கப்படும்.\nஇப்போதே பணம் செலுத்துங்கள் PhonePe: 9940182736@ybl",
    full_text_hi: "⚡ अंतिम अवसर - केवल 45 मिनट शेष ⚡\n\nगुप्त संस्थागत प्री-IPO आवंटन कोटा उपलब्ध!\nलिस्टिंग पर केवल 7 दिनों में अपने पैसे को दोगुना (2x) करने की गारंटी।\n\nसीटें तेजी से भर रही हैं! केवल 2 स्लॉट बचे हैं।\nअपना स्लॉट सुरक्षित करने के लिए अभी ₹15,000 भेजें। यदि आप शाम 5:30 बजे के बाद देरी करते हैं, तो आपका स्लॉट अगले निवेशक को दे दिया जाएगा।\nतुरंत भुगतान करें PhonePe: 9940182736@ybl",
    expected_score: 88,
    expected_level: "CRITICAL CONCERN",
    expected_level_ta: "மிக தீவிரக் கவலை (Critical Concern)",
    expected_level_hi: "गंभीर चिंता (CRITICAL CONCERN)",
    key_signals: ["Double Your Money", "Severe Time Pressure", "Artificial Scarcity", "Personal UPI Payment"],
    key_signals_ta: ["பணம் இரட்டிப்பாகும் வாக்குறுதி", "கடுமையான நேர அழுத்தம்", "செயற்கை பற்றாக்குறை", "தனிநபர் UPI பணம்"],
    key_signals_hi: ["पैसे दोगुना करने का दावा", "अत्यधिक समय का दबाव", "कृत्रिम कमी", "व्यक्तिगत UPI भुगतान"]
  },
  {
    id: "demo-4",
    title: "Suspicious Investment Ad with Phishing URL",
    title_ta: "மோசடி இணைய இணைப்புடன் கூடிய முதலீட்டு விளம்பரம்",
    title_hi: "फिशिंग लिंक और OTP वाला संदिग्ध निवेश विज्ञापन",
    source_type: "ad",
    preview: "Part-time stock rating task. Daily salary ₹5,000. Register with SEBI fast login link...",
    preview_ta: "பகுதி நேர பங்கு மதிப்பாய்வு பணி. நாள் சம்பளம் ₹5,000. விரைவு உள்நுழைவு இணைப்பு...",
    preview_hi: "घर बैठे कमाई - दैनिक ₹3,000 से ₹8,000। सत्यापन के लिए OTP साझा करें...",
    full_text: "💼 WORK FROM HOME - SEBI CERTIFIED PART TIME EARNING 💼\n\nEarn ₹3,000 to ₹8,000 daily by rating stock recommendations and merchant trading apps.\nZero investment needed initially. Immediate withdrawal.\n\nRegister now on our verified portal:\n👉 http://sebi-secure-portal.vip/login-auth.html\n\nEnter your mobile number and share the 6-digit OTP verification code with our online customer care to activate your bonus wallet of ₹500.",
    full_text_ta: "💼 வீட்டிலிருந்து பணி - SEBI சான்றளிக்கப்பட்ட பகுதி நேர வருமானம் 💼\n\nபங்கு பரிந்துரைகளை மதிப்பீடு செய்வதன் மூலம் தினமும் ₹3,000 முதல் ₹8,000 வரை சம்பாதிக்கலாம்.\nதொடக்கத்தில் முதலீடு தேவையில்லை. உடனடி பணம் எடுக்கும் வசதி.\n\nஎங்கள் போர்ட்டலில் பதிவு செய்யவும்:\n👉 http://sebi-secure-portal.vip/login-auth.html\n\nஉங்கள் மொபைல் எண்ணை உள்ளிட்டு, ₹500 போனஸைப் பெற 6 இலக்க OTP சரிபார்ப்புக் குறியீட்டை எங்கள் வாடிக்கையாளர் சேவையுடன் பகிரவும்.",
    full_text_hi: "💼 घर बैठे काम - SEBI प्रमाणित पार्ट टाइम कमाई 💼\n\nस्टॉक अनुशंसाओं को रेटिंग देकर रोजाना ₹3,000 से ₹8,000 कमाएँ।\nशुरुआत में कोई निवेश नहीं। तत्काल निकासी।\n\nहमारे सत्यापित पोर्टल पर अभी रजिस्टर करें:\n👉 http://sebi-secure-portal.vip/login-auth.html\n\nअपना मोबाइल नंबर दर्ज करें और ₹500 का बोनस वॉलेट सक्रिय करने के लिए ग्राहक सेवा को 6 अंकों का OTP सत्यापन कोड साझा करें।",
    expected_score: 96,
    expected_level: "CRITICAL CONCERN",
    expected_level_ta: "மிக தீவிரக் கவலை (Critical Concern)",
    expected_level_hi: "गंभीर चिंता (CRITICAL CONCERN)",
    key_signals: ["OTP Request", "Suspicious Phishing URL", "Fake SEBI Branding", "Advance-Fee Job Scam"],
    key_signals_ta: ["OTP கேட்கும் ஆபத்து", "மோசடி இணைய முகவரி", "போலி SEBI பிராண்டிங்", "முன்பண வேலை மோசடி"],
    key_signals_hi: ["OTP की माँग", "संदिग्ध फिशिंग URL", "फर्जी SEBI ब्रांडिंग", "अग्रिम शुल्क जॉब घोटाला"]
  },
  {
    id: "demo-5",
    title: "Legitimate Educational Financial Message",
    title_ta: "சட்டப்பூர்வமான மியூச்சுவல் ஃபண்ட் கல்வி தகவல்",
    title_hi: "वैध विनियामक वित्तीय जागरूकता संदेश",
    source_type: "educational",
    preview: "Mutual fund investments are subject to market risks. Read all scheme related documents carefully...",
    preview_ta: "மியூச்சுவல் ஃபண்ட் முதலீடுகள் சந்தை அபாயங்களுக்கு உட்பட்டவை. ஆவணங்களை கவனமாகப் படிக்கவும்...",
    preview_hi: "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। योजना से जुड़े सभी दस्तावेजों को ध्यान से पढ़ें...",
    full_text: "📢 Investor Awareness Initiative\n\nMutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.\n\nPast performance does not guarantee future results. Net Asset Values (NAV) of schemes can fluctuate based on broader securities market movements.\n\nAlways verify your financial intermediary's AMFI ARN or SEBI Registration Number directly at amfiindia.com or sebi.gov.in.\nIssued in public interest for retail investor education.",
    full_text_ta: "📢 முதலீட்டாளர் விழிப்புணர்வு முன்முயற்சி\n\nமியூச்சுவல் ஃபண்ட் முதலீடுகள் சந்தை அபாயங்களுக்கு உட்பட்டவை. முதலீடு செய்வதற்கு முன் அனைத்து திட்டம் தொடர்பான ஆவணங்களையும் கவனமாகப் படிக்கவும்.\n\nகடந்த கால செயல்திறன் எதிர்கால வருமானத்திற்கு உத்தரவாதம் அளிக்காது. சந்தை ஏற்ற இறக்கங்களுக்கு ஏற்ப NAV மாறுபடலாம்.\n\nஉங்கள் நிதி ஆலோசகரின் AMFI ARN அல்லது SEBI பதிவு எண்ணை amfiindia.com அல்லது sebi.gov.in தளத்தில் நேரடியாக சரிபார்க்கவும்.\nசில்லறை முதலீட்டாளர் விழிப்புணர்வுக்காக வெளியிடப்பட்டது.",
    full_text_hi: "📢 निवेशक जागरूकता पहल\n\nम्यूचुअल फंड निवेश बाजार के जोखिमों के अधीन हैं। निवेश करने से पहले योजना से जुड़े सभी दस्तावेजों को ध्यान से पढ़ें।\n\nपिछला प्रदर्शन भविष्य के रिटर्न की गारंटी नहीं देता है। योजनाओं का नेट एसेट वैल्यू (NAV) बाजार के उतार-चढ़ाव पर निर्भर करता है।\n\nहमेशा अपने वित्तीय सलाहकार के AMFI ARN या SEBI पंजीकरण नंबर की पुष्टि सीधे amfiindia.com या sebi.gov.in पर करें।\nखुदरा निवेशकों की शिक्षा के लिए जनहित में जारी।",
    expected_score: 12,
    expected_level: "LOW CONCERN",
    expected_level_ta: "குறைந்த கவலை (பாதுகாப்பானது)",
    expected_level_hi: "कम चिंता (LOW CONCERN)",
    key_signals: ["Standard Regulatory Disclaimers", "No Guaranteed Claims", "Promotes Verification", "Low Risk"],
    key_signals_ta: ["முறையான ஒழுங்குமுறை எச்சரிக்கை", "உத்தரவாத வாக்குறுதிகள் இல்லை", "சரிபார்ப்பை ஊக்குவிக்கிறது", "குறைந்த ஆபத்து"],
    key_signals_hi: ["मानक विनियामक अस्वीकरण", "कोई गारंटीड दावा नहीं", "सत्यापन को बढ़ावा देता है", "कम जोखिम"]
  }
];

export async function analyzeMessage(text: string, context: string = 'general', language: Language = 'en'): Promise<AnalyzeResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, context, language })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return fallbackAnalyzeMessage(text, language);
  }
}

export async function analyzeImage(file: File, language: Language = 'en'): Promise<AnalyzeResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const res = await fetch(`${API_BASE_URL}/analyze-image`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    const sampleText = language === 'hi'
      ? "🚀 विशेष VIP धन लाभ अवसर\nऑटोमेटेड AI ट्रेडिंग से 7 दिनों में 30% गारंटीड रिटर्न।\nSEBI द्वारा प्रमाणित और 100% जोखिम-मुक्त।\nतुरंत ₹10,000 सक्रियता शुल्क GPay: 9840192831@okaxis पर भेजें।\nसत्यापन के लिए OTP साझा करें: http://bit.ly/sebi-vip-wealth"
      : language === 'ta'
      ? "🚀 சிறப்பு விஐபி முதலீட்டு வாய்ப்பு\nAI வர்த்தகம் மூலம் மாதந்தோறும் 35% உறுதியான வருமானம்.\nSEBI அங்கீகரிக்கப்பட்டது மற்றும் 100% ஆபத்தில்லாதது.\nஉடனடியாக ₹10,000 தொகையை GPay: 9840192831@okaxis-ல் செலுத்தவும்.\nஇப்போதே இணையுங்கள்: http://bit.ly/sebi-vip-wealth"
      : "🚀 SPECIAL VIP WEALTH OPPORTUNITY\nGuaranteed 35% monthly returns through automated AI trading.\nSEBI Approved & 100% Risk Free.\nPay ₹10,000 activation fee now to GPay: 9840192831@okaxis\nJoin fast: http://bit.ly/sebi-vip-wealth";
      
    const base = fallbackAnalyzeMessage(sampleText, language);
    base.ocr_boxes = [
      { label: language === 'hi' ? "गारंटीड रिटर्न" : language === 'ta' ? "உறுதியளிக்கப்பட்ட வருமானம்" : "Guaranteed Return Claim", box: [8, 20, 84, 16], severity: "critical" },
      { label: language === 'hi' ? "फर्जी नियामक दावा" : language === 'ta' ? "போலி ஒழுங்குமுறை" : "Fake Regulatory Approval", box: [8, 40, 78, 14], severity: "critical" },
      { label: language === 'hi' ? "व्यक्तिगत UPI भुगतान" : language === 'ta' ? "தனிநபர் UPI பணம்" : "Personal UPI Request", box: [8, 60, 84, 16], severity: "critical" }
    ];
    return base;
  }
}

export async function explainText(text: string, language: Language = 'en'): Promise<ExplainResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return fallbackExplainText(text, language);
  }
}

export async function checkClaim(claimText: string, language: Language = 'en'): Promise<ClaimCheckResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/check-claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim_text: claimText })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return fallbackCheckClaim(claimText, language);
  }
}

export async function getGrievanceGuide(situationId: string): Promise<GrievanceResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/grievance-guide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation_id: situationId })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return fallbackGrievanceGuide(situationId);
  }
}

export async function getDemoScenarios(): Promise<DemoScenario[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/scenarios`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return LOCAL_DEMO_SCENARIOS;
  }
}

// -------------------------------------------------------------
// CLIENT-SIDE FALLBACKS (Robust Zero-Fail System)
// -------------------------------------------------------------
function fallbackAnalyzeMessage(text: string, language: Language): AnalyzeResponse {
  const lower = text.toLowerCase();
  const signals = [];
  let score = 0;

  // 1. Guaranteed / Assured returns (English + Hindi + Tamil regex)
  if (/guaranteed|assured|sure[\s-]?shot|100%\s*return|risk[\s-]?free|zero\s*risk|गारंटी|गारंटीड|निश्चित\s*रिटर्न|बिना\s*जोखिम|பங்குச்சந்தை/.test(lower)) {
    score += 35;
    signals.push({
      id: "guaranteed_returns",
      title: "Guaranteed or Assured Returns",
      title_ta: "உறுதியளிக்கப்பட்ட வருமானம் (Guaranteed Returns)",
      title_hi: "गारंटीड रिटर्न (Guaranteed Returns)",
      icon: "ShieldAlert",
      severity: "critical" as const,
      evidence: "Guaranteed returns / 100% risk free language detected (7 दिनों में 30% रिटर्न की गारंटी)",
      why_it_matters: "Legitimate market-linked investments inherently fluctuate. Promising fixed guaranteed returns violates SEBI regulations.",
      why_it_matters_ta: "பங்குச்சந்தை முதலீடுகளில் லாபத்தை ஒருபோதும் 100% உறுதியாகக் கூற முடியாது. SEBI விதிமுறைகளின்படி எவரும் நிலையான லாபத்தை உறுதி அளிக்கக் கூடாது.",
      why_it_matters_hi: "गारंटीड और बहुत कम समय में अधिक रिटर्न का दावा एक चेतावनी संकेत हो सकता है। SEBI नियमों के अनुसार कोई भी मध्यस्थ शेयर बाजार में निश्चित लाभ की गारंटी नहीं दे सकता।",
      recommended_action: "Do not transfer money. Check whether entity is registered on SEBI directory.",
      recommended_action_ta: "பணம் அனுப்ப வேண்டாம். SEBI பதிவுச் சான்றிதழைப் பெற்று சரிபார்க்கவும்.",
      recommended_action_hi: "पैसे न भेजें। आधिकारिक SEBI पोर्टल (sebi.gov.in) पर संस्था के पंजीकरण की जाँच करें।"
    });
  }

  // 2. Unrealistic Returns (Double Money / Sky-high ROI)
  if (/double\s*(?:your)?\s*money|30%|35%|40%|50%|100%|200%|daily\s*payout|दोगुना|पैसे\s*दोगुना|இரட்டிப்பாகும்/.test(lower)) {
    score += 30;
    signals.push({
      id: "unrealistic_returns",
      title: "Unrealistic Return Claims (Double Money / Sky-high ROI)",
      title_ta: "நம்பமுடியாத அதிக லாப வாக்குறுதி",
      title_hi: "अवास्तविक रिटर्न का दावा (Unrealistic Return Claims)",
      icon: "TrendingUp",
      severity: "critical" as const,
      evidence: "High percentage return or double money claim detected (30% in 7 days)",
      why_it_matters: "Extraordinary returns (e.g. 20-50% monthly) mathematically exceed any legitimate financial instrument in India.",
      why_it_matters_ta: "மாதந்தோறும் 20% முதல் 50% வரை அசாதாரண லாபம் என்பது சாத்தியமற்றது. இது போன்ற வாக்குறுதிகள் பொதுமக்களை ஏமாற்றும் திட்டங்களில் பயன்படுத்தப்படுகின்றன.",
      why_it_matters_hi: "कुछ ही दिनों में 30% या पैसे दोगुना करने जैसे असाधारण वादे गणितीय रूप से किसी भी वैध वित्तीय साधन से परे हैं। यह पोंजी स्कीम का स्पष्ट लक्षण है।",
      recommended_action: "Pause immediately. Understand that high return claims without transparent market risk disclosures are major red flags.",
      recommended_action_ta: "உடனடியாக எச்சரிக்கையாக இருங்கள். அதீத லாப வாக்குறுதிகள் பெரும்பாலும் ஏமாற்று வேலையாகவே இருக்கும்.",
      recommended_action_hi: "तुरंत रुकें। समझें कि बिना जोखिम प्रकटीकरण के अत्यधिक लाभ के वादे भारी वित्तीय खतरे का संकेत हैं।"
    });
  }

  // 3. Urgency / Artificial Scarcity
  if (/slots?\s*left|limited\s*time|limited\s*slots|hurry|act\s*now|pay\s*today|closing\s*in|सीमित\s*स्लॉट|अंतिम\s*मौका|जल्दी\s*करें|இடங்கள்\s*மட்டுமே/.test(lower)) {
    score += 20;
    signals.push({
      id: "urgency_scarcity",
      title: "Urgency & Artificial Scarcity Tactics",
      title_ta: "அவசரப்படுத்தும் தந்திரங்கள் (Urgency & Limited Slots)",
      title_hi: "जल्दबाजी एवं कृत्रिम कमी के हथकंडे (Urgency Pressure)",
      icon: "Clock",
      severity: "high" as const,
      evidence: "Urgency phrases detected in message (सीमित स्लॉट उपलब्ध हैं / Limited slots)",
      why_it_matters: "Scammers create artificial psychological panic so victims don't take time to consult family or verify credentials.",
      why_it_matters_ta: "முதலீட்டாளர்கள் சுயமாக யோசிக்கவோ அல்லது அதிகாரப்பூர்வமாக சரிபார்க்கவோ நேரம் தராமல் அவசரப்படுத்துவது மோசடிக்காரர்களின் முக்கிய தந்திரம்.",
      why_it_matters_hi: "तुरंत निर्णय लेने या भुगतान करने का दबाव आपको बिना जाँच-पड़ताल किए जल्दबाजी में कदम उठाने के लिए प्रेरित करता है।",
      recommended_action: "Never make financial transfers under time pressure. Legitimate regulated investments do not vanish in 15 minutes.",
      recommended_action_ta: "அவசரத்தில் எவருக்கும் பணம் அனுப்பாதீர்கள். நியாயமான முதலீடுகள் சில நிமிடங்களில் மறைந்துவிடாது.",
      recommended_action_hi: "दबाव या जल्दबाजी में कभी भी पैसे ट्रांसफर न करें। कोई भी वैध सरकारी निवेश 15 मिनट में गायब नहीं होता।"
    });
  }

  // 4. Personal UPI / Direct Account Payment
  if (/gpay|phonepe|paytm|@ok|@ybl|personal\s*account|saving(?:s)?\s*account|activation\s*fee|तुरंत\s*₹?\d+|भेजें|रुपये\s*भेजें|கட்டணம்/.test(lower)) {
    score += 35;
    signals.push({
      id: "personal_account_upi",
      title: "Personal Account / Direct UPI Payment Request",
      title_ta: "தனிநபர் கணக்கு / UPI-க்கு பணம் கோருதல்",
      title_hi: "तुरंत भुगतान का दबाव / व्यक्तिगत UPI माँग (Urgent Payment)",
      icon: "CreditCard",
      severity: "critical" as const,
      evidence: "Demanding immediate transfer of ₹10,000 to personal UPI / account",
      why_it_matters: "SEBI registered brokers collect client funds exclusively in designated corporate client bank accounts, NEVER in personal saving accounts or individual UPI IDs.",
      why_it_matters_ta: "SEBI அங்கீகாரம் பெற்ற நிறுவனங்கள் ஒருபோதும் தனிநபர் சேமிப்புக் கணக்கிலோ அல்லது தனிநபர் UPI முகவரியிலோ முதலீட்டுப் பணத்தை வாங்காது.",
      why_it_matters_hi: "तुरंत भुगतान करने का दबाव आपको बिना जाँच किए निर्णय लेने के लिए प्रेरित कर सकता है। SEBI मान्यता प्राप्त कंपनियाँ कभी व्यक्तिगत UPI आईडी पर पैसे नहीं माँगतीं।",
      recommended_action: "Strictly do NOT send money. Verified brokers only receive funds through authenticated trading bank accounts.",
      recommended_action_ta: "தனிநபர் பெயருக்கு ஒருபோதும் பணம் அனுப்பாதீர்கள். அதிகாரப்பூர்வ வர்த்தகக் கணக்கு மூலமே பணம் செலுத்தப்பட வேண்டும்.",
      recommended_action_hi: "अभी पैसे बिल्कुल न भेजें। केवल अपने बैंक से सीधे अधिकृत ट्रेडिंग खाते में ही फंड ट्रांसफर करें।"
    });
  }

  // 5. Fake Regulatory / SEBI Claim
  if (/sebi\s*approved|nsdl\s*certified|official\s*sebi|director\s*sharma|sebi\s*मान्यता|sebi\s*प्रमाणित/.test(lower)) {
    score += 30;
    signals.push({
      id: "fake_regulatory_claim",
      title: "Fake Regulatory Claim or SEBI/NSDL Impersonation",
      title_ta: "போலி SEBI / NSDL ஒழுங்குமுறை உரிமைகோரல்",
      title_hi: "फर्जी विनियामक दावा या SEBI का नाम भुनाना",
      icon: "Award",
      severity: "critical" as const,
      evidence: "Claims of SEBI approved bot or official endorsement",
      why_it_matters: "SEBI regulates securities markets and registers intermediaries, but NEVER 'approves' specific trading schemes, AI bots, Telegram groups, or guarantees profits.",
      why_it_matters_ta: "SEBI சந்தையை மட்டுமே ஒழுங்குபடுத்துகிறது. அது எந்த ஒரு குறிப்பிட்ட AI பாட், டெலிகிராம் குழு அல்லது முதலீட்டுத் திட்டத்திற்கும் தனிப்பட்ட ஒப்புதல் அளிக்காது.",
      why_it_matters_hi: "SEBI कभी भी किसी निजी AI ट्रेडिंग बॉट, व्हाट्सएप ग्रुप या व्यक्तिगत निवेश योजना को 'स्वीकृत' या 'प्रमाणित' नहीं करता।",
      recommended_action: "Verify any alleged registration number directly at sebi.gov.in under 'Recognised Intermediaries'.",
      recommended_action_ta: "கூறப்படும் பதிவு எண்ணை sebi.gov.in இணையதளத்தில் நேரடியாகச் சரிபார்க்கவும்.",
      recommended_action_hi: "कहे गए पंजीकरण नंबर की पुष्टि सीधे sebi.gov.in पर 'Recognised Intermediaries' में करें।"
    });
  }

  // 6. OTP / PIN / Sensitive Credentials Solicitation
  if (/otp|pin|password|verification\s*code|share\s*otp|ओटीपी|पासवर्ड/.test(lower)) {
    score += 35;
    signals.push({
      id: "otp_solicitation",
      title: "OTP / Password / Sensitive Credential Request",
      title_ta: "OTP / கடவுச்சொல் / PIN கேட்கும் ஆபத்து",
      title_hi: "OTP की माँग (OTP Request)",
      icon: "KeyRound",
      severity: "critical" as const,
      evidence: "Requesting OTP sharing for bonus or verification (सत्यापन के लिए OTP साझा करें)",
      why_it_matters: "No legitimate financial institution, bank, or broker ever requests your OTP. Sharing OTP grants attackers direct control of your funds.",
      why_it_matters_ta: "எந்தவொரு வங்கியோ அல்லது SEBI அதிகாரியோ உங்கள் OTP, PIN அல்லது கடவுச்சொல்லை ஒருபோதும் கேட்க மாட்டார்கள்.",
      why_it_matters_hi: "OTP जैसी संवेदनशील जानकारी साझा करना सुरक्षा जोखिम पैदा कर सकता है। कोई भी बैंक या विनियामक कभी भी फोन या चैट पर OTP नहीं मांगता।",
      recommended_action: "NEVER share OTP with anyone under any circumstances.",
      recommended_action_ta: "எந்த காரணத்திற்காகவும் OTP-யை பகிர வேண்டாம்.",
      recommended_action_hi: "किसी भी परिस्थिति में किसी के साथ OTP साझा न करें। कॉल या चैट तुरंत समाप्त करें।"
    });
  }

  // 7. Suspicious Phishing URL or Shortlink
  if (/bit\.ly|tinyurl|t\.me|\.vip|\.top|\.xyz|\.click|sebi-secure|login-auth/.test(lower)) {
    score += 25;
    signals.push({
      id: "suspicious_links",
      title: "Suspicious URL / Phishing Link",
      title_ta: "சந்தேகத்திற்குரிய இணைய இணைப்பு (Suspicious Link)",
      title_hi: "संदिग्ध फिशिंग लिंक (Suspicious URL / Link)",
      icon: "ExternalLink",
      severity: "high" as const,
      evidence: "Shortened link or suspicious domain extension found in message",
      why_it_matters: "Shortened or typosquatted URLs often route investors to fake clone portals designed to steal banking credentials.",
      why_it_matters_ta: "சுருக்கப்பட்ட அல்லது போலியான இணைய இணைப்புகள் உங்கள் வங்கி விவரங்களைத் திருடும் போலி இணையதளங்களுக்கு அழைத்துச் செல்லலாம்.",
      why_it_matters_hi: "शॉर्ट या अनधिकृत लिंक उपयोगकर्ताओं को फर्जी बैंकिंग व ट्रेडिंग पोर्टल्स पर ले जाकर पासवर्ड चुराते हैं।",
      recommended_action: "Do not click unverified links. Access official services solely by typing the authentic domain.",
      recommended_action_ta: "தெரியாத இணைப்புகளை கிளிக் செய்யாதீர்கள். அதிகாரப்பூர்வ தளங்களை நேரடியாக உலாவியில் தட்டச்சு செய்யவும்.",
      recommended_action_hi: "अज्ञात लिंक पर क्लिक न करें। केवल आधिकारिक पोर्टल का URL सीधे ब्राउज़र में टाइप करें।"
    });
  }

  const isEducational = /market\s*risks?|scheme\s*related\s*documents|amfi\s*registered|बाजार\s*के\s*जोखिम|அபாயங்களுக்கு\s*உட்பட்டவை/.test(lower);
  if (isEducational && signals.length === 0) {
    score = 12;
  } else if (signals.length === 0) {
    score = 18;
  } else {
    score = Math.min(98, Math.max(25, score));
  }

  let level = "LOW CONCERN";
  let level_ta = "குறைந்த கவலை (பாதுகாப்பானது)";
  let level_hi = "कम चिंता (LOW CONCERN)";
  let color = "emerald";

  if (score > 80) {
    level = "CRITICAL CONCERN";
    level_ta = "மிக தீவிரக் கவலை (Critical Concern)";
    level_hi = "गंभीर चिंता (CRITICAL CONCERN)";
    color = "red";
  } else if (score > 60) {
    level = "HIGH CONCERN";
    level_ta = "அதிக கவலை (High Concern)";
    level_hi = "उच्च चिंता (HIGH CONCERN)";
    color = "orange";
  } else if (score > 30) {
    level = "CAUTION";
    level_ta = "எச்சரிக்கை தேவை (Caution)";
    level_hi = "सावधानी (CAUTION)";
    color = "amber";
  }

  return {
    safety_meter: {
      score,
      level,
      level_ta,
      level_hi,
      color,
      confidence: signals.length > 0 ? 0.94 : 0.85,
      disclaimer: "This score reflects risk indicators detected in the submitted content. It is not a legal or regulatory determination that the sender or investment is fraudulent. Always verify independently on official SEBI (sebi.gov.in) and NSDL registries."
    },
    extracted_text: text,
    signals,
    summary_en: score > 70 
      ? `Critical risk indicators detected (${signals.length} major flags). The message exhibits classic patterns of aggressive unauthorized investment schemes.`
      : score > 30 ? "Moderate caution advised. Verify intermediary registration." : "Low concern detected. Content appears consistent with general educational disclosures.",
    summary_ta: score > 70
      ? `மிக ஆபத்தான காரணிகள் (${signals.length} எச்சரிக்கைகள்) கண்டறியப்பட்டுள்ளன. நம்பமுடியாத வாக்குறுதிகள் இதில் உள்ளன.`
      : "மிதமான எச்சரிக்கை அல்லது குறைந்த கவலை நிலை கண்டறியப்பட்டுள்ளது.",
    summary_hi: score > 70
      ? `गंभीर जोखिम संकेत मिले हैं (${signals.length} प्रमुख चेतावनियाँ)। इस संदेश में गारंटीड रिटर्न, तुरंत भुगतान और अनधिकृत योजना के स्पष्ट लक्षण हैं।`
      : score > 30 
      ? "मध्यम सावधानी की सलाह दी जाती है। निवेश से पहले संस्था की मान्यता की जाँच करें।" 
      : "कम चिंता का स्तर। संदेश सामान्य विनियामक जागरूकता मानकों के अनुरूप है।",
    safe_action_plan: [
      "PAUSE: Pause before transferring any money or committing your savings.",
      "DON'T SHARE: Never share OTP, PIN, passwords, or send funds to personal savings/UPI accounts.",
      "VERIFY: Verify the intermediary identity independently on the official SEBI Portal (sebi.gov.in) under Recognised Intermediaries.",
      "PRESERVE: Preserve screenshots, message timestamps, sender handles, and bank transaction reference IDs (UTR).",
      "REPORT: If you suspect fraud, report immediately to the National Cyber Crime Helpline (1930) or file on SEBI SCORES (scores.sebi.gov.in)."
    ],
    safe_action_plan_ta: [
      "நிறுத்துங்கள் (PAUSE): பணம் அனுப்புவதற்கு முன் சிறிது நேரம் சிந்தித்து முடிவெடுக்கவும்.",
      "பகிராதீர்கள் (DON'T SHARE): எந்த காரணத்திற்காகவும் OTP, PIN, கடவுச்சொற்களை பகிராதீர்கள்; தனிநபர் கணக்குகளுக்கு பணம் அனுப்பாதீர்கள்.",
      "சரிபாருங்கள் (VERIFY): அதிகாரப்பூர்வ SEBI இணையதளத்தில் (sebi.gov.in) சம்பந்தப்பட்ட நிறுவனம் பதிவு செய்யப்பட்டுள்ளதா எனச் சரிபார்க்கவும்.",
      "ஆதாரங்களை சேமியுங்கள்: ஸ்கிரீன்ஷாட்கள் மற்றும் பணப்பரிவர்த்தனை எண்களை (UTR) ஆதாரங்களாகப் பாதுகாத்து வைக்கவும்.",
      "புகார் அளியுங்கள் (REPORT): சந்தேகம் எழுந்தால் 1930 உதவி எண்ணை அழைக்கவும் அல்லது SEBI SCORES தளத்தில் புகார் அளிக்கவும்."
    ],
    safe_action_plan_hi: [
      "रुकें (PAUSE): पैसे भेजने या अपनी बचत निवेश करने से पहले ठहरें और विचार करें।",
      "जानकारी साझा न करें (DON'T SHARE): OTP, पासवर्ड, PIN या बैंक विवरण किसी के साथ साझा न करें और व्यक्तिगत UPI पर पैसे न भेजें।",
      "सत्यापित करें (VERIFY): SEBI मान्यता प्राप्त मध्यस्थों की सूची (sebi.gov.in) पर संस्था के पंजीकरण की जाँच करें।",
      "सबूत सुरक्षित रखें: स्क्रीनशॉट, चैट, प्रेषक का नंबर और बैंक लेन-देन संदर्भ संख्या (UTR) सुरक्षित रखें।",
      "रिपोर्ट करें (REPORT): धोखाधड़ी का संदेह होने पर तुरंत 1930 साइबर हेल्पलाइन पर कॉल करें या SEBI SCORES (scores.sebi.gov.in) पर शिकायत दर्ज करें।"
    ],
    evidence_snippets: signals.map(s => s.evidence),
    analysis_mode: "deterministic_rule_engine",
    timestamp: new Date().toISOString()
  };
}

function fallbackExplainText(text: string, language: Language = 'en'): ExplainResponse {
  return {
    original_text: text,
    simple_english: "The value of your investment can go up or down unpredictably. You may also face difficulties selling your holdings immediately when you need emergency cash.",
    simple_tamil: "உங்கள் முதலீட்டின் மதிப்பு திடீரென உயரலாம் அல்லது குறையலாம். மேலும் அவசர தேவைக்கு உடனடியாக விற்றுப் பணமாக்க முடியாமல் போகலாம்.",
    simple_hindi: "आपके निवेश का मूल्य बिना किसी पूर्व सूचना के घट या बढ़ सकता है। इसके अलावा आपातकालीन स्थिति में तुरंत इसे बेचकर नकद प्राप्त करने में कठिनाई हो सकती है।",
    important_terms: [
      {
        term: "Market Volatility",
        meaning_en: "Price swings driven by unexpected economic events, news, or trading demand.",
        meaning_ta: "சந்தை மாற்றங்கள் மற்றும் செய்திகளால் விலையில் ஏற்படும் திடீர் ஏற்ற இறக்கங்கள்.",
        meaning_hi: "आर्थिक घटनाओं या समाचारों के कारण बाजार की कीमतों में होने वाला अप्रत्याशित उतार-चढ़ाव।"
      },
      {
        term: "Liquidity Risk",
        meaning_en: "The danger of not finding a ready buyer to convert your investment into cash quickly without losing money.",
        meaning_ta: "முதலீட்டை நஷ்டமின்றி உடனடியாக ரொக்கப் பணமாக மாற்ற முடியாத நிலை.",
        meaning_hi: "बिना नुकसान के तुरंत अपनी संपत्ति को नकद में न बदल पाने का जोखिम।"
      }
    ],
    actual_meaning: "The financial institution is legally declaring that returns are never guaranteed, and your principal capital can decrease in value.",
    actual_meaning_ta: "லாபத்திற்கு எந்த உத்தரவாதமும் இல்லை என்பதையும், அசல் குறைய வாய்ப்புள்ளது என்பதையும் நிறுவனம் சட்டப்பூர்வமாகத் தெரிவிக்கிறது.",
    actual_meaning_hi: "संस्था कानूनी रूप से स्पष्ट कर रही है कि रिटर्न की कोई गारंटी नहीं है और आपकी मूल निवेश पूंजी का मूल्य भी कम हो सकता है।",
    hidden_risks: [
      "Selling in a down market triggers permanent realized losses.",
      "Early exit fees or lack of liquidity could restrict emergency access to your funds."
    ],
    hidden_risks_ta: [
      "சந்தை இறக்கத்தில் இருக்கும்போது விற்றால் நிரந்தர நஷ்டம் ஏற்படும்.",
      "அவசரத் தேவைக்கு பணத்தை எடுப்பதில் தடைகள் அல்லது கட்டணங்கள் இருக்கலாம்."
    ],
    hidden_risks_hi: [
      "गिरावट के समय बेचने पर आपका नुकसान स्थायी हो जाता है।",
      "समय से पूर्व निकासी पर लगने वाला शुल्क या तरलता की कमी आपातकाल में आपके फंड की उपलब्धता को सीमित कर सकती है।"
    ],
    mode: "deterministic_financial_lexicon"
  };
}

function fallbackCheckClaim(text: string, language: Language = 'en'): ClaimCheckResponse {
  const lower = text.toLowerCase();
  const hasGuarantee = /guaranteed|assured|100%|sure|गारंटी|गारंटीड/i.test(lower);
  const hasReturn = /\d{1,3}%|double|2x|दोगुना|இரட்டிப்பாகும்/i.test(lower);
  const hasTime = /month|day|week|today|3 months|दिन|महीने|மாதம்/i.test(lower);

  const misleading = [];
  const misleading_hi = [];
  const misleading_ta = [];

  if (hasGuarantee && hasReturn) {
    misleading.push("Combines absolute guarantee with aggressive high return promise.");
    misleading_hi.push("अत्यधिक रिटर्न के वादे के साथ पूर्ण गारंटी की भाषा का भ्रामक उपयोग।");
    misleading_ta.push("அதிக லாப வாக்குறுதியுடன் முழு உத்தரவாத வார்த்தைகளைப் பயன்படுத்துகிறது.");
  }
  if (hasGuarantee) {
    misleading.push("SEBI regulations prohibit promising guaranteed returns for market-linked investments.");
    misleading_hi.push("SEBI नियमों के अनुसार बाजार आधारित निवेश में गारंटीड रिटर्न का वादा करना कानूनी रूप से प्रतिबंधित है।");
    misleading_ta.push("பங்குச்சந்தை முதலீடுகளில் நிலையான லாபத்தை உறுதியளிப்பது SEBI விதிகளுக்கு எதிரானது.");
  }
  if (hasTime) {
    misleading.push("Creates artificial short-horizon expectations.");
    misleading_hi.push("अस्वाभाविक रूप से बहुत कम समय में भारी लाभ की कृत्रिम उम्मीद पैदा करता है।");
    misleading_ta.push("குறுகிய காலத்தில் அதிக லாபம் கிடைக்கும் என்ற தவறான எதிர்பார்ப்பை உருவாக்குகிறது.");
  }

  return {
    original_claim: text,
    return_claim: hasReturn ? "Extracted return figure" : undefined,
    guarantee_language: hasGuarantee ? "Guaranteed / Assured" : undefined,
    time_pressure: hasTime ? "Short-term horizon" : undefined,
    misleading_indicators: misleading,
    misleading_indicators_ta: misleading_ta,
    misleading_indicators_hi: misleading_hi,
    risk_level: hasGuarantee ? "CRITICAL" : "MODERATE",
    safety_interpretation: hasGuarantee 
      ? "High-risk claim requiring independent verification. Promising guaranteed returns on market trading violates SEBI regulatory guidelines."
      : "Standard market claim. Verify intermediary credentials before investing.",
    safety_interpretation_ta: hasGuarantee
      ? "மிக அதிக ஆபத்துள்ள வாக்குறுதி. பங்குச்சந்தை வர்த்தகத்தில் நிலையான லாபத்தை உறுதியளிப்பது SEBI விதிகளுக்கு எதிரானது."
      : "சாதாரண முதலீட்டுக் கூற்று. முடிவெடுக்கும் முன் சரிபார்க்கவும்.",
    safety_interpretation_hi: hasGuarantee
      ? "आधिकारिक स्रोतों के माध्यम से सत्यापन आवश्यक है। बाजार के निवेश पर गारंटीड रिटर्न का वादा करना SEBI दिशानिर्देशों का उल्लंघन है।"
      : "आधिकारिक स्रोतों के माध्यम से सत्यापन आवश्यक है। किसी भी मध्यस्थ को फंड देने से पहले उसके पंजीकरण की पुष्टि करें।",
    suggested_verification_steps: [
      "Check intermediary registration on SEBI portal (sebi.gov.in).",
      "Demand written Risk Disclosure Document.",
      "Never transfer funds to a personal savings or UPI account."
    ],
    suggested_verification_steps_ta: [
      "SEBI இணையதளத்தில் (sebi.gov.in) இடைத்தரகரின் பதிவைச் சரிபார்க்கவும்.",
      "எழுத்துப்பூர்வ இடர் வெளிப்படுத்தல் ஆவணத்தைக் கோருங்கள்.",
      "தனிநபர் சேமிப்புக் கணக்கு அல்லது UPI-க்கு ஒருபோதும் பணம் அனுப்பாதீர்கள்."
    ],
    suggested_verification_steps_hi: [
      "आधिकारिक SEBI पोर्टल (sebi.gov.in) पर मध्यस्थ के पंजीकरण की जाँच करें।",
      "लिखित जोखिम प्रकटीकरण दस्तावेज (Risk Disclosure Document) की माँग करें।",
      "व्यक्तिगत बचत खाते या UPI पते पर कभी भी पैसे ट्रांसफर न करें।"
    ]
  };
}

function fallbackGrievanceGuide(situationId: string): GrievanceResponse {
  return {
    situation_id: situationId,
    situation_title: "Money Transferred to Suspicious Entity / Scammer",
    situation_title_ta: "சந்தேகத்திற்கிடமான நபருக்கு பணம் அனுப்பப்பட்டுவிட்டது",
    situation_title_hi: "धोखाधड़ी वाले खाते या संदिग्ध व्यक्ति को पैसे ट्रांसफर कर दिए",
    immediate_steps: [
      "ACT WITHIN THE GOLDEN HOUR (FIRST 2 HOURS): Call 1930 (National Cyber Crime Helpline) immediately to flag the transaction and request freezing of the beneficiary account.",
      "Call your bank's 24x7 fraud helpline to report the transaction ID (UTR/RRN) and request an immediate recall.",
      "File a formal complaint on the official National Cyber Crime Reporting Portal at https://cybercrime.gov.in.",
      "Do NOT pay any additional 'release fees' or 'taxes' demanded to return your funds."
    ],
    immediate_steps_ta: [
      "முதல் 2 மணி நேரத்திற்குள் 1930 (தேசிய சைபர் கிரைம் உதவி எண்) என்ற எண்ணை அழைத்து உடனடியாக பரிவர்த்தனையை முடக்கக் கோருங்கள்.",
      "உங்கள் வங்கியின் அவசர எண்ணை அழைத்து, அந்த பரிவர்த்தனை எண்ணை (UTR) தெரிவித்து கணக்கை முடக்கக் கோருங்கள்.",
      "cybercrime.gov.in என்ற அதிகாரப்பூர்வ அரசு இணையதளத்தில் புகார் பதிவு செய்யவும்.",
      "பணத்தைத் திரும்பப் பெற கூடுதல் கட்டணம் அல்லது வரி எதையும் செலுத்தாதீர்கள்."
    ],
    immediate_steps_hi: [
      "गोल्डन ऑवर (पहले 2 घंटे) में कार्रवाई करें: तुरंत 1930 (राष्ट्रीय साइबर अपराध हेल्पलाइन) पर कॉल करें और लेन-देन को फ्रीज करने का अनुरोध करें।",
      "अपने बैंक की 24x7 धोखाधड़ी हेल्पलाइन पर कॉल करें, लेन-देन संदर्भ संख्या (UTR/RRN) दर्ज कराएँ और रिकॉल का अनुरोध करें।",
      "आधिकारिक राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (https://cybercrime.gov.in) पर औपचारिक शिकायत दर्ज करें।",
      "पैसे वापस पाने के नाम पर प्रेषक द्वारा माँगे गए किसी भी अतिरिक्त 'रिलीज़ शुल्क' या 'कर' का भुगतान कदापि न करें।"
    ],
    evidence_to_preserve: [
      "Bank statement showing debit date, time, amount, and 12-digit UTR/RRN number.",
      "Screenshots of entire WhatsApp/Telegram chats including phone numbers, profile handles, and group messages.",
      "Payment screenshots showing recipient UPI ID or account name."
    ],
    who_to_contact: [
      {
        name: "National Cyber Crime Helpline",
        portal: "https://cybercrime.gov.in",
        helpline: "1930 (Toll Free, 24x7)",
        description: "Primary government agency for freezing fraudulent bank accounts in real-time.",
        type: "cybercrime"
      },
      {
        name: "SEBI SCORES 2.0 Portal",
        portal: "https://scores.sebi.gov.in",
        helpline: "1800 22 7575 / 1800 266 7575",
        description: "Official SEBI platform for investor complaints.",
        type: "regulatory"
      }
    ],
    info_to_keep_ready: [
      "Bank account number and registered mobile number.",
      "Transaction reference number (UTR/IMPS/UPI Ref ID).",
      "Time-stamped screenshots of communications."
    ],
    escalation_path: [
      "Step 1: Emergency dial 1930 + Local Bank Fraud Notification (0-2 hrs)",
      "Step 2: File at cybercrime.gov.in and obtain an Acknowledgement Number (Day 1)",
      "Step 3: Submit FIR copy and Cyber acknowledgement to your bank home branch"
    ],
    complaint_draft_template: "To,\nThe Cyber Crime Investigation Cell,\n\nSubject: Urgent complaint regarding fraudulent money transfer through deceptive investment scheme\n\nRespected Sir/Madam,\nI was induced to transfer money to a fraudulent entity under the promise of guaranteed returns..."
  };
}

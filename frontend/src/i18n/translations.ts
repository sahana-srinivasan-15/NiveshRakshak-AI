import { Language } from '../types';

export interface TranslationDictionary {
  // Navigation & Branding
  brandName: string;
  brandTagline: string;
  publicGoodBadge: string;
  navHome: string;
  navAnalyze: string;
  navExplain: string;
  navClaim: string;
  navGrievance: string;
  navDashboard: string;
  languageSelectLabel: string;

  // Buttons & Common Actions
  analyzeMessageBtn: string;
  uploadScreenshotBtn: string;
  pasteMessageBtn: string;
  explainTextBtn: string;
  checkClaimBtn: string;
  scanAnotherBtn: string;
  clearBtn: string;
  copyBtn: string;
  copiedBtn: string;
  viewDetailsBtn: string;
  quickTestLabel: string;
  privacyFirstBadge: string;
  noStockTipsBadge: string;
  bilingualBadge: string;

  // Safety Levels & Meter
  meterTitle: string;
  meterSubTitle: string;
  riskEvaluation: string;
  confidenceLabel: string;
  levelCritical: string;
  levelHigh: string;
  levelCaution: string;
  levelLow: string;
  meterDisclaimer: string;

  // Detected Signals
  signalsHeading: string;
  signalsSubHeading: string;
  evidenceLabel: string;
  whyRiskyLabel: string;
  whatToDoLabel: string;
  flagCritical: string;
  flagHigh: string;
  flagCaution: string;
  noSignalsFound: string;
  noSignalsDesc: string;

  // Safe Action Plan
  safeActionTitle: string;
  safeActionSubTitle: string;
  stepPrefix: string;
  officialGatewaysTitle: string;
  actionPause: string;
  actionDontShare: string;
  actionVerify: string;
  actionReport: string;

  // Landing Page
  heroHackathonBadge: string;
  heroHeadline: string;
  heroTagline: string;
  heroDescription: string;
  heroCtaAnalyze: string;
  heroCtaExplain: string;
  heroLiveScannerTitle: string;
  heroIncomingMsgLabel: string;
  heroFlaggedBadge: string;

  // Value Pillars & Features
  whyPauseTitle: string;
  whyPauseDesc: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;

  // Analyzer Page
  analyzerCategory: string;
  analyzerTitle: string;
  analyzerDescription: string;
  quickDemoHeader: string;
  tabPasteText: string;
  tabUploadImage: string;
  inputMessageLabel: string;
  inputMessagePlaceholder: string;
  uploadDropzonePrompt: string;
  uploadDropzoneSubtext: string;
  privacyNote: string;
  analyzingLoader: string;
  reportHeading: string;
  verdictSummaryTitle: string;
  flagsIdentifiedText: string;
  viewRawMessage: string;
  needGrievancePrompt: string;
  needGrievanceDesc: string;
  grievanceAssistantBtn: string;

  // Stepper
  stepIntakeTitle: string;
  stepIntakeDesc: string;
  stepExtractionTitle: string;
  stepExtractionDesc: string;
  stepAnalysisTitle: string;
  stepAnalysisDesc: string;
  stepVerdictTitle: string;
  stepVerdictDesc: string;

  // Visual Annotator
  annotatorTitle: string;
  annotatorSubtitle: string;
  ocrActiveBadge: string;
  legendHighlights: string;
  legendCritical: string;
  legendCaution: string;

  // Explain Page
  explainCategory: string;
  explainTitle: string;
  explainDescription: string;
  selectClausePrompt: string;
  pasteClauseLabel: string;
  pasteClausePlaceholder: string;
  simplifyingLoader: string;
  simplifyBtn: string;
  simpleEnglishTitle: string;
  simpleRegionalTitle: string;
  actualMeaningTitle: string;
  hiddenRisksTitle: string;
  glossaryTitle: string;

  // Claim Checker Page
  claimCategory: string;
  claimTitle: string;
  claimDescription: string;
  sampleClaimsHeader: string;
  claimInputLabel: string;
  claimInputPlaceholder: string;
  claimInputHelper: string;
  checkingLoader: string;
  claimResultTitle: string;
  returnClaimCol: string;
  guaranteeLanguageCol: string;
  timePressureCol: string;
  safetyInterpretationTitle: string;
  misleadingElementsTitle: string;
  mandatoryStepsTitle: string;
  noneSpecified: string;
  noneDetected: string;

  // Grievance Page
  grievanceCategory: string;
  grievanceTitle: string;
  grievanceDescription: string;
  goldenHourBannerTitle: string;
  goldenHourDialPrompt: string;
  goldenHourDesc: string;
  immediateStepsTitle: string;
  evidencePreserveTitle: string;
  authoritiesContactTitle: string;
  complaintDraftTitle: string;
  copyDraftBtn: string;

  // Dashboard Page
  dashboardCategory: string;
  dashboardTitle: string;
  dashboardDescription: string;
  totalScannedKpi: string;
  criticalAlertsKpi: string;
  highAlertsKpi: string;
  cautionAlertsKpi: string;
  riskDistributionTitle: string;
  topScamPatternsTitle: string;
  threatChannelsTitle: string;

  // Footer
  emergencyHelplineTitle: string;
  emergencyHelplineDesc: string;
  footerAboutText: string;
  officialPortalsTitle: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    brandName: "NiveshRakshak AI",
    brandTagline: "Before You Trust. Check with AI.",
    publicGoodBadge: "Public-Good AI • Privacy First",
    navHome: "Home",
    navAnalyze: "Safety Analyzer",
    navExplain: "Explain This",
    navClaim: "Claim Checker",
    navGrievance: "Grievance Guide",
    navDashboard: "Dashboard",
    languageSelectLabel: "Language",

    analyzeMessageBtn: "Analyze Message",
    uploadScreenshotBtn: "Upload Screenshot",
    pasteMessageBtn: "Paste Message",
    explainTextBtn: "Explain Financial Text",
    checkClaimBtn: "Check Claim",
    scanAnotherBtn: "Scan Another",
    clearBtn: "Clear",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    viewDetailsBtn: "View Details",
    quickTestLabel: "1-Click Test",
    privacyFirstBadge: "Privacy-First: Zero data retention",
    noStockTipsBadge: "No stock tips or buy/sell calls",
    bilingualBadge: "English | தமிழ் | हिन्दी Multilingual",

    meterTitle: "Investor Safety Meter",
    meterSubTitle: "Objective Concern Level Based on Detected Signals",
    riskEvaluation: "Risk Evaluation",
    confidenceLabel: "Confidence",
    levelCritical: "CRITICAL CONCERN",
    levelHigh: "HIGH CONCERN",
    levelCaution: "CAUTION",
    levelLow: "LOW CONCERN",
    meterDisclaimer: "This score reflects risk indicators detected in the submitted content. It is not a legal or regulatory determination that the sender or investment is fraudulent. Always verify independently on official SEBI (sebi.gov.in) and NSDL registries.",

    signalsHeading: "Detected Risk Signals",
    signalsSubHeading: "Why should I be careful?",
    evidenceLabel: "Evidence from Message:",
    whyRiskyLabel: "Why it is Risky:",
    whatToDoLabel: "What You Should Do:",
    flagCritical: "CRITICAL FLAG",
    flagHigh: "HIGH CONCERN",
    flagCaution: "CAUTION",
    noSignalsFound: "No High-Risk Fraud Signals Detected",
    noSignalsDesc: "The content does not show common red flags like guaranteed returns or urgency. However, always exercise normal diligence with securities.",

    safeActionTitle: "Before You Act: Safe Action Plan",
    safeActionSubTitle: "PAUSE → UNDERSTAND → VERIFY → ACT SAFELY",
    stepPrefix: "Step",
    officialGatewaysTitle: "Official Verification Gateways",
    actionPause: "PAUSE",
    actionDontShare: "DON'T SHARE",
    actionVerify: "VERIFY",
    actionReport: "REPORT",

    heroHackathonBadge: "Applied AI for Investor Protection • SANGYAN Hackathon",
    heroHeadline: "NiveshRakshak AI",
    heroTagline: "Before You Trust. Check with AI.",
    heroDescription: "Understand suspicious investment messages, detect risk signals, and make safer financial decisions. Designed specifically for Indian retail investors encountering offers on WhatsApp, Telegram, and social media.",
    heroCtaAnalyze: "Analyze an Investment Message",
    heroCtaExplain: "Explain Financial Text",
    heroLiveScannerTitle: "Live Safety Scanner Preview",
    heroIncomingMsgLabel: "Incoming WhatsApp Forward:",
    heroFlaggedBadge: "FLAGGED",

    whyPauseTitle: "Why Pause Before Investing?",
    whyPauseDesc: "Financial scams exploit urgency, FOMO, and artificial trust. NiveshRakshak provides a safe, objective pause layer before funds leave your bank account.",
    feature1Title: "Screenshot & Text Analyzer",
    feature1Desc: "Upload screenshots or paste messages from WhatsApp, Telegram, or ads to extract verbatim risk evidence.",
    feature2Title: "Investor Safety Meter",
    feature2Desc: "A clear 0–100 calibrated safety indicator highlighting severity from Low Concern to Critical Concern.",
    feature3Title: "Plain Language Simplifier",
    feature3Desc: "Translates complex regulatory circulars, F&O risk disclosures, and mutual fund terms into plain, accessible language.",
    feature4Title: "Emergency Grievance Guide",
    feature4Desc: "Direct step-by-step guidance for Golden Hour fraud intervention (1930 Cyber Helpline and SEBI SCORES 2.0).",

    analyzerCategory: "Core Safety Workflow",
    analyzerTitle: "Investor Safety Analyzer",
    analyzerDescription: "Submit suspicious WhatsApp messages, Telegram alerts, social media advertisements, or screenshots to receive an evidence-backed Investor Safety Report.",
    quickDemoHeader: "Quick Demo Scenarios (Select to Auto-Analyze):",
    tabPasteText: "Paste Text / Message",
    tabUploadImage: "Upload Screenshot / Image (OCR)",
    inputMessageLabel: "Investment Message Content:",
    inputMessagePlaceholder: "Paste message here (e.g. 'Earn 30% guaranteed monthly returns, SEBI approved, pay ₹10,000 today...')",
    uploadDropzonePrompt: "Click or Drag & Drop investment screenshot here",
    uploadDropzoneSubtext: "Supports PNG, JPG, WebP. Optical Character Recognition (OCR) will extract text locally.",
    privacyNote: "Local in-memory analysis • No credentials collected",
    analyzingLoader: "Analyzing Signals...",
    reportHeading: "Investor Safety Assessment Report",
    verdictSummaryTitle: "Safety Verdict Summary",
    flagsIdentifiedText: "Flags Identified",
    viewRawMessage: "View Extracted Raw Message",
    needGrievancePrompt: "Already sent funds or suspect fraud?",
    needGrievanceDesc: "Follow our Step-by-Step Grievance Assistant to contact 1930 and file on SEBI SCORES.",
    grievanceAssistantBtn: "Grievance Assistant",

    stepIntakeTitle: "Intake",
    stepIntakeDesc: "Message / Screenshot",
    stepExtractionTitle: "Extraction",
    stepExtractionDesc: "OCR & Pattern Parser",
    stepAnalysisTitle: "Analysis",
    stepAnalysisDesc: "Safety Signal Engine",
    stepVerdictTitle: "Verdict",
    stepVerdictDesc: "Safety Meter & Plan",

    annotatorTitle: "Visual Signal Annotator",
    annotatorSubtitle: "Suspicious risk phrases highlighted directly in content",
    ocrActiveBadge: "OCR Engine Active",
    legendHighlights: "Highlights:",
    legendCritical: "Critical Red Flag (Prohibited/Deceptive)",
    legendCaution: "Caution Flag (Pressure/Urgency)",

    explainCategory: "Financial Literacy Engine",
    explainTitle: '"Explain This to Me" — Language Simplifier',
    explainDescription: "Demystify dense financial disclaimers, mutual fund disclosures, and broker terms into plain English and simple regional languages with clear breakdowns of hidden risks.",
    selectClausePrompt: "Select a Sample Financial Clause:",
    pasteClauseLabel: "Paste Complicated Financial Text or Disclaimer:",
    pasteClausePlaceholder: "Enter complex financial sentence...",
    simplifyingLoader: "Simplifying...",
    simplifyBtn: "Simplify Text",
    simpleEnglishTitle: "Simple English",
    simpleRegionalTitle: "Simple Regional Explanation",
    actualMeaningTitle: "What This Sentence Actually Means",
    hiddenRisksTitle: "Hidden Risks & Fine Print to Understand",
    glossaryTitle: "Important Financial Terms Glossary",

    claimCategory: "Claim Breakdown Engine",
    claimTitle: "Check an Investment Claim",
    claimDescription: "Enter a specific promotional claim or promise to inspect guarantee language, unrealistic return signals, and regulatory compliance.",
    sampleClaimsHeader: "Quick Sample Claims to Test:",
    claimInputLabel: "Investment Claim Text:",
    claimInputPlaceholder: "Paste financial claim here (e.g. 'Guaranteed 40% returns in 3 months through our AI platform')...",
    claimInputHelper: "Does not predict investment outcomes. Evaluates regulatory and fraud signals.",
    checkingLoader: "Checking...",
    claimResultTitle: "Claim Analysis Result",
    returnClaimCol: "1. Return Claim",
    guaranteeLanguageCol: "2. Guarantee Language",
    timePressureCol: "3. Time Pressure",
    safetyInterpretationTitle: "Safety Interpretation:",
    misleadingElementsTitle: "Potentially Misleading Elements:",
    mandatoryStepsTitle: "Mandatory Investor Verification Steps",
    noneSpecified: "None specified",
    noneDetected: "None detected",

    grievanceCategory: "Investor Recourse Assistant",
    grievanceTitle: "What Should I Do Now? — Grievance Guidance",
    grievanceDescription: "Actionable emergency steps, evidence preservation checklists, official authority contact details, and ready-to-use complaint drafts.",
    goldenHourBannerTitle: "Golden Hour Cyber Emergency (First 2 Hours)",
    goldenHourDialPrompt: "Dial 1930 Immediately",
    goldenHourDesc: "Calling 1930 allows police cyber cells to freeze fraudulent bank accounts before funds are withdrawn.",
    immediateStepsTitle: "Immediate Action Steps (Golden Hour Protocol)",
    evidencePreserveTitle: "Critical Evidence to Preserve",
    authoritiesContactTitle: "Official Authorities to Contact",
    complaintDraftTitle: "Ready-to-Use Formal Complaint Draft",
    copyDraftBtn: "Copy Formal Complaint Template",

    dashboardCategory: "Threat Telemetry & Trends",
    dashboardTitle: "Investor Safety Intelligence Dashboard",
    dashboardDescription: "Aggregated insights on the most prevalent fraudulent patterns, predatory solicitation tactics, and communication vectors targeting retail investors.",
    totalScannedKpi: "Total Messages Scanned",
    criticalAlertsKpi: "Critical Red Flags",
    highAlertsKpi: "High Concern Signals",
    cautionAlertsKpi: "Caution Advisories",
    riskDistributionTitle: "Risk Level Distribution",
    topScamPatternsTitle: "Top Scam Patterns Detected",
    threatChannelsTitle: "Primary Threat Vectors",

    emergencyHelplineTitle: "Emergency Investor Helplines",
    emergencyHelplineDesc: "Financial Cyber Fraud: 1930 • SEBI Investor Helpline: 1800 22 7575 / 1800 266 7575 (Toll Free)",
    footerAboutText: "NiveshRakshak is an Applied AI public-good technology solution developed for the SANGYAN Hackathon organized by SNTC, IIT (BHU) Varanasi in collaboration with SEBI and NSDL. Designed to protect Indian retail investors, especially first-time investors from Tier-2 & Tier-3 cities, from financial scams.",
    officialPortalsTitle: "Official Verification Portals"
  },

  // ==========================================
  // TAMIL (தமிழ்)
  // ==========================================
  ta: {
    brandName: "NiveshRakshak AI (நிவேஷ் ரக்ஷக்)",
    brandTagline: "நம்பும் முன். AI கொண்டு சரிபாருங்கள்.",
    publicGoodBadge: "பொதுநல AI • தனியுரிமை பாதுகாப்பு",
    navHome: "முகப்பு",
    navAnalyze: "பாதுகாப்பு ஆய்வு",
    navExplain: "விளக்கம் பெறு",
    navClaim: "உரிமைகோரல் சரிபார்ப்பு",
    navGrievance: "புகார் வழிகாட்டி",
    navDashboard: "டாஷ்போர்டு",
    languageSelectLabel: "மொழி",

    analyzeMessageBtn: "ஆய்வு செய்க",
    uploadScreenshotBtn: "புகைப்படம் பதிவேற்றுக (OCR)",
    pasteMessageBtn: "செய்தியை ஒட்டுக",
    explainTextBtn: "நிதி ஆவணத்தை விளக்குக",
    checkClaimBtn: "சரிபார்க்கவும்",
    scanAnotherBtn: "புதிய ஆய்வு",
    clearBtn: "அழிக்க",
    copyBtn: "நகலெடு",
    copiedBtn: "நகலெடுக்கப்பட்டது!",
    viewDetailsBtn: "விவரங்களைக் காண்க",
    quickTestLabel: "தானியங்கி சோதனை",
    privacyFirstBadge: "தனியுரிமை பாதுகாப்பு: தரவுகள் சேமிக்கப்படுவதில்லை",
    noStockTipsBadge: "பங்குப் பரிந்துரைகள் இல்லை",
    bilingualBadge: "தமிழ் • ஆங்கிலம் • இந்தி மும்மொழி ஆதரவு",

    meterTitle: "முதலீட்டாளர் பாதுகாப்பு அளவுகோல்",
    meterSubTitle: "கண்டறியப்பட்ட இடர் சமிக்ஞைகளின் அடிப்படையிலான பாதுகாப்பு மதிப்பீடு",
    riskEvaluation: "இடர் மதிப்பீடு",
    confidenceLabel: "துல்லியம்",
    levelCritical: "மிக தீவிரக் கவலை (CRITICAL)",
    levelHigh: "அதிக கவலை (HIGH)",
    levelCaution: "எச்சரிக்கை தேவை (CAUTION)",
    levelLow: "குறைந்த கவலை (LOW)",
    meterDisclaimer: "இந்த மதிப்பெண் சமர்ப்பிக்கப்பட்ட உள்ளடக்கத்தில் கண்டறியப்பட்ட இடர் சமிக்ஞைகளை மட்டுமே பிரதிபலிக்கிறது. இது சட்டப்பூர்வ தீர்ப்பு அல்ல. எப்போதும் அதிகாரப்பூர்வ SEBI (sebi.gov.in) மற்றும் NSDL தளங்களில் சரிபார்க்கவும்.",

    signalsHeading: "கண்டறியப்பட்ட ஆபத்து சமிக்ஞைகள்",
    signalsSubHeading: "நான் ஏன் எச்சரிக்கையாக இருக்க வேண்டும்?",
    evidenceLabel: "செய்தியிலிருந்து ஆதாரம்:",
    whyRiskyLabel: "இதில் உள்ள ஆபத்து:",
    whatToDoLabel: "நீங்கள் செய்ய வேண்டியது:",
    flagCritical: "தீவிர எச்சரிக்கை",
    flagHigh: "அதிக கவலை",
    flagCaution: "எச்சரிக்கை",
    noSignalsFound: "மோசடி எச்சரிக்கைகள் ஏதும் கண்டறியப்படவில்லை",
    noSignalsDesc: "உறுதியளிக்கப்பட்ட வருமானம் அல்லது அவசரப்படுத்தும் தந்திரங்கள் இதில் இல்லை. இருப்பினும் இயல்பான கவனத்துடன் இருக்கவும்.",

    safeActionTitle: "முடிவெடுக்கும் முன்: பாதுகாப்பு செயல் திட்டம்",
    safeActionSubTitle: "நிறுத்துங்கள் → புரிந்துகொள்ளுங்கள் → சரிபார்க்கவும் → பாதுகாப்பாக செயல்படுங்கள்",
    stepPrefix: "படி",
    officialGatewaysTitle: "அதிகாரப்பூர்வ சரிபார்ப்பு தளங்கள்",
    actionPause: "நிறுத்துங்கள்",
    actionDontShare: "பகிராதீர்கள்",
    actionVerify: "சரிபாருங்கள்",
    actionReport: "புகார் அளியுங்கள்",

    heroHackathonBadge: "முதலீட்டாளர் பாதுகாப்பு பொதுநல AI • சாக்யான் ஹேக்கத்தான்",
    heroHeadline: "NiveshRakshak AI",
    heroTagline: "நம்பும் முன். AI கொண்டு சரிபாருங்கள்.",
    heroDescription: "சந்தேகத்திற்கிடமான முதலீட்டு செய்திகளைப் புரிந்து கொள்ளவும், மோசடி சமிக்ஞைகளைக் கண்டறியவும், பாதுகாப்பான நிதி முடிவுகளை எடுக்கவும் உதவும் AI தளம். வாட்ஸ்அப், டெலிகிராம் ஆகியவற்றில் வரும் செய்திகளை ஆராய்கிறது.",
    heroCtaAnalyze: "முதலீட்டு செய்தியை ஆய்வு செய்க",
    heroCtaExplain: "நிதி ஆவணத்தை விளக்குக",
    heroLiveScannerTitle: "நேரலை பாதுகாப்பு ஸ்கேனர் முன்னோட்டம்",
    heroIncomingMsgLabel: "வந்த வாட்ஸ்அப் செய்தி:",
    heroFlaggedBadge: "எச்சரிக்கை",

    whyPauseTitle: "முதலீடு செய்யும் முன் ஏன் சிந்திக்க வேண்டும்?",
    whyPauseDesc: "நிதி மோசடிகள் அவசரத்தையும் பொய்யான நம்பிக்கையையும் பயன்படுத்துகின்றன. உங்கள் வங்கிக் கணக்கிலிருந்து பணம் செல்லும் முன் நிவேஷ் ரக்ஷக் உங்களுக்கு ஒரு பாதுகாப்பான சிந்தனை நேரத்தை வழங்குகிறது.",
    feature1Title: "ஸ்கிரீன்ஷாட் & செய்தி ஆய்வாளர்",
    feature1Desc: "வாட்ஸ்அப், டெலிகிராம் அல்லது விளம்பரங்களின் படங்களை பதிவேற்றி அல்லது உரையை ஒட்டி ஆபத்து ஆதாரங்களை ஆராயுங்கள்.",
    feature2Title: "முதலீட்டாளர் பாதுகாப்பு அளவுகோல்",
    feature2Desc: "0 முதல் 100 வரையிலான துல்லியமான அளவுகோல் மூலம் இடர் அளவை உடனடியாகத் தெரிந்து கொள்ளுங்கள்.",
    feature3Title: "எளிய மொழி விளக்கம்",
    feature3Desc: "கடினமான பங்குச்சந்தை விதிமுறைகள், F&O எச்சரிக்கைகள் மற்றும் மியூச்சுவல் ஃபண்ட் விதிமுறைகளை எளிய தமிழில் மாற்றுகிறது.",
    feature4Title: "அவசர புகார் வழிகாட்டி",
    feature4Desc: "பணம் இழந்த முதல் 2 மணி நேரத்தில் (Golden Hour) 1930 எண் மற்றும் SEBI SCORES-ல் புகார் செய்ய வழிகாட்டுகிறது.",

    analyzerCategory: "முக்கிய பாதுகாப்பு ஆய்வு",
    analyzerTitle: "முதலீட்டாளர் பாதுகாப்பு ஆய்வாளர்",
    analyzerDescription: "சந்தேகத்திற்கிடமான வாட்ஸ்அப், டெலிகிராம் அல்லது சமூக ஊடக செய்திகளை உள்ளிட்டு ஆதாரங்களுடன் கூடிய பாதுகாப்பு அறிக்கையைப் பெறுங்கள்.",
    quickDemoHeader: "மாதிரி காட்சிகள் (தானியங்கி ஆய்வு):",
    tabPasteText: "செய்தியை ஒட்டுக (Text)",
    tabUploadImage: "புகைப்படம் பதிவேற்றுக (OCR)",
    inputMessageLabel: "முதலீட்டு செய்தி உள்ளடக்கம்:",
    inputMessagePlaceholder: "வாட்ஸ்அப் அல்லது சமூக ஊடக செய்தியை இங்கே ஒட்டவும்...",
    uploadDropzonePrompt: "ஸ்கிரீன்ஷாட்டை இங்கே பதிவேற்றவும்",
    uploadDropzoneSubtext: "PNG, JPG, WebP ஆதரிக்கப்படுகிறது. எழுத்துகள் உள்ளமைவாகவே பிரித்தெடுக்கப்படும்.",
    privacyNote: "உள்ளமைவு ஆய்வு • கடவுச்சொற்கள் கேட்கப்படுவதில்லை",
    analyzingLoader: "ஆய்வு செய்யப்படுகிறது...",
    reportHeading: "முதலீட்டாளர் பாதுகாப்பு அறிக்கை",
    verdictSummaryTitle: "பாதுகாப்பு முடிவு சுருக்கம்",
    flagsIdentifiedText: "எச்சரிக்கைகள்",
    viewRawMessage: "பிரித்தெடுக்கப்பட்ட மூலச் செய்தி",
    needGrievancePrompt: "பணம் அனுப்பிவிட்டீர்களா அல்லது மோசடியா?",
    needGrievanceDesc: "எங்கள் புகார் வழிகாட்டியைப் பயன்படுத்தி 1930 எண் மற்றும் SEBI SCORES-ல் புகார் அளியுங்கள்.",
    grievanceAssistantBtn: "புகார் வழிகாட்டி",

    stepIntakeTitle: "உள்ளீடு",
    stepIntakeDesc: "செய்தி / படம்",
    stepExtractionTitle: "பிரித்தெடுத்தல்",
    stepExtractionDesc: "OCR எழுத்து பிரிப்பு",
    stepAnalysisTitle: "ஆய்வு",
    stepAnalysisDesc: "பாதுகாப்பு சமிக்ஞை",
    stepVerdictTitle: "முடிவு",
    stepVerdictDesc: "அளவுகோல் & திட்டம்",

    annotatorTitle: "காட்சி சமிக்ஞை பகுப்பாய்வு",
    annotatorSubtitle: "செய்தியில் உள்ள ஆபத்தான பகுதிகள் கோடிட்டுக் காட்டப்பட்டுள்ளன",
    ocrActiveBadge: "OCR இயங்குகிறது",
    legendHighlights: "குறியீடுகள்:",
    legendCritical: "தீவிர எச்சரிக்கை (தடைசெய்யப்பட்டது/மோசடி)",
    legendCaution: "கவனத்திற்குரியது (அவசரப்படுத்துதல்)",

    explainCategory: "நிதி எழுத்தறிவு கருவி",
    explainTitle: '"இதை எனக்கு விளக்குங்கள்" — எளிய மொழி மாற்றம்',
    explainDescription: "கடினமான பங்குச்சந்தை விதிமுறைகள் மற்றும் மியூச்சுவல் ஃபண்ட் எச்சரிக்கைகளை எளிய தமிழில் முதலீட்டாளர்களுக்கு புரியும் வகையில் மாற்றுகிறது.",
    selectClausePrompt: "மாதிரி நிதி விதியைத் தேர்ந்தெடுக்கவும்:",
    pasteClauseLabel: "கடினமான நிதி உரையை இங்கே ஒட்டவும்:",
    pasteClausePlaceholder: "நிதி உரையை உள்ளிடவும்...",
    simplifyingLoader: "எளிமைப்படுத்தப்படுகிறது...",
    simplifyBtn: "விளக்கம் பெறுக",
    simpleEnglishTitle: "எளிய ஆங்கிலம் (Simple English)",
    simpleRegionalTitle: "எளிய தமிழ் விளக்கம்",
    actualMeaningTitle: "இந்த வரியின் உண்மையான அர்த்தம்",
    hiddenRisksTitle: "மறைந்துள்ள அபாயங்கள் & நிபந்தனைகள்",
    glossaryTitle: "முக்கிய நிதி சொற்களஞ்சியம்",

    claimCategory: "வாக்குறுதி சரிபார்ப்பு கருவி",
    claimTitle: "முதலீட்டு வாக்குறுதியை சரிபார்க்கவும்",
    claimDescription: "முதலீட்டு விளம்பரங்களில் கூறப்படும் கவர்ச்சியான வாக்குறுதிகளை உள்ளிட்டு, அதில் உள்ள ஆபத்து காரணிகளை ஆராயுங்கள்.",
    sampleClaimsHeader: "சோதிக்க மாதிரி வாக்குறுதிகள்:",
    claimInputLabel: "வாக்குறுதி உரை:",
    claimInputPlaceholder: "வாக்குறுதியை இங்கே ஒட்டவும் (எ.கா. '3 மாதத்தில் 40% லாபம் நிச்சயம்')...",
    claimInputHelper: "முதலீட்டு லாபத்தை கணிக்காது. பாதுகாப்பு விதிகளை மட்டுமே ஆராயும்.",
    checkingLoader: "சரிபார்க்கப்படுகிறது...",
    claimResultTitle: "ஆய்வு முடிவு",
    returnClaimCol: "1. லாப வாக்குறுதி",
    guaranteeLanguageCol: "2. உத்தரவாத வார்த்தை",
    timePressureCol: "3. அவசர அழுத்தம்",
    safetyInterpretationTitle: "பாதுகாப்பு விளக்கம்:",
    misleadingElementsTitle: "தவறாக வழிநடத்தும் கூறுகள்:",
    mandatoryStepsTitle: "முதலீட்டாளர் செய்ய வேண்டிய சரிபார்ப்பு",
    noneSpecified: "குறிப்பிடப்படவில்லை",
    noneDetected: "கண்டறியப்படவில்லை",

    grievanceCategory: "முதலீட்டாளர் புகார் உதவி",
    grievanceTitle: "இப்போது நான் என்ன செய்ய வேண்டும்? — புகார் வழிகாட்டி",
    grievanceDescription: "அவசர கால நடவடிக்கைகள், பாதுகாக்க வேண்டிய ஆதாரங்கள், தொடர்பு கொள்ள வேண்டிய அரசு அமைப்புகள் மற்றும் புகார் கடிதங்களை இங்கே பெறுங்கள்.",
    goldenHourBannerTitle: "முதல் 2 மணி நேர சைபர் அவசர உதவி (Golden Hour)",
    goldenHourDialPrompt: "உடனடியாக 1930 என்ற எண்ணை அழைக்கவும்",
    goldenHourDesc: "1930 எண்ணை அழைத்தால் மோசடி கணக்குகளை உடனடியாக முடக்க முடியும்.",
    immediateStepsTitle: "உடனடி அவசர நடவடிக்கைகள்",
    evidencePreserveTitle: "பாதுகாக்க வேண்டிய முக்கிய ஆதாரங்கள்",
    authoritiesContactTitle: "தொடர்பு கொள்ள வேண்டிய அரசு அமைப்புகள்",
    complaintDraftTitle: "தயாரான புகார் கடித மாதிரி",
    copyDraftBtn: "புகார் கடிதத்தை நகலெடு",

    dashboardCategory: "இடர் புள்ளிவிவரங்கள்",
    dashboardTitle: "முதலீட்டாளர் பாதுகாப்பு நுண்ணறிவு டாஷ்போர்டு",
    dashboardDescription: "சில்லறை முதலீட்டாளர்களை குறிவைக்கும் மோசடி முறைகள் மற்றும் தளங்கள் குறித்த ஒருங்கிணைந்த புள்ளிவிவரங்கள்.",
    totalScannedKpi: "மொத்த ஆய்வுகள்",
    criticalAlertsKpi: "தீவிர எச்சரிக்கைகள்",
    highAlertsKpi: "அதிக இடர் சமிக்ஞைகள்",
    cautionAlertsKpi: "எச்சரிக்கை ஆலோசனைகள்",
    riskDistributionTitle: "இடர் அளவு பகிர்வு",
    topScamPatternsTitle: "முக்கிய மோசடி வகைகள்",
    threatChannelsTitle: "அதிகம் பயன்படுத்தப்படும் தளங்கள்",

    emergencyHelplineTitle: "அவசர முதலீட்டாளர் உதவி எண்கள்",
    emergencyHelplineDesc: "சைபர் நிதி மோசடி: 1930 • SEBI உதவி எண்: 1800 22 7575 / 1800 266 7575 (கட்டணமில்லா)",
    footerAboutText: "நிவேஷ் ரக்ஷக் என்பது SNTC, IIT (BHU) வாரணாசி மற்றும் SEBI & NSDL இணைந்து நடத்திய சாக்யான் (SANGYAN) ஹேக்கத்தானுக்காக உருவாக்கப்பட்ட பொதுநல AI தளமாகும். இரண்டாம் மற்றும் மூன்றாம் கட்ட நகர முதலீட்டாளர்களை மோசடிகளில் இருந்து பாதுகாப்பதே இதன் நோக்கம்.",
    officialPortalsTitle: "அதிகாரப்பூர்வ தளங்கள்"
  },

  // ==========================================
  // HINDI (हिन्दी)
  // ==========================================
  hi: {
    brandName: "NiveshRakshak AI (निवेशक रक्षक)",
    brandTagline: "विश्वास करने से पहले। AI से जाँचें।",
    publicGoodBadge: "जनहित AI • गोपनीयता पहले",
    navHome: "होम",
    navAnalyze: "सुरक्षा जाँच",
    navExplain: "सरल अर्थ",
    navClaim: "दावे की जाँच",
    navGrievance: "शिकायत गाइड",
    navDashboard: "डैशबोर्ड",
    languageSelectLabel: "भाषा",

    analyzeMessageBtn: "संदेश की जाँच करें",
    uploadScreenshotBtn: "स्क्रीनशॉट अपलोड करें",
    pasteMessageBtn: "संदेश पेस्ट करें",
    explainTextBtn: "वित्तीय नियम समझें",
    checkClaimBtn: "दावे की जाँच करें",
    scanAnotherBtn: "नई जाँच करें",
    clearBtn: "हटाएँ",
    copyBtn: "कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    viewDetailsBtn: "विवरण देखें",
    quickTestLabel: "त्वरित परीक्षण",
    privacyFirstBadge: "गोपनीयता पहले: कोई डेटा संग्रहीत नहीं",
    noStockTipsBadge: "कोई शेयर सुझाव या खरीद-बिक्री की सलाह नहीं",
    bilingualBadge: "अंग्रेजी • தமிழ் • हिन्दी त्रिभाषी समर्थन",

    meterTitle: "Investor Safety Meter (निवेशक सुरक्षा मीटर)",
    meterSubTitle: "पहचाने गए जोखिम संकेतों के आधार पर सुरक्षा स्तर",
    riskEvaluation: "जोखिम मूल्यांकन",
    confidenceLabel: "सटीकता",
    levelCritical: "गंभीर चिंता (CRITICAL CONCERN)",
    levelHigh: "उच्च चिंता (HIGH CONCERN)",
    levelCaution: "सावधानी (CAUTION)",
    levelLow: "कम चिंता (LOW CONCERN)",
    meterDisclaimer: "यह स्कोर प्रस्तुत सामग्री में पाए गए जोखिम संकेतों को दर्शाता है। यह कोई कानूनी या विनियामक निर्णय नहीं है कि प्रेषक या योजना धोखाधड़ी है। हमेशा आधिकारिक SEBI (sebi.gov.in) और NSDL पोर्टल पर स्वयं जाँच करें।",

    signalsHeading: "पहचाने गए जोखिम संकेत",
    signalsSubHeading: "यह जोखिम भरा क्यों है?",
    evidenceLabel: "संदेश से प्राप्त साक्ष्य:",
    whyRiskyLabel: "यह जोखिम भरा क्यों है:",
    whatToDoLabel: "आपको क्या करना चाहिए:",
    flagCritical: "गंभीर चेतावनी",
    flagHigh: "उच्च जोखिम",
    flagCaution: "सावधानी",
    noSignalsFound: "कोई उच्च जोखिम वाला धोखाधड़ी संकेत नहीं मिला",
    noSignalsDesc: "सामग्री में गारंटीड रिटर्न या दबाव जैसे सामान्य खतरे नहीं दिखे। फिर भी हमेशा बुनियादी सतर्कता बरतें।",

    safeActionTitle: "सुरक्षित कार्रवाई योजना (Safe Action Plan)",
    safeActionSubTitle: "रुकें → समझें → सत्यापित करें → सुरक्षित रूप से कार्य करें",
    stepPrefix: "चरण",
    officialGatewaysTitle: "आधिकारिक सत्यापन पोर्टल",
    actionPause: "रुकें (PAUSE)",
    actionDontShare: "जानकारी साझा न करें (DON'T SHARE)",
    actionVerify: "सत्यापित करें (VERIFY)",
    actionReport: "रिपोर्ट करें (REPORT)",

    heroHackathonBadge: "निवेशक सुरक्षा के लिए प्रयुक्त AI • SANGYAN हैकथॉन",
    heroHeadline: "NiveshRakshak AI",
    heroTagline: "विश्वास करने से पहले। AI से जाँचें।",
    heroDescription: "संदिग्ध वित्तीय संदेशों को समझें, धोखाधड़ी के संकेतों को पहचानें और सुरक्षित निवेश निर्णय लें। विशेष रूप से भारतीय खुदरा निवेशकों के लिए तैयार किया गया जो WhatsApp, Telegram और सोशल मीडिया पर विज्ञापनों का सामना करते हैं।",
    heroCtaAnalyze: "संदेश की जाँच करें",
    heroCtaExplain: "वित्तीय नियम समझें",
    heroLiveScannerTitle: "लाइव सुरक्षा स्कैनर पूर्वावलोकन",
    heroIncomingMsgLabel: "आने वाला WhatsApp संदेश:",
    heroFlaggedBadge: "चिह्नित चेतावनी",

    whyPauseTitle: "निवेश करने से पहले रुकना क्यों जरूरी है?",
    whyPauseDesc: "वित्तीय धोखाधड़ी जल्दबाजी, लालच और झूठे भरोसे का फायदा उठाती है। NiveshRakshak आपके बैंक खाते से पैसे निकलने से पहले एक निष्पक्ष और सुरक्षित सोचने का समय प्रदान करता है।",
    feature1Title: "स्क्रीनशॉट एवं संदेश विश्लेषक",
    feature1Desc: "WhatsApp, Telegram या सोशल मीडिया विज्ञापनों के स्क्रीनशॉट अपलोड करें या टेक्स्ट पेस्ट करके सीधे प्रमाण की जाँच करें।",
    feature2Title: "Investor Safety Meter (निवेशक सुरक्षा मीटर)",
    feature2Desc: "0 से 100 तक का स्पष्ट सुरक्षा मीटर, जो कम चिंता से लेकर गंभीर चिंता तक के जोखिम को तुरंत उजागर करता है।",
    feature3Title: "मुझे यह समझाएँ (सरल भाषा अनुवादक)",
    feature3Desc: "जटिल विनियामक नियमों, F&O जोखिम चेतावनियों और म्यूचुअल फंड शर्तों को सरल और आसान भाषा में समझाता है।",
    feature4Title: "आपातकालीन शिकायत गाइड",
    feature4Desc: "धोखाधड़ी के पहले 2 घंटों में (Golden Hour) 1930 साइबर हेल्पलाइन और SEBI SCORES 2.0 पर शिकायत करने का चरणबद्ध मार्गदर्शन।",

    analyzerCategory: "मुख्य सुरक्षा प्रक्रिया",
    analyzerTitle: "निवेशक सुरक्षा विश्लेषक (Investor Safety Analyzer)",
    analyzerDescription: "संदिग्ध WhatsApp संदेश, Telegram अलर्ट, सोशल मीडिया विज्ञापन या स्क्रीनशॉट सबमिट करें और साक्ष्य-आधारित सुरक्षा रिपोर्ट प्राप्त करें।",
    quickDemoHeader: "त्वरित डेमो परिदृश्य (स्वचालित जाँच के लिए चुनें):",
    tabPasteText: "संदेश पेस्ट करें (Text)",
    tabUploadImage: "स्क्रीनशॉट अपलोड करें (OCR)",
    inputMessageLabel: "निवेश संदेश की सामग्री:",
    inputMessagePlaceholder: "संदेश यहाँ पेस्ट करें (जैसे '7 दिनों में 30% गारंटीड रिटर्न, तुरंत ₹10,000 भेजें...')",
    uploadDropzonePrompt: "स्क्रीनशॉट यहाँ क्लिक करके अपलोड करें या खींचकर छोड़ें",
    uploadDropzoneSubtext: "PNG, JPG, WebP समर्थित। ऑप्टिकल कैरेक्टर रिकॉग्निशन (OCR) द्वारा टेक्स्ट निकाला जाएगा।",
    privacyNote: "स्थानीय मेमोरी विश्लेषण • कोई पासवर्ड या संवेदनशील डेटा एकत्र नहीं",
    analyzingLoader: "संकेतों का विश्लेषण जारी है...",
    reportHeading: "निवेशक सुरक्षा मूल्यांकन रिपोर्ट",
    verdictSummaryTitle: "सुरक्षा निष्कर्ष सारांश",
    flagsIdentifiedText: "चेतावनी संकेत मिले",
    viewRawMessage: "निकाला गया मूल संदेश देखें",
    needGrievancePrompt: "क्या आप पैसे भेज चुके हैं या धोखाधड़ी का संदेह है?",
    needGrievanceDesc: "1930 हेल्पलाइन पर संपर्क करने और SEBI SCORES पर शिकायत दर्ज करने के लिए हमारी गाइड देखें।",
    grievanceAssistantBtn: "शिकायत गाइड",

    stepIntakeTitle: "प्राप्ति",
    stepIntakeDesc: "संदेश / स्क्रीनशॉट",
    stepExtractionTitle: "निष्कर्षण",
    stepExtractionDesc: "OCR एवं पैटर्न पार्सर",
    stepAnalysisTitle: "विश्लेषण",
    stepAnalysisDesc: "सुरक्षा संकेत इंजन",
    stepVerdictTitle: "निष्कर्ष",
    stepVerdictDesc: "सुरक्षा मीटर एवं योजना",

    annotatorTitle: "विज़ुअल सिग्नल एनोटेटर (OCR)",
    annotatorSubtitle: "सामग्री में संदिग्ध जोखिम वाक्यांश सीधे हाइलाइट किए गए हैं",
    ocrActiveBadge: "OCR सक्रिय है",
    legendHighlights: "संकेतक:",
    legendCritical: "गंभीर चेतावनी (प्रतिबंधित या धोखाधड़ी संकेत)",
    legendCaution: "सावधानी संकेत (जल्दबाजी या दबाव)",

    explainCategory: "वित्तीय साक्षरता इंजन",
    explainTitle: '"मुझे यह समझाएँ" — भाषा सरलीकरण',
    explainDescription: "कठिन वित्तीय नियमों, म्यूचुअल फंड खुलासों और ब्रोकर शर्तों को सरल अंग्रेजी और आम बोलचाल की भाषा में समझें।",
    selectClausePrompt: "परीक्षण के लिए एक नमूना वित्तीय नियम चुनें:",
    pasteClauseLabel: "कठिन वित्तीय वाक्य या नियम यहाँ पेस्ट करें:",
    pasteClausePlaceholder: "जटिल वित्तीय वाक्य दर्ज करें...",
    simplifyingLoader: "सरल किया जा रहा है...",
    simplifyBtn: "सरल अर्थ समझें",
    simpleEnglishTitle: "सरल अंग्रेजी (Simple English)",
    simpleRegionalTitle: "सरल हिन्दी व्याख्या (Simple Hindi)",
    actualMeaningTitle: "इस वाक्य का व्यावहारिक वास्तविक अर्थ",
    hiddenRisksTitle: "छिपे हुए जोखिम और बारीक शर्तें",
    glossaryTitle: "महत्वपूर्ण वित्तीय शब्दावली",

    claimCategory: "दावा जाँच इंजन",
    claimTitle: "दावे की जाँच करें (Claim Verifier)",
    claimDescription: "गारंटीड भाषा, अवास्तविक रिटर्न के दावों और विनियामक अनुपालन की जाँच के लिए विशिष्ट प्रचार वाक्य दर्ज करें।",
    sampleClaimsHeader: "परीक्षण के लिए त्वरित नमूना दावे:",
    claimInputLabel: "वित्तीय दावा:",
    claimInputPlaceholder: "वित्तीय दावे को यहाँ पेस्ट करें (जैसे 'हमारे AI बॉट से 3 महीने में 40% गारंटीड रिटर्न')...",
    claimInputHelper: "यह निवेश रिटर्न की भविष्यवाणी नहीं करता। विनियामक और धोखाधड़ी के संकेतों का मूल्यांकन करता है।",
    checkingLoader: "जाँच जारी है...",
    claimResultTitle: "दावे का विश्लेषण परिणाम",
    returnClaimCol: "1. रिटर्न का दावा",
    guaranteeLanguageCol: "2. गारंटी की भाषा",
    timePressureCol: "3. समय का दबाव",
    safetyInterpretationTitle: "सुरक्षा व्याख्या:",
    misleadingElementsTitle: "संभावित भ्रामक तत्व:",
    mandatoryStepsTitle: "अनिवार्य निवेशक सत्यापन कदम",
    noneSpecified: "कोई उल्लेख नहीं",
    noneDetected: "कोई नहीं मिला",

    grievanceCategory: "निवेशक शिकायत सहायता",
    grievanceTitle: "अब मुझे क्या करना चाहिए? — शिकायत गाइड",
    grievanceDescription: "आपातकालीन कदम, साक्ष्य जुटाने की चेकलिस्ट, आधिकारिक संपर्क विवरण और तैयार शिकायत पत्र प्रारूप।",
    goldenHourBannerTitle: "गोल्डन ऑवर साइबर इमरजेंसी (पहले 2 घंटे)",
    goldenHourDialPrompt: "तुरंत 1930 डायल करें",
    goldenHourDesc: "1930 पर कॉल करने से पुलिस साइबर सेल पैसे निकाले जाने से पहले धोखाधड़ी वाले बैंक खातों को फ्रीज कर सकती है।",
    immediateStepsTitle: "तत्काल आपातकालीन कदम (गोल्डन ऑवर प्रोटोकॉल)",
    evidencePreserveTitle: "सुरक्षित रखे जाने वाले महत्वपूर्ण साक्ष्य",
    authoritiesContactTitle: "संपर्क किए जाने वाले आधिकारिक निकाय",
    complaintDraftTitle: "तैयार औपचारिक शिकायत पत्र प्रारूप",
    copyDraftBtn: "शिकायत पत्र प्रारूप कॉपी करें",

    dashboardCategory: "धोखाधड़ी टेलीमेट्री एवं रुझान",
    dashboardTitle: "निवेशक सुरक्षा इंटेलिजेंस डैशबोर्ड",
    dashboardDescription: "खुदरा निवेशकों को निशाना बनाने वाले सबसे आम धोखाधड़ी पैटर्न और माध्यमों की समग्र जानकारी।",
    totalScannedKpi: "कुल स्कैन किए गए संदेश",
    criticalAlertsKpi: "गंभीर चेतावनियाँ",
    highAlertsKpi: "उच्च जोखिम संकेत",
    cautionAlertsKpi: "सावधानी सुझाव",
    riskDistributionTitle: "जोखिम स्तर वितरण",
    topScamPatternsTitle: "शीर्ष पहचाने गए घोटाले के तरीके",
    threatChannelsTitle: "प्राथमिक खतरे के माध्यम",

    emergencyHelplineTitle: "आपातकालीन निवेशक हेल्पलाइन",
    emergencyHelplineDesc: "वित्तीय साइबर धोखाधड़ी: 1930 • SEBI निवेशक हेल्पलाइन: 1800 22 7575 / 1800 266 7575 (टोल फ्री)",
    footerAboutText: "NiveshRakshak एक प्रयुक्त AI सार्वजनिक-कल्याण समाधान है, जिसे SNTC, IIT (BHU) वाराणसी द्वारा SEBI और NSDL के सहयोग से आयोजित SANGYAN हैकथॉन के लिए विकसित किया गया है। इसका उद्देश्य भारतीय खुदरा निवेशकों, विशेष रूप से टियर-2 और टियर-3 शहरों के नए निवेशकों को वित्तीय धोखाधड़ी से बचाना है।",
    officialPortalsTitle: "आधिकारिक सत्यापन पोर्टल"
  }
};

export function getTranslation(language: Language): TranslationDictionary {
  return translations[language] || translations.en;
}

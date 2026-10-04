import React from 'react';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, FileText, 
  Search, Lock, CheckCircle, Smartphone, ExternalLink, 
  Sparkles, Layers, ShieldAlert, Cpu, HeartHandshake, Eye
} from 'lucide-react';
import { Language, DemoScenario } from '../types';
import { LOCAL_DEMO_SCENARIOS } from '../services/api';
import { getTranslation } from '../i18n/translations';

interface LandingPageProps {
  onNavigate: (tab: string, demoId?: string) => void;
  language: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, language }) => {
  const t = getTranslation(language);

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>{t.heroHackathonBadge}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                  Nivesh<span className="text-blue-600">Rakshak</span> AI
                </h1>
                <p className="text-xl sm:text-2xl font-heading font-semibold text-slate-700 mt-2">
                  {t.heroTagline}
                </p>
              </div>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('analyze')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-navy-900 text-white font-semibold shadow-md hover:bg-navy-800 hover:shadow-lg transition-all text-sm group"
                >
                  <Search className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
                  <span>{t.heroCtaAnalyze}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                </button>

                <button
                  onClick={() => onNavigate('explain')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-navy-900 font-semibold shadow-sm hover:bg-slate-50 transition-all text-sm"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{t.heroCtaExplain}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {t.noStockTipsBadge}
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Lock className="w-4 h-4 text-slate-400" />
                  {t.privacyFirstBadge}
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  {t.bilingualBadge}
                </span>
              </div>
            </div>

            {/* Hero Right: Live Interactive Sample Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-20 -z-10"></div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    {/* Card Header */}
                  <div className="bg-navy-900 px-5 py-4 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-mono font-medium text-slate-300 ml-1">
                        {t.heroLiveScannerTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                      {t.heroFlaggedBadge}
                    </span>
                  </div>

                  {/* Sample Message Body */}
                  <div className="p-5 space-y-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
                      <div className="text-[10px] text-slate-400 font-sans font-semibold uppercase">
                        {t.heroIncomingMsgLabel}
                      </div>
                      <p className="text-slate-900 font-semibold">
                        {language === 'hi'
                          ? '“7 दिनों में 30% रिटर्न की गारंटी। SEBI स्वीकृत। आज ही निवेश करें। केवल 3 स्लॉट बचे हैं। ₹10,000 GPay पर तुरंत भेजें।”'
                          : language === 'ta'
                          ? '“உறுதியளிக்கப்பட்ட 30% மாத வருமானம். SEBI அங்கீகாரம் பெற்றது. இன்றே முதலீடு செய்யுங்கள். 3 இடங்கள் மட்டுமே உள்ளன. ₹10,000 GPay மூலம் செலுத்துங்கள்.”'
                          : '“Guaranteed 30% monthly returns. SEBI approved. Invest today. Only 3 slots left. Pay ₹10,000 to GPay.”'}
                      </p>
                    </div>

                    {/* Result Meter Banner */}
                    <div className="p-4 rounded-2xl bg-red-50/90 border border-red-200 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                          {t.meterTitle}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-2 mt-1">
                          <span className="text-3xl font-heading font-extrabold text-red-700 leading-none">91</span>
                          <span className="text-xs text-red-500 font-semibold">/100</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-600 text-white whitespace-nowrap">
                            {t.levelCritical}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Extracted Signals Tags */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {t.signalsHeading}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
                          {language === 'hi' ? '⚠ गारंटीड रिटर्न' : language === 'ta' ? '⚠ உறுதியான வருமானம்' : '⚠ Guaranteed Returns'}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
                          {language === 'hi' ? '⚠ फर्जी SEBI दावा' : language === 'ta' ? '⚠ போலி SEBI அனுமதி' : '⚠ Fake SEBI Claim'}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          {language === 'hi' ? '⚠ तुरंत भुगतान का दबाव' : language === 'ta' ? '⚠ அவசரப்படுத்தும் அழுத்தம்' : '⚠ Urgency Tactics'}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
                          {language === 'hi' ? '⚠ व्यक्तिगत UPI अनुरोध' : language === 'ta' ? '⚠ தனிநபர் UPI கோரிக்கை' : '⚠ Personal UPI Request'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Demo CTA */}
                    <button
                      onClick={() => onNavigate('analyze', 'demo-1')}
                      className="w-full py-2.5 px-4 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'hi' ? 'पूरी सुरक्षा रिपोर्ट देखें' : language === 'ta' ? 'முழு பாதுகாப்பு அறிக்கையைக் காண்க' : 'Inspect Full Safety Report'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instant Demo Scenarios Bar for Judges */}
      <section className="bg-slate-100/80 border-y border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'hi' 
                    ? 'त्वरित डेमो मूल्यांकन' 
                    : language === 'ta' 
                    ? 'நீதிபதிகள் உடனடி சோதனை' 
                    : 'Judge Evaluation Fast Track'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-950">
                {language === 'hi'
                  ? '5 बिल्ट-इन डेमो परिदृश्य (<60 सेकंड में जाँचें)'
                  : language === 'ta'
                  ? '5 மாதிரி சோதனைக் காட்சிகள் (உடனடி ஆய்வு)'
                  : 'Built-in Demo Scenarios (Test in <60 Seconds)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              {language === 'hi'
                ? 'त्वरित AI सुरक्षा विश्लेषण चलाने के लिए नीचे दिए गए किसी भी परिदृश्य को चुनें।'
                : language === 'ta'
                ? 'கீழே உள்ள ஏதேனும் ஒரு மாதிரியைத் தேர்ந்தெடுத்து உடனடியாக AI பகுப்பாய்வை சோதிக்கவும்.'
                : 'Select any scenario below to instantly populate and run the complete AI safety analysis pipeline.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {LOCAL_DEMO_SCENARIOS.map((scenario, index) => {
              const isLegit = scenario.expected_score < 30;
              const displayTitle = language === 'hi' ? (scenario.title_hi || scenario.title) : language === 'ta' ? scenario.title_ta : scenario.title;
              const displayPreview = language === 'hi' ? (scenario.preview_hi || scenario.preview) : language === 'ta' ? (scenario.preview_ta || scenario.preview) : scenario.preview;

              return (
                <div
                  key={scenario.id}
                  onClick={() => onNavigate('analyze', scenario.id)}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {language === 'hi' ? `डेमो ${index + 1}` : language === 'ta' ? `மாதிரி ${index + 1}` : `Demo ${index + 1}`}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isLegit ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {scenario.expected_score}/100
                      </span>
                    </div>
                    <h3 className="font-bold text-xs text-navy-900 line-clamp-2 group-hover:text-blue-600 transition">
                      {displayTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-mono">
                      {displayPreview}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                    <span>{language === 'hi' ? 'डेमो देखें' : language === 'ta' ? 'சோதித்துப் பார்' : 'Try Demo'}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why NiveshRakshak? 3 Pillars: DETECT, UNDERSTAND, ACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {language === 'hi' ? 'मुख्य क्षमताएँ' : language === 'ta' ? 'முக்கிய தூண்கள்' : 'Core Capabilities'}
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-navy-950 mt-3">
            {language === 'hi' ? 'NiveshRakshak क्यों?' : language === 'ta' ? 'ஏன் நிவேஷ் ரக்ஷக்?' : 'Why NiveshRakshak?'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {language === 'hi'
              ? 'पूँजी लगाने से पहले नए खुदरा निवेशकों की सुरक्षा, शिक्षा और उन्हें सशक्त बनाने के लिए समर्पित सुरक्षा कवच।'
              : language === 'ta'
              ? 'புதிய முதலீட்டாளர்கள் பணத்தை இழக்காமல் காப்பாற்ற, விழிப்புணர்வு ஊட்ட மற்றும் பாதுகாப்பாக வழிகாட்ட உருவாக்கப்பட்ட தளம்.'
              : 'A dedicated safety layer designed to protect, educate, and empower first-time retail investors before they commit capital.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: DETECT */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card hover:border-slate-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              01 • {language === 'hi' ? 'पहचानें (DETECT)' : language === 'ta' ? 'கண்டறிதல்' : 'DETECT'}
            </div>
            <h3 className="text-xl font-heading font-bold text-navy-950 mb-2">
              {language === 'hi' ? 'संदिग्ध पैटर्न की पहचान' : language === 'ta' ? 'மோசடி சமிக்ஞைகளைக் கண்டறிதல்' : 'Identify Suspicious Patterns'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'हाइब्रिड विश्लेषण गारंटीड रिटर्न के दावों, फर्जी SEBI/NSDL अनुमोदनों, तत्काल भुगतान के दबाव और व्यक्तिगत UPI अनुरोधों को तुरंत पकड़ता है।'
                : language === 'ta'
                ? 'உறுதியளிக்கப்பட்ட அதிக லாபம், போலி SEBI அனுமதி, அவசரப்படுத்தும் தந்திரங்கள் மற்றும் தனிநபர் UPI-க்கு பணம் கோருதல் போன்றவற்றை உடனே கண்டறியும்.'
                : 'Advanced hybrid analysis catches guaranteed return claims, fake SEBI/NSDL approvals, urgent pressure countdowns, and personal UPI payment requests.'}
            </p>
          </div>

          {/* Card 2: UNDERSTAND */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card hover:border-slate-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              02 • {language === 'hi' ? 'समझें (UNDERSTAND)' : language === 'ta' ? 'புரிந்து கொள்ளுதல்' : 'UNDERSTAND'}
            </div>
            <h3 className="text-xl font-heading font-bold text-navy-950 mb-2">
              {language === 'hi' ? 'वित्तीय भाषा को सरल बनाएँ' : language === 'ta' ? 'கடினமான நிதி மொழியை எளிமைப்படுத்தல்' : 'Simplify Financial Language'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'जटिल विनियामक नियमों, F&O अस्वीकरणों और म्यूचुअल फंड शर्तों को सरल हिन्दी, तमिल और सहज अंग्रेजी में समझाकर छिपे जोखिमों को उजागर करता है।'
                : language === 'ta'
                ? 'சிக்கலான நிதி ஆவணங்கள் மற்றும் இடர் எச்சரிக்கைகளை எளிய ஆங்கிலம் மற்றும் தமிழில் முதலீட்டாளர்களுக்கு புரியும் வகையில் மாற்றுகிறது.'
                : 'Converts dense disclaimers, F&O risk warnings, and fund disclosures into plain English, Tamil, and Hindi with clear explanations of hidden risks.'}
            </p>
          </div>

          {/* Card 3: ACT */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card hover:border-slate-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-105 transition">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              03 • {language === 'hi' ? 'सुरक्षित कार्रवाई (ACT)' : language === 'ta' ? 'பாதுகாப்பு நடவடிக்கை' : 'ACT'}
            </div>
            <h3 className="text-xl font-heading font-bold text-navy-950 mb-2">
              {language === 'hi' ? 'सुरक्षित कार्रवाई एवं शिकायत गाइड' : language === 'ta' ? 'பாதுகாப்பு செயல் திட்டம் & புகார் உதவி' : 'Safe Action & Grievance'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'कार्रवाई योग्य सत्यापन चेकलिस्ट, आधिकारिक SEBI SCORES 2.0 और 1930 साइबर हेल्पलाइन मार्गदर्शन तथा औपचारिक शिकायत पत्र प्रारूप प्रदान करता है।'
                : language === 'ta'
                ? 'பணம் அனுப்பும் முன் செய்ய வேண்டிய சரிபார்ப்பு பட்டியல், SEBI SCORES மற்றும் 1930 உதவி எண் வழிகாட்டல், மற்றும் புகார் கடிதங்களை வழங்குகிறது.'
                : 'Offers actionable verification checklists, official SEBI SCORES 2.0 and Cyber Crime 1930 escalation guidance, and formal complaint templates.'}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Architecture Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-400/20">
              {language === 'hi' ? 'सिस्टम आर्किटेक्चर पाइपलाइन' : language === 'ta' ? 'அமைப்பு கட்டமைப்பு' : 'System Architecture Pipeline'}
            </span>
            <h3 className="text-2xl font-heading font-bold mt-2">
              {language === 'hi' ? 'NiveshRakshak आपकी सुरक्षा कैसे करता है' : language === 'ta' ? 'நிவேஷ் ரக்ஷக் எவ்வாறு செயல்படுகிறது?' : 'How NiveshRakshak Protects You'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'hi'
                ? 'संदेश या स्क्रीनशॉट से लेकर बिना किसी संवेदनशील डेटा संग्रह के निष्पक्ष जोखिम रिपोर्ट तैयार करने तक।'
                : language === 'ta'
                ? 'செய்தி அல்லது புகைப்படத்தை உள்ளீடாகப் பெற்று, தனியுரிமை மீறலின்றி பாதுகாப்பு அறிக்கையை உருவாக்குகிறது.'
                : 'From raw message or screenshot intake to grounded risk verdict with zero sensitive credential collection.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <Smartphone className="w-5 h-5 mx-auto text-blue-400 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '1. संदेश' : language === 'ta' ? '1. செய்தி' : '1. Message'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? 'WhatsApp / विज्ञापन' : language === 'ta' ? 'WhatsApp / விளம்பரம்' : 'WhatsApp / Ad'}
              </div>
            </div>

            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <Eye className="w-5 h-5 mx-auto text-cyan-400 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '2. OCR निष्कर्षण' : language === 'ta' ? '2. OCR பிரித்தெடுத்தல்' : '2. OCR Extraction'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? 'टेक्स्ट एवं क्षेत्र' : language === 'ta' ? 'உரை & பகுதிகள்' : 'Text & Regions'}
              </div>
            </div>

            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <Cpu className="w-5 h-5 mx-auto text-amber-400 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '3. सुरक्षा इंजन' : language === 'ta' ? '3. பாதுகாப்பு என்ஜின்' : '3. Safety Engine'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? 'नियम + AI हाइब्रिड' : language === 'ta' ? 'விதிகள் + AI கலவை' : 'Rule + LLM Hybrid'}
              </div>
            </div>

            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <AlertTriangle className="w-5 h-5 mx-auto text-red-400 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '4. जोखिम संकेत' : language === 'ta' ? '4. ஆபத்து சமிக்ஞைகள்' : '4. Risk Signals'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? 'साक्ष्य आधारित' : language === 'ta' ? 'ஆதார அடிப்படையிலானது' : 'Evidence Grounded'}
              </div>
            </div>

            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <Layers className="w-5 h-5 mx-auto text-emerald-400 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '5. सुरक्षा मीटर' : language === 'ta' ? '5. பாதுகாப்பு அளவுகோல்' : '5. Safety Meter'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? '0–100 स्कोर' : language === 'ta' ? '0–100 மதிப்பெண்' : '0–100 Scored'}
              </div>
            </div>

            <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-xl">
              <ShieldCheck className="w-5 h-5 mx-auto text-blue-300 mb-2" />
              <div className="text-[11px] font-bold text-white uppercase">
                {language === 'hi' ? '6. कार्रवाई योजना' : language === 'ta' ? '6. செயல் திட்டம்' : '6. Action Plan'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {language === 'hi' ? 'सुरक्षित कदम' : language === 'ta' ? 'பாதுகாப்பான வழி' : 'Safe Next Steps'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience: Tier-2/3 & First-Time Investors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {language === 'hi' ? 'क्षेत्रीय भाषाओं पर विशेष ध्यान' : language === 'ta' ? 'பிராந்திய மொழிகளில் முதலீட்டாளர் பாதுகாப்பு' : 'Regional Accessibility Focus'}
            </span>
            <h3 className="text-xl font-heading font-bold text-navy-950">
              {language === 'hi' 
                ? 'टियर-2 और टियर-3 शहरों के नए निवेशकों का सशक्तिकरण' 
                : language === 'ta' 
                ? 'இரண்டாம் & மூன்றாம் கட்ட நகர முதலீட்டாளர்களுக்கான பாதுகாப்புக் கவசம்' 
                : 'Empowering First-Time Investors from Tier-2 & Tier-3 Cities'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {language === 'hi'
                ? 'भारत में खुलने वाले 65% से अधिक नए डीमैट खाते टियर-1 महानगरों के बाहर से आते हैं। NiveshRakshak सरल हिन्दी, तमिल और सहज अंग्रेजी में वित्तीय जोखिमों को समझाकर निवेशकों को धोखे से बचाता है।'
                : language === 'ta'
                ? 'இந்தியாவில் புதிய டீமேட் கணக்குகளில் 65%-க்கும் அதிகமானவை மெட்ரோ அல்லாத சிறு நகரங்களிலிருந்து வருகின்றன. இவர்களுக்கு புரியும் எளிய தமிழ் விளக்கங்களை நிவேஷ் ரக்ஷக் வழங்குகிறது.'
                : 'Over 65% of new demat accounts opened in India originate outside Tier-1 metros. NiveshRakshak bridges the literacy gap with native Tamil, Hindi, and simple English explanations, demystifying fine-print traps.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('explain')}
            className="shrink-0 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition shadow-sm"
          >
            {language === 'hi' ? 'वित्तीय नियम समझें' : language === 'ta' ? 'நிதி விளக்கத்தை சோதிக்கவும்' : 'Try Financial Simplifier'}
          </button>
        </div>
      </section>
    </div>
  );
};

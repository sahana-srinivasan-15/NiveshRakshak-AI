import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, PhoneCall, AlertTriangle, FileText, 
  ExternalLink, Copy, Check, Clock, ShieldAlert, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { Language, GrievanceResponse } from '../types';
import { getGrievanceGuide } from '../services/api';
import { getTranslation } from '../i18n/translations';

interface GrievancePageProps {
  language: Language;
}

const SITUATIONS = [
  { 
    id: 'money_transferred', 
    label: 'Transferred Money to Fraudulent Account', 
    label_ta: 'மோசடி நபருக்கு பணம் அனுப்பிவிட்டேன்',
    label_hi: 'धोखाधड़ी वाले खाते में पैसे ट्रांसफर कर दिए हैं'
  },
  { 
    id: 'unable_to_withdraw', 
    label: 'Platform Refusing Withdrawal / Extra Fees', 
    label_ta: 'பணம் எடுக்க மறுக்கிறார்கள் / கூடுதல் கட்டணம்',
    label_hi: 'प्लेटफ़ॉर्म निकासी से इनकार कर रहा है / अतिरिक्त शुल्क माँग रहा है'
  },
  { 
    id: 'broker_dispute', 
    label: 'Broker Dispute / Unauthorized Trades', 
    label_ta: 'தரகர் தகராறு / அனுமதியற்ற வர்த்தகம்',
    label_hi: 'ब्रोकर विवाद / अनधिकृत ट्रेडिंग लेनदेन'
  },
  { 
    id: 'fake_advisor', 
    label: 'Unregistered Advisor / Telegram Tip Scam', 
    label_ta: 'போலி ஆலோசகர் / டெலிகிராம் டிப் மோசடி',
    label_hi: 'गैर-पंजीकृत सलाहकार / टेलीग्राम टिप घोटाला'
  }
];

export const GrievancePage: React.FC<GrievancePageProps> = ({ language }) => {
  const t = getTranslation(language);
  const [selectedSituation, setSelectedSituation] = useState('money_transferred');
  const [guide, setGuide] = useState<GrievanceResponse | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  useEffect(() => {
    loadGuide(selectedSituation);
  }, [selectedSituation]);

  const loadGuide = async (sitId: string) => {
    const res = await getGrievanceGuide(sitId);
    setGuide(res);
  };

  const handleCopyDraft = () => {
    if (guide) {
      navigator.clipboard.writeText(guide.complaint_draft_template);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold mb-2">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>{t.grievanceCategory}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
          {t.grievanceTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {t.grievanceDescription}
        </p>
      </div>

      {/* Emergency Callout Banner */}
      <div className="bg-red-500 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-red-100">
              {t.goldenHourBannerTitle}
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold mt-0.5">
              {t.goldenHourDialPrompt}
            </h3>
            <p className="text-xs text-red-100 mt-0.5">
              {t.goldenHourDesc}
            </p>
          </div>
        </div>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition flex items-center gap-1.5 shadow-sm"
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Situation Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SITUATIONS.map((sit) => {
          const isActive = selectedSituation === sit.id;
          const sitLabel = language === 'hi' ? sit.label_hi : language === 'ta' ? sit.label_ta : sit.label;
          return (
            <button
              key={sit.id}
              onClick={() => setSelectedSituation(sit.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-navy-900 text-white border-navy-900 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="font-bold text-xs sm:text-sm">
                {sitLabel}
              </div>
              <div className={`mt-3 text-[11px] font-semibold flex items-center gap-1 ${isActive ? 'text-blue-300' : 'text-blue-600'}`}>
                <span>{language === 'hi' ? 'गाइड देखें' : language === 'ta' ? 'வழிகாட்டல் காண்க' : 'View Guide'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Guide Content */}
      {guide && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Immediate Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-navy-900">
                {t.immediateStepsTitle}
              </h3>
            </div>
            <div className="space-y-2.5">
              {(language === 'hi' && guide.immediate_steps_hi?.length
                ? guide.immediate_steps_hi
                : language === 'ta'
                ? guide.immediate_steps_ta
                : guide.immediate_steps
              ).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Evidence to Preserve & Info to Keep Ready */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evidence */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <h3 className="font-heading font-bold text-sm sm:text-base text-navy-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{t.evidencePreserveTitle}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(language === 'hi' ? [
                  "बैंक स्टेटमेंट जिसमें डेबिट तिथि, समय, राशि और 12-अंकों का UTR/RRN नंबर दिखाई दे।",
                  "पूरे WhatsApp/Telegram चैट के स्क्रीनशॉट जिसमें फोन नंबर, प्रोफ़ाइल हैंडल और ग्रुप संदेश शामिल हों।",
                  "प्राप्तकर्ता का UPI ID या खाता विवरण दिखाने वाले भुगतान के स्क्रीनशॉट।"
                ] : language === 'ta' ? [
                  "பணம் பிடித்தம் செய்யப்பட்ட தேதி, நேரம், தொகை மற்றும் 12 இலக்க UTR/RRN எண் கொண்ட வங்கி அறிக்கை.",
                  "தொலைபேசி எண்கள், கணக்கு விவரங்கள் மற்றும் குழு செய்திகளுடன் கூடிய முழு வாட்ஸ்அப்/டெலிகிராம் ஸ்கிரீன்ஷாட்கள்.",
                  "பணம் பெற்ற நபரின் UPI ஐடி அல்லது கணக்கு விவரங்களை காட்டும் கட்டண ரசீதுகள்."
                ] : guide.evidence_to_preserve).map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Needed */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <h3 className="font-heading font-bold text-sm sm:text-base text-navy-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'hi' 
                    ? 'तैयार रखने योग्य आवश्यक जानकारी' 
                    : language === 'ta' 
                    ? 'தயாராக வைத்திருக்க வேண்டிய விவரங்கள்' 
                    : 'Information to Keep Ready'}
                </span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(language === 'hi' ? [
                  "बैंक खाता संख्या और पंजीकृत मोबाइल नंबर।",
                  "लेनदेन संदर्भ संख्या (UTR / IMPS / UPI Ref ID)।",
                  "संदेशों और कॉल के समय-चिह्नित (Time-stamped) स्क्रीनशॉट।"
                ] : language === 'ta' ? [
                  "வங்கி கணக்கு எண் மற்றும் வங்கியில் பதிவு செய்யப்பட்ட மொபைல் எண்.",
                  "பரிவர்த்தனை குறிப்பு எண் (UTR / IMPS / UPI Ref ID).",
                  "செய்திகள் மற்றும் தகவல்களின் கால அளவுடன் கூடிய ஸ்கிரீன்ஷாட்கள்."
                ] : guide.info_to_keep_ready).map((info, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Official Authority Contacts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <h3 className="font-heading font-bold text-base text-navy-900 mb-4 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>{t.authoritiesContactTitle}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guide.who_to_contact.map((contact, i) => {
                const desc = language === 'hi' 
                  ? (contact.type === 'cybercrime' 
                      ? 'वास्तविक समय में धोखाधड़ी वाले बैंक खातों को फ्रीज करने वाली प्राथमिक सरकारी एजेंसी।' 
                      : 'निवेशक शिकायतों के लिए आधिकारिक SEBI पोर्टल।')
                  : language === 'ta'
                  ? (contact.type === 'cybercrime'
                      ? 'மோசடி வங்கிக் கணக்குகளை முடக்கும் முதன்மை அரசு அமைப்பு.'
                      : 'முதலீட்டாளர் புகார்களுக்கான அதிகாரப்பூர்வ SEBI தளம்.')
                  : contact.description;

                return (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {contact.type}
                      </span>
                      <h4 className="font-bold text-sm text-navy-900 mt-2">
                        {contact.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {desc}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">
                        {language === 'hi' ? 'हेल्पलाइन:' : language === 'ta' ? 'உதவி எண்:' : 'Helpline:'} <span className="text-blue-600">{contact.helpline}</span>
                      </div>
                      <a
                        href={contact.portal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium text-[11px]"
                      >
                        {language === 'hi' ? 'आधिकारिक पोर्टल पर जाएँ' : language === 'ta' ? 'அதிகாரப்பூர்வ தளம்' : 'Visit Official Portal'} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Escalation Path */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <h3 className="font-heading font-bold text-base text-navy-900 mb-3">
              {language === 'hi' ? 'औपचारिक शिकायत वृद्धि सीढ़ी' : language === 'ta' ? 'படிநிலைப் புகார் கட்டமைப்பு' : 'Formal Escalation Ladder'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {(language === 'hi' ? [
                "चरण 1: आपातकालीन 1930 डायल करें + बैंक में धोखाधड़ी की सूचना (0-2 घंटे)",
                "चरण 2: cybercrime.gov.in पर शिकायत दर्ज करें और पावती संख्या प्राप्त करें (दिन 1)",
                "चरण 3: अपनी बैंक शाखा में साइबर पावती और आवेदन पत्र जमा करें"
              ] : language === 'ta' ? [
                "படி 1: அவசர 1930 அழைப்பு + வங்கிக்கு தகவல் தெரிவித்தல் (0-2 மணி நேரம்)",
                "படி 2: cybercrime.gov.in-ல் புகார் பதிவு செய்து ஒப்புதல் எண் பெறுதல் (நாள் 1)",
                "படி 3: வங்கி கிளையில் புகார் நகலை சமர்ப்பித்தல்"
              ] : guide.escalation_path).map((path, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                  {path}
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Ready-to-use Complaint Template Draft */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{t.complaintDraftTitle}</span>
              </h3>
              <button
                onClick={handleCopyDraft}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                {copiedDraft ? t.copiedBtn : t.copyDraftBtn}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-72">
              {guide.complaint_draft_template}
            </pre>
            <p className="text-[11px] text-slate-500 mt-2">
              {language === 'hi'
                ? 'साइबर क्राइम या SEBI को सबमिट करने से पहले कोष्ठक [दिनांक, राशि, UTR] में अपने सटीक लेनदेन विवरण भरें।'
                : language === 'ta'
                ? 'அடைப்புக்குறிக்குள் உள்ள [தேதி, தொகை, UTR] விவரங்களை பூர்த்தி செய்து சமர்ப்பிக்கவும்.'
                : 'Fill in the bracketed placeholders [Date, Amount, UTR] with your exact transaction details before submitting to Cyber Crime or SEBI.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

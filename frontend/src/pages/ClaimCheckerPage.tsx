import React, { useState } from 'react';
import { 
  SearchCheck, Sparkles, AlertTriangle, ShieldCheck, 
  ArrowRight, ShieldAlert, CheckCircle, RefreshCw, AlertOctagon 
} from 'lucide-react';
import { Language, ClaimCheckResponse } from '../types';
import { checkClaim } from '../services/api';
import { getTranslation } from '../i18n/translations';

interface ClaimCheckerPageProps {
  language: Language;
}

const SAMPLE_CLAIMS = [
  {
    en: "Guaranteed 40% returns in 3 months through our AI trading platform.",
    ta: "எங்கள் AI டிரேடிங் தளம் மூலம் 3 மாதங்களில் 40% உறுதியான வருமானம்.",
    hi: "हमारे AI ट्रेडिंग प्लेटफॉर्म के माध्यम से 3 महीनों में 40% रिटर्न की गारंटी।"
  },
  {
    en: "Double your money in 7 days with 100% risk-free algorithmic bot.",
    ta: "100% ஆபத்தில்லாத அல்காரிதம் பாட் மூலம் 7 நாட்களில் உங்கள் பணத்தை இரட்டிப்பாக்குங்கள்.",
    hi: "100% जोखिम-मुक्त एल्गोरिथम बॉट के साथ 7 दिनों में अपना पैसा दोगुना करें।"
  },
  {
    en: "Invest in Nifty Index Mutual Fund with long term historical CAGR of 12-14%. Market risks apply.",
    ta: "நீண்ட கால சராசரி 12-14% வருமானம் கொண்ட நிஃப்டி இண்டெக்ஸ் மியூச்சுவல் ஃபண்டில் முதலீடு செய்யுங்கள். சந்தை அபாயங்களுக்கு உட்பட்டது.",
    hi: "12-14% के दीर्घकालिक ऐतिहासिक CAGR वाले निफ्टी इंडेक्स म्यूचुअल फंड में निवेश करें। बाजार जोखिम लागू।"
  },
  {
    en: "Govt & SEBI certified VIP club: Earn ₹5,000 daily payout with zero risk.",
    ta: "அரசு & SEBI சான்றளிக்கப்பட்ட விஐபி கிளப்: பூஜ்ஜிய ஆபத்துடன் தினமும் ₹5,000 வருமானம் பெறுங்கள்.",
    hi: "सरकार और SEBI प्रमाणित VIP क्लब: शून्य जोखिम के साथ प्रतिदिन ₹5,000 का पेआउट कमाएँ।"
  }
];

export const ClaimCheckerPage: React.FC<ClaimCheckerPageProps> = ({ language }) => {
  const t = getTranslation(language);
  const initialClaim = language === 'hi' ? SAMPLE_CLAIMS[0].hi : language === 'ta' ? SAMPLE_CLAIMS[0].ta : SAMPLE_CLAIMS[0].en;
  const [claimText, setClaimText] = useState(initialClaim);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ClaimCheckResponse | null>(null);

  const handleCheck = async (textToUse?: string) => {
    const text = textToUse || claimText;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const res = await checkClaim(text, language);
      setResult(res);
    } catch (err) {
      console.error("Claim check error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_CLAIMS[0]) => {
    const text = language === 'hi' ? sample.hi : language === 'ta' ? sample.ta : sample.en;
    setClaimText(text);
    handleCheck(text);
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            {language === 'hi' ? 'गंभीर जोखिम दावा (CRITICAL)' : language === 'ta' ? 'அதி தீவிர ஆபத்துள்ள கூற்று' : 'CRITICAL RISK CLAIM'}
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
            {language === 'hi' ? 'उच्च चिंता दावा (HIGH)' : language === 'ta' ? 'அதிக ஆபத்துள்ள கூற்று' : 'HIGH CONCERN CLAIM'}
          </span>
        );
      case 'MODERATE':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
            {language === 'hi' ? 'सावधानी की आवश्यकता (CAUTION)' : language === 'ta' ? 'மிதமான எச்சரிக்கை' : 'MODERATE CAUTION'}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            {language === 'hi' ? 'कम चिंता (LOW CONCERN)' : language === 'ta' ? 'குறைந்த கவலை' : 'LOW CONCERN'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <SearchCheck className="w-3.5 h-3.5" />
          <span>{t.claimCategory}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
          {t.claimTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {t.claimDescription}
        </p>
      </div>

      {/* Preset Samples */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {t.sampleClaimsHeader}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">1-Click Check</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_CLAIMS.map((sample, idx) => {
            const displaySample = language === 'hi' ? sample.hi : language === 'ta' ? sample.ta : sample.en;
            return (
              <button
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-800 transition shadow-sm text-left truncate max-w-md"
              >
                "{displaySample}"
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            {t.claimInputLabel}
          </label>
          <input
            type="text"
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            placeholder={t.claimInputPlaceholder}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-medium"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500">
            {t.claimInputHelper}
          </span>
          <button
            onClick={() => handleCheck()}
            disabled={isProcessing || !claimText.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs sm:text-sm font-bold hover:bg-navy-800 disabled:opacity-50 transition shadow-sm"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>{t.checkingLoader}</span>
              </>
            ) : (
              <>
                <SearchCheck className="w-4 h-4 text-blue-400" />
                <span>{t.checkClaimBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Verdict Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t.claimResultTitle}
                </span>
                <p className="text-sm sm:text-base font-semibold text-navy-950 font-mono">
                  "{result.original_claim}"
                </p>
              </div>
              {getRiskBadge(result.risk_level)}
            </div>

            {/* Visual Breakdown Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t.returnClaimCol}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${result.return_claim ? 'text-red-600' : 'text-slate-600'}`}>
                  {result.return_claim 
                    ? (language === 'hi' ? 'रिटर्न का दावा पाया गया' : language === 'ta' ? 'வருமான வாக்குறுதி உள்ளது' : result.return_claim) 
                    : t.noneSpecified}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t.guaranteeLanguageCol}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${result.guarantee_language ? 'text-red-600' : 'text-slate-600'}`}>
                  {result.guarantee_language 
                    ? (language === 'hi' ? 'गारंटी / निश्चित रिटर्न' : language === 'ta' ? 'உத்தரவாத வார்த்தைகள் உள்ளன' : result.guarantee_language) 
                    : t.noneDetected}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {t.timePressureCol}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${result.time_pressure ? 'text-amber-600' : 'text-slate-600'}`}>
                  {result.time_pressure 
                    ? (language === 'hi' ? 'अल्पकालिक दबाव' : language === 'ta' ? 'குறுகிய கால அழுத்தம்' : result.time_pressure) 
                    : (language === 'hi' ? 'सामान्य / अनिर्दिष्ट' : language === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Normal / Unspecified')}
                </span>
              </div>
            </div>

            {/* Safety Interpretation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block">
                {t.safetyInterpretationTitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'hi' 
                  ? (result.safety_interpretation_hi || result.safety_interpretation) 
                  : language === 'ta' 
                  ? result.safety_interpretation_ta 
                  : result.safety_interpretation}
              </p>
            </div>

            {/* Misleading Signals list */}
            {result.misleading_indicators.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 block mb-2">
                  {t.misleadingElementsTitle}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(language === 'hi' && result.misleading_indicators_hi?.length
                    ? result.misleading_indicators_hi
                    : language === 'ta' && result.misleading_indicators_ta?.length
                    ? result.misleading_indicators_ta
                    : result.misleading_indicators
                  ).map((ind, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">⚠</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Verification Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <h4 className="font-heading font-bold text-sm sm:text-base text-navy-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.mandatoryStepsTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {(language === 'hi' && result.suggested_verification_steps_hi?.length
                ? result.suggested_verification_steps_hi
                : language === 'ta' && result.suggested_verification_steps_ta?.length
                ? result.suggested_verification_steps_ta
                : result.suggested_verification_steps
              ).map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

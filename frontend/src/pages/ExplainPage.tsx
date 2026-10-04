import React, { useState } from 'react';
import { 
  FileText, ArrowRight, BookOpen, 
  AlertCircle, CheckCircle, RefreshCw, Globe, HelpCircle 
} from 'lucide-react';
import { Language, ExplainResponse } from '../types';
import { explainText } from '../services/api';
import { getTranslation } from '../i18n/translations';

interface ExplainPageProps {
  language: Language;
}

const PRESET_SAMPLES = [
  {
    title: "SEBI F&O Derivatives Risk Disclosure",
    title_ta: "SEBI F&O இடர் எச்சரிக்கை அறிக்கை",
    title_hi: "SEBI F&O डेरिवेटिव्स जोखिम प्रकटीकरण",
    text: "Risk Disclosure on Derivatives: 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. Over and above the net trading losses, active traders incurred an additional 28% of net trading losses as transaction costs.",
    text_hi: "डेरिवेटिव्स पर जोखिम प्रकटीकरण: इक्विटी फ्यूचर्स और ऑप्शंस में 10 में से 9 व्यक्तिगत ट्रेडर्स को शुद्ध घाटा हुआ। इसके अतिरिक्त, सक्रिय ट्रेडर्स को ट्रेडिंग घाटे का 28% लेनदेन शुल्क के रूप में अतिरिक्त चुकाना पड़ा।"
  },
  {
    title: "Market Volatility & Liquidity Constraints",
    title_ta: "சந்தை ஏற்ற இறக்கம் & ரொக்கப் பண வரம்பு",
    title_hi: "बाजार में उतार-चढ़ाव एवं नकदी सीमा",
    text: "Investors shall bear market-linked volatility and liquidity risk. In extreme market dislocations, redemption requests may face gating or deferred processing as per scheme information document.",
    text_hi: "निवेशकों को बाजार से जुड़े उतार-चढ़ाव और नकदी जोखिम का सामना करना पड़ेगा। अत्यधिक बाजार असंतुलन की स्थिति में, स्कीम दस्तावेज के अनुसार निकासी अनुरोधों पर रोक या विलंब हो सकता है।"
  },
  {
    title: "Mutual Fund Exit Load & Lock-in Clause",
    title_ta: "மியூச்சுவல் ஃபண்ட் வெளியேறும் கட்டண விதிமுறை",
    title_hi: "म्यूचुअल फंड एग्जिट लोड और लॉक-इन नियम",
    text: "An exit load of 1.00% is applicable if units redeemed within 365 days from date of allotment. No exit load thereafter. Capital gains tax is separately chargeable as per applicable tax bracket.",
    text_hi: "आवंटन की तारीख से 365 दिनों के भीतर निकासी पर 1.00% का एग्जिट लोड लागू होगा। इसके बाद कोई एग्जिट लोड नहीं होगा। लागू टैक्स स्लैब के अनुसार पूंजीगत लाभ कर अलग से देय होगा।"
  }
];

export const ExplainPage: React.FC<ExplainPageProps> = ({ language }) => {
  const t = getTranslation(language);
  const initialText = language === 'hi' 
    ? (PRESET_SAMPLES[0].text_hi || PRESET_SAMPLES[0].text)
    : PRESET_SAMPLES[0].text;
  const [inputText, setInputText] = useState(initialText);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ExplainResponse | null>(null);

  const handleExplain = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const res = await explainText(text, language);
      setResult(res);
    } catch (err) {
      console.error("Explain error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectPreset = (sample: typeof PRESET_SAMPLES[0]) => {
    const textToSet = language === 'hi' && sample.text_hi ? sample.text_hi : sample.text;
    setInputText(textToSet);
    handleExplain(textToSet);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.explainCategory}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
          {t.explainTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {t.explainDescription}
        </p>
      </div>

      {/* Preset Samples */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            {t.selectClausePrompt}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">1-Click Test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SAMPLES.map((sample, idx) => {
            const title = language === 'hi' ? sample.title_hi : language === 'ta' ? sample.title_ta : sample.title;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPreset(sample)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-800 transition shadow-sm"
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            {t.pasteClauseLabel}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder={t.pasteClausePlaceholder}
            className="w-full rounded-2xl border border-slate-300 p-4 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition leading-relaxed font-mono"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500">
            {language === 'hi' 
              ? 'अंग्रेजी एवं सरल स्वाभाविक हिन्दी व्याख्या समर्थित' 
              : language === 'ta' 
              ? 'எளிய தமிழ் மற்றும் ஆங்கில விளக்கங்களை வழங்குகிறது' 
              : 'Supports English, Tamil & Hindi natural translations'}
          </span>
          <button
            onClick={() => handleExplain()}
            disabled={isProcessing || !inputText.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs sm:text-sm font-bold hover:bg-navy-800 disabled:opacity-50 transition shadow-sm"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>{t.simplifyingLoader}</span>
              </>
            ) : (
              <span>{t.simplifyBtn}</span>
            )}
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dual Language Simple Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Simple English */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {t.simpleEnglishTitle}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  Crystal Clear
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                "{result.simple_english}"
              </p>
            </div>

            {/* Simple Regional (Hindi or Tamil) */}
            {language === 'hi' ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {t.simpleRegionalTitle}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-semibold">
                    पहला निवेश
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  "{result.simple_hindi || result.simple_english}"
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {t.simpleRegionalTitle}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                    முதல்முறை முதலீட்டாளர்
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium tamil-text">
                  "{result.simple_tamil}"
                </p>
              </div>
            )}
          </div>

          {/* Practical Meaning & Hidden Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What It Actually Means */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-navy-900">
                    {t.actualMeaningTitle}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'hi' 
                  ? (result.actual_meaning_hi || result.actual_meaning) 
                  : language === 'ta' 
                  ? result.actual_meaning_ta 
                  : result.actual_meaning}
              </p>
            </div>

            {/* Hidden Risks to Understand */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-navy-900">
                    {t.hiddenRisksTitle}
                  </h3>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(language === 'hi' 
                  ? (result.hidden_risks_hi || result.hidden_risks) 
                  : language === 'ta' 
                  ? result.hidden_risks_ta 
                  : result.hidden_risks
                ).map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Terms Glossary */}
          {result.important_terms && result.important_terms.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
              <h3 className="font-heading font-bold text-base text-navy-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{t.glossaryTitle}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.important_terms.map((term, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="font-bold text-xs sm:text-sm text-navy-900 block">
                      {term.term}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'hi' 
                        ? (term.meaning_hi || term.meaning_en) 
                        : language === 'ta' 
                        ? term.meaning_ta 
                        : term.meaning_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

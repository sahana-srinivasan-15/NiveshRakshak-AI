import React, { useState } from 'react';
import { Language } from '../types';
import { CheckSquare, Square, ShieldCheck, ExternalLink, Copy, Check } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

interface SafeActionPlanProps {
  planEn: string[];
  planTa: string[];
  planHi?: string[];
  language: Language;
}

export const SafeActionPlan: React.FC<SafeActionPlanProps> = ({ planEn, planTa, planHi, language }) => {
  const t = getTranslation(language);
  const plan = language === 'hi' 
    ? (planHi && planHi.length > 0 ? planHi : planEn) 
    : language === 'ta' 
    ? planTa 
    : planEn;

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [copied, setCopied] = useState(false);

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopy = () => {
    const textToCopy = plan.map((p, i) => `${i + 1}. ${p}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-navy-900">
              {t.safeActionTitle}
            </h3>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              {t.safeActionSubTitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-navy-900 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          {copied ? t.copiedBtn : t.copyBtn}
        </button>
      </div>

      <div className="space-y-3">
        {plan.map((step, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                isDone 
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-500' 
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <button className="mt-0.5 shrink-0 text-blue-600 hover:scale-110 transition" aria-label="Toggle completed">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className={`font-semibold mr-1.5 ${isDone ? 'text-emerald-700 line-through' : 'text-navy-900'}`}>
                  {t.stepPrefix} {idx + 1}:
                </span>
                <span className={isDone ? 'line-through text-slate-400' : ''}>
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Verification Quick Links */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
          {t.officialGatewaysTitle}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <a
            href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-slate-700"
          >
            <span className="font-medium text-navy-900">SEBI Recognised Intermediaries</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-slate-700"
          >
            <span className="font-medium text-navy-900">National Cyber Crime Helpline (1930)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-slate-700"
          >
            <span className="font-medium text-navy-900">SEBI SCORES 2.0 (Investor Complaints)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://sachet.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-slate-700"
          >
            <span className="font-medium text-navy-900">RBI Sachet (Unregistered Entities Portal)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

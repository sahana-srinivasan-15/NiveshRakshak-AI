import React from 'react';
import { DetectedSignal, Language } from '../types';
import { 
  ShieldAlert, TrendingUp, Clock, CreditCard, 
  Award, KeyRound, ExternalLink, AlertTriangle, 
  CheckCircle, ArrowRight, HelpCircle 
} from 'lucide-react';
import { getTranslation } from '../i18n/translations';

interface DetectedSignalsListProps {
  signals: DetectedSignal[];
  language: Language;
}

export const DetectedSignalsList: React.FC<DetectedSignalsListProps> = ({ signals, language }) => {
  const t = getTranslation(language);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'TrendingUp': return TrendingUp;
      case 'Clock': return Clock;
      case 'CreditCard': return CreditCard;
      case 'Award': return Award;
      case 'KeyRound': return KeyRound;
      case 'ExternalLink': return ExternalLink;
      default: return AlertTriangle;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
            {t.flagCritical}
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
            {t.flagHigh}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
            {t.flagCaution}
          </span>
        );
    }
  };

  if (signals.length === 0) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="font-heading font-bold text-emerald-900 text-base">
          {t.noSignalsFound}
        </h4>
        <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
          {t.noSignalsDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-navy-900 flex items-center gap-2">
          <span>{t.signalsHeading}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {signals.length}
          </span>
        </h3>
        <span className="text-xs text-slate-500 hidden sm:inline">
          {t.signalsSubHeading}
        </span>
      </div>

      <div className="space-y-3">
        {signals.map((sig) => {
          const Icon = getIcon(sig.icon);
          const isCritical = sig.severity === 'critical';

          const title = language === 'hi' ? (sig.title_hi || sig.title) : language === 'ta' ? sig.title_ta : sig.title;
          const whyItMatters = language === 'hi' ? (sig.why_it_matters_hi || sig.why_it_matters) : language === 'ta' ? sig.why_it_matters_ta : sig.why_it_matters;
          const action = language === 'hi' ? (sig.recommended_action_hi || sig.recommended_action) : language === 'ta' ? sig.recommended_action_ta : sig.recommended_action;

          return (
            <div
              key={sig.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCritical
                  ? 'bg-red-50/40 border-red-200 hover:border-red-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-sm`}
            >
              {/* Signal Header Bar */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isCritical 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-navy-950">
                      {title}
                    </h4>
                    
                    {/* Verbatim Evidence Snippet */}
                    <div className="mt-1.5 p-2 rounded-lg bg-white/80 border border-slate-200 text-xs font-mono text-slate-800 flex items-start gap-1.5">
                      <span className="font-semibold text-slate-500 shrink-0 font-sans">
                        {t.evidenceLabel}
                      </span>
                      <span className="text-red-700 font-semibold break-all">
                        "{sig.evidence}"
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {getSeverityBadge(sig.severity)}
                </div>
              </div>

              {/* Explanatory Details */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Why it matters */}
                <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.whyRiskyLabel}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {whyItMatters}
                  </p>
                </div>

                {/* Recommended action */}
                <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.whatToDoLabel}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium text-emerald-950">
                    {action}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { OcrBox, Language } from '../types';
import { Eye, Sparkles } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

interface ScreenshotAnnotatorProps {
  imagePreviewUrl?: string;
  extractedText: string;
  boxes?: OcrBox[];
  language: Language;
}

export const ScreenshotAnnotator: React.FC<ScreenshotAnnotatorProps> = ({
  extractedText,
  boxes,
  language
}) => {
  const t = getTranslation(language);

  const getSignalBadgeText = (isCritical: boolean) => {
    if (language === 'hi') {
      return isCritical ? '⚠ गंभीर जोखिम संकेत' : '⚠ सावधानी संकेत';
    }
    if (language === 'ta') {
      return isCritical ? '⚠ தீவிர எச்சரிக்கை' : '⚠ கவனத்திற்குரியது';
    }
    return isCritical ? '⚠ High Risk Signal' : '⚠ Caution Signal';
  };

  const getFlaggedRegionLabel = () => {
    if (language === 'hi') return 'चिह्नित क्षेत्र';
    if (language === 'ta') return 'எச்சரிக்கை பகுதி';
    return 'FLAGGED REGION';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-bold text-base text-navy-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>{t.annotatorTitle}</span>
          </h3>
          <p className="text-xs text-slate-500">
            {t.annotatorSubtitle}
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {t.ocrActiveBadge}
        </span>
      </div>

      {/* Visual Annotation Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[220px]">
        {/* Background gradient simulating chat interface */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-900 opacity-95 pointer-events-none" />

        {/* Content with highlighted risk markers */}
        <div className="relative z-10 space-y-2 whitespace-pre-wrap select-text">
          {extractedText.split('\n').map((line, idx) => {
            const lower = line.toLowerCase();
            const isSuspicious = /guaranteed|assured|30%|35%|double|risk-free|sebi approved|slot|gpay|okaxis|bit\.ly|otp|pin|गारंटी|रिटर्न|दोगुना|स्लॉट|பங்குச்சந்தை/i.test(lower);
            const isCritical = /guaranteed|sebi approved|gpay|okaxis|otp|गारंटी|₹10,000|phonepe/i.test(lower);

            if (isSuspicious) {
              return (
                <div 
                  key={idx} 
                  className={`p-1.5 rounded border transition-all ${
                    isCritical 
                      ? 'bg-red-950/60 border-red-500/70 text-red-200 shadow-sm' 
                      : 'bg-amber-950/60 border-amber-500/70 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider mb-0.5">
                    <span className={isCritical ? 'text-red-400' : 'text-amber-400'}>
                      {getSignalBadgeText(isCritical)}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">{getFlaggedRegionLabel()}</span>
                  </div>
                  <div>{line}</div>
                </div>
              );
            }

            return <div key={idx} className="text-slate-300 py-0.5">{line}</div>;
          })}
        </div>
      </div>

      {/* Annotations Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="font-semibold text-navy-900">{t.legendHighlights}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          {t.legendCritical}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          {t.legendCaution}
        </span>
      </div>
    </div>
  );
};

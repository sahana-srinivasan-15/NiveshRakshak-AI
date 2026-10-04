import React from 'react';
import { InvestorSafetyMeter, Language } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, AlertOctagon, Info } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

interface SafetyMeterGaugeProps {
  meter: InvestorSafetyMeter;
  language: Language;
}

export const SafetyMeterGauge: React.FC<SafetyMeterGaugeProps> = ({ meter, language }) => {
  const { score, level, level_ta, confidence } = meter;
  const t = getTranslation(language);

  // Determine styling based on score
  let badgeColor = 'bg-red-50 text-red-700 border-red-200';
  let gaugeColor = '#DC2626'; // red
  let Icon = AlertOctagon;
  let levelHi = 'गंभीर चिंता (CRITICAL CONCERN)';

  if (score <= 30) {
    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    gaugeColor = '#10B981'; // green
    Icon = CheckCircle2;
    levelHi = 'कम चिंता (LOW CONCERN)';
  } else if (score <= 60) {
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    gaugeColor = '#F59E0B'; // amber
    Icon = AlertTriangle;
    levelHi = 'सावधानी (CAUTION)';
  } else if (score <= 80) {
    badgeColor = 'bg-orange-50 text-orange-700 border-orange-200';
    gaugeColor = '#F97316'; // orange
    Icon = ShieldAlert;
    levelHi = 'उच्च चिंता (HIGH CONCERN)';
  }

  // Calculate needle angle (-90deg at score 0, 0deg at score 50, +90deg at score 100)
  const clampedScore = Math.max(0, Math.min(100, score));
  const needleAngle = -90 + (clampedScore / 100) * 180;

  const getLevelDisplay = () => {
    if (language === 'hi') return meter.level_hi || levelHi;
    if (language === 'ta') return level_ta;
    return level;
  };

  const getDisclaimer = () => {
    if (language === 'hi') {
      return "यह स्कोर प्रस्तुत सामग्री में पाए गए जोखिम संकेतों को दर्शाता है। यह कोई कानूनी या विनियामक निर्णय नहीं है कि प्रेषक या योजना धोखाधड़ी है। हमेशा आधिकारिक SEBI (sebi.gov.in) और NSDL पोर्टल पर स्वयं जाँच करें।";
    }
    if (language === 'ta') {
      return "இந்த மதிப்பெண் சமர்ப்பிக்கப்பட்ட உள்ளடக்கத்தில் கண்டறியப்பட்ட இடர் சமிக்ஞைகளை மட்டுமே பிரதிபலிக்கிறது. இது சட்டப்பூர்வ தீர்ப்பு அல்ல. எப்போதும் அதிகாரப்பூர்வ SEBI மற்றும் NSDL தளங்களில் சரிபார்க்கவும்.";
    }
    return meter.disclaimer;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-700" 
        style={{ backgroundColor: gaugeColor }}
      />

      <div className="flex flex-col items-center text-center">
        {/* Header with Title and Confidence */}
        <div className="flex items-center justify-between w-full mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {t.riskEvaluation}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <span className="font-bold text-slate-700">{(confidence * 100).toFixed(0)}%</span> {t.confidenceLabel}
          </span>
        </div>

        <h3 className="text-lg font-heading font-bold text-navy-950 tracking-tight">
          {t.meterTitle}
        </h3>
        <p className="text-xs text-slate-500 mb-2">
          {t.meterSubTitle}
        </p>

        {/* Speedometer SVG */}
        <div className="w-64 sm:w-72 h-36 relative flex items-center justify-center pt-2">
          <svg viewBox="0 0 240 135" className="w-full h-full overflow-visible">
            {/* Low Segment: 0 - 30 */}
            <path
              d="M 30 120 A 90 90 0 0 1 72 48"
              fill="none"
              stroke="#D1FAE5"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Caution Segment: 31 - 60 */}
            <path
              d="M 76 44 A 90 90 0 0 1 120 30"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="16"
            />
            {/* High Segment: 61 - 80 */}
            <path
              d="M 124 30 A 90 90 0 0 1 168 44"
              fill="none"
              stroke="#FFEDD5"
              strokeWidth="16"
            />
            {/* Critical Segment: 81 - 100 */}
            <path
              d="M 172 48 A 90 90 0 0 1 210 120"
              fill="none"
              stroke="#FEE2E2"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Subtle inner track line */}
            <path
              d="M 45 120 A 75 75 0 0 1 195 120"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="2"
              strokeDasharray="3 3"
            />

            {/* Gauge Limit Labels */}
            <text x="24" y="132" fontSize="9" fill="#94A3B8" fontWeight="bold" textAnchor="middle">0</text>
            <text x="120" y="20" fontSize="9" fill="#94A3B8" fontWeight="bold" textAnchor="middle">50</text>
            <text x="216" y="132" fontSize="9" fill="#94A3B8" fontWeight="bold" textAnchor="middle">100</text>

            {/* Needle Pivot Point */}
            <circle cx="120" cy="120" r="11" fill="#0F172A" />
            <circle cx="120" cy="120" r="5" fill="#FFFFFF" />

            {/* Rotating Needle */}
            <g transform={`rotate(${needleAngle}, 120, 120)`} className="transition-transform duration-1000 ease-out">
              <line
                x1="120"
                y1="120"
                x2="120"
                y2="38"
                stroke={gaugeColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <polygon
                points="117,46 123,46 120,32"
                fill={gaugeColor}
              />
            </g>
          </svg>
        </div>

        {/* Dedicated Score Display */}
        <div className="mt-1 flex flex-col items-center">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-navy-950 tracking-tight leading-none">
              {score}
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-400">
              / 100
            </span>
          </div>

          {/* Level Badge */}
          <div className={`mt-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${badgeColor} shadow-sm transition-all`}>
            <Icon className="w-4 h-4 shrink-0" />
            <span className="whitespace-normal leading-tight">
              {getLevelDisplay()}
            </span>
          </div>
        </div>

        {/* Range Reference Indicator Pills */}
        <div className="grid grid-cols-4 w-full gap-1.5 mt-4 text-[10px] text-center font-medium">
          <div className={`py-1.5 rounded-lg px-1 transition ${score <= 30 ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-400 shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            0–30
            <span className="block text-[9px] font-semibold">
              {language === 'hi' ? 'कम चिंता' : language === 'ta' ? 'குறைவு' : 'LOW'}
            </span>
          </div>
          <div className={`py-1.5 rounded-lg px-1 transition ${score > 30 && score <= 60 ? 'bg-amber-100 text-amber-900 font-bold border border-amber-400 shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            31–60
            <span className="block text-[9px] font-semibold">
              {language === 'hi' ? 'सावधानी' : language === 'ta' ? 'எச்சரிக்கை' : 'CAUTION'}
            </span>
          </div>
          <div className={`py-1.5 rounded-lg px-1 transition ${score > 60 && score <= 80 ? 'bg-orange-100 text-orange-900 font-bold border border-orange-400 shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            61–80
            <span className="block text-[9px] font-semibold">
              {language === 'hi' ? 'उच्च चिंता' : language === 'ta' ? 'அதிகம்' : 'HIGH'}
            </span>
          </div>
          <div className={`py-1.5 rounded-lg px-1 transition ${score > 80 ? 'bg-red-100 text-red-900 font-bold border border-red-400 shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            81–100
            <span className="block text-[9px] font-semibold">
              {language === 'hi' ? 'गंभीर चिंता' : language === 'ta' ? 'தீவிரம்' : 'CRITICAL'}
            </span>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 w-full">
          <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {getDisclaimer()}
          </p>
        </div>
      </div>
    </div>
  );
};

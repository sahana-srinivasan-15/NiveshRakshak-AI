import React from 'react';
import { ShieldCheck, ExternalLink, Lock, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = getTranslation(language);

  const getRegulatoryNotice = () => {
    if (language === 'hi') {
      return 'NiveshRakshak किसी भी प्रकार के शेयर टिप्स, खरीद/बिक्री की सलाह, पोर्टफोलियो प्रबंधन या मूल्य भविष्यवाणी प्रदान नहीं करता है। यह केवल निवेशक जागरूकता और धोखाधड़ी से बचाव के लिए एक रक्षात्मक प्रणाली के रूप में कार्य करता है।';
    }
    if (language === 'ta') {
      return 'இந்த தளம் பங்குச் சந்தை பரிந்துரைகளையோ அல்லது வாங்குதல்/விற்றல் ஆலோசனைகளையோ வழங்குவதில்லை. முதலீட்டாளர் விழிப்புணர்வு மற்றும் பாதுகாப்பு நோக்கத்திற்காக மட்டுமே செயல்படுகிறது.';
    }
    return 'NiveshRakshak strictly does NOT provide stock tips, buy/sell recommendations, portfolio advice, or stock price predictions. It operates solely as an investor resilience and fraud risk awareness engine.';
  };

  const getComplianceHeading = () => {
    if (language === 'hi') return 'विनियामक अनुपालन नीति';
    if (language === 'ta') return 'விதிமுறைக் கொள்கை';
    return 'Regulatory Compliance';
  };

  return (
    <footer className="bg-navy-950 text-slate-400 text-sm mt-20 border-t border-slate-800">
      {/* Top Banner - Regulatory & Emergency Hotlines */}
      <div className="bg-navy-900/80 border-b border-navy-800/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {t.emergencyHelplineTitle}
              </p>
              <p className="text-xs text-slate-400">
                {t.emergencyHelplineDesc}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <a 
              href="https://scores.sebi.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 text-slate-200 hover:bg-navy-700 transition"
            >
              SEBI SCORES 2.0 <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://cybercrime.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 text-slate-200 hover:bg-navy-700 transition"
            >
              Cybercrime Portal (1930) <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://smartodr.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 text-slate-200 hover:bg-navy-700 transition"
            >
              SMART ODR <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <span className="font-heading font-bold text-lg">{t.brandName}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
              {t.footerAboutText}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>{t.privacyFirstBadge}</span>
            </div>
          </div>

          {/* Official Verification Portals */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {t.officialPortalsTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
                  SEBI Official Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://nsdl.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
                  NSDL Official Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
                  SEBI Intermediaries Registry <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.amfiindia.com/locate-your-nearest-mutual-fund-distributor-arn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
                  AMFI ARN Verification <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Non-Speculative Policy */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {getComplianceHeading()}
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {getRegulatoryNotice()}
            </p>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 NiveshRakshak AI • SANGYAN Hackathon • SNTC, IIT (BHU) Varanasi × SEBI & NSDL</p>
          <p>Built with React, TypeScript, and Open Source Protective AI Models</p>
        </div>
      </div>
    </footer>
  );
};

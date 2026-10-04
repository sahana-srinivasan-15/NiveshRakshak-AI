import React from 'react';
import { Language } from '../types';
import { Upload, ScanText, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProcessingStepperProps {
  currentStep: number; // 1 to 4
  language: Language;
}

export const ProcessingStepper: React.FC<ProcessingStepperProps> = ({ currentStep, language }) => {
  const steps = [
    {
      id: 1,
      title: language === 'hi' ? "प्राप्ति (Intake)" : language === 'ta' ? "உள்ளீடு" : "Intake",
      desc: language === 'hi' ? "संदेश / स्क्रीनशॉट" : language === 'ta' ? "செய்தி / படம்" : "Message / Screenshot",
      icon: Upload
    },
    {
      id: 2,
      title: language === 'hi' ? "निष्कर्षण (Extraction)" : language === 'ta' ? "பிரித்தெடுத்தல்" : "Extraction",
      desc: language === 'hi' ? "OCR एवं पैटर्न पार्सर" : language === 'ta' ? "OCR எழுத்து பிரிப்பு" : "OCR & Pattern Parser",
      icon: ScanText
    },
    {
      id: 3,
      title: language === 'hi' ? "विश्लेषण (Analysis)" : language === 'ta' ? "ஆய்வு" : "Analysis",
      desc: language === 'hi' ? "सुरक्षा संकेत इंजन" : language === 'ta' ? "பாதுகாப்பு சமிக்ஞை" : "Safety Signal Engine",
      icon: Cpu
    },
    {
      id: 4,
      title: language === 'hi' ? "निष्कर्ष (Verdict)" : language === 'ta' ? "முடிவு" : "Verdict",
      desc: language === 'hi' ? "सुरक्षा मीटर एवं योजना" : language === 'ta' ? "அளவுகோல் & திட்டம்" : "Safety Meter & Plan",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          let stepClass = "border-slate-200 bg-slate-50 text-slate-400";
          let iconClass = "bg-slate-200 text-slate-500";

          if (isDone) {
            stepClass = "border-emerald-200 bg-emerald-50/60 text-emerald-800";
            iconClass = "bg-emerald-600 text-white";
          } else if (isActive) {
            stepClass = "border-blue-400 bg-blue-50/60 text-navy-900 ring-2 ring-blue-400/20";
            iconClass = "bg-blue-600 text-white animate-pulse";
          }

          return (
            <div 
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${stepClass}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold font-heading">
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

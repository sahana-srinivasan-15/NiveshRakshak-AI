import React, { useState, useEffect } from 'react';
import { 
  Upload, FileText, Search, Sparkles, RefreshCw, 
  ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2, 
  Image as ImageIcon, HelpCircle, Globe, ChevronDown, ChevronUp, Copy, Check 
} from 'lucide-react';
import { Language, AnalyzeResponse, DemoScenario } from '../types';
import { analyzeMessage, analyzeImage, LOCAL_DEMO_SCENARIOS } from '../services/api';
import { SafetyMeterGauge } from '../components/SafetyMeterGauge';
import { DetectedSignalsList } from '../components/DetectedSignalsList';
import { SafeActionPlan } from '../components/SafeActionPlan';
import { ScreenshotAnnotator } from '../components/ScreenshotAnnotator';
import { ProcessingStepper } from '../components/ProcessingStepper';
import { getTranslation } from '../i18n/translations';

interface AnalyzePageProps {
  initialDemoId?: string;
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  initialDemoId,
  language,
  onNavigateTab
}) => {
  const t = getTranslation(language);
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [showEnglishOverride, setShowEnglishOverride] = useState(false);
  const [showFullExtracted, setShowFullExtracted] = useState(false);

  // Load demo scenario if initialDemoId passed
  useEffect(() => {
    if (initialDemoId) {
      loadScenario(initialDemoId);
    }
  }, [initialDemoId]);

  const loadScenario = (scenarioId: string) => {
    const sc = LOCAL_DEMO_SCENARIOS.find(s => s.id === scenarioId) || LOCAL_DEMO_SCENARIOS[0];
    setInputMode('text');
    const textToUse = language === 'hi' 
      ? (sc.full_text_hi || sc.full_text) 
      : language === 'ta' 
      ? (sc.full_text_ta || sc.full_text) 
      : sc.full_text;
    setInputText(textToUse);
    setSelectedFile(null);
    setImagePreviewUrl(null);
    // Automatically trigger run for judge convenience
    handleRunAnalysis(textToUse);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleRunAnalysis = async (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (inputMode === 'text' && !text.trim()) {
      alert(language === 'hi' ? "कृपया एक निवेश संदेश पेस्ट करें या कोई डेमो परिदृश्य चुनें।" : language === 'ta' ? "முதலீட்டு செய்தியை உள்ளிடவும் அல்லது ஒரு மாதிரியைத் தேர்ந்தெடுக்கவும்." : "Please paste an investment message or select a demo scenario.");
      return;
    }
    if (inputMode === 'image' && !selectedFile) {
      alert(language === 'hi' ? "कृपया विश्लेषण के लिए स्क्रीनशॉट अपलोड करें।" : language === 'ta' ? "ஆய்வு செய்ய ஸ்கிரீன்ஷாட்டை பதிவேற்றவும்." : "Please upload a screenshot or image to analyze.");
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    try {
      // Step 2: Extraction simulation
      setTimeout(() => setProcessingStep(2), 250);
      // Step 3: Analysis
      setTimeout(() => setProcessingStep(3), 500);

      let response: AnalyzeResponse;
      if (inputMode === 'image' && selectedFile) {
        response = await analyzeImage(selectedFile, language);
      } else {
        response = await analyzeMessage(text, 'user_input', language);
      }

      // Step 4: Finished
      setProcessingStep(4);
      setTimeout(() => {
        setResult(response);
        setIsProcessing(false);
      }, 700);

    } catch (err) {
      console.error("Analysis error:", err);
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setResult(null);
    setProcessingStep(1);
    setShowEnglishOverride(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Context */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.analyzerCategory}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
          {t.analyzerTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {t.analyzerDescription}
        </p>
      </div>

      {/* Built-in Demo Scenarios One-Click Selector */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {t.quickDemoHeader}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">1-Click Test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {LOCAL_DEMO_SCENARIOS.map((scenario, index) => {
            const isCritical = scenario.expected_score > 60;
            const scenarioTitle = language === 'hi' 
              ? (scenario.title_hi || scenario.title) 
              : language === 'ta' 
              ? scenario.title_ta 
              : scenario.title;

            return (
              <button
                key={scenario.id}
                onClick={() => loadScenario(scenario.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-800 transition shadow-sm flex items-center gap-1.5"
              >
                <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className="font-semibold">{index + 1}.</span>
                <span>{scenarioTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Section (Hidden when result is present, unless Reset) */}
      {!result ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          {/* Input Mode Selector */}
          <div className="border-b border-slate-200 bg-slate-50/70 p-2 flex items-center gap-2">
            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                inputMode === 'text'
                  ? 'bg-white text-navy-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.tabPasteText}</span>
            </button>

            <button
              onClick={() => setInputMode('image')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                inputMode === 'image'
                  ? 'bg-white text-navy-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.tabUploadImage}</span>
            </button>
          </div>

          <div className="p-6">
            {inputMode === 'text' ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  {t.inputMessageLabel}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.inputMessagePlaceholder}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-300 p-4 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-mono leading-relaxed"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-8 text-center bg-slate-50/50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-navy-900">
                    {selectedFile 
                      ? selectedFile.name 
                      : t.uploadDropzonePrompt}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t.uploadDropzoneSubtext}
                  </p>
                </div>

                {imagePreviewUrl && (
                  <div className="max-w-xs mx-auto border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <img src={imagePreviewUrl} alt="Screenshot Preview" className="w-full object-cover max-h-48" />
                  </div>
                )}
              </div>
            )}

            {/* Processing Stepper Status */}
            {isProcessing && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <ProcessingStepper currentStep={processingStep} language={language} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t.privacyNote}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    {t.clearBtn}
                  </button>
                )}

                <button
                  onClick={() => handleRunAnalysis()}
                  disabled={isProcessing}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white text-xs sm:text-sm font-bold hover:bg-navy-800 disabled:opacity-50 transition shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span>{t.analyzingLoader}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-blue-400" />
                      <span>{t.analyzeMessageBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= ANALYSIS RESULTS VIEW ================= */
        <div className="space-y-8 animate-fadeIn">
          {/* Top Bar with Re-scan option */}
          <div className="bg-navy-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
                  {result.analysis_mode === 'hybrid_ai_llm' ? 'Hybrid AI Model' : 'Deterministic Safety Engine'}
                </span>
                <span>• {new Date(result.timestamp).toLocaleTimeString()}</span>
              </div>
              <h2 className="text-xl font-heading font-bold text-white mt-1">
                {t.reportHeading}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {language !== 'en' && (
                <button
                  onClick={() => setShowEnglishOverride(!showEnglishOverride)}
                  className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-navy-700 transition flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>{showEnglishOverride ? (language === 'hi' ? 'हिन्दी सारांश' : 'தமிழில் விளக்கம்') : 'English Summary'}</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white text-navy-900 text-xs font-bold hover:bg-slate-100 transition flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.scanAnotherBtn}</span>
              </button>
            </div>
          </div>

          {/* Core Grid: Left Safety Gauge + Right Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Safety Meter Gauge */}
            <div className="lg:col-span-5 space-y-6">
              <SafetyMeterGauge meter={result.safety_meter} language={language} />

              {/* Visual Annotator */}
              <ScreenshotAnnotator 
                extractedText={result.extracted_text}
                boxes={result.ocr_boxes}
                language={language}
              />
            </div>

            {/* Right: Summary & Detected Risk Signals */}
            <div className="lg:col-span-7 space-y-6">
              {/* Executive Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-base text-navy-900">
                    {t.verdictSummaryTitle}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {result.signals.length} {t.flagsIdentifiedText}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
                  <p className="font-medium text-slate-900">
                    {showEnglishOverride 
                      ? result.summary_en 
                      : (language === 'hi' ? (result.summary_hi || result.summary_en) : language === 'ta' ? result.summary_ta : result.summary_en)}
                  </p>
                </div>

                {/* Extracted Content Accordion */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setShowFullExtracted(!showFullExtracted)}
                    className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-navy-900 font-medium"
                  >
                    <span>{t.viewRawMessage}</span>
                    {showFullExtracted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showFullExtracted && (
                    <div className="mt-2.5 p-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono whitespace-pre-wrap border border-slate-200">
                      {result.extracted_text}
                    </div>
                  )}
                </div>
              </div>

              {/* Detected Risk Signals List */}
              <DetectedSignalsList signals={result.signals} language={language} />

              {/* Safe Action Plan */}
              <SafeActionPlan 
                planEn={result.safe_action_plan} 
                planTa={result.safe_action_plan_ta} 
                planHi={result.safe_action_plan_hi}
                language={language} 
              />

              {/* Need Grievance Guidance Card */}
              <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    {t.needGrievancePrompt}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {t.needGrievanceDesc}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('grievance')}
                  className="shrink-0 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t.grievanceAssistantBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type Language = 'en' | 'ta' | 'hi';

export interface DetectedSignal {
  id: string;
  title: string;
  title_ta: string;
  title_hi?: string;
  icon: string;
  severity: 'critical' | 'high' | 'caution' | 'info';
  evidence: string;
  why_it_matters: string;
  why_it_matters_ta: string;
  why_it_matters_hi?: string;
  recommended_action: string;
  recommended_action_ta: string;
  recommended_action_hi?: string;
}

export interface InvestorSafetyMeter {
  score: number;
  level: string;
  level_ta: string;
  level_hi?: string;
  color: 'emerald' | 'amber' | 'orange' | 'red' | string;
  confidence: number;
  disclaimer: string;
}

export interface OcrBox {
  label: string;
  box: [number, number, number, number]; // [x_pct, y_pct, width_pct, height_pct]
  severity: string;
}

export interface AnalyzeResponse {
  safety_meter: InvestorSafetyMeter;
  extracted_text: string;
  signals: DetectedSignal[];
  summary_en: string;
  summary_ta: string;
  summary_hi?: string;
  safe_action_plan: string[];
  safe_action_plan_ta: string[];
  safe_action_plan_hi?: string[];
  evidence_snippets: string[];
  analysis_mode: string;
  timestamp: string;
  ocr_boxes?: OcrBox[];
}

export interface ImportantTerm {
  term: string;
  meaning_en: string;
  meaning_ta: string;
  meaning_hi?: string;
}

export interface ExplainResponse {
  original_text: string;
  simple_english: string;
  simple_tamil: string;
  simple_hindi?: string;
  important_terms: ImportantTerm[];
  actual_meaning: string;
  actual_meaning_ta: string;
  actual_meaning_hi?: string;
  hidden_risks: string[];
  hidden_risks_ta: string[];
  hidden_risks_hi?: string[];
  mode: string;
}

export interface ClaimCheckResponse {
  original_claim: string;
  return_claim?: string;
  guarantee_language?: string;
  time_pressure?: string;
  misleading_indicators: string[];
  misleading_indicators_ta?: string[];
  misleading_indicators_hi?: string[];
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  safety_interpretation: string;
  safety_interpretation_ta: string;
  safety_interpretation_hi?: string;
  suggested_verification_steps: string[];
  suggested_verification_steps_ta?: string[];
  suggested_verification_steps_hi?: string[];
}

export interface ContactEntity {
  name: string;
  portal: string;
  helpline: string;
  description: string;
  type: string;
}

export interface GrievanceResponse {
  situation_id: string;
  situation_title: string;
  situation_title_ta: string;
  situation_title_hi?: string;
  immediate_steps: string[];
  immediate_steps_ta: string[];
  immediate_steps_hi?: string[];
  evidence_to_preserve: string[];
  who_to_contact: ContactEntity[];
  info_to_keep_ready: string[];
  escalation_path: string[];
  complaint_draft_template: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  title_ta: string;
  title_hi?: string;
  source_type: 'whatsapp' | 'telegram' | 'ad' | 'sms' | 'educational';
  preview: string;
  preview_ta?: string;
  preview_hi?: string;
  full_text: string;
  full_text_ta?: string;
  full_text_hi?: string;
  expected_score: number;
  expected_level: string;
  expected_level_ta?: string;
  expected_level_hi?: string;
  key_signals: string[];
  key_signals_ta?: string[];
  key_signals_hi?: string[];
  image_url?: string;
}

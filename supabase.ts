import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Patient = {
  id: string;
  user_id: string;
  full_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  medical_history: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type ECGAnalysis = {
  id: string;
  patient_id: string;
  image_url: string;
  classification_result: 'Normal' | 'Abnormal' | 'Critical';
  confidence_score: number;
  detected_conditions: string[];
  heart_rate: number;
  analysis_timestamp: string;
  created_at: string;
};

export type VoiceAnalysis = {
  id: string;
  patient_id: string;
  audio_url: string;
  breathing_pattern: 'Normal' | 'Irregular' | 'Labored';
  vocal_fatigue_score: number;
  stress_level: number;
  voice_quality_metrics: Record<string, any>;
  risk_indicators: string[];
  analysis_timestamp: string;
  created_at: string;
};

export type RiskAssessment = {
  id: string;
  patient_id: string;
  ecg_analysis_id?: string;
  voice_analysis_id?: string;
  overall_risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
  created_at: string;
};

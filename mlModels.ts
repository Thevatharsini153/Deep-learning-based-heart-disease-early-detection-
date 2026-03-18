export const analyzeECGImage = async (imageFile: File): Promise<{
  classification_result: 'Normal' | 'Abnormal' | 'Critical';
  confidence_score: number;
  detected_conditions: string[];
  heart_rate: number;
}> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const conditions = [
    'Atrial Fibrillation',
    'Ventricular Tachycardia',
    'ST Elevation',
    'T-Wave Inversion',
    'Bundle Branch Block',
    'Premature Ventricular Contractions'
  ];

  const randomConditionCount = Math.floor(Math.random() * 3);
  const detectedConditions = [];
  for (let i = 0; i < randomConditionCount; i++) {
    const randomIndex = Math.floor(Math.random() * conditions.length);
    if (!detectedConditions.includes(conditions[randomIndex])) {
      detectedConditions.push(conditions[randomIndex]);
    }
  }

  const isCritical = detectedConditions.includes('Atrial Fibrillation') ||
                     detectedConditions.includes('Ventricular Tachycardia');
  const isAbnormal = detectedConditions.length > 0;

  const classification_result = isCritical ? 'Critical' : (isAbnormal ? 'Abnormal' : 'Normal');
  const baseConfidence = classification_result === 'Normal' ? 0.92 : 0.85;
  const confidence_score = baseConfidence + (Math.random() * 0.08);

  const baseHeartRate = 70;
  const variation = (Math.random() - 0.5) * 40;
  const heart_rate = Math.round(baseHeartRate + variation);

  return {
    classification_result,
    confidence_score: Math.min(confidence_score, 1),
    detected_conditions: detectedConditions,
    heart_rate: Math.max(40, Math.min(heart_rate, 200))
  };
};

export const analyzeVoiceBiomarkers = async (audioBlob: Blob): Promise<{
  breathing_pattern: 'Normal' | 'Irregular' | 'Labored';
  vocal_fatigue_score: number;
  stress_level: number;
  voice_quality_metrics: {
    pitch_variability: number;
    jitter: number;
    shimmer: number;
    harmonics_ratio: number;
  };
  risk_indicators: string[];
}> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const breathing_patterns: ('Normal' | 'Irregular' | 'Labored')[] = ['Normal', 'Irregular', 'Labored'];
  const breathing_pattern = breathing_patterns[Math.floor(Math.random() * breathing_patterns.length)];

  const vocal_fatigue_score = Math.random() * 0.7;
  const stress_level = Math.random() * 0.8;

  const voice_quality_metrics = {
    pitch_variability: 0.3 + Math.random() * 0.4,
    jitter: 0.02 + Math.random() * 0.05,
    shimmer: 0.03 + Math.random() * 0.06,
    harmonics_ratio: 0.7 + Math.random() * 0.25
  };

  const risk_indicators = [];
  if (vocal_fatigue_score > 0.5) risk_indicators.push('Elevated vocal fatigue');
  if (stress_level > 0.6) risk_indicators.push('High stress indicators');
  if (breathing_pattern === 'Labored') risk_indicators.push('Labored breathing detected');
  if (voice_quality_metrics.jitter > 0.05) risk_indicators.push('Abnormal vocal jitter');

  return {
    breathing_pattern,
    vocal_fatigue_score,
    stress_level,
    voice_quality_metrics,
    risk_indicators
  };
};

export const calculateRiskAssessment = (
  ecgResult: { classification_result: string; confidence_score: number; detected_conditions: string[] },
  voiceResult: { vocal_fatigue_score: number; stress_level: number; breathing_pattern: string; risk_indicators: string[] }
): {
  overall_risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
} => {
  let risk_score = 0;

  if (ecgResult.classification_result === 'Critical') risk_score += 40;
  else if (ecgResult.classification_result === 'Abnormal') risk_score += 25;
  else risk_score += 5;

  risk_score += ecgResult.detected_conditions.length * 8;

  if (voiceResult.breathing_pattern === 'Labored') risk_score += 15;
  else if (voiceResult.breathing_pattern === 'Irregular') risk_score += 10;

  risk_score += voiceResult.vocal_fatigue_score * 15;
  risk_score += voiceResult.stress_level * 10;
  risk_score += voiceResult.risk_indicators.length * 5;

  const overall_risk_score = Math.min(risk_score, 100);

  let risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  if (overall_risk_score >= 70) risk_level = 'Critical';
  else if (overall_risk_score >= 50) risk_level = 'High';
  else if (overall_risk_score >= 30) risk_level = 'Medium';
  else risk_level = 'Low';

  const recommendations = [];

  if (ecgResult.classification_result === 'Critical') {
    recommendations.push('🚨 URGENT: Visit the emergency room immediately or call emergency services');
    recommendations.push('Schedule a comprehensive cardiac evaluation with a cardiologist');
    recommendations.push('Avoid strenuous physical activities until cleared by a physician');
    recommendations.push('Keep a log of any chest pain, shortness of breath, or irregular heartbeat');
    recommendations.push('Inform family members about your condition and emergency protocols');
  } else if (ecgResult.classification_result === 'Abnormal') {
    recommendations.push('⚠️ Schedule an appointment with a cardiologist within 24-48 hours');
    recommendations.push('Monitor and document any symptoms: chest discomfort, palpitations, dizziness');
    recommendations.push('Avoid heavy exercise and reduce caffeine intake until medical evaluation');
    recommendations.push('Check blood pressure daily and maintain a log');
    recommendations.push('Consider wearing a heart rate monitor for continuous tracking');
  } else {
    recommendations.push('✅ Continue regular heart health monitoring every 3-6 months');
    recommendations.push('Maintain a balanced diet rich in fruits, vegetables, and omega-3 fatty acids');
    recommendations.push('Engage in at least 150 minutes of moderate aerobic exercise weekly');
    recommendations.push('Keep blood pressure below 120/80 mmHg through lifestyle and medication if needed');
  }

  if (ecgResult.detected_conditions.includes('Atrial Fibrillation')) {
    recommendations.push('💊 Discuss anticoagulation therapy with your doctor to prevent blood clots');
    recommendations.push('Avoid alcohol, excessive caffeine, and ensure adequate hydration');
  }

  if (ecgResult.detected_conditions.includes('Ventricular Tachycardia')) {
    recommendations.push('⚡ This is a serious arrhythmia - immediate medical attention required');
    recommendations.push('May require medication, catheter ablation, or implantable defibrillator');
  }

  if (voiceResult.stress_level > 0.7) {
    recommendations.push('🧘 HIGH STRESS DETECTED: Practice daily stress reduction (meditation, yoga, deep breathing)');
    recommendations.push('Consider professional counseling or cognitive behavioral therapy');
    recommendations.push('Limit work hours and ensure 7-8 hours of quality sleep nightly');
    recommendations.push('Engage in relaxing hobbies and social activities regularly');
  } else if (voiceResult.stress_level > 0.5) {
    recommendations.push('😌 Moderate stress detected: Implement stress management techniques');
    recommendations.push('Try progressive muscle relaxation or mindfulness exercises 10-15 minutes daily');
    recommendations.push('Maintain work-life balance and take regular breaks during the day');
  }

  if (voiceResult.breathing_pattern === 'Labored') {
    recommendations.push('🫁 BREATHING DIFFICULTY: Consult a pulmonologist immediately');
    recommendations.push('May indicate heart failure, COPD, or other cardiopulmonary conditions');
    recommendations.push('Avoid smoking and secondhand smoke exposure');
    recommendations.push('Consider pulmonary function tests and chest imaging');
  } else if (voiceResult.breathing_pattern === 'Irregular') {
    recommendations.push('🌬️ Schedule a respiratory evaluation within one week');
    recommendations.push('Practice breathing exercises: diaphragmatic breathing, pursed-lip breathing');
    recommendations.push('Monitor for worsening symptoms like wheezing or persistent cough');
  }

  if (voiceResult.vocal_fatigue_score > 0.6) {
    recommendations.push('🗣️ High vocal fatigue may indicate cardiovascular stress or breathing issues');
    recommendations.push('Ensure adequate rest and hydration (8-10 glasses of water daily)');
    recommendations.push('Consider ENT evaluation if fatigue persists');
  }

  if (risk_level === 'High' || risk_level === 'Critical') {
    recommendations.push('📋 Request complete lipid panel, blood glucose, and inflammatory markers (CRP, homocysteine)');
    recommendations.push('💊 Review all current medications with your doctor for potential interactions');
    recommendations.push('👨‍👩‍👧 Inform family members about your heart health status and emergency plans');
  }

  if (risk_level === 'Medium') {
    recommendations.push('🏃 Moderate risk: Increase physical activity gradually under medical supervision');
    recommendations.push('🥗 Adopt the Mediterranean or DASH diet for heart health');
    recommendations.push('📊 Get baseline tests: lipid profile, HbA1c, thyroid function');
  }

  if (risk_level === 'Low') {
    recommendations.push('💪 Excellent results! Continue healthy lifestyle habits');
    recommendations.push('🥗 Focus on preventive nutrition: reduce sodium, saturated fats, and processed foods');
    recommendations.push('🏃 Maintain regular exercise: 30 minutes moderate activity 5 days per week');
    recommendations.push('📅 Schedule routine cardiac screening every 6-12 months');
  }

  recommendations.push('📱 Consider using a health tracking app to monitor diet, exercise, and vital signs');
  recommendations.push('👥 Join a cardiac support group or wellness community for motivation and education');

  return {
    overall_risk_score,
    risk_level,
    recommendations
  };
};

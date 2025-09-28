'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Heart, Brain, Activity, AlertCircle } from 'lucide-react';
import { PHQ9_QUESTIONS, GAD7_QUESTIONS, calculatePHQ9Score, calculateGAD7Score } from '@/lib/data/assessments';
import { AssessmentQuestion, AssessmentResponse } from '@/lib/types/assessment';

type AssessmentType = 'intake' | 'phq9' | 'gad7';

const INTAKE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'intake-1',
    text: 'What brings you to therapy at this time?',
    type: 'text',
    required: true
  },
  {
    id: 'intake-2',
    text: 'What are your main concerns or challenges?',
    type: 'multiselect',
    required: true,
    options: [
      { value: 'anxiety', label: 'Anxiety' },
      { value: 'depression', label: 'Depression' },
      { value: 'relationships', label: 'Relationship Issues' },
      { value: 'trauma', label: 'Past Trauma' },
      { value: 'stress', label: 'Stress Management' },
      { value: 'self-esteem', label: 'Self-Esteem' },
      { value: 'grief', label: 'Grief & Loss' },
      { value: 'life-transitions', label: 'Life Transitions' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'intake-3',
    text: 'What are your goals for therapy?',
    type: 'text',
    required: true
  },
  {
    id: 'intake-4',
    text: 'Have you been in therapy before?',
    type: 'radio',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'intake-5',
    text: 'How would you rate your current stress level?',
    type: 'scale',
    required: true,
    options: Array.from({ length: 10 }, (_, i) => ({
      value: i + 1,
      label: String(i + 1)
    }))
  },
  {
    id: 'intake-6',
    text: 'What support systems do you currently have?',
    type: 'multiselect',
    options: [
      { value: 'family', label: 'Family' },
      { value: 'friends', label: 'Friends' },
      { value: 'partner', label: 'Partner/Spouse' },
      { value: 'community', label: 'Community Groups' },
      { value: 'spiritual', label: 'Spiritual/Religious' },
      { value: 'professional', label: 'Professional Support' }
    ]
  }
];

export default function AssessmentPage() {
  const [assessmentType, setAssessmentType] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  const getQuestions = (): AssessmentQuestion[] => {
    switch (assessmentType) {
      case 'intake':
        return INTAKE_QUESTIONS;
      case 'phq9':
        return PHQ9_QUESTIONS;
      case 'gad7':
        return GAD7_QUESTIONS;
      default:
        return [];
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleResponse = (value: any) => {
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date()
    };

    const updatedResponses = [...responses.filter(r => r.questionId !== currentQuestion.id), newResponse];
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      calculateResults(updatedResponses);
    }
  };

  const calculateResults = (allResponses: AssessmentResponse[]) => {
    if (assessmentType === 'phq9') {
      const scores = PHQ9_QUESTIONS.map(q => {
        const response = allResponses.find(r => r.questionId === q.id);
        return response ? Number(response.value) : 0;
      });
      const result = calculatePHQ9Score(scores);
      setAssessmentResult(result);
    } else if (assessmentType === 'gad7') {
      const scores = GAD7_QUESTIONS.map(q => {
        const response = allResponses.find(r => r.questionId === q.id);
        return response ? Number(response.value) : 0;
      });
      const result = calculateGAD7Score(scores);
      setAssessmentResult(result);
    } else {
      setAssessmentResult({
        responses: allResponses,
        message: 'Thank you for completing the intake form. We\'ll review your responses and discuss them during your session.'
      });
    }
    setShowResults(true);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetAssessment = () => {
    setAssessmentType(null);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setShowResults(false);
    setAssessmentResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minimal':
        return 'text-green-600';
      case 'mild':
        return 'text-yellow-600';
      case 'moderate':
        return 'text-orange-500';
      case 'moderately severe':
      case 'severe':
        return 'text-red-600';
      default:
        return 'text-stone-600';
    }
  };

  if (!assessmentType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light text-stone-800 mb-4">Wellness Assessment Tools</h1>
            <p className="text-stone-600 text-lg">Choose an assessment to begin your journey to wellness</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setAssessmentType('intake')}
              className="group p-8 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-colors">
                <Heart className="text-sage-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-2">Initial Intake</h3>
              <p className="text-stone-600 text-sm mb-4">Help us understand your needs and goals for therapy</p>
              <span className="text-sage-600 text-sm font-medium group-hover:text-sage-700">Start Assessment →</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setAssessmentType('phq9')}
              className="group p-8 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta-200 transition-colors">
                <Brain className="text-terracotta-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-2">PHQ-9 Screening</h3>
              <p className="text-stone-600 text-sm mb-4">Assess depression symptoms and mood patterns</p>
              <span className="text-terracotta-600 text-sm font-medium group-hover:text-terracotta-700">Start Assessment →</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setAssessmentType('gad7')}
              className="group p-8 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-sand-200 transition-colors">
                <Activity className="text-sand-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-2">GAD-7 Assessment</h3>
              <p className="text-stone-600 text-sm mb-4">Evaluate anxiety levels and related symptoms</p>
              <span className="text-sand-600 text-sm font-medium group-hover:text-sand-700">Start Assessment →</span>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-sage-600" size={32} />
              </div>
              <h2 className="text-3xl font-light text-stone-800 mb-2">Assessment Complete</h2>
            </div>

            {assessmentType === 'intake' ? (
              <div>
                <p className="text-stone-600 text-center mb-8">{assessmentResult?.message}</p>
                <div className="bg-sage-50 rounded-xl p-6">
                  <h3 className="font-medium text-stone-800 mb-4">Next Steps</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex items-start">
                      <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={16} />
                      <span>Your responses have been saved for your therapist to review</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={16} />
                      <span>Schedule your first session to discuss your goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={16} />
                      <span>Explore our wellness resources while you wait</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-light text-stone-800 mb-2">{assessmentResult?.score}</div>
                  <div className={`text-xl font-medium ${getSeverityColor(assessmentResult?.severity)}`}>
                    {assessmentResult?.severity?.charAt(0).toUpperCase() + assessmentResult?.severity?.slice(1)}
                    {assessmentType === 'phq9' ? ' Depression' : ' Anxiety'}
                  </div>
                </div>

                {assessmentResult?.severity === 'severe' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start">
                    <AlertCircle className="text-red-600 mr-3 mt-0.5" size={20} />
                    <div>
                      <p className="text-red-800 font-medium mb-1">Important Notice</p>
                      <p className="text-red-700 text-sm">
                        Your responses indicate significant distress. Please reach out to a mental health professional
                        as soon as possible. If you're having thoughts of self-harm, contact a crisis helpline immediately.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-stone-800 mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {assessmentResult?.recommendations?.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start text-stone-600">
                          <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={16} />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-sage-50 rounded-xl p-4">
                    <p className="text-sm text-stone-600">
                      <strong>Note:</strong> This assessment is a screening tool and not a diagnostic instrument.
                      Please discuss your results with a qualified mental health professional for proper evaluation and treatment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={resetAssessment}
                className="px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
              >
                Take Another Assessment
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-light text-stone-800">
              {assessmentType === 'intake' && 'Initial Intake Form'}
              {assessmentType === 'phq9' && 'PHQ-9 Depression Screening'}
              {assessmentType === 'gad7' && 'GAD-7 Anxiety Assessment'}
            </h2>
            <button
              onClick={resetAssessment}
              className="text-stone-500 hover:text-stone-700 text-sm"
            >
              Exit
            </button>
          </div>
          <div className="bg-stone-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-sage-600 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-stone-600 mt-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <h3 className="text-xl text-stone-800 mb-6">{currentQuestion?.text}</h3>

            {currentQuestion?.type === 'radio' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleResponse(option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-stone-200 hover:border-sage-400 hover:bg-sage-50 transition-all"
                  >
                    <div className="font-medium text-stone-800">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-stone-600 mt-1">{option.description}</div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion?.type === 'scale' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleResponse(option.value)}
                      className="aspect-square rounded-lg border-2 border-stone-200 hover:border-sage-400 hover:bg-sage-50 transition-all flex items-center justify-center font-medium text-stone-700"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion?.type === 'multiselect' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 rounded-xl border-2 border-stone-200 hover:border-sage-400 hover:bg-sage-50 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      className="mr-3"
                      onChange={(e) => {
                        const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
                        const currentValues = (currentResponse?.value as string[]) || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value as string]
                          : currentValues.filter(v => v !== option.value);
                        if (newValues.length > 0) {
                          handleResponse(newValues);
                        }
                      }}
                    />
                    <span className="text-stone-800">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion?.type === 'text' && (
              <textarea
                className="w-full p-4 border-2 border-stone-200 rounded-xl focus:border-sage-400 focus:outline-none resize-none"
                rows={4}
                placeholder="Type your response here..."
                onBlur={(e) => {
                  if (e.target.value) {
                    handleResponse(e.target.value);
                  }
                }}
              />
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-stone-400 cursor-not-allowed'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentQuestion?.type === 'text' && (
                <button
                  onClick={() => {
                    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
                    if (textArea?.value) {
                      handleResponse(textArea.value);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
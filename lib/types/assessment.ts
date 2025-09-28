export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'radio' | 'scale' | 'text' | 'multiselect';
  options?: {
    value: number | string;
    label: string;
    description?: string;
  }[];
  required?: boolean;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string | string[];
  timestamp: Date;
}

export interface AssessmentResult {
  assessmentType: 'PHQ-9' | 'GAD-7' | 'intake' | 'mood';
  score?: number;
  severity?: 'minimal' | 'mild' | 'moderate' | 'moderately severe' | 'severe';
  recommendations?: string[];
  responses: AssessmentResponse[];
  completedAt: Date;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: number; // 1-10 scale
  emotions: string[];
  notes?: string;
  activities?: string[];
  sleepHours?: number;
  energyLevel?: number; // 1-10 scale
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhaleSeconds: number;
  holdSeconds: number;
  exhaleSeconds: number;
  cycles: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: 'mindfulness' | 'body-scan' | 'loving-kindness' | 'breath-awareness';
  audioUrl?: string;
  backgroundSound?: 'ocean' | 'rain' | 'forest' | 'birds' | 'silence';
}

export interface VirtualSession {
  id: string;
  scheduledAt: Date;
  duration: number; // in minutes
  platform: 'zoom' | 'google-meet' | 'teams' | 'phone';
  meetingLink?: string;
  status: 'scheduled' | 'in-waiting-room' | 'in-progress' | 'completed' | 'cancelled';
  preSessionCheckin?: {
    currentMood: number;
    mainConcerns: string[];
    goals: string[];
  };
  postSessionResources?: {
    exercises: string[];
    readings: string[];
    nextSteps: string[];
  };
}
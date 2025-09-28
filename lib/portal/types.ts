// Client Portal Types
export interface ClientProfile {
  id: string;
  userId: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  medicalHistory?: MedicalHistory;
  preferences?: ClientPreferences;
  therapistId?: string;
  joinedDate: Date;
  lastVisit?: Date;
  totalSessions: number;
  upcomingAppointments: number;
  documents?: Document[];
  notes?: TherapyNote[];
  progressTracking?: ProgressEntry[];
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  copay?: number;
  deductible?: number;
  effectiveDate?: Date;
  expirationDate?: Date;
  subscriberName?: string;
  subscriberRelationship?: string;
}

export interface MedicalHistory {
  medications?: Medication[];
  allergies?: string[];
  conditions?: string[];
  previousTherapy?: boolean;
  previousTherapist?: string;
  hospitalizationHistory?: string;
  substanceUseHistory?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ClientPreferences {
  communicationPreference: 'email' | 'phone' | 'text' | 'portal';
  sessionType: 'in-person' | 'online' | 'both';
  preferredDays?: string[];
  preferredTimes?: string[];
  therapistGenderPreference?: 'male' | 'female' | 'no-preference';
}

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: DocumentType;
  uploadedAt: Date;
  uploadedBy: string;
  size: number;
  mimeType: string;
  url?: string;
  isConfidential: boolean;
  expiresAt?: Date;
  signedAt?: Date;
  signedBy?: string;
}

export type DocumentType =
  | 'consent'
  | 'intake'
  | 'insurance'
  | 'assessment'
  | 'treatment-plan'
  | 'progress-note'
  | 'discharge-summary'
  | 'other';

export interface TherapyNote {
  id: string;
  sessionId: string;
  clientId: string;
  therapistId: string;
  date: Date;
  type: 'session' | 'phone' | 'email' | 'crisis';
  content: string;
  interventions?: string[];
  homework?: string[];
  nextSessionFocus?: string;
  riskAssessment?: RiskAssessment;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiskAssessment {
  suicidalIdeation: 'none' | 'passive' | 'active';
  homicidalIdeation: 'none' | 'passive' | 'active';
  selfHarm: 'none' | 'historical' | 'recent' | 'current';
  safetyPlan?: string;
  emergencyContacts?: string[];
}

export interface ProgressEntry {
  id: string;
  clientId: string;
  date: Date;
  category: string;
  metric: string;
  value: number;
  notes?: string;
  goalId?: string;
}

export interface TreatmentGoal {
  id: string;
  clientId: string;
  title: string;
  description: string;
  targetDate?: Date;
  status: 'active' | 'completed' | 'paused' | 'discontinued';
  progress: number; // 0-100
  milestones?: Milestone[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  dueDate?: Date;
  completedDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface SecureMessage {
  id: string;
  threadId: string;
  senderId: string;
  recipientId: string;
  subject?: string;
  content: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
  isUrgent: boolean;
  sentAt: Date;
  readAt?: Date;
  replyToId?: string;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
}

export interface MessageThread {
  id: string;
  participants: string[];
  subject: string;
  lastMessage?: SecureMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface ResourceLibrary {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  url?: string;
  content?: string;
  tags: string[];
  isPublic: boolean;
  accessLevel?: 'all' | 'clients' | 'specific';
  allowedClients?: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  downloads: number;
}

export type ResourceCategory =
  | 'anxiety'
  | 'depression'
  | 'trauma'
  | 'relationships'
  | 'self-care'
  | 'mindfulness'
  | 'coping-skills'
  | 'education'
  | 'exercises';

export type ResourceType =
  | 'article'
  | 'video'
  | 'audio'
  | 'worksheet'
  | 'guide'
  | 'meditation'
  | 'exercise';

export interface SessionHistory {
  id: string;
  clientId: string;
  sessions: SessionRecord[];
  totalSessions: number;
  cancelledSessions: number;
  noShowSessions: number;
  averageSessionLength: number;
  lastSessionDate?: Date;
  nextSessionDate?: Date;
}

export interface SessionRecord {
  id: string;
  appointmentId: string;
  date: Date;
  duration: number;
  type: string;
  therapist: string;
  status: 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  homework?: string[];
  nextSteps?: string[];
  rating?: number;
  feedback?: string;
}
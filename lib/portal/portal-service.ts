// Mock Client Portal Service
import {
  ClientProfile,
  Document,
  DocumentType,
  TherapyNote,
  ProgressEntry,
  TreatmentGoal,
  SecureMessage,
  MessageThread,
  ResourceLibrary,
  SessionHistory,
  SessionRecord
} from './types';

// Mock data stores
const mockProfiles: Map<string, ClientProfile> = new Map();
const mockDocuments: Map<string, Document[]> = new Map();
const mockNotes: Map<string, TherapyNote[]> = new Map();
const mockGoals: Map<string, TreatmentGoal[]> = new Map();
const mockMessages: Map<string, SecureMessage[]> = new Map();
const mockThreads: Map<string, MessageThread[]> = new Map();
const mockResources: ResourceLibrary[] = [];
const mockProgress: Map<string, ProgressEntry[]> = new Map();

// Initialize sample client profile
const initializeSampleProfile = () => {
  const clientProfile: ClientProfile = {
    id: 'profile-1',
    userId: 'user-1',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'Female',
    address: {
      street1: '456 Oak Avenue',
      city: 'Sonoma',
      state: 'CA',
      zipCode: '95476',
      country: 'USA'
    },
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '(707) 555-0199',
      email: 'john.johnson@email.com'
    },
    insuranceInfo: {
      provider: 'Blue Shield of California',
      policyNumber: 'BS123456789',
      groupNumber: 'GRP001',
      copay: 25,
      deductible: 1000,
      effectiveDate: new Date('2024-01-01'),
      subscriberName: 'Sarah Johnson',
      subscriberRelationship: 'Self'
    },
    medicalHistory: {
      medications: [
        {
          name: 'Sertraline',
          dosage: '50mg',
          frequency: 'Once daily',
          prescribedBy: 'Dr. Smith',
          startDate: new Date('2023-06-01')
        }
      ],
      allergies: ['Penicillin'],
      conditions: ['Generalized Anxiety Disorder', 'Mild Depression'],
      previousTherapy: true,
      previousTherapist: 'Dr. Williams (2020-2022)'
    },
    preferences: {
      communicationPreference: 'email',
      sessionType: 'both',
      preferredDays: ['Tuesday', 'Thursday'],
      preferredTimes: ['Morning', 'Early Afternoon']
    },
    therapistId: 'user-2',
    joinedDate: new Date('2024-01-15'),
    lastVisit: new Date('2024-11-20'),
    totalSessions: 28,
    upcomingAppointments: 2,
    documents: [],
    notes: [],
    progressTracking: []
  };

  mockProfiles.set('user-1', clientProfile);

  // Initialize sample documents
  const sampleDocuments: Document[] = [
    {
      id: 'doc-1',
      clientId: 'user-1',
      name: 'Informed Consent Form',
      type: 'consent',
      uploadedAt: new Date('2024-01-15'),
      uploadedBy: 'user-1',
      size: 245000,
      mimeType: 'application/pdf',
      isConfidential: false,
      signedAt: new Date('2024-01-15'),
      signedBy: 'Sarah Johnson'
    },
    {
      id: 'doc-2',
      clientId: 'user-1',
      name: 'Initial Assessment',
      type: 'assessment',
      uploadedAt: new Date('2024-01-20'),
      uploadedBy: 'user-2',
      size: 180000,
      mimeType: 'application/pdf',
      isConfidential: true
    },
    {
      id: 'doc-3',
      clientId: 'user-1',
      name: 'Treatment Plan Q1 2024',
      type: 'treatment-plan',
      uploadedAt: new Date('2024-01-25'),
      uploadedBy: 'user-2',
      size: 95000,
      mimeType: 'application/pdf',
      isConfidential: true
    }
  ];
  mockDocuments.set('user-1', sampleDocuments);

  // Initialize sample therapy notes
  const sampleNotes: TherapyNote[] = [
    {
      id: 'note-1',
      sessionId: 'session-1',
      clientId: 'user-1',
      therapistId: 'user-2',
      date: new Date('2024-11-15'),
      type: 'session',
      content: 'Client reported improved sleep patterns and reduced anxiety levels. Practiced mindfulness techniques.',
      interventions: ['Cognitive Restructuring', 'Mindfulness Training'],
      homework: ['Daily 10-minute meditation', 'Thought journal entries'],
      nextSessionFocus: 'Continue anxiety management strategies',
      isLocked: true,
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-11-15')
    }
  ];
  mockNotes.set('user-1', sampleNotes);

  // Initialize treatment goals
  const sampleGoals: TreatmentGoal[] = [
    {
      id: 'goal-1',
      clientId: 'user-1',
      title: 'Reduce Anxiety Symptoms',
      description: 'Decrease anxiety levels from 8/10 to 4/10 on subjective scale',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      progress: 60,
      milestones: [
        {
          id: 'milestone-1',
          goalId: 'goal-1',
          title: 'Learn 3 coping techniques',
          completedDate: new Date('2024-02-15'),
          status: 'completed'
        },
        {
          id: 'milestone-2',
          goalId: 'goal-1',
          title: 'Practice daily mindfulness',
          dueDate: new Date('2024-12-01'),
          status: 'in-progress'
        }
      ],
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-11-15')
    },
    {
      id: 'goal-2',
      clientId: 'user-1',
      title: 'Improve Sleep Quality',
      description: 'Achieve 7-8 hours of restful sleep per night',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      progress: 75,
      milestones: [],
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-11-15')
    }
  ];
  mockGoals.set('user-1', sampleGoals);

  // Initialize progress tracking
  const sampleProgress: ProgressEntry[] = [
    {
      id: 'progress-1',
      clientId: 'user-1',
      date: new Date('2024-11-01'),
      category: 'Anxiety',
      metric: 'Anxiety Level (1-10)',
      value: 6,
      notes: 'Moderate anxiety, improvement from last week',
      goalId: 'goal-1'
    },
    {
      id: 'progress-2',
      clientId: 'user-1',
      date: new Date('2024-11-08'),
      category: 'Anxiety',
      metric: 'Anxiety Level (1-10)',
      value: 5,
      notes: 'Continuing improvement',
      goalId: 'goal-1'
    },
    {
      id: 'progress-3',
      clientId: 'user-1',
      date: new Date('2024-11-15'),
      category: 'Anxiety',
      metric: 'Anxiety Level (1-10)',
      value: 4,
      notes: 'Significant improvement, reaching target',
      goalId: 'goal-1'
    },
    {
      id: 'progress-4',
      clientId: 'user-1',
      date: new Date('2024-11-01'),
      category: 'Sleep',
      metric: 'Hours of Sleep',
      value: 6,
      goalId: 'goal-2'
    },
    {
      id: 'progress-5',
      clientId: 'user-1',
      date: new Date('2024-11-15'),
      category: 'Sleep',
      metric: 'Hours of Sleep',
      value: 7.5,
      goalId: 'goal-2'
    }
  ];
  mockProgress.set('user-1', sampleProgress);

  // Initialize sample messages
  const thread: MessageThread = {
    id: 'thread-1',
    participants: ['user-1', 'user-2'],
    subject: 'Session Follow-up',
    unreadCount: 1,
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-20'),
    isArchived: false
  };
  mockThreads.set('user-1', [thread]);

  const messages: SecureMessage[] = [
    {
      id: 'msg-1',
      threadId: 'thread-1',
      senderId: 'user-2',
      recipientId: 'user-1',
      subject: 'Session Follow-up',
      content: 'Hi Sarah, I wanted to follow up on our session today. How are the breathing exercises working for you?',
      isRead: true,
      isUrgent: false,
      sentAt: new Date('2024-11-15T16:00:00'),
      readAt: new Date('2024-11-15T18:30:00')
    },
    {
      id: 'msg-2',
      threadId: 'thread-1',
      senderId: 'user-1',
      recipientId: 'user-2',
      subject: 'Re: Session Follow-up',
      content: 'Hi Dr. Toral, the breathing exercises are really helpful! I\'ve been using them when I feel anxious.',
      isRead: true,
      isUrgent: false,
      sentAt: new Date('2024-11-15T19:00:00'),
      readAt: new Date('2024-11-16T09:00:00'),
      replyToId: 'msg-1'
    },
    {
      id: 'msg-3',
      threadId: 'thread-1',
      senderId: 'user-2',
      recipientId: 'user-1',
      subject: 'Re: Session Follow-up',
      content: 'That\'s wonderful to hear! Keep practicing, and we\'ll discuss your progress in our next session.',
      isRead: false,
      isUrgent: false,
      sentAt: new Date('2024-11-20T10:00:00'),
      replyToId: 'msg-2'
    }
  ];
  mockMessages.set('thread-1', messages);
};

// Initialize resources
const initializeResources = () => {
  const resources: ResourceLibrary[] = [
    {
      id: 'resource-1',
      title: 'Understanding Anxiety',
      description: 'A comprehensive guide to understanding and managing anxiety',
      category: 'anxiety',
      type: 'article',
      content: 'Detailed content about anxiety...',
      tags: ['anxiety', 'education', 'self-help'],
      isPublic: false,
      accessLevel: 'clients',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      views: 145,
      downloads: 32
    },
    {
      id: 'resource-2',
      title: 'Progressive Muscle Relaxation',
      description: 'Audio guide for progressive muscle relaxation technique',
      category: 'self-care',
      type: 'audio',
      url: '/resources/pmr-audio.mp3',
      tags: ['relaxation', 'audio', 'stress-relief'],
      isPublic: false,
      accessLevel: 'clients',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      views: 89,
      downloads: 45
    },
    {
      id: 'resource-3',
      title: 'Daily Mood Tracker',
      description: 'Printable worksheet for tracking daily moods and triggers',
      category: 'exercises',
      type: 'worksheet',
      url: '/resources/mood-tracker.pdf',
      tags: ['worksheet', 'mood', 'tracking'],
      isPublic: false,
      accessLevel: 'clients',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      views: 201,
      downloads: 78
    },
    {
      id: 'resource-4',
      title: 'Mindfulness Meditation Guide',
      description: 'Step-by-step guide to practicing mindfulness meditation',
      category: 'mindfulness',
      type: 'guide',
      content: 'Mindfulness meditation instructions...',
      tags: ['mindfulness', 'meditation', 'guide'],
      isPublic: false,
      accessLevel: 'all',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
      views: 312,
      downloads: 124
    }
  ];

  mockResources.push(...resources);
};

initializeSampleProfile();
initializeResources();

// Portal Service API
export const portalService = {
  async getClientProfile(userId: string): Promise<ClientProfile | null> {
    return mockProfiles.get(userId) || null;
  },

  async updateClientProfile(userId: string, updates: Partial<ClientProfile>): Promise<ClientProfile | null> {
    const profile = mockProfiles.get(userId);
    if (!profile) return null;

    const updatedProfile = { ...profile, ...updates };
    mockProfiles.set(userId, updatedProfile);
    return updatedProfile;
  },

  async getDocuments(clientId: string, type?: DocumentType): Promise<Document[]> {
    const documents = mockDocuments.get(clientId) || [];
    if (type) {
      return documents.filter(doc => doc.type === type);
    }
    return documents;
  },

  async uploadDocument(document: Omit<Document, 'id' | 'uploadedAt'>): Promise<Document> {
    const newDocument: Document = {
      ...document,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date()
    };

    const clientDocs = mockDocuments.get(document.clientId) || [];
    clientDocs.push(newDocument);
    mockDocuments.set(document.clientId, clientDocs);

    return newDocument;
  },

  async deleteDocument(clientId: string, documentId: string): Promise<boolean> {
    const documents = mockDocuments.get(clientId) || [];
    const filtered = documents.filter(doc => doc.id !== documentId);
    mockDocuments.set(clientId, filtered);
    return filtered.length < documents.length;
  },

  async getTherapyNotes(clientId: string, limit?: number): Promise<TherapyNote[]> {
    const notes = mockNotes.get(clientId) || [];
    const sorted = notes.sort((a, b) => b.date.getTime() - a.date.getTime());
    return limit ? sorted.slice(0, limit) : sorted;
  },

  async getTreatmentGoals(clientId: string): Promise<TreatmentGoal[]> {
    return mockGoals.get(clientId) || [];
  },

  async updateTreatmentGoal(clientId: string, goalId: string, updates: Partial<TreatmentGoal>): Promise<TreatmentGoal | null> {
    const goals = mockGoals.get(clientId) || [];
    const goalIndex = goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) return null;

    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updates,
      updatedAt: new Date()
    };

    mockGoals.set(clientId, goals);
    return goals[goalIndex];
  },

  async getProgressEntries(clientId: string, category?: string, goalId?: string): Promise<ProgressEntry[]> {
    let entries = mockProgress.get(clientId) || [];

    if (category) {
      entries = entries.filter(e => e.category === category);
    }

    if (goalId) {
      entries = entries.filter(e => e.goalId === goalId);
    }

    return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  async addProgressEntry(entry: Omit<ProgressEntry, 'id'>): Promise<ProgressEntry> {
    const newEntry: ProgressEntry = {
      ...entry,
      id: `progress-${Date.now()}`
    };

    const clientProgress = mockProgress.get(entry.clientId) || [];
    clientProgress.push(newEntry);
    mockProgress.set(entry.clientId, clientProgress);

    return newEntry;
  },

  async getMessageThreads(userId: string): Promise<MessageThread[]> {
    return mockThreads.get(userId) || [];
  },

  async getMessages(threadId: string): Promise<SecureMessage[]> {
    return mockMessages.get(threadId) || [];
  },

  async sendMessage(message: Omit<SecureMessage, 'id' | 'sentAt'>): Promise<SecureMessage> {
    const newMessage: SecureMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      sentAt: new Date()
    };

    const threadMessages = mockMessages.get(message.threadId) || [];
    threadMessages.push(newMessage);
    mockMessages.set(message.threadId, threadMessages);

    // Update thread
    const senderId = message.senderId;
    const threads = mockThreads.get(senderId) || [];
    const thread = threads.find(t => t.id === message.threadId);

    if (thread) {
      thread.lastMessage = newMessage;
      thread.updatedAt = new Date();
      if (message.recipientId !== senderId) {
        thread.unreadCount++;
      }
    }

    return newMessage;
  },

  async markMessageAsRead(messageId: string): Promise<boolean> {
    for (const messages of mockMessages.values()) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        message.isRead = true;
        message.readAt = new Date();
        return true;
      }
    }
    return false;
  },

  async getResources(category?: string, type?: string): Promise<ResourceLibrary[]> {
    let resources = [...mockResources];

    if (category) {
      resources = resources.filter(r => r.category === category as any);
    }

    if (type) {
      resources = resources.filter(r => r.type === type as any);
    }

    return resources;
  },

  async getSessionHistory(clientId: string): Promise<SessionHistory> {
    // Mock session history based on appointments
    const sessions: SessionRecord[] = [
      {
        id: 'session-1',
        appointmentId: 'appt-past-1',
        date: new Date('2024-11-15'),
        duration: 50,
        type: 'Individual Therapy',
        therapist: 'Dr. Rosa Toral',
        status: 'completed',
        notes: 'Discussed anxiety management techniques',
        homework: ['Practice breathing exercises', 'Complete mood journal'],
        rating: 5
      },
      {
        id: 'session-2',
        appointmentId: 'appt-past-2',
        date: new Date('2024-11-08'),
        duration: 50,
        type: 'Individual Therapy',
        therapist: 'Dr. Rosa Toral',
        status: 'completed',
        notes: 'Explored family dynamics',
        nextSteps: ['Continue journaling', 'Practice boundary setting']
      },
      {
        id: 'session-3',
        appointmentId: 'appt-past-3',
        date: new Date('2024-11-01'),
        duration: 50,
        type: 'Individual Therapy',
        therapist: 'Dr. Rosa Toral',
        status: 'completed'
      }
    ];

    return {
      id: `history-${clientId}`,
      clientId,
      sessions,
      totalSessions: 28,
      cancelledSessions: 2,
      noShowSessions: 0,
      averageSessionLength: 50,
      lastSessionDate: new Date('2024-11-15'),
      nextSessionDate: new Date('2024-11-29')
    };
  },

  async getClientStats(clientId: string): Promise<{
    totalSessions: number;
    upcomingAppointments: number;
    completedGoals: number;
    activeGoals: number;
    documentsCount: number;
    unreadMessages: number;
  }> {
    const profile = mockProfiles.get(clientId);
    const goals = mockGoals.get(clientId) || [];
    const documents = mockDocuments.get(clientId) || [];
    const threads = mockThreads.get(clientId) || [];

    return {
      totalSessions: profile?.totalSessions || 0,
      upcomingAppointments: profile?.upcomingAppointments || 0,
      completedGoals: goals.filter(g => g.status === 'completed').length,
      activeGoals: goals.filter(g => g.status === 'active').length,
      documentsCount: documents.length,
      unreadMessages: threads.reduce((sum, t) => sum + t.unreadCount, 0)
    };
  }
};

export default portalService;
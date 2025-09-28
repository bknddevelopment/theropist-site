import { AssessmentQuestion, BreathingExercise, MeditationSession } from '@/lib/types/assessment';

export const PHQ9_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'phq9-1',
    text: 'Little interest or pleasure in doing things',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-2',
    text: 'Feeling down, depressed, or hopeless',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-4',
    text: 'Feeling tired or having little energy',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-5',
    text: 'Poor appetite or overeating',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-6',
    text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-7',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-8',
    text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9-9',
    text: 'Thoughts that you would be better off dead, or of hurting yourself',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

export const GAD7_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'gad7-1',
    text: 'Feeling nervous, anxious or on edge',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-2',
    text: 'Not being able to stop or control worrying',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-3',
    text: 'Worrying too much about different things',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-4',
    text: 'Trouble relaxing',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-5',
    text: "Being so restless that it's hard to sit still",
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-6',
    text: 'Becoming easily annoyed or irritable',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7-7',
    text: 'Feeling afraid as if something awful might happen',
    type: 'radio',
    required: true,
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'A calming technique used to reduce stress and improve focus',
    inhaleSeconds: 4,
    holdSeconds: 4,
    exhaleSeconds: 4,
    cycles: 8,
    difficulty: 'beginner'
  },
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'A natural tranquilizer for the nervous system',
    inhaleSeconds: 4,
    holdSeconds: 7,
    exhaleSeconds: 8,
    cycles: 4,
    difficulty: 'intermediate'
  },
  {
    id: 'belly-breathing',
    name: 'Belly Breathing',
    description: 'Deep diaphragmatic breathing to activate relaxation response',
    inhaleSeconds: 5,
    holdSeconds: 2,
    exhaleSeconds: 7,
    cycles: 10,
    difficulty: 'beginner'
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril Breathing',
    description: 'Balancing breath to harmonize the nervous system',
    inhaleSeconds: 4,
    holdSeconds: 4,
    exhaleSeconds: 4,
    cycles: 12,
    difficulty: 'advanced'
  }
];

export const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: 'mindful-morning',
    title: 'Mindful Morning',
    description: 'Start your day with presence and intention',
    duration: 600, // 10 minutes
    category: 'mindfulness',
    backgroundSound: 'birds'
  },
  {
    id: 'body-scan-relaxation',
    title: 'Progressive Body Scan',
    description: 'Release tension throughout your body',
    duration: 900, // 15 minutes
    category: 'body-scan',
    backgroundSound: 'ocean'
  },
  {
    id: 'loving-kindness',
    title: 'Loving Kindness Meditation',
    description: 'Cultivate compassion for yourself and others',
    duration: 720, // 12 minutes
    category: 'loving-kindness',
    backgroundSound: 'forest'
  },
  {
    id: 'breath-awareness',
    title: 'Breath Awareness',
    description: 'Find peace in the rhythm of your breath',
    duration: 480, // 8 minutes
    category: 'breath-awareness',
    backgroundSound: 'rain'
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief Session',
    description: 'Let go of the day\'s tensions',
    duration: 1200, // 20 minutes
    category: 'mindfulness',
    backgroundSound: 'ocean'
  }
];

export function calculatePHQ9Score(responses: number[]): {
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'moderately severe' | 'severe';
  recommendations: string[];
} {
  const score = responses.reduce((sum, val) => sum + val, 0);

  let severity: 'minimal' | 'mild' | 'moderate' | 'moderately severe' | 'severe';
  let recommendations: string[] = [];

  if (score <= 4) {
    severity = 'minimal';
    recommendations = [
      'Continue practicing self-care and wellness activities',
      'Maintain your support network',
      'Regular exercise and healthy sleep habits'
    ];
  } else if (score <= 9) {
    severity = 'mild';
    recommendations = [
      'Consider starting therapy for additional support',
      'Implement stress reduction techniques',
      'Monitor your symptoms over the next few weeks'
    ];
  } else if (score <= 14) {
    severity = 'moderate';
    recommendations = [
      'Professional therapy is recommended',
      'Consider scheduling a consultation',
      'Practice daily self-care activities',
      'Reach out to your support network'
    ];
  } else if (score <= 19) {
    severity = 'moderately severe';
    recommendations = [
      'Professional therapy is strongly recommended',
      'Schedule a consultation as soon as possible',
      'Consider medication evaluation with a psychiatrist',
      'Implement immediate self-care strategies'
    ];
  } else {
    severity = 'severe';
    recommendations = [
      'Immediate professional help is recommended',
      'Contact your healthcare provider today',
      'Reach out to a crisis helpline if needed',
      'Ensure you have support from trusted individuals'
    ];
  }

  return { score, severity, recommendations };
}

export function calculateGAD7Score(responses: number[]): {
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  recommendations: string[];
} {
  const score = responses.reduce((sum, val) => sum + val, 0);

  let severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  let recommendations: string[] = [];

  if (score <= 4) {
    severity = 'minimal';
    recommendations = [
      'Continue with stress management techniques',
      'Maintain regular exercise routine',
      'Practice mindfulness and relaxation'
    ];
  } else if (score <= 9) {
    severity = 'mild';
    recommendations = [
      'Consider therapy for anxiety management',
      'Practice breathing exercises daily',
      'Implement regular relaxation techniques'
    ];
  } else if (score <= 14) {
    severity = 'moderate';
    recommendations = [
      'Professional therapy is recommended',
      'Learn anxiety coping strategies',
      'Consider cognitive-behavioral therapy',
      'Practice daily relaxation exercises'
    ];
  } else {
    severity = 'severe';
    recommendations = [
      'Professional help is strongly recommended',
      'Schedule a consultation promptly',
      'Consider comprehensive anxiety treatment',
      'Implement immediate coping strategies'
    ];
  }

  return { score, severity, recommendations };
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Heart,
  Calendar,
  Wind,
  Headphones,
  Video,
  FileText,
  Download,
  BookOpen,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const WELLNESS_TOOLS = [
  {
    category: 'Assessments',
    description: 'Professional mental health screenings',
    icon: Brain,
    color: 'from-purple-400 to-purple-600',
    tools: [
      {
        title: 'PHQ-9 Depression Screening',
        description: 'Assess depression symptoms and severity',
        link: '/assessment',
        icon: FileText,
        time: '5 min'
      },
      {
        title: 'GAD-7 Anxiety Assessment',
        description: 'Evaluate anxiety levels and patterns',
        link: '/assessment',
        icon: Shield,
        time: '5 min'
      },
      {
        title: 'Initial Intake Form',
        description: 'Complete intake assessment for therapy',
        link: '/assessment',
        icon: BookOpen,
        time: '10 min'
      }
    ]
  },
  {
    category: 'Mood Tracking',
    description: 'Monitor your emotional wellbeing',
    icon: Heart,
    color: 'from-rose-400 to-rose-600',
    tools: [
      {
        title: 'Daily Mood Journal',
        description: 'Track emotions and identify patterns',
        link: '/mood-tracker',
        icon: Calendar,
        time: '2 min'
      },
      {
        title: 'Progress Insights',
        description: 'View trends and improvements',
        link: '/mood-tracker',
        icon: TrendingUp,
        time: 'Ongoing'
      }
    ]
  },
  {
    category: 'Relaxation',
    description: 'Calming exercises for stress relief',
    icon: Wind,
    color: 'from-blue-400 to-blue-600',
    tools: [
      {
        title: 'Breathing Exercises',
        description: '4 guided breathing techniques',
        link: '/wellness-tools/breathing',
        icon: Wind,
        time: '5-10 min'
      },
      {
        title: 'Guided Meditations',
        description: '5 meditation sessions with nature sounds',
        link: '/wellness-tools/meditation',
        icon: Headphones,
        time: '8-20 min'
      }
    ]
  },
  {
    category: 'Virtual Sessions',
    description: 'Connect with your therapist online',
    icon: Video,
    color: 'from-green-400 to-green-600',
    tools: [
      {
        title: 'Book Virtual Session',
        description: 'Schedule your next appointment',
        link: '/virtual-sessions',
        icon: Calendar,
        time: 'Quick'
      },
      {
        title: 'Virtual Waiting Room',
        description: 'Prepare for your session',
        link: '/session/waiting',
        icon: Video,
        time: 'Pre-session'
      }
    ]
  }
];

const POST_SESSION_RESOURCES = [
  {
    title: 'Coping Strategies Workbook',
    description: 'Practical techniques for managing difficult emotions',
    type: 'PDF',
    icon: FileText,
    downloadUrl: '#'
  },
  {
    title: 'Mindfulness Exercises',
    description: 'Daily mindfulness practices to stay present',
    type: 'Guide',
    icon: Sparkles,
    downloadUrl: '#'
  },
  {
    title: 'Boundary Setting Worksheet',
    description: 'Learn to establish healthy boundaries',
    type: 'Worksheet',
    icon: Shield,
    downloadUrl: '#'
  },
  {
    title: 'Self-Care Planner',
    description: 'Create a personalized self-care routine',
    type: 'Template',
    icon: Heart,
    downloadUrl: '#'
  },
  {
    title: 'Communication Skills Guide',
    description: 'Improve relationships through better communication',
    type: 'PDF',
    icon: Users,
    downloadUrl: '#'
  },
  {
    title: 'Sleep Hygiene Checklist',
    description: 'Tips for better sleep and recovery',
    type: 'Checklist',
    icon: BookOpen,
    downloadUrl: '#'
  }
];

const RECOMMENDED_READINGS = [
  {
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    description: 'Understanding trauma and healing',
    link: '#'
  },
  {
    title: 'Self-Compassion',
    author: 'Kristin Neff',
    description: 'The proven power of being kind to yourself',
    link: '#'
  },
  {
    title: 'Attached',
    author: 'Amir Levine & Rachel Heller',
    description: 'The science of adult attachment',
    link: '#'
  }
];

export default function WellnessToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light text-stone-800 mb-4">Wellness Tools & Resources</h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Comprehensive tools and resources to support your mental health journey
          </p>
        </motion.div>

        {/* Interactive Tools Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Interactive Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WELLNESS_TOOLS.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <button
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.category ? null : category.category
                    )}
                    className="w-full text-left"
                  >
                    <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-all duration-300 h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-lg font-medium text-stone-800 mb-2">{category.category}</h3>
                      <p className="text-sm text-stone-600 mb-4">{category.description}</p>
                      <div className="flex items-center text-sage-600 text-sm font-medium group-hover:text-sage-700">
                        <span>{category.tools.length} tools available</span>
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Tools */}
                  {selectedCategory === category.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <Link
                            key={tool.title}
                            href={tool.link}
                            className="block bg-white rounded-xl p-4 hover:shadow-md transition-all border border-stone-200 hover:border-sage-400"
                          >
                            <div className="flex items-start gap-3">
                              <ToolIcon className="text-sage-600 mt-1" size={20} />
                              <div className="flex-1">
                                <h4 className="font-medium text-stone-800 text-sm mb-1">{tool.title}</h4>
                                <p className="text-xs text-stone-600">{tool.description}</p>
                                <span className="text-xs text-sage-600 mt-1 inline-block">{tool.time}</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Post-Session Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Post-Session Resources</h2>
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <p className="text-stone-600 mb-6 text-center">
              Download these resources to continue your growth between sessions
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {POST_SESSION_RESOURCES.map((resource) => {
                const Icon = resource.icon;
                return (
                  <button
                    key={resource.title}
                    className="p-4 rounded-xl border-2 border-stone-200 hover:border-sage-400 hover:bg-sage-50 transition-all text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-sage-100 rounded-lg flex items-center justify-center group-hover:bg-sage-200 transition-colors">
                        <Icon className="text-sage-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-800 text-sm mb-1">{resource.title}</h4>
                        <p className="text-xs text-stone-600 mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-1 bg-stone-100 rounded-full text-stone-600">
                            {resource.type}
                          </span>
                          <Download className="text-sage-600 group-hover:text-sage-700" size={16} />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recommended Reading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Recommended Reading</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RECOMMENDED_READINGS.map((book) => (
              <div
                key={book.title}
                className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <BookOpen className="text-sage-600" size={32} />
                </div>
                <h3 className="font-medium text-stone-800 mb-1">{book.title}</h3>
                <p className="text-sm text-stone-600 mb-2">by {book.author}</p>
                <p className="text-sm text-stone-600 mb-4">{book.description}</p>
                <button className="text-sage-600 text-sm font-medium hover:text-sage-700 flex items-center gap-1">
                  Learn More
                  <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-sage-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-light text-stone-800 mb-6 text-center">Quick Access</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/assessment"
              className="px-6 py-3 bg-white border-2 border-sage-400 text-sage-700 rounded-full hover:bg-sage-50 transition-colors flex items-center gap-2"
            >
              <Brain size={20} />
              Take Assessment
            </Link>
            <Link
              href="/mood-tracker"
              className="px-6 py-3 bg-white border-2 border-sage-400 text-sage-700 rounded-full hover:bg-sage-50 transition-colors flex items-center gap-2"
            >
              <Heart size={20} />
              Track Mood
            </Link>
            <Link
              href="/virtual-sessions"
              className="px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors flex items-center gap-2"
            >
              <Video size={20} />
              Book Session
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
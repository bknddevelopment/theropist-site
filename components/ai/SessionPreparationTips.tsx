'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  Heart,
  Brain,
  Notebook,
  Coffee,
  Headphones,
  Wifi,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { usePersonalizationStore } from '@/lib/ai/personalization-engine'
import {
  breathingAnimation,
  smoothReveal,
  staggerContainer,
  staggerItem,
  encouragingMessage,
  hapticFeedback
} from '@/lib/animations/micro-interactions'

interface PreparationTip {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'practical' | 'emotional' | 'mental' | 'environment'
  timeframe: 'week-before' | 'day-before' | 'hour-before' | 'during'
  completed?: boolean
}

interface SessionType {
  type: 'first-session' | 'regular' | 'intensive' | 'online' | 'in-person'
  tips: string[]
}

// Generate tips based on session type and user history
function generateSessionTips(
  sessionType: string,
  userNeeds: string[]
): PreparationTip[] {
  const baseTips: PreparationTip[] = [
    // Week before tips
    {
      id: 'reflect',
      title: 'Reflect on Your Goals',
      description: 'Take time to think about what you want to explore in your session',
      icon: <Brain className="w-5 h-5" />,
      category: 'mental',
      timeframe: 'week-before'
    },
    {
      id: 'journal',
      title: 'Start a Feelings Journal',
      description: 'Jot down emotions and thoughts as they arise during the week',
      icon: <Notebook className="w-5 h-5" />,
      category: 'emotional',
      timeframe: 'week-before'
    },

    // Day before tips
    {
      id: 'sleep',
      title: 'Prioritize Rest',
      description: 'Aim for a good night\'s sleep to feel refreshed and present',
      icon: <Heart className="w-5 h-5" />,
      category: 'practical',
      timeframe: 'day-before'
    },
    {
      id: 'prepare-questions',
      title: 'Write Down Questions',
      description: 'List any specific topics or concerns you\'d like to discuss',
      icon: <Notebook className="w-5 h-5" />,
      category: 'mental',
      timeframe: 'day-before'
    },

    // Hour before tips
    {
      id: 'environment',
      title: 'Create a Calm Space',
      description: 'Find a quiet, private area where you feel comfortable',
      icon: <MapPin className="w-5 h-5" />,
      category: 'environment',
      timeframe: 'hour-before'
    },
    {
      id: 'hydrate',
      title: 'Stay Hydrated',
      description: 'Have water nearby and avoid excessive caffeine',
      icon: <Coffee className="w-5 h-5" />,
      category: 'practical',
      timeframe: 'hour-before'
    },
    {
      id: 'technology',
      title: 'Test Your Connection',
      description: 'Ensure your internet and device are working properly',
      icon: <Wifi className="w-5 h-5" />,
      category: 'practical',
      timeframe: 'hour-before'
    },

    // During session tips
    {
      id: 'breathe',
      title: 'Remember to Breathe',
      description: 'Take deep breaths if you feel overwhelmed',
      icon: <Heart className="w-5 h-5" />,
      category: 'emotional',
      timeframe: 'during'
    },
    {
      id: 'honest',
      title: 'Be Open and Honest',
      description: 'Share at your own pace - there\'s no rush',
      icon: <Brain className="w-5 h-5" />,
      category: 'emotional',
      timeframe: 'during'
    }
  ]

  // Filter and customize based on session type
  if (sessionType === 'first-session') {
    baseTips.push({
      id: 'paperwork',
      title: 'Complete Intake Forms',
      description: 'Fill out any required forms ahead of time',
      icon: <CheckCircle className="w-5 h-5" />,
      category: 'practical',
      timeframe: 'day-before'
    })
  }

  if (sessionType === 'online') {
    baseTips.push({
      id: 'headphones',
      title: 'Use Headphones',
      description: 'Ensure privacy and better audio quality',
      icon: <Headphones className="w-5 h-5" />,
      category: 'practical',
      timeframe: 'hour-before'
    })
  }

  // Prioritize tips based on user needs
  return baseTips.map(tip => ({
    ...tip,
    completed: false
  }))
}

export default function SessionPreparationTips() {
  const { userProfile, trackInteraction } = usePersonalizationStore()
  const [sessionType, setSessionType] = useState<string>('regular')
  const [tips, setTips] = useState<PreparationTip[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('all')
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set())
  const [showEncouragement, setShowEncouragement] = useState(false)

  useEffect(() => {
    // Determine session type based on user profile
    const type = userProfile.sessionCount === 0 ? 'first-session' : 'regular'
    setSessionType(type)

    // Generate personalized tips
    const personalizedTips = generateSessionTips(type, userProfile.therapeuticNeeds)
    setTips(personalizedTips)
  }, [userProfile])

  const handleTipComplete = (tipId: string) => {
    setCompletedTips(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tipId)) {
        newSet.delete(tipId)
      } else {
        newSet.add(tipId)
        trackInteraction(`tip_completed_${tipId}`)

        // Show encouragement after completing tips
        if (newSet.size === 3 || newSet.size === 5) {
          setShowEncouragement(true)
          setTimeout(() => setShowEncouragement(false), 3000)
        }
      }
      return newSet
    })
  }

  const timeframes = [
    { id: 'all', label: 'All Tips' },
    { id: 'week-before', label: 'Week Before' },
    { id: 'day-before', label: 'Day Before' },
    { id: 'hour-before', label: 'Hour Before' },
    { id: 'during', label: 'During Session' }
  ]

  const filteredTips = selectedTimeframe === 'all'
    ? tips
    : tips.filter(tip => tip.timeframe === selectedTimeframe)

  const categoryColors = {
    practical: 'bg-earth-100 text-earth-600 border-earth-200',
    emotional: 'bg-sage-100 text-sage-600 border-sage-200',
    mental: 'bg-terracotta-100 text-terracotta-600 border-terracotta-200',
    environment: 'bg-cream-100 text-earth-700 border-cream-200'
  }

  const completionRate = tips.length > 0
    ? Math.round((completedTips.size / tips.length) * 100)
    : 0

  return (
    <motion.div
      variants={smoothReveal}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-earth-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-light text-earth-700 mb-2">
              Prepare for Your Session
            </h2>
            <p className="text-earth-600">
              {sessionType === 'first-session'
                ? 'Tips for your first therapy session'
                : 'Get the most from your upcoming session'}
            </p>
          </div>

          <motion.div
            variants={breathingAnimation}
            animate="animate"
            className="p-3 bg-sage-100 rounded-full"
          >
            <Calendar className="w-6 h-6 text-sage-600" />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-earth-600">Preparation Progress</span>
            <span className="text-earth-700 font-medium">{completionRate}%</span>
          </div>
          <div className="h-2 bg-earth-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-sage-400 to-sage-500"
            />
          </div>
        </div>
      </div>

      {/* Timeframe Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {timeframes.map(timeframe => (
          <motion.button
            key={timeframe.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTimeframe(timeframe.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedTimeframe === timeframe.id
                ? 'bg-earth-500 text-cream-50'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            {timeframe.label}
          </motion.button>
        ))}
      </div>

      {/* Tips Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-3 md:grid-cols-2"
      >
        {filteredTips.map(tip => (
          <motion.div
            key={tip.id}
            variants={staggerItem}
            layout
          >
            <motion.button
              whileTap={hapticFeedback.light}
              onClick={() => handleTipComplete(tip.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                completedTips.has(tip.id)
                  ? 'bg-sage-50 border-sage-300'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <motion.div
                  animate={{
                    scale: completedTips.has(tip.id) ? [1, 1.2, 1] : 1,
                    rotate: completedTips.has(tip.id) ? [0, 10, 0] : 0
                  }}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    completedTips.has(tip.id)
                      ? 'bg-sage-500 border-sage-500'
                      : 'border-earth-300'
                  }`}
                >
                  {completedTips.has(tip.id) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </motion.div>

                {/* Icon */}
                <div className={`p-2 rounded-lg ${categoryColors[tip.category]}`}>
                  {tip.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-medium mb-1 ${
                    completedTips.has(tip.id) ? 'text-earth-500 line-through' : 'text-earth-700'
                  }`}>
                    {tip.title}
                  </h3>
                  <p className={`text-sm ${
                    completedTips.has(tip.id) ? 'text-earth-400' : 'text-earth-600'
                  }`}>
                    {tip.description}
                  </p>

                  {/* Timeframe badge */}
                  <div className="mt-2 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-earth-400" />
                    <span className="text-xs text-earth-500">
                      {tip.timeframe.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Encouragement Message */}
      <AnimatePresence>
        {showEncouragement && (
          <motion.div
            variants={encouragingMessage}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-sage-500 text-white px-6 py-3 rounded-full shadow-lg
              flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Great progress! You're well prepared.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-cream-50 rounded-xl p-4 border border-earth-200"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-earth-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-earth-700 mb-1">
              Remember
            </p>
            <p className="text-sm text-earth-600">
              There's no perfect way to prepare. Come as you are - your therapist is here to support you exactly where you're at.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
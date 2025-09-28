'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Sparkles, Heart, Brain, Flower, Sun, Moon, Cloud } from 'lucide-react'
import { usePersonalizationStore } from '@/lib/ai/personalization-engine'
import {
  getScrollColorTransition,
  smoothReveal,
  floatingAnimation,
  breathingAnimation,
  organicBorder
} from '@/lib/animations/micro-interactions'
import SmartFAQ from './SmartFAQ'
import ContentRecommendations from './ContentRecommendations'
import SessionPreparationTips from './SessionPreparationTips'

interface PersonalizedSection {
  id: string
  component: React.ReactNode
  priority: number
  condition: () => boolean
}

// Time-based greeting generator
function getPersonalizedGreeting(): { greeting: string; icon: React.ReactNode; mood: string } {
  const hour = new Date().getHours()
  const day = new Date().getDay()

  if (hour < 6) {
    return {
      greeting: "Rest well, healing happens in stillness",
      icon: <Moon className="w-6 h-6" />,
      mood: 'calm'
    }
  } else if (hour < 12) {
    return {
      greeting: "Good morning, welcome to a new beginning",
      icon: <Sun className="w-6 h-6" />,
      mood: 'energizing'
    }
  } else if (hour < 17) {
    return {
      greeting: "Take a mindful moment in your day",
      icon: <Cloud className="w-6 h-6" />,
      mood: 'grounding'
    }
  } else if (hour < 21) {
    return {
      greeting: "Evening reflections bring clarity",
      icon: <Flower className="w-6 h-6" />,
      mood: 'focusing'
    }
  } else {
    return {
      greeting: "Unwind and nurture your inner peace",
      icon: <Moon className="w-6 h-6" />,
      mood: 'calm'
    }
  }
}

// Wellness score calculator
function calculateWellnessScore(engagement: number, sessionCount: number): {
  score: number
  message: string
  color: string
} {
  const score = Math.min(100, engagement * 0.6 + sessionCount * 10)

  if (score < 30) {
    return {
      score,
      message: "You're taking the first steps",
      color: 'text-earth-400'
    }
  } else if (score < 60) {
    return {
      score,
      message: "You're building momentum",
      color: 'text-sage-500'
    }
  } else if (score < 85) {
    return {
      score,
      message: "You're making wonderful progress",
      color: 'text-sage-600'
    }
  } else {
    return {
      score,
      message: "You're thriving on your journey",
      color: 'text-sage-700'
    }
  }
}

export default function PersonalizedHomepage() {
  const { scrollY } = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentColors, setCurrentColors] = useState({
    primary: '#8B7355',
    secondary: '#D4A574',
    accent: '#E8DCC4'
  })
  const [greeting, setGreeting] = useState(getPersonalizedGreeting())
  const [wellnessScore, setWellnessScore] = useState({ score: 0, message: '', color: '' })

  const {
    userProfile,
    recommendations,
    generateRecommendations,
    calculateEngagementScore,
    trackPageView
  } = usePersonalizationStore()

  // Track homepage view
  useEffect(() => {
    trackPageView('homepage')
    generateRecommendations()
  }, [trackPageView, generateRecommendations])

  // Update scroll-based colors
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const progress = Math.min(100, (latest / 1000) * 100)
      setScrollProgress(progress)
      setCurrentColors(getScrollColorTransition(progress))
    })

    return unsubscribe
  }, [scrollY])

  // Update wellness score
  useEffect(() => {
    const engagement = calculateEngagementScore()
    const score = calculateWellnessScore(engagement, userProfile.sessionCount)
    setWellnessScore(score)
  }, [userProfile.sessionCount, calculateEngagementScore])

  // Update greeting based on time
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getPersonalizedGreeting())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Determine which sections to show based on user behavior
  const personalizedSections: PersonalizedSection[] = [
    {
      id: 'recommendations',
      component: <ContentRecommendations />,
      priority: recommendations.length > 0 ? 1 : 5,
      condition: () => true
    },
    {
      id: 'session-prep',
      component: <SessionPreparationTips />,
      priority: userProfile.sessionCount > 0 ? 2 : 4,
      condition: () => userProfile.sessionCount > 0
    },
    {
      id: 'faq',
      component: <SmartFAQ maxItems={3} showCategories={false} />,
      priority: 3,
      condition: () => true
    }
  ]

  // Sort sections by priority
  const activeSections = personalizedSections
    .filter(section => section.condition())
    .sort((a, b) => a.priority - b.priority)

  return (
    <div
      className="min-h-screen transition-all duration-1000"
      style={{
        background: `linear-gradient(135deg, ${currentColors.primary}10 0%, ${currentColors.secondary}10 50%, ${currentColors.accent}10 100%)`
      }}
    >
      {/* Personalized Hero Section */}
      <motion.section
        variants={smoothReveal}
        initial="hidden"
        animate="visible"
        className="relative py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              variants={floatingAnimation}
              animate="float"
              className="absolute top-10 left-10 opacity-20"
            >
              <Heart className="w-32 h-32" style={{ color: currentColors.primary }} />
            </motion.div>
            <motion.div
              variants={floatingAnimation}
              animate="float"
              transition={{ delay: 1 }}
              className="absolute bottom-10 right-10 opacity-20"
            >
              <Brain className="w-28 h-28" style={{ color: currentColors.secondary }} />
            </motion.div>
          </div>

          {/* Greeting Section */}
          <motion.div
            variants={organicBorder}
            animate="animate"
            className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                variants={breathingAnimation}
                animate="animate"
                style={{ color: currentColors.primary }}
              >
                {greeting.icon}
              </motion.div>
              <h1 className="text-3xl font-light text-earth-700">
                {greeting.greeting}
              </h1>
            </div>

            {/* Wellness Score Display */}
            {userProfile.sessionCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-sage-50 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${wellnessScore.color}`}>
                      Your Wellness Journey
                    </p>
                    <p className="text-lg text-earth-600 mt-1">
                      {wellnessScore.message}
                    </p>
                  </div>
                  <div className="relative w-20 h-20">
                    <svg className="transform -rotate-90 w-20 h-20">
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="none"
                        className="text-earth-200"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke={currentColors.primary}
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={220}
                        initial={{ strokeDashoffset: 220 }}
                        animate={{
                          strokeDashoffset: 220 - (220 * wellnessScore.score) / 100
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-medium text-earth-700">
                        {Math.round(wellnessScore.score)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Personalized Insight */}
            <AnimatePresence mode="wait">
              {userProfile.therapeuticNeeds.length > 0 && (
                <motion.div
                  key="insight"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-cream-50 rounded-xl border border-earth-200"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-earth-700">
                        Based on your interests
                      </p>
                      <p className="text-earth-600 mt-1">
                        We've noticed you're focusing on{' '}
                        <span className="font-medium">
                          {userProfile.therapeuticNeeds.slice(0, 2).join(' and ')}
                        </span>
                        . We've tailored your content recommendations accordingly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Dynamic Content Sections */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <AnimatePresence mode="wait">
            {activeSections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
              >
                {section.component}
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r z-50"
        style={{
          background: `linear-gradient(90deg, ${currentColors.primary} 0%, ${currentColors.secondary} ${scrollProgress}%, transparent ${scrollProgress}%)`,
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-sage-500 text-white rounded-full
          shadow-lg flex items-center justify-center z-40"
        onClick={() => {
          // Open personalization settings or chat
          console.log('Open personalization modal')
        }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PersonalizedHomepage from '@/components/ai/PersonalizedHomepage'
import SmartFAQ from '@/components/ai/SmartFAQ'
import ContentRecommendations from '@/components/ai/ContentRecommendations'
import SessionPreparationTips from '@/components/ai/SessionPreparationTips'
import ResourceMatcher from '@/components/ai/ResourceMatcher'
import { useScrollColorTransition, useTherapeuticSounds, useHapticFeedback } from '@/lib/hooks/useMicroInteractions'
import { smoothReveal } from '@/lib/animations/micro-interactions'
import { Sparkles, Settings, Volume2, VolumeX } from 'lucide-react'

export default function AIDemoPage() {
  const colors = useScrollColorTransition()
  const { soundEnabled, setSoundEnabled, playSound } = useTherapeuticSounds()
  const { triggerHaptic } = useHapticFeedback()

  return (
    <div className="min-h-screen">
      {/* Demo Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl
          shadow-lg p-4 border-2 border-sage-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-sage-600" />
          <span className="text-sm font-medium text-earth-700">Demo Controls</span>
        </div>

        <div className="space-y-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              playSound('click')
              triggerHaptic('light')
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sage-50
              transition-colors w-full text-left"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sage-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-earth-400" />
            )}
            <span className="text-sm text-earth-600">
              Sound: {soundEnabled ? 'On' : 'Off'}
            </span>
          </button>

          {/* Color Display */}
          <div className="flex gap-2 p-2">
            <div
              className="w-8 h-8 rounded-full border-2 border-earth-200"
              style={{ backgroundColor: colors.primary }}
              title="Primary"
            />
            <div
              className="w-8 h-8 rounded-full border-2 border-earth-200"
              style={{ backgroundColor: colors.secondary }}
              title="Secondary"
            />
            <div
              className="w-8 h-8 rounded-full border-2 border-earth-200"
              style={{ backgroundColor: colors.accent }}
              title="Accent"
            />
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center px-6"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 50%, ${colors.accent}20 100%)`
        }}
      >
        <motion.div
          variants={smoothReveal}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full
              text-sage-700 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Therapy Experience
          </motion.div>

          <h1 className="text-5xl font-light text-earth-700 mb-6">
            Experience Personalized Healing
          </h1>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            Our AI-powered platform adapts to your unique journey, providing
            personalized content, resources, and support every step of the way.
          </p>
        </motion.div>
      </section>

      {/* Personalized Homepage Demo */}
      <section className="py-20">
        <PersonalizedHomepage />
      </section>

      {/* Feature Sections */}
      <div className="max-w-6xl mx-auto px-6 space-y-20 pb-20">
        {/* Smart FAQ Section */}
        <motion.section
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 border-2 border-earth-200"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-light text-earth-700 mb-3">
              Intelligent FAQ System
            </h2>
            <p className="text-earth-600">
              Our AI learns from your interactions to surface the most relevant questions
              and provide personalized answers based on your therapeutic journey.
            </p>
          </div>
          <SmartFAQ />
        </motion.section>

        {/* Content Recommendations */}
        <motion.section
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-light text-earth-700 mb-3">
              Personalized Content
            </h2>
            <p className="text-earth-600">
              Discover articles, exercises, and resources tailored to your specific
              needs and progress in therapy.
            </p>
          </div>
          <ContentRecommendations />
        </motion.section>

        {/* Session Preparation */}
        <motion.section
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-light text-earth-700 mb-3">
              Smart Session Preparation
            </h2>
            <p className="text-earth-600">
              Get personalized tips and reminders to help you prepare for your
              therapy sessions based on your appointment type and history.
            </p>
          </div>
          <SessionPreparationTips />
        </motion.section>

        {/* Resource Matching */}
        <motion.section
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-light text-earth-700 mb-3">
              AI Resource Matching
            </h2>
            <p className="text-earth-600">
              Our AI matches you with the perfect therapeutic resources based on
              your goals, learning style, and progress in therapy.
            </p>
          </div>
          <ResourceMatcher />
        </motion.section>
      </div>

      {/* Features Grid */}
      <section className="bg-gradient-to-b from-sage-50 to-cream-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light text-earth-700 text-center mb-12">
            Micro-Interaction Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Therapeutic Colors',
                description: 'Colors transition smoothly as you scroll, creating a calming visual journey',
                demo: () => {
                  playSound('hover')
                  triggerHaptic('light')
                }
              },
              {
                title: 'Organic Animations',
                description: 'Natural, flowing movements that respond to your interactions',
                demo: () => {
                  playSound('click')
                  triggerHaptic('medium')
                }
              },
              {
                title: 'Haptic Feedback',
                description: 'Gentle vibrations on mobile devices for tactile engagement',
                demo: () => {
                  playSound('success')
                  triggerHaptic('heavy')
                }
              },
              {
                title: 'Sound Effects',
                description: 'Optional calming sounds that enhance the therapeutic experience',
                demo: () => {
                  playSound('hover')
                }
              },
              {
                title: 'Progress Celebrations',
                description: 'Encouraging animations when you complete tasks or make progress',
                demo: () => {
                  playSound('success')
                  triggerHaptic('heavy')
                }
              },
              {
                title: 'Smart Forms',
                description: 'Forms that provide gentle, encouraging feedback as you type',
                demo: () => {
                  playSound('click')
                  triggerHaptic('light')
                }
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={feature.demo}
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-earth-200
                  hover:border-sage-300 transition-all cursor-pointer"
              >
                <h3 className="text-lg font-medium text-earth-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-earth-600">
                  {feature.description}
                </p>
                <div className="mt-4 text-sage-600 text-sm font-medium">
                  Click to try →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Heart,
  Brain,
  Activity,
  Users,
  Shield,
  Zap,
  Filter,
  Download,
  ExternalLink,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import { usePersonalizationStore } from '@/lib/ai/personalization-engine'
import {
  organicHover,
  smoothReveal,
  therapeuticPulse,
  floatingAnimation,
  staggerContainer,
  staggerItem
} from '@/lib/animations/micro-interactions'

// Resource types and categories
interface Resource {
  id: string
  title: string
  description: string
  type: 'worksheet' | 'guide' | 'meditation' | 'exercise' | 'tool'
  category: string
  therapeuticAreas: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration?: number // in minutes
  format: 'pdf' | 'audio' | 'video' | 'interactive'
  matchScore?: number
  popularityScore: number
  downloadUrl?: string
  previewUrl?: string
}

interface ClientProfile {
  goals: string[]
  challenges: string[]
  preferences: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    sessionFrequency: 'weekly' | 'biweekly' | 'monthly'
    homework: boolean
  }
  progress: {
    weekNumber: number
    completedResources: string[]
  }
}

// AI Matching Algorithm
class ResourceMatchingEngine {
  static calculateMatchScore(
    resource: Resource,
    profile: ClientProfile,
    userNeeds: string[]
  ): number {
    let score = 0

    // Match therapeutic areas with user needs
    const matchedAreas = resource.therapeuticAreas.filter(area =>
      userNeeds.includes(area)
    )
    score += matchedAreas.length * 25

    // Match with client goals
    profile.goals.forEach(goal => {
      if (resource.description.toLowerCase().includes(goal.toLowerCase()) ||
          resource.title.toLowerCase().includes(goal.toLowerCase())) {
        score += 20
      }
    })

    // Learning style preference
    const styleMatch = {
      visual: ['worksheet', 'guide'],
      auditory: ['meditation', 'audio'],
      kinesthetic: ['exercise', 'interactive'],
      reading: ['guide', 'worksheet']
    }

    if (styleMatch[profile.preferences.learningStyle]?.includes(resource.type)) {
      score += 15
    }

    // Difficulty progression
    const weekTodifficulty = {
      beginner: [1, 2, 3, 4],
      intermediate: [5, 6, 7, 8],
      advanced: [9, 10, 11, 12]
    }

    Object.entries(weekTodifficulty).forEach(([difficulty, weeks]) => {
      if (weeks.includes(profile.progress.weekNumber) &&
          resource.difficulty === difficulty) {
        score += 10
      }
    })

    // Avoid already completed resources
    if (profile.progress.completedResources.includes(resource.id)) {
      score -= 50
    }

    // Popularity influence
    score += Math.min(resource.popularityScore / 10, 10)

    return Math.max(0, Math.min(100, score))
  }

  static groupResourcesByTheme(resources: Resource[]): Map<string, Resource[]> {
    const themes = new Map<string, Resource[]>()

    resources.forEach(resource => {
      resource.therapeuticAreas.forEach(area => {
        if (!themes.has(area)) {
          themes.set(area, [])
        }
        themes.get(area)?.push(resource)
      })
    })

    return themes
  }
}

// Mock resource database
const mockResources: Resource[] = [
  {
    id: 'r1',
    title: 'Daily Mood Tracker',
    description: 'Track your emotions and identify patterns over time',
    type: 'worksheet',
    category: 'self-awareness',
    therapeuticAreas: ['mood tracking', 'emotional regulation'],
    difficulty: 'beginner',
    duration: 5,
    format: 'pdf',
    popularityScore: 85
  },
  {
    id: 'r2',
    title: 'Progressive Muscle Relaxation Guide',
    description: 'Learn to release tension through systematic relaxation',
    type: 'meditation',
    category: 'relaxation',
    therapeuticAreas: ['stress management', 'anxiety relief'],
    difficulty: 'beginner',
    duration: 15,
    format: 'audio',
    popularityScore: 92
  },
  {
    id: 'r3',
    title: 'Cognitive Restructuring Workbook',
    description: 'Challenge and reframe negative thought patterns',
    type: 'guide',
    category: 'cognitive',
    therapeuticAreas: ['cognitive restructuring', 'thought work'],
    difficulty: 'intermediate',
    duration: 30,
    format: 'pdf',
    popularityScore: 78
  },
  {
    id: 'r4',
    title: 'Boundary Setting Exercises',
    description: 'Practice assertive communication and healthy boundaries',
    type: 'exercise',
    category: 'relationships',
    therapeuticAreas: ['boundary setting', 'communication skills'],
    difficulty: 'intermediate',
    duration: 20,
    format: 'interactive',
    popularityScore: 81
  },
  {
    id: 'r5',
    title: 'Grounding Techniques Toolkit',
    description: '5-4-3-2-1 and other grounding exercises for anxiety',
    type: 'tool',
    category: 'coping',
    therapeuticAreas: ['grounding techniques', 'anxiety relief'],
    difficulty: 'beginner',
    duration: 10,
    format: 'interactive',
    popularityScore: 95
  }
]

const typeIcons = {
  worksheet: Target,
  guide: Brain,
  meditation: Heart,
  exercise: Activity,
  tool: Zap
}

const formatColors = {
  pdf: 'bg-earth-100 text-earth-600',
  audio: 'bg-sage-100 text-sage-600',
  video: 'bg-terracotta-100 text-terracotta-600',
  interactive: 'bg-cream-100 text-earth-700'
}

export default function ResourceMatcher() {
  const { userProfile, trackInteraction } = usePersonalizationStore()

  const [clientProfile] = useState<ClientProfile>({
    goals: ['reduce anxiety', 'improve relationships', 'manage stress'],
    challenges: ['overthinking', 'boundary setting'],
    preferences: {
      learningStyle: 'visual',
      sessionFrequency: 'weekly',
      homework: true
    },
    progress: {
      weekNumber: 3,
      completedResources: []
    }
  })

  const [matchedResources, setMatchedResources] = useState<Resource[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showThemes, setShowThemes] = useState(false)
  const [resourceThemes, setResourceThemes] = useState<Map<string, Resource[]>>(new Map())

  useEffect(() => {
    // Calculate match scores for all resources
    const scoredResources = mockResources.map(resource => ({
      ...resource,
      matchScore: ResourceMatchingEngine.calculateMatchScore(
        resource,
        clientProfile,
        userProfile.therapeuticNeeds
      )
    }))

    // Sort by match score
    const sorted = scoredResources.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    setMatchedResources(sorted)

    // Group by themes
    const themes = ResourceMatchingEngine.groupResourcesByTheme(sorted)
    setResourceThemes(themes)
  }, [clientProfile, userProfile.therapeuticNeeds])

  const handleResourceClick = useCallback((resourceId: string) => {
    trackInteraction(`resource_view_${resourceId}`)
    // Open resource preview or download
    console.log('Open resource:', resourceId)
  }, [trackInteraction])

  const filteredResources = selectedCategory === 'all'
    ? matchedResources
    : matchedResources.filter(r => r.category === selectedCategory)

  const categories = ['all', ...new Set(mockResources.map(r => r.category))]

  return (
    <motion.div
      variants={smoothReveal}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-2xl p-6
        border-2 border-sage-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-light text-earth-700 mb-2">
              Resources Matched For You
            </h2>
            <p className="text-earth-600">
              Personalized tools and exercises based on your therapeutic journey
            </p>
          </div>

          <motion.div
            variants={floatingAnimation}
            animate="float"
            className="p-3 bg-white rounded-full shadow-sm"
          >
            <Shield className="w-6 h-6 text-sage-600" />
          </motion.div>
        </div>

        {/* Client Profile Summary */}
        <div className="mt-4 p-3 bg-white/80 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-sage-600" />
            <span className="text-sm font-medium text-earth-700">Your Focus Areas:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {clientProfile.goals.map((goal, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowThemes(false)}
            className={`px-4 py-2 rounded-full transition-all ${
              !showThemes
                ? 'bg-earth-500 text-cream-50'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            All Resources
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowThemes(true)}
            className={`px-4 py-2 rounded-full transition-all ${
              showThemes
                ? 'bg-earth-500 text-cream-50'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            By Theme
          </motion.button>
        </div>

        <motion.button
          variants={organicHover}
          initial="initial"
          whileHover="hover"
          className="flex items-center gap-2 text-earth-600"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter</span>
        </motion.button>
      </div>

      {/* Category Filters */}
      {!showThemes && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-earth-500 text-cream-50'
                  : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      )}

      {/* Resources Display */}
      <AnimatePresence mode="wait">
        {!showThemes ? (
          // List View
          <motion.div
            key="list"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filteredResources.map(resource => {
              const Icon = typeIcons[resource.type]
              const isHighMatch = (resource.matchScore || 0) > 75

              return (
                <motion.article
                  key={resource.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleResourceClick(resource.id)}
                  className={`relative p-4 bg-white rounded-xl border-2 cursor-pointer
                    transition-all ${
                      isHighMatch
                        ? 'border-sage-300 shadow-md'
                        : 'border-earth-200 hover:border-earth-300'
                    }`}
                >
                  {/* Match Score Badge */}
                  {isHighMatch && (
                    <motion.div
                      variants={therapeuticPulse}
                      animate="pulse"
                      className="absolute -top-2 -right-2"
                    >
                      <div className="bg-sage-500 text-white px-2 py-1 rounded-full
                        text-xs font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {resource.matchScore}% Match
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${formatColors[resource.format]}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-medium text-earth-700 mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-earth-600 mb-3">
                        {resource.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        {resource.duration && (
                          <span className="text-earth-500">
                            {resource.duration} min
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full ${
                          resource.difficulty === 'beginner'
                            ? 'bg-sage-100 text-sage-600'
                            : resource.difficulty === 'intermediate'
                            ? 'bg-earth-100 text-earth-600'
                            : 'bg-terracotta-100 text-terracotta-600'
                        }`}>
                          {resource.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-earth-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{resource.popularityScore}%</span>
                        </div>
                      </div>

                      {/* Therapeutic Areas */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {resource.therapeuticAreas.map(area => (
                          <span
                            key={area}
                            className="px-2 py-0.5 bg-cream-50 text-earth-600 text-xs rounded"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-sage-100 hover:bg-sage-200 rounded-lg
                          text-sage-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-earth-100 hover:bg-earth-200 rounded-lg
                          text-earth-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        ) : (
          // Theme View
          <motion.div
            key="themes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {Array.from(resourceThemes.entries()).map(([theme, resources]) => (
              <div key={theme}>
                <h3 className="text-lg font-medium text-earth-700 mb-3 capitalize">
                  {theme}
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {resources.slice(0, 4).map(resource => {
                    const Icon = typeIcons[resource.type]

                    return (
                      <motion.button
                        key={resource.id}
                        variants={organicHover}
                        initial="initial"
                        whileHover="hover"
                        onClick={() => handleResourceClick(resource.id)}
                        className="p-3 bg-white rounded-lg border border-earth-200
                          hover:border-earth-300 text-left transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-earth-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-earth-700">
                              {resource.title}
                            </p>
                            <p className="text-xs text-earth-500 mt-0.5">
                              {resource.type} • {resource.duration} min
                            </p>
                          </div>
                          {(resource.matchScore || 0) > 75 && (
                            <TrendingUp className="w-4 h-4 text-sage-500" />
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
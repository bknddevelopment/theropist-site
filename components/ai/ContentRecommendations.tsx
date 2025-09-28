'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  FileText,
  PlayCircle,
  Download,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { usePersonalizationStore, ContentRecommendation } from '@/lib/ai/personalization-engine'
import {
  organicHover,
  staggerContainer,
  staggerItem,
  therapeuticPulse,
  hapticFeedback
} from '@/lib/animations/micro-interactions'

// Icon mapping for content types
const contentIcons = {
  article: BookOpen,
  resource: FileText,
  video: PlayCircle,
  exercise: Download,
  tip: Sparkles
}

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-sage-100 text-sage-600 border-sage-200',
  intermediate: 'bg-earth-100 text-earth-600 border-earth-200',
  advanced: 'bg-terracotta-100 text-terracotta-600 border-terracotta-200'
}

interface ContentCardProps {
  content: ContentRecommendation
  onInteract: (contentId: string) => void
  featured?: boolean
}

function ContentCard({ content, onInteract, featured = false }: ContentCardProps) {
  const Icon = contentIcons[content.type] || FileText

  return (
    <motion.article
      variants={featured ? therapeuticPulse : organicHover}
      initial="initial"
      whileHover={featured ? "pulse" : "hover"}
      animate={featured ? "pulse" : "initial"}
      whileTap={hapticFeedback.medium}
      onClick={() => onInteract(content.id)}
      className={`
        relative overflow-hidden cursor-pointer
        ${featured
          ? 'bg-gradient-to-br from-sage-50 to-cream-50 border-2 border-sage-200'
          : 'bg-white border-2 border-earth-200'
        }
        rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all
      `}
    >
      {/* Relevance Score Indicator */}
      {content.relevanceScore > 80 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3"
        >
          <div className="flex items-center gap-1 px-2 py-1 bg-sage-500 text-white
            rounded-full text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            Recommended
          </div>
        </motion.div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <motion.div
          animate={{ rotate: featured ? [0, 5, -5, 0] : 0 }}
          transition={{ duration: 2, repeat: featured ? Infinity : 0 }}
          className={`p-3 rounded-xl ${
            featured ? 'bg-sage-100' : 'bg-earth-100'
          }`}
        >
          <Icon className={`w-6 h-6 ${
            featured ? 'text-sage-600' : 'text-earth-600'
          }`} />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-earth-700 font-medium text-lg mb-2 line-clamp-2">
            {content.title}
          </h3>
          <p className="text-earth-600 text-sm mb-3 line-clamp-2">
            {content.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            {content.readTime && (
              <div className="flex items-center gap-1 text-earth-500 text-xs">
                <Clock className="w-3 h-3" />
                <span>{content.readTime} min read</span>
              </div>
            )}

            {content.difficulty && (
              <span className={`px-2 py-0.5 text-xs rounded-full border ${
                difficultyColors[content.difficulty]
              }`}>
                {content.difficulty}
              </span>
            )}

            <div className="flex-1" />

            <motion.div
              whileHover={{ x: 5 }}
              className="text-earth-400"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Therapeutic Areas Tags */}
      {content.therapeuticAreas.length > 0 && (
        <div className="mt-4 pt-4 border-t border-earth-100">
          <div className="flex flex-wrap gap-2">
            {content.therapeuticAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="px-2 py-1 bg-cream-50 text-earth-600 text-xs rounded-lg"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  )
}

export default function ContentRecommendations() {
  const {
    recommendations,
    getPersonalizedContent,
    trackInteraction,
    generateRecommendations
  } = usePersonalizationStore()

  const [displayedContent, setDisplayedContent] = useState<ContentRecommendation[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    // Get initial recommendations
    const content = getPersonalizedContent(
      selectedType === 'all' ? undefined : selectedType
    )
    setDisplayedContent(content)
  }, [selectedType, getPersonalizedContent])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    trackInteraction('refresh_recommendations')

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    generateRecommendations()
    const content = getPersonalizedContent()
    setDisplayedContent(content)
    setIsRefreshing(false)
  }

  const handleContentInteraction = (contentId: string) => {
    trackInteraction(`content_click_${contentId}`)
    // Navigate to content or open modal
    console.log('Open content:', contentId)
  }

  const contentTypes = ['all', 'article', 'resource', 'exercise', 'tip']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-earth-700">
            Content For You
          </h2>
          <p className="text-earth-600 mt-1">
            Personalized resources based on your journey
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-3 bg-sage-100 hover:bg-sage-200 rounded-full
            text-sage-600 transition-colors disabled:opacity-50"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
          >
            <RefreshCw className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {contentTypes.map(type => (
          <motion.button
            key={type}
            variants={organicHover}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-earth-500 text-cream-50'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {displayedContent.length > 0 ? (
            displayedContent.map((content, index) => (
              <motion.div
                key={content.id}
                variants={staggerItem}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ContentCard
                  content={content}
                  onInteract={handleContentInteraction}
                  featured={index === 0 && content.relevanceScore > 85}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16
                bg-earth-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-earth-400" />
              </div>
              <h3 className="text-earth-600 font-medium mb-2">
                No recommendations yet
              </h3>
              <p className="text-earth-500 text-sm">
                Explore our content to get personalized recommendations
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      {displayedContent.length >= 4 && (
        <motion.button
          variants={organicHover}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Load more content
            trackInteraction('load_more_content')
          }}
          className="w-full py-3 bg-cream-50 hover:bg-cream-100 rounded-xl
            text-earth-600 font-medium transition-colors border-2 border-earth-200"
        >
          Load More Resources
        </motion.button>
      )}
    </div>
  )
}
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, ThumbsUp, MessageCircle, Sparkles } from 'lucide-react'
import { usePersonalizationStore } from '@/lib/ai/personalization-engine'
import {
  organicHover,
  staggerContainer,
  staggerItem,
  encouragingMessage,
  therapeuticPulse
} from '@/lib/animations/micro-interactions'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
  helpfulness: number
  views: number
  relatedQuestions?: string[]
}

interface SmartFAQProps {
  initialFAQs?: FAQItem[]
  showSearch?: boolean
  showCategories?: boolean
  maxItems?: number
}

// AI-powered FAQ ranking algorithm
class FAQRanker {
  static rankFAQs(
    faqs: FAQItem[],
    searchQuery: string,
    userInterests: string[]
  ): FAQItem[] {
    return faqs
      .map(faq => ({
        ...faq,
        relevanceScore: this.calculateRelevance(faq, searchQuery, userInterests)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  private static calculateRelevance(
    faq: FAQItem,
    query: string,
    interests: string[]
  ): number {
    let score = 0

    // Query matching
    const queryLower = query.toLowerCase()
    if (faq.question.toLowerCase().includes(queryLower)) {
      score += 50
    }
    if (faq.answer.toLowerCase().includes(queryLower)) {
      score += 30
    }

    // Keyword matching
    faq.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(queryLower)) {
        score += 20
      }
    })

    // User interest alignment
    interests.forEach(interest => {
      if (faq.category === interest || faq.keywords.includes(interest)) {
        score += 15
      }
    })

    // Helpfulness weight
    score += (faq.helpfulness / 100) * 20

    // View count influence (popular questions)
    score += Math.min(faq.views / 10, 10)

    return score
  }

  static predictNextQuestion(
    currentFAQ: FAQItem,
    allFAQs: FAQItem[]
  ): FAQItem[] {
    const related = currentFAQ.relatedQuestions || []
    const relatedFAQs = allFAQs.filter(faq => related.includes(faq.id))

    // Add FAQs from same category
    const categoryFAQs = allFAQs.filter(
      faq => faq.category === currentFAQ.category && faq.id !== currentFAQ.id
    )

    return [...relatedFAQs, ...categoryFAQs].slice(0, 3)
  }
}

// Default FAQ data
const defaultFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'What can I expect in my first therapy session?',
    answer: 'Your first session is a gentle introduction where we\'ll discuss your goals, concerns, and what brings you to therapy. It\'s a safe space to share at your own pace, and we\'ll work together to create a therapeutic plan that feels right for you.',
    category: 'getting-started',
    keywords: ['first session', 'beginning', 'introduction', 'expectations'],
    helpfulness: 95,
    views: 342,
    relatedQuestions: ['2', '3']
  },
  {
    id: '2',
    question: 'How long does therapy typically take?',
    answer: 'The duration of therapy varies for each individual and depends on your specific goals and needs. Some find relief in a few sessions, while others benefit from longer-term support. We\'ll regularly check in on your progress and adjust our approach as needed.',
    category: 'getting-started',
    keywords: ['duration', 'timeline', 'length', 'sessions'],
    helpfulness: 88,
    views: 267,
    relatedQuestions: ['1', '4']
  },
  {
    id: '3',
    question: 'Is what we discuss in therapy confidential?',
    answer: 'Yes, confidentiality is fundamental to our therapeutic relationship. What you share stays between us, with very limited legal exceptions that I\'ll explain clearly in our first session. Your privacy and trust are paramount.',
    category: 'privacy',
    keywords: ['confidential', 'private', 'secure', 'trust'],
    helpfulness: 97,
    views: 189,
    relatedQuestions: ['1', '5']
  },
  {
    id: '4',
    question: 'How do I know if therapy is working for me?',
    answer: 'Progress in therapy can manifest in various ways: improved mood, better relationships, increased self-awareness, or enhanced coping skills. We\'ll regularly assess your progress together and celebrate your growth, no matter how small.',
    category: 'progress',
    keywords: ['progress', 'improvement', 'working', 'results'],
    helpfulness: 91,
    views: 156,
    relatedQuestions: ['2', '6']
  },
  {
    id: '5',
    question: 'What\'s the difference between in-person and online sessions?',
    answer: 'Both formats offer effective therapy. In-person sessions provide physical presence and traditional connection, while online sessions offer convenience and comfort from your own space. We can discuss which format best suits your needs and preferences.',
    category: 'sessions',
    keywords: ['online', 'in-person', 'virtual', 'format'],
    helpfulness: 85,
    views: 234,
    relatedQuestions: ['6', '7']
  },
  {
    id: '6',
    question: 'How should I prepare for a therapy session?',
    answer: 'There\'s no right or wrong way to prepare. Some find it helpful to jot down thoughts or topics they\'d like to discuss. Most importantly, come as you are - therapy is a judgment-free space where you can be authentic.',
    category: 'preparation',
    keywords: ['prepare', 'ready', 'before session', 'preparation'],
    helpfulness: 82,
    views: 145,
    relatedQuestions: ['1', '4']
  },
  {
    id: '7',
    question: 'What if I need support between sessions?',
    answer: 'I provide resources and coping strategies you can use between sessions. In crisis situations, I\'ll ensure you have appropriate emergency contacts. We can also discuss the possibility of brief check-ins if needed.',
    category: 'support',
    keywords: ['between sessions', 'crisis', 'emergency', 'support'],
    helpfulness: 93,
    views: 178,
    relatedQuestions: ['3', '5']
  }
]

export default function SmartFAQ({
  initialFAQs = defaultFAQs,
  showSearch = true,
  showCategories = true,
  maxItems = 5
}: SmartFAQProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs)
  const [displayedFAQs, setDisplayedFAQs] = useState<FAQItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [suggestedQuestions, setSuggestedQuestions] = useState<FAQItem[]>([])
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const { userProfile, trackInteraction, trackPageView } = usePersonalizationStore()

  // Get unique categories
  const categories = ['all', ...new Set(faqs.map(faq => faq.category))]

  // Update displayed FAQs based on search and filters
  useEffect(() => {
    let filtered = faqs

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    // Apply AI ranking if searching
    if (searchQuery) {
      filtered = FAQRanker.rankFAQs(
        filtered,
        searchQuery,
        userProfile.interests
      )
    } else {
      // Sort by helpfulness and views when not searching
      filtered = filtered.sort((a, b) => {
        const scoreA = a.helpfulness * 0.7 + (a.views / 10) * 0.3
        const scoreB = b.helpfulness * 0.7 + (b.views / 10) * 0.3
        return scoreB - scoreA
      })
    }

    setDisplayedFAQs(filtered.slice(0, maxItems))
  }, [searchQuery, selectedCategory, faqs, maxItems, userProfile.interests])

  // Track FAQ view
  const handleFAQClick = useCallback((faq: FAQItem) => {
    const isExpanding = !expandedItems.has(faq.id)

    if (isExpanding) {
      // Update view count
      setFaqs(prev => prev.map(f =>
        f.id === faq.id ? { ...f, views: f.views + 1 } : f
      ))

      // Track interaction
      trackInteraction(`faq_view_${faq.id}`)
      trackPageView(`faq/${faq.category}`)

      // Get AI suggestions for next questions
      const suggestions = FAQRanker.predictNextQuestion(faq, faqs)
      setSuggestedQuestions(suggestions)
      setShowAISuggestions(true)
    }

    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(faq.id)) {
        newSet.delete(faq.id)
      } else {
        newSet.add(faq.id)
      }
      return newSet
    })
  }, [expandedItems, faqs, trackInteraction, trackPageView])

  // Handle helpfulness feedback
  const handleHelpfulness = useCallback((faqId: string, helpful: boolean) => {
    setFaqs(prev => prev.map(faq => {
      if (faq.id === faqId) {
        const adjustment = helpful ? 5 : -2
        return {
          ...faq,
          helpfulness: Math.max(0, Math.min(100, faq.helpfulness + adjustment))
        }
      }
      return faq
    }))

    trackInteraction(`faq_feedback_${helpful ? 'helpful' : 'not_helpful'}_${faqId}`)
  }, [trackInteraction])

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      {(showSearch || showCategories) && (
        <div className="space-y-4">
          {showSearch && (
            <motion.div
              variants={organicHover}
              initial="initial"
              whileHover="hover"
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask me anything about therapy..."
                className="w-full pl-12 pr-4 py-3 bg-cream-50 border-2 border-earth-200
                  rounded-2xl focus:outline-none focus:border-earth-400 transition-all
                  placeholder-earth-400 text-earth-700"
              />
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <Sparkles className="w-5 h-5 text-sage-500" />
                </motion.div>
              )}
            </motion.div>
          )}

          {showCategories && (
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  variants={organicHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
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
        </div>
      )}

      {/* FAQ Items */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        <AnimatePresence mode="wait">
          {displayedFAQs.map(faq => (
            <motion.div
              key={faq.id}
              variants={staggerItem}
              layout
              className="overflow-hidden"
            >
              <motion.button
                variants={organicHover}
                initial="initial"
                whileHover="hover"
                onClick={() => handleFAQClick(faq)}
                className="w-full text-left p-4 bg-cream-50 rounded-2xl border-2 border-earth-200
                  hover:border-earth-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-earth-700 font-medium pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-earth-400 flex-shrink-0" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <p className="text-earth-600 leading-relaxed mb-4">
                        {faq.answer}
                      </p>

                      {/* Helpfulness Feedback */}
                      <div className="flex items-center gap-4 pt-3 border-t border-earth-200">
                        <span className="text-sm text-earth-500">Was this helpful?</span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleHelpfulness(faq.id, true)}
                            className="p-2 rounded-full bg-sage-100 hover:bg-sage-200
                              text-sage-600 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleHelpfulness(faq.id, false)}
                            className="p-2 rounded-full bg-earth-100 hover:bg-earth-200
                              text-earth-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* AI Suggested Questions */}
      <AnimatePresence>
        {showAISuggestions && suggestedQuestions.length > 0 && (
          <motion.div
            variants={encouragingMessage}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mt-6 p-4 bg-sage-50 rounded-2xl border-2 border-sage-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div variants={therapeuticPulse} animate="pulse">
                <Sparkles className="w-5 h-5 text-sage-500" />
              </motion.div>
              <h4 className="text-sage-700 font-medium">You might also want to know:</h4>
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map(question => (
                <motion.button
                  key={question.id}
                  variants={organicHover}
                  initial="initial"
                  whileHover="hover"
                  onClick={() => handleFAQClick(question)}
                  className="w-full text-left p-3 bg-white/50 rounded-xl hover:bg-white/70
                    transition-all text-sm text-earth-600"
                >
                  {question.question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
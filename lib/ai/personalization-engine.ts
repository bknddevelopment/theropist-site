/**
 * AI-Powered Personalization Engine
 * Provides intelligent content recommendations and user behavior analysis
 */

import { create } from 'zustand'

// User behavior tracking types
export interface UserBehavior {
  pageViews: Record<string, number>
  timeSpent: Record<string, number>
  interactions: string[]
  interests: string[]
  lastVisit: Date
  sessionCount: number
  preferredContentType: 'articles' | 'resources' | 'videos' | 'mixed'
  therapeuticNeeds: string[]
  engagementScore: number
}

// Content recommendation types
export interface ContentRecommendation {
  id: string
  type: 'article' | 'resource' | 'tip' | 'exercise'
  title: string
  description: string
  relevanceScore: number
  category: string
  readTime?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  therapeuticAreas: string[]
}

// Personalization state
interface PersonalizationState {
  userProfile: UserBehavior
  recommendations: ContentRecommendation[]
  sessionData: {
    startTime: Date
    currentPage: string
    scrollDepth: number
    interactionCount: number
  }
  updateBehavior: (behavior: Partial<UserBehavior>) => void
  trackPageView: (page: string) => void
  trackInteraction: (interaction: string) => void
  generateRecommendations: () => ContentRecommendation[]
  getPersonalizedContent: (contentType?: string) => ContentRecommendation[]
  calculateEngagementScore: () => number
}

// AI recommendation algorithm
class RecommendationEngine {
  private static calculateRelevance(
    content: ContentRecommendation,
    profile: UserBehavior
  ): number {
    let score = 0

    // Interest matching
    const sharedInterests = content.therapeuticAreas.filter(area =>
      profile.therapeuticNeeds.includes(area)
    )
    score += sharedInterests.length * 30

    // Content type preference (simplified check since types don't overlap)
    if (profile.preferredContentType === 'mixed') {
      score += 20
    }

    // Engagement history
    const categoryViews = profile.pageViews[content.category] || 0
    score += Math.min(categoryViews * 5, 25)

    // Recency boost
    const daysSinceLastVisit = profile.lastVisit
      ? (Date.now() - new Date(profile.lastVisit).getTime()) / (1000 * 60 * 60 * 24)
      : 30
    if (daysSinceLastVisit < 7) {
      score += 15
    }

    // Engagement score influence
    score += profile.engagementScore * 0.1

    return Math.min(score, 100)
  }

  static generateRecommendations(
    profile: UserBehavior,
    availableContent: ContentRecommendation[]
  ): ContentRecommendation[] {
    // Score and sort all content
    const scoredContent = availableContent.map(content => ({
      ...content,
      relevanceScore: this.calculateRelevance(content, profile)
    }))

    // Sort by relevance and return top recommendations
    return scoredContent
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10)
  }

  static predictUserNeeds(profile: UserBehavior): string[] {
    const needs: string[] = []

    // Analyze page view patterns
    const topCategories = Object.entries(profile.pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category)

    // Map categories to therapeutic needs
    const categoryNeedsMap: Record<string, string[]> = {
      anxiety: ['stress management', 'breathing exercises', 'mindfulness'],
      depression: ['mood tracking', 'activity scheduling', 'cognitive restructuring'],
      relationships: ['communication skills', 'boundary setting', 'conflict resolution'],
      trauma: ['grounding techniques', 'safety planning', 'emotional regulation'],
      selfCare: ['self-compassion', 'routine building', 'wellness practices']
    }

    topCategories.forEach(category => {
      const mappedNeeds = categoryNeedsMap[category] || []
      needs.push(...mappedNeeds)
    })

    return [...new Set(needs)]
  }
}

// Mock content database (would be replaced with real API)
const mockContent: ContentRecommendation[] = [
  {
    id: '1',
    type: 'article',
    title: 'Understanding Your Anxiety: A Compassionate Guide',
    description: 'Learn about anxiety symptoms and gentle coping strategies',
    relevanceScore: 0,
    category: 'anxiety',
    readTime: 5,
    difficulty: 'beginner',
    therapeuticAreas: ['stress management', 'mindfulness']
  },
  {
    id: '2',
    type: 'resource',
    title: 'Daily Mindfulness Practice Tracker',
    description: 'Track your meditation and mindfulness exercises',
    relevanceScore: 0,
    category: 'selfCare',
    difficulty: 'beginner',
    therapeuticAreas: ['mindfulness', 'wellness practices']
  },
  {
    id: '3',
    type: 'exercise',
    title: 'Progressive Muscle Relaxation for Sleep',
    description: 'Guided exercise to help you relax before bedtime',
    relevanceScore: 0,
    category: 'anxiety',
    readTime: 10,
    difficulty: 'intermediate',
    therapeuticAreas: ['stress management', 'wellness practices']
  },
  {
    id: '4',
    type: 'tip',
    title: 'Setting Healthy Boundaries in Relationships',
    description: 'Quick tips for establishing and maintaining boundaries',
    relevanceScore: 0,
    category: 'relationships',
    readTime: 3,
    difficulty: 'intermediate',
    therapeuticAreas: ['boundary setting', 'communication skills']
  },
  {
    id: '5',
    type: 'article',
    title: 'The Science of Emotional Regulation',
    description: 'Understanding how emotions work and how to manage them',
    relevanceScore: 0,
    category: 'trauma',
    readTime: 8,
    difficulty: 'advanced',
    therapeuticAreas: ['emotional regulation', 'cognitive restructuring']
  }
]

// Zustand store
export const usePersonalizationStore = create<PersonalizationState>((set, get) => ({
      userProfile: {
        pageViews: {},
        timeSpent: {},
        interactions: [],
        interests: [],
        lastVisit: new Date(),
        sessionCount: 1,
        preferredContentType: 'mixed',
        therapeuticNeeds: [],
        engagementScore: 0
      },
      recommendations: [],
      sessionData: {
        startTime: new Date(),
        currentPage: '',
        scrollDepth: 0,
        interactionCount: 0
      },

      updateBehavior: (behavior) => set(state => ({
        userProfile: { ...state.userProfile, ...behavior }
      })),

      trackPageView: (page) => set(state => ({
        userProfile: {
          ...state.userProfile,
          pageViews: {
            ...state.userProfile.pageViews,
            [page]: (state.userProfile.pageViews[page] || 0) + 1
          },
          lastVisit: new Date()
        },
        sessionData: {
          ...state.sessionData,
          currentPage: page
        }
      })),

      trackInteraction: (interaction) => set(state => ({
        userProfile: {
          ...state.userProfile,
          interactions: [...state.userProfile.interactions, interaction]
        },
        sessionData: {
          ...state.sessionData,
          interactionCount: state.sessionData.interactionCount + 1
        }
      })),

      generateRecommendations: () => {
        const profile = get().userProfile
        const recommendations = RecommendationEngine.generateRecommendations(
          profile,
          mockContent
        )
        set({ recommendations })
        return recommendations
      },

      getPersonalizedContent: (contentType) => {
        const { recommendations, userProfile } = get()

        // If no recommendations yet, generate them
        if (recommendations.length === 0) {
          get().generateRecommendations()
        }

        // Filter by content type if specified
        const filtered = contentType
          ? recommendations.filter(r => r.type === contentType)
          : recommendations

        // Predict user needs if we have enough data
        if (Object.keys(userProfile.pageViews).length > 3) {
          const predictedNeeds = RecommendationEngine.predictUserNeeds(userProfile)
          set(state => ({
            userProfile: {
              ...state.userProfile,
              therapeuticNeeds: predictedNeeds
            }
          }))
        }

        return filtered
      },

      calculateEngagementScore: () => {
        const { userProfile, sessionData } = get()

        // Calculate engagement based on multiple factors
        const pageViewScore = Math.min(Object.keys(userProfile.pageViews).length * 10, 30)
        const interactionScore = Math.min(userProfile.interactions.length * 5, 25)
        const sessionScore = Math.min(userProfile.sessionCount * 5, 20)
        const scrollScore = Math.min(sessionData.scrollDepth * 25, 25)

        const totalScore = pageViewScore + interactionScore + sessionScore + scrollScore

        set(state => ({
          userProfile: {
            ...state.userProfile,
            engagementScore: totalScore
          }
        }))

        return totalScore
      }
    })
)
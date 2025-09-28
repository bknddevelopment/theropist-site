'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { seasonalThemes, SeasonalTheme, getCurrentSeason } from '@/lib/themes/seasonal-themes'

interface ThemeContextValue {
  currentTheme: SeasonalTheme
  currentSeason: 'spring' | 'summer' | 'autumn' | 'winter'
  setTheme: (season: 'spring' | 'summer' | 'autumn' | 'winter') => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentSeason, setCurrentSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-season')
      if (saved && ['spring', 'summer', 'autumn', 'winter'].includes(saved)) {
        return saved as 'spring' | 'summer' | 'autumn' | 'winter'
      }
    }
    return getCurrentSeason()
  })

  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme>(seasonalThemes[currentSeason])
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement

    // Apply CSS variables with smooth transition
    Object.entries(currentTheme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply theme-specific body classes
    document.body.className = document.body.className
      .replace(/season-\w+/g, '')
      .concat(` season-${currentSeason}`)

    // Save preference
    localStorage.setItem('preferred-season', currentSeason)
  }, [currentTheme, currentSeason])

  const setTheme = useCallback((season: 'spring' | 'summer' | 'autumn' | 'winter') => {
    if (season === currentSeason) return

    setIsTransitioning(true)

    // Add transition class to body
    document.body.classList.add('theme-transitioning')

    // Small delay to ensure transition class is applied
    setTimeout(() => {
      setCurrentSeason(season)
      setCurrentTheme(seasonalThemes[season])

      // Remove transition class after animation
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning')
        setIsTransitioning(false)
      }, 600)
    }, 50)
  }, [currentSeason])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      currentSeason,
      setTheme,
      isTransitioning
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
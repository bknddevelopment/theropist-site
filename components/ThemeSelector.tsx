'use client'

import React, { useState } from 'react'
import { useTheme } from '@/lib/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

interface SeasonOption {
  value: 'spring' | 'summer' | 'autumn' | 'winter'
  label: string
  icon: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  description: string
}

const seasonOptions: SeasonOption[] = [
  {
    value: 'spring',
    label: 'Spring',
    icon: '🌸',
    colors: {
      primary: '#4A6741',
      secondary: '#A66B7A',
      accent: '#5B7A8C'
    },
    description: 'Fresh growth and renewal'
  },
  {
    value: 'summer',
    label: 'Summer',
    icon: '☀️',
    colors: {
      primary: '#8B6F3D',
      secondary: '#556B44',
      accent: '#5B85A6'
    },
    description: 'Warmth and vitality'
  },
  {
    value: 'autumn',
    label: 'Autumn',
    icon: '🍂',
    colors: {
      primary: '#A65D2F',
      secondary: '#7D3F45',
      accent: '#8B7355'
    },
    description: 'Harvest and reflection'
  },
  {
    value: 'winter',
    label: 'Winter',
    icon: '❄️',
    colors: {
      primary: '#5C6066',
      secondary: '#4B6078',
      accent: '#8A9AAA'
    },
    description: 'Rest and renewal'
  }
]

export function ThemeSelector() {
  const { currentSeason, setTheme, isTransitioning } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (season: 'spring' | 'summer' | 'autumn' | 'winter') => {
    setTheme(season)
    setIsOpen(false)
  }

  const currentOption = seasonOptions.find(opt => opt.value === currentSeason)!

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTransitioning}
        className="flex items-center gap-2 px-4 py-2 rounded-organic-sm bg-white/80 backdrop-blur-sm shadow-warm-md hover:shadow-warm-lg transition-all duration-300 border border-earth-subtle focus-visible-ring"
        aria-label="Select seasonal theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-2xl" aria-hidden="true">{currentOption.icon}</span>
        <span className="font-quicksand font-medium text-earth-primary">
          {currentOption.label}
        </span>
        <svg
          className={`w-4 h-4 text-earth-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-72 bg-white/95 backdrop-blur-md rounded-organic shadow-warm-xl border border-earth-subtle overflow-hidden z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2">
              {seasonOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  disabled={isTransitioning}
                  className={`w-full flex items-start gap-3 p-3 rounded-organic-sm transition-all duration-200 hover:bg-cream/60 ${
                    currentSeason === option.value ? 'bg-cream' : ''
                  }`}
                  role="menuitem"
                  aria-label={`Switch to ${option.label} theme: ${option.description}`}
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">
                    {option.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-quicksand font-semibold text-earth-primary">
                        {option.label}
                      </span>
                      {currentSeason === option.value && (
                        <span className="text-xs px-2 py-0.5 bg-sage/20 text-sage-dark rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-earth-secondary mt-1">
                      {option.description}
                    </p>
                    {/* Color preview dots */}
                    <div className="flex gap-1 mt-2">
                      <span
                        className="w-4 h-4 rounded-full shadow-inner"
                        style={{ backgroundColor: option.colors.primary }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-4 h-4 rounded-full shadow-inner"
                        style={{ backgroundColor: option.colors.secondary }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-4 h-4 rounded-full shadow-inner"
                        style={{ backgroundColor: option.colors.accent }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Auto-detect option */}
            <div className="border-t border-earth-subtle p-3 bg-bone/30">
              <button
                onClick={() => {
                  const currentSeason = new Date().getMonth()
                  let season: 'spring' | 'summer' | 'autumn' | 'winter' = 'winter'

                  if (currentSeason >= 2 && currentSeason <= 4) season = 'spring'
                  else if (currentSeason >= 5 && currentSeason <= 7) season = 'summer'
                  else if (currentSeason >= 8 && currentSeason <= 10) season = 'autumn'

                  handleThemeChange(season)
                }}
                className="w-full text-sm text-earth-secondary hover:text-earth-primary transition-colors duration-200 font-quicksand"
                role="menuitem"
                aria-label="Auto-detect theme based on current season"
              >
                🔄 Auto-detect current season
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Mini theme selector for mobile/compact spaces
export function ThemeSelectorMini() {
  const { currentSeason, setTheme, isTransitioning } = useTheme()

  const handleCycleTheme = () => {
    const seasons: Array<'spring' | 'summer' | 'autumn' | 'winter'> = ['spring', 'summer', 'autumn', 'winter']
    const currentIndex = seasons.indexOf(currentSeason)
    const nextIndex = (currentIndex + 1) % seasons.length
    setTheme(seasons[nextIndex])
  }

  const currentOption = seasonOptions.find(opt => opt.value === currentSeason)!

  return (
    <button
      onClick={handleCycleTheme}
      disabled={isTransitioning}
      className="p-2 rounded-organic-sm bg-white/80 backdrop-blur-sm shadow-warm hover:shadow-warm-md transition-all duration-300 focus-visible-ring"
      aria-label={`Current theme: ${currentOption.label}. Click to cycle through themes`}
    >
      <span className="text-xl" aria-hidden="true">{currentOption.icon}</span>
    </button>
  )
}
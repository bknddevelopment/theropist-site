'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider, useTheme } from '@/lib/contexts/ThemeContext'
import { ThemeSelector } from '@/components/ThemeSelector'
import { SeasonalParticles } from '@/components/SeasonalParticles'
import { BackgroundEffect, QualityLevel } from '@/components/WebGLBackground'

// Dynamically import WebGL components to prevent SSR issues
const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), {
  ssr: false,
  loading: () => null
})

const WebGLControls = dynamic(() => import('@/components/WebGLControls'), {
  ssr: false,
  loading: () => null
})

// Internal component that uses the theme context
function ThemeLayoutContent({ children }: { children: React.ReactNode }) {
  const { currentTheme, currentSeason } = useTheme()
  const [webglEffect, setWebglEffect] = useState<BackgroundEffect>('water')
  const [webglQuality, setWebglQuality] = useState<QualityLevel>('medium')
  const [webglIntensity, setWebglIntensity] = useState(0.5)
  const [webglEnabled, setWebglEnabled] = useState(false) // Default to false, user can enable

  // Apply theme CSS variables and classes
  useEffect(() => {
    const root = document.documentElement

    // Apply all CSS variables from the theme
    Object.entries(currentTheme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply seasonal body class
    document.body.className = document.body.className
      .replace(/season-\w+/g, '')
      .concat(` season-${currentSeason}`)

    // Apply seasonal background gradient
    if (currentTheme.decorations.gradients.overlay) {
      document.body.style.setProperty('--seasonal-overlay', currentTheme.decorations.gradients.overlay)
    }
  }, [currentTheme, currentSeason])

  return (
    <>
      {/* WebGL Background - underneath everything */}
      <WebGLBackground
        effect={webglEffect}
        quality={webglQuality}
        intensity={webglIntensity}
        seasonal={true}
        disabled={!webglEnabled}
      />

      {/* WebGL Controls - bottom right */}
      <WebGLControls
        onEffectChange={setWebglEffect}
        onQualityChange={setWebglQuality}
        onIntensityChange={setWebglIntensity}
        onToggle={setWebglEnabled}
        initialEffect={webglEffect}
        initialQuality={webglQuality}
        initialIntensity={webglIntensity}
        initialEnabled={webglEnabled}
      />

      {/* Theme Selector - positioned below navigation on right side */}
      <div className="fixed top-20 right-4 z-40">
        <ThemeSelector />
      </div>

      {/* Use new SeasonalParticles for custom seasonal effects */}
      {currentTheme.decorations.particles.enabled && !webglEnabled && (
        <SeasonalParticles />
      )}

      {/* Main content */}
      {children}
    </>
  )
}

// Main component that provides the theme context
export function ThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeLayoutContent>{children}</ThemeLayoutContent>
    </ThemeProvider>
  )
}
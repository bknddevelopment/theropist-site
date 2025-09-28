'use client'

import React, { memo } from 'react'

/**
 * Optimized SVG component with performance considerations
 * Memoized to prevent unnecessary re-renders
 */

interface OptimizedSVGProps {
  viewBox?: string
  className?: string
  children: React.ReactNode
  ariaLabel?: string
  role?: string
}

export const OptimizedSVG = memo(({
  viewBox = "0 0 200 200",
  className = "",
  children,
  ariaLabel,
  role = "img"
}: OptimizedSVGProps) => {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={role}
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      style={{ contain: 'layout style paint' }}
    >
      {children}
    </svg>
  )
})

OptimizedSVG.displayName = 'OptimizedSVG'

/**
 * Organic shape patterns optimized for performance
 */

export const OrganicBlob1 = memo(() => (
  <OptimizedSVG viewBox="0 0 200 200" className="w-full h-full">
    <defs>
      <linearGradient id="blob1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(139, 149, 116, 0.2)" />
        <stop offset="100%" stopColor="rgba(212, 165, 116, 0.1)" />
      </linearGradient>
    </defs>
    <path
      d="M40,100 Q40,50 70,40 Q100,30 130,50 Q160,70 160,100 Q160,130 130,150 Q100,170 70,160 Q40,150 40,100"
      fill="url(#blob1)"
      transform="translate(0,0)"
    />
  </OptimizedSVG>
))

OrganicBlob1.displayName = 'OrganicBlob1'

export const OrganicBlob2 = memo(() => (
  <OptimizedSVG viewBox="0 0 200 200" className="w-full h-full">
    <defs>
      <linearGradient id="blob2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(184, 122, 92, 0.15)" />
        <stop offset="100%" stopColor="rgba(107, 124, 89, 0.1)" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="60" fill="url(#blob2)" />
  </OptimizedSVG>
))

OrganicBlob2.displayName = 'OrganicBlob2'

export const TopographicalWave = memo(() => (
  <OptimizedSVG viewBox="0 0 1200 120" className="w-full h-full" ariaLabel="Decorative wave pattern">
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(250, 246, 240, 0.1)" />
        <stop offset="50%" stopColor="rgba(232, 213, 196, 0.15)" />
        <stop offset="100%" stopColor="rgba(250, 246, 240, 0.1)" />
      </linearGradient>
    </defs>
    <path
      d="M0,60 Q300,30 600,60 T1200,30 L1200,120 L0,120 Z"
      fill="url(#waveGradient)"
    />
  </OptimizedSVG>
))

TopographicalWave.displayName = 'TopographicalWave'

/**
 * Minimalist leaf pattern optimized for performance
 */
export const MinimalLeaf = memo(() => (
  <OptimizedSVG viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M50,90 Q30,50 50,10 Q70,50 50,90"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </OptimizedSVG>
))

MinimalLeaf.displayName = 'MinimalLeaf'

/**
 * Optimized decorative dot pattern
 */
export const DotPattern = memo(() => (
  <OptimizedSVG viewBox="0 0 100 100" className="w-full h-full">
    <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.2" />
    </pattern>
    <rect width="100" height="100" fill="url(#dots)" />
  </OptimizedSVG>
))

DotPattern.displayName = 'DotPattern'

/**
 * Simplified grain texture for backgrounds
 */
export const GrainTexture = memo(() => (
  <OptimizedSVG viewBox="0 0 200 200" className="w-full h-full opacity-5">
    <filter id="grain">
      <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise" seed="1" />
      <feColorMatrix in="noise" values="0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 1 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </OptimizedSVG>
))

GrainTexture.displayName = 'GrainTexture'
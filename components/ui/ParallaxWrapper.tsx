'use client'

import React, { ReactNode } from 'react'
import { useParallax, useIsTouchDevice } from '@/lib/hooks/useParallax'

interface ParallaxWrapperProps {
  children: ReactNode
  speed?: number
  offset?: number
  className?: string
  fallbackClassName?: string // CSS-only fallback styles
  layer?: 'foreground' | 'midground' | 'background'
  disabled?: boolean
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
  fallbackClassName = '',
  layer = 'midground',
  disabled = false
}: ParallaxWrapperProps) {
  const isTouch = useIsTouchDevice()
  const [ref, state] = useParallax({
    speed: layer === 'background' ? 0.3 : layer === 'foreground' ? 0.8 : speed,
    offset,
    disabled: disabled || isTouch // Disable on touch devices for better performance
  })

  // CSS-only fallback for touch devices
  const touchFallbackClass = isTouch ? `${fallbackClassName} parallax-fallback-${layer}` : ''

  return (
    <div
      ref={ref}
      className={`${className} ${touchFallbackClass} will-change-transform`}
      style={{
        transform: state.transform,
        opacity: state.opacity,
        transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      data-parallax-layer={layer}
    >
      {children}
    </div>
  )
}

// Specialized component for decorative shapes
interface ParallaxShapeProps {
  shape: 'circle' | 'blob' | 'wave'
  size: 'small' | 'medium' | 'large'
  color: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  speed?: number
  className?: string
}

export function ParallaxShape({
  shape,
  size,
  color,
  position,
  speed = 0.5,
  className = ''
}: ParallaxShapeProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  }

  const shapeClasses = {
    circle: 'rounded-full',
    blob: 'rounded-organic',
    wave: 'rounded-stone'
  }

  const positionStyles = {
    top: position.top,
    bottom: position.bottom,
    left: position.left,
    right: position.right
  }

  return (
    <ParallaxWrapper
      speed={speed}
      className={`absolute pointer-events-none ${className}`}
      layer={speed < 0.4 ? 'background' : speed > 0.7 ? 'foreground' : 'midground'}
    >
      <div
        className={`${sizeClasses[size]} ${shapeClasses[shape]} ${color}`}
        style={positionStyles}
        aria-hidden="true"
      />
    </ParallaxWrapper>
  )
}

// Container for multiple parallax layers
interface ParallaxSceneProps {
  children: ReactNode
  className?: string
}

export function ParallaxScene({ children, className = '' }: ParallaxSceneProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
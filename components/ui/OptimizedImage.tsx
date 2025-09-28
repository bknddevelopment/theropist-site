'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9' | 'auto'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  lazy?: boolean
  fadeIn?: boolean
}

// Generate a low-quality image placeholder (LQIP)
function generateBlurDataURL(width = 10, height = 10): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Create a gradient for placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#F5F5DC')
    gradient.addColorStop(1, '#E8E8D8')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  return canvas.toDataURL()
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  aspectRatio = 'auto',
  objectFit = 'cover',
  lazy = true,
  fadeIn = true
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imageRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    observer.observe(imageRef.current)

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [lazy])

  // Generate default blur data URL if not provided
  const defaultBlurDataURL = typeof window !== 'undefined' && !blurDataURL
    ? generateBlurDataURL()
    : blurDataURL

  // Calculate dimensions based on aspect ratio
  const getAspectRatioDimensions = () => {
    if (aspectRatio === 'auto' || (width && height)) {
      return { width, height }
    }

    const ratios = {
      '1:1': { w: 1, h: 1 },
      '4:3': { w: 4, h: 3 },
      '16:9': { w: 16, h: 9 },
      '21:9': { w: 21, h: 9 }
    }

    const ratio = ratios[aspectRatio]
    if (width) {
      return { width, height: Math.round(width * ratio.h / ratio.w) }
    }
    if (height) {
      return { width: Math.round(height * ratio.w / ratio.h), height }
    }

    // Default dimensions
    return { width: 800, height: Math.round(800 * ratio.h / ratio.w) }
  }

  const dimensions = getAspectRatioDimensions()

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Determine if we should render the image
  const shouldRender = isInView || priority

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden',
        fadeIn && 'transition-opacity duration-300',
        !isLoaded && fadeIn && 'opacity-0',
        isLoaded && fadeIn && 'opacity-100',
        className
      )}
      style={{
        aspectRatio: aspectRatio !== 'auto'
          ? aspectRatio.replace(':', ' / ')
          : dimensions.width && dimensions.height
            ? `${dimensions.width} / ${dimensions.height}`
            : undefined
      }}
    >
      {shouldRender && dimensions.width && dimensions.height && (
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          className={cn(
            'w-full h-full',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down'
          )}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-cream to-sage/10 animate-pulse" />
      )}
    </div>
  )
}

// Picture component for art direction and responsive images
interface PictureProps {
  sources: Array<{
    srcSet: string
    media?: string
    type?: string
  }>
  fallback: {
    src: string
    alt: string
  }
  className?: string
  loading?: 'lazy' | 'eager'
}

export function Picture({
  sources,
  fallback,
  className,
  loading = 'lazy'
}: PictureProps) {
  return (
    <picture className={className}>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      ))}
      <img
        src={fallback.src}
        alt={fallback.alt}
        loading={loading}
        className="w-full h-full object-cover"
      />
    </picture>
  )
}

// Hero image component with optimized loading
export function HeroImage({
  src,
  alt,
  className,
  overlay = true
}: {
  src: string
  alt: string
  className?: string
  overlay?: boolean
}) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        priority
        quality={90}
        objectFit="cover"
        fadeIn={false}
        className="absolute inset-0 w-full h-full"
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      )}
    </div>
  )
}

// Background image component with parallax support
export function BackgroundImage({
  src,
  alt,
  parallax = false,
  className,
  children
}: {
  src: string
  alt: string
  parallax?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!parallax) return

    const handleScroll = () => {
      setOffset(window.scrollY * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallax])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute inset-0 w-full"
        style={{
          transform: parallax ? `translateY(${offset}px)` : undefined,
          height: parallax ? '120%' : '100%'
        }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          priority
          objectFit="cover"
          className="w-full h-full"
          sizes="100vw"
        />
      </div>
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
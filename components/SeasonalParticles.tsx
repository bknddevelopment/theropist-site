'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/lib/contexts/ThemeContext'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  color: string
  type: 'flower' | 'leaf' | 'snowflake' | 'seed' | 'petal'
}

export function SeasonalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const { currentTheme, isTransitioning } = useTheme()

  // Draw different particle types
  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.translate(particle.x, particle.y)
    ctx.rotate(particle.rotation)

    switch (particle.type) {
      case 'petal':
        // Spring petal shape
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.ellipse(0, 0, particle.size, particle.size / 2, 0, 0, Math.PI * 2)
        ctx.fill()
        break

      case 'seed':
        // Summer seed/dandelion shape
        ctx.strokeStyle = particle.color
        ctx.fillStyle = particle.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, particle.size / 3, 0, Math.PI * 2)
        ctx.fill()
        // Draw seed wisps
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(
            Math.cos(angle) * particle.size,
            Math.sin(angle) * particle.size
          )
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(
            Math.cos(angle) * particle.size,
            Math.sin(angle) * particle.size,
            2,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
        break

      case 'leaf':
        // Autumn leaf shape
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.moveTo(0, -particle.size)
        ctx.quadraticCurveTo(
          particle.size / 2,
          -particle.size / 2,
          particle.size / 2,
          0
        )
        ctx.quadraticCurveTo(
          particle.size / 2,
          particle.size / 2,
          0,
          particle.size
        )
        ctx.quadraticCurveTo(
          -particle.size / 2,
          particle.size / 2,
          -particle.size / 2,
          0
        )
        ctx.quadraticCurveTo(
          -particle.size / 2,
          -particle.size / 2,
          0,
          -particle.size
        )
        ctx.fill()
        break

      case 'snowflake':
        // Winter snowflake shape
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 1.5
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          ctx.beginPath()
          ctx.moveTo(0, 0)
          const x = Math.cos(angle) * particle.size
          const y = Math.sin(angle) * particle.size
          ctx.lineTo(x, y)
          // Add branches
          ctx.moveTo(x * 0.6, y * 0.6)
          ctx.lineTo(x * 0.6 + Math.cos(angle + Math.PI / 6) * particle.size * 0.3,
                    y * 0.6 + Math.sin(angle + Math.PI / 6) * particle.size * 0.3)
          ctx.moveTo(x * 0.6, y * 0.6)
          ctx.lineTo(x * 0.6 + Math.cos(angle - Math.PI / 6) * particle.size * 0.3,
                    y * 0.6 + Math.sin(angle - Math.PI / 6) * particle.size * 0.3)
          ctx.stroke()
        }
        break

      case 'flower':
      default:
        // Default flower shape
        ctx.fillStyle = particle.color
        const petalCount = 5
        for (let i = 0; i < petalCount; i++) {
          const angle = (i * Math.PI * 2) / petalCount
          ctx.beginPath()
          ctx.ellipse(
            Math.cos(angle) * particle.size * 0.5,
            Math.sin(angle) * particle.size * 0.5,
            particle.size * 0.4,
            particle.size * 0.2,
            angle,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
        // Center
        ctx.fillStyle = particle.color + '88'
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 0.2, 0, Math.PI * 2)
        ctx.fill()
        break
    }

    ctx.restore()
  }, [])

  // Initialize particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const count = currentTheme.decorations.particles.density
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() *
        (currentTheme.decorations.particles.size.max - currentTheme.decorations.particles.size.min) +
        currentTheme.decorations.particles.size.min

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * currentTheme.decorations.particles.speed,
        speedY: Math.random() * currentTheme.decorations.particles.speed + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.3,
        color: currentTheme.decorations.particles.colors[
          Math.floor(Math.random() * currentTheme.decorations.particles.colors.length)
        ],
        type: (currentTheme.decorations.particles.type === 'flowers' ? 'flower' :
               currentTheme.decorations.particles.type === 'leaves' ? 'leaf' :
               currentTheme.decorations.particles.type === 'petals' ? 'petal' :
               currentTheme.decorations.particles.type === 'seeds' ? 'seed' :
               currentTheme.decorations.particles.type === 'snowflakes' ? 'snowflake' :
               'leaf') as "leaf" | "snowflake" | "seed" | "flower" | "petal"
      })
    }

    particlesRef.current = particles
  }, [currentTheme])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY
      particle.rotation += particle.rotationSpeed

      // Add some floating motion for certain types
      if (particle.type === 'petal' || particle.type === 'leaf') {
        particle.speedX += Math.sin(particle.y * 0.01) * 0.1
      }

      // Wrap around edges
      if (particle.y > canvas.height + particle.size) {
        particle.y = -particle.size
        particle.x = Math.random() * canvas.width
      }
      if (particle.x > canvas.width + particle.size) {
        particle.x = -particle.size
      } else if (particle.x < -particle.size) {
        particle.x = canvas.width + particle.size
      }

      // Fade in/out based on position
      if (particle.y < 50) {
        particle.opacity = (particle.y / 50) * 0.5 + 0.3
      } else if (particle.y > canvas.height - 50) {
        particle.opacity = ((canvas.height - particle.y) / 50) * 0.5 + 0.3
      }

      // Draw particle
      drawParticle(ctx, particle)
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [drawParticle])

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles()
  }, [initParticles])

  // Initialize and setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set initial size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    initParticles()

    // Only animate if enabled and not reduced motion
    if (currentTheme.decorations.particles.enabled &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate()
    }

    // Add resize listener
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentTheme, initParticles, animate, handleResize])

  // Don't render if particles disabled or during transition
  if (!currentTheme.decorations.particles.enabled || isTransitioning) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        opacity: 0.6,
        mixBlendMode: 'multiply'
      }}
      aria-hidden="true"
    />
  )
}
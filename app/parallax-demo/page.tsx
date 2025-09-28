'use client'

import { ParallaxWrapper, ParallaxScene } from '@/components/ui/ParallaxWrapper'
import { motion } from 'framer-motion'

export default function ParallaxDemo() {
  return (
    <div className="min-h-[200vh] bg-cream">
      {/* Hero Section with Parallax Demo */}
      <section className="relative min-h-screen overflow-hidden">
        <ParallaxScene className="absolute inset-0">
          {/* Background Layer - Slowest */}
          <ParallaxWrapper speed={0.3} layer="background" className="absolute top-20 right-20">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-sage/30 to-moss/20 blur-3xl" />
          </ParallaxWrapper>

          {/* Mid Layer */}
          <ParallaxWrapper speed={0.5} layer="midground" className="absolute bottom-40 left-20">
            <div className="w-64 h-64 rounded-organic bg-gradient-to-tr from-terracotta/40 to-golden-hour/30 blur-2xl" />
          </ParallaxWrapper>

          {/* Foreground Layer - Fastest */}
          <ParallaxWrapper speed={0.7} layer="foreground" className="absolute top-1/2 right-1/4">
            <div className="w-48 h-48 rounded-stone bg-gradient-to-bl from-forest/20 to-bark/10 blur-xl" />
          </ParallaxWrapper>
        </ParallaxScene>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl px-4"
          >
            <h1 className="font-cormorant text-6xl font-bold text-forest mb-6">
              Parallax Scrolling Demo
            </h1>
            <p className="text-xl text-forest/80 mb-8">
              Scroll down to see the parallax effect in action. Different layers move at different speeds creating a sense of depth.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-forest/60">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-sage/30" />
                <span>Background: 0.3x speed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-terracotta/40" />
                <span>Midground: 0.5x speed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-forest/20" />
                <span>Foreground: 0.7x speed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 border-2 border-forest/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-3 bg-forest/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Second Section to Show Parallax Effect */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        <ParallaxScene className="absolute inset-0">
          {/* More decorative elements with parallax */}
          <ParallaxWrapper speed={0.4} layer="background" className="absolute top-10 left-10">
            <div className="w-80 h-80 rounded-pebble bg-gradient-to-br from-golden-hour/20 to-sand/30" />
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.6} layer="midground" className="absolute bottom-20 right-20">
            <div className="w-60 h-60 rounded-organic bg-gradient-to-tl from-moss/30 to-sage/20" />
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.9} layer="foreground" className="absolute top-1/3 left-1/3">
            <div className="w-40 h-40 rounded-stone bg-gradient-to-br from-terracotta/25 to-bark/15" />
          </ParallaxWrapper>
        </ParallaxScene>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl px-4">
            <h2 className="font-cormorant text-5xl font-bold text-forest mb-6">
              Depth and Motion
            </h2>
            <p className="text-lg text-forest/80">
              The parallax effect creates a natural sense of depth as you scroll.
              Background elements move slower while foreground elements move faster,
              mimicking how we perceive depth in the real world.
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Note */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-cormorant text-3xl font-bold text-forest mb-4">
            Accessibility Features
          </h3>
          <ul className="text-left text-forest/80 space-y-2">
            <li>✓ Respects prefers-reduced-motion settings</li>
            <li>✓ Disabled on touch devices for better performance</li>
            <li>✓ CSS-only fallbacks for browsers without JavaScript</li>
            <li>✓ Smooth 60fps performance using Intersection Observer</li>
            <li>✓ Decorative elements marked with aria-hidden</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
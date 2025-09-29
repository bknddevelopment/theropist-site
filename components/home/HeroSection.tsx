'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Leaf, Sun } from 'lucide-react'
import { ParallaxWrapper, ParallaxShape, ParallaxScene } from '@/components/ui/ParallaxWrapper'
import { getPlaceholderDataUrl } from '@/lib/utils/placeholder-images'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Organic Background with Golden Hour Orb and Topographical Patterns */}
      <ParallaxScene className="absolute inset-0 z-0">
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest/80 via-sage/60 to-terracotta/40 z-10" />

        {/* Warm Golden Hour Orb with parallax - slowest layer */}
        <ParallaxWrapper speed={0.3} layer="background" className="absolute top-20 right-20 z-5">
          <div className="w-96 h-96 rounded-full bg-gradient-radial from-golden-hour/30 via-terracotta/20 to-transparent blur-3xl animate-breathing" />
        </ParallaxWrapper>

        {/* Organic Blob Shapes with mid-layer parallax */}
        <ParallaxWrapper speed={0.5} layer="midground" className="absolute top-0 left-0 w-full h-full z-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212, 165, 116, 0.2)" />
                <stop offset="50%" stopColor="rgba(184, 122, 92, 0.15)" />
                <stop offset="100%" stopColor="rgba(139, 149, 116, 0.1)" />
              </linearGradient>
            </defs>
            {/* Topographical wave patterns */}
            <path
              d="M0,400 Q300,350 600,400 T1200,350 L1200,800 L0,800 Z"
              fill="url(#goldenGradient)"
              className="animate-gentle-sway"
            />
            <path
              d="M0,500 Q400,450 800,500 T1200,450 L1200,800 L0,800 Z"
              fill="rgba(107, 124, 89, 0.08)"
              style={{ animationDelay: '2s' }}
              className="animate-gentle-sway"
            />
          </svg>
        </ParallaxWrapper>

        <Image
          src={getPlaceholderDataUrl(1920, 1080)}
          alt="Serene Sonoma landscape"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </ParallaxScene>

      {/* Organic Decorative Elements with parallax layers */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true" role="presentation">
        {/* Floating organic shapes with different parallax speeds */}
        <ParallaxWrapper speed={0.7} layer="foreground" className="absolute top-32 left-20">
          <div className="w-24 h-24 rounded-pebble bg-gradient-to-br from-sage/10 to-moss/10 animate-breathing" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.5} layer="midground" className="absolute bottom-40 right-32">
          <div className="w-32 h-32 rounded-stone bg-gradient-to-tr from-terracotta/10 to-golden-hour/10 animate-gentle-sway" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.9} layer="foreground" className="absolute top-1/2 left-10">
          <div className="w-20 h-20 rounded-organic bg-gradient-to-bl from-cream/10 to-sand/10 animate-breathing" style={{ animationDelay: '3s' }} />
        </ParallaxWrapper>

        {/* Enhanced Calla Lily illustration with parallax */}
        <ParallaxWrapper speed={0.6} layer="midground" className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <svg className="w-64 h-64 opacity-20" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D4A574" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M100,180 Q80,100 100,50 Q120,100 100,180"
              stroke="url(#earthGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-gentle-sway"
            />
            <circle cx="100" cy="50" r="20" fill="url(#earthGradient)" className="animate-breathing" />
          </svg>
        </ParallaxWrapper>

        {/* Original leaf and sun elements with parallax */}
        <ParallaxWrapper speed={0.8} layer="foreground" className="absolute top-20 left-10 opacity-[0.2]">
          <Leaf className="w-24 h-24 text-cream motion-safe:animate-gentle-sway" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.4} layer="background" className="absolute bottom-20 right-10 opacity-[0.2]">
          <Sun className="w-32 h-32 text-golden-hour motion-safe:animate-breathing" />
        </ParallaxWrapper>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            style={{ opacity: 1 }}
          >
            <span className="inline-flex items-center space-x-2 bg-cream/20 backdrop-blur-sm text-cream px-6 py-3 rounded-organic text-earth-sm font-medium shadow-organic">
              <Heart className="w-4 h-4 text-terracotta animate-breathing" />
              <span>Welcome to Your Healing Journey</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cormorant text-earth-5xl md:text-earth-6xl lg:text-earth-7xl text-cream font-bold mb-6 leading-tight drop-shadow-lg"
            style={{ opacity: 1 }}
          >
            Transform Your Life at
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-golden-hour to-terracotta mt-2">Sonoma Wellness Retreat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-earth-xl md:text-earth-2xl text-cream mb-8 max-w-2xl mx-auto drop-shadow"
            style={{ opacity: 1 }}
          >
            Experience compassionate therapy and holistic healing in the serene beauty of Sonoma County. Your path to wellness begins here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            style={{ opacity: 1 }}
          >
            <Link
              href="/book"
              className="group relative bg-clay-gradient text-cream px-8 py-4 rounded-stone font-semibold text-earth-lg transition-all duration-300 flex items-center space-x-2 shadow-warm-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-terracotta/50 focus:ring-offset-2 focus:ring-offset-cream min-h-[44px] min-w-[44px] animate-organic-grow animate-ripple pressed-earth"
              aria-label="Book your therapy session"
            >
              <span>Book Your Session</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group relative bg-forest/20 backdrop-blur-sm text-cream border-2 border-cream/50 px-8 py-4 rounded-organic font-semibold text-earth-lg hover:bg-forest/30 focus:bg-forest/30 transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-cream/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] min-w-[44px] animate-organic-grow"
              aria-label="Explore therapy services"
            >
              <span>Explore Services</span>
            </Link>
          </motion.div>

          {/* Trust Badges with organic shapes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-cream/80"
            style={{ opacity: 1 }}
          >
            <div className="flex items-center space-x-2 bg-cream/10 backdrop-blur-sm px-4 py-2 rounded-organic-sm">
              <span className="text-earth-3xl">★★★★★</span>
              <span className="text-earth-sm">5.0 Rating</span>
            </div>
            <div className="text-earth-sm bg-cream/10 backdrop-blur-sm px-4 py-2 rounded-organic-sm">
              <span className="font-semibold">500+</span> Lives Transformed
            </div>
            <div className="text-earth-sm bg-cream/10 backdrop-blur-sm px-4 py-2 rounded-organic-sm">
              <span className="font-semibold">15+</span> Years of Excellence
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Decorative and screen reader friendly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-hidden="true"
        role="presentation"
        style={{ opacity: 1 }}
      >
        <div className="w-8 h-12 border-2 border-cream/50 rounded-organic flex justify-center animate-breathing">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-3 bg-gradient-to-b from-cream to-terracotta rounded-full mt-2 motion-reduce:animate-none"
          />
        </div>
      </motion.div>

      {/* Flowing River-like Divider with parallax */}
      <ParallaxWrapper speed={0.3} layer="background" className="absolute bottom-0 left-0 right-0 h-32 z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 Q300,30 600,60 T1200,30 L1200,120 L0,120 Z"
            fill="rgba(250, 246, 240, 0.1)"
            className="animate-gentle-sway"
          />
        </svg>
      </ParallaxWrapper>
    </section>
  )
}

export default HeroSection
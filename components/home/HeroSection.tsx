'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Leaf, Sun } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/80 via-sage/60 to-terracotta/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
          alt="Serene Sonoma landscape"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Leaf className="w-24 h-24 text-cream animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Sun className="w-32 h-32 text-cream animate-spin-slow" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center space-x-2 bg-cream/20 backdrop-blur-sm text-cream px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 text-terracotta" />
              <span>Welcome to Your Healing Journey</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl text-cream font-bold mb-6 leading-tight"
          >
            Transform Your Life at
            <span className="block text-terracotta mt-2">Sonoma Wellness Retreat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto"
          >
            Experience compassionate therapy and holistic healing in the serene beauty of Sonoma County. Your path to wellness begins here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href="/book"
              className="group bg-terracotta text-cream px-8 py-4 rounded-full font-semibold text-lg hover:bg-terracotta/90 transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl"
            >
              <span>Book Your Session</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group bg-cream/20 backdrop-blur-sm text-cream border-2 border-cream/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream/30 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Explore Services</span>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-cream/80"
          >
            <div className="flex items-center space-x-2">
              <span className="text-3xl">★★★★★</span>
              <span className="text-sm">5.0 Rating</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">500+</span> Lives Transformed
            </div>
            <div className="text-sm">
              <span className="font-semibold">15+</span> Years of Excellence
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-8 h-12 border-2 border-cream/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-cream rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
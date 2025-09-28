'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-forest via-bark to-forest text-cream relative overflow-hidden texture-bark">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-cormorant text-earth-4xl md:text-earth-5xl font-bold mb-6">
            Begin Your Journey to Wellness Today
          </h2>
          <p className="text-earth-xl text-cream/90 mb-8">
            Take the first step towards healing and transformation. We&apos;re here to support you every step of the way.
          </p>

          {/* CTA Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-cream/10 backdrop-blur-sm rounded-organic p-6 text-left group hover:bg-cream/20 focus-within:bg-cream/20 transition-all duration-300 focus-within:ring-4 focus-within:ring-cream/30 min-h-[120px] shadow-organic animate-organic-grow texture-parchment"
            >
              <div className="w-12 h-12 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center mb-4 animate-breathing">
                <Calendar className="w-6 h-6 text-cream" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-earth-lg mb-2">Book a Session</h3>
              <p className="text-cream/80 text-earth-sm mb-4">
                Schedule your first appointment online in just a few clicks
              </p>
              <Link
                href="/book"
                className="inline-flex items-center space-x-2 text-terracotta-light font-medium group-hover:translate-x-2 motion-safe:transition-transform focus:outline-none focus:underline focus:decoration-2 min-h-[44px] py-2"
                aria-label="Book a therapy session now"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-cream/10 backdrop-blur-sm rounded-organic p-6 text-left group hover:bg-cream/20 focus-within:bg-cream/20 transition-all duration-300 focus-within:ring-4 focus-within:ring-cream/30 min-h-[120px] shadow-organic animate-organic-grow texture-parchment"
            >
              <div className="w-12 h-12 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center mb-4 animate-breathing" style={{ animationDelay: '1s' }}>
                <Phone className="w-6 h-6 text-cream" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-earth-lg mb-2">Call Us</h3>
              <p className="text-cream/80 text-earth-sm mb-4">
                Speak with our care team to discuss your needs
              </p>
              <a
                href="tel:+17075551234"
                className="inline-flex items-center space-x-2 text-terracotta-light font-medium group-hover:translate-x-2 motion-safe:transition-transform focus:outline-none focus:underline focus:decoration-2 min-h-[44px] py-2"
                aria-label="Call us at (707) 555-1234"
              >
                <span>(707) 555-1234</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-cream/10 backdrop-blur-sm rounded-organic p-6 text-left group hover:bg-cream/20 focus-within:bg-cream/20 transition-all duration-300 focus-within:ring-4 focus-within:ring-cream/30 min-h-[120px] shadow-organic animate-organic-grow texture-parchment"
            >
              <div className="w-12 h-12 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center mb-4 animate-breathing" style={{ animationDelay: '2s' }}>
                <MessageCircle className="w-6 h-6 text-cream" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-earth-lg mb-2">Free Consultation</h3>
              <p className="text-cream/80 text-earth-sm mb-4">
                Get a complimentary 15-minute phone consultation
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-terracotta-light font-medium group-hover:translate-x-2 motion-safe:transition-transform focus:outline-none focus:underline focus:decoration-2 min-h-[44px] py-2"
                aria-label="Request a free 15-minute consultation"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Trust Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cream/10 to-sand/10 backdrop-blur-sm px-6 py-3 rounded-stone shadow-warm-md animate-breathing"
          >
            <span className="text-sm">
              All consultations are confidential and obligation-free
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Organic background decorations with parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Flowing shapes with different parallax speeds */}
        <ParallaxWrapper speed={0.3} layer="background" className="absolute top-0 left-0">
          <div className="w-96 h-96 rounded-pebble bg-gradient-to-br from-sage/10 to-transparent blur-3xl animate-gentle-sway" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.5} layer="midground" className="absolute bottom-0 right-0">
          <div className="w-80 h-80 rounded-stone bg-gradient-to-tl from-moss/10 to-transparent blur-3xl animate-breathing" style={{ animationDelay: '2s' }} />
        </ParallaxWrapper>

        {/* Topographic pattern overlay with subtle parallax */}
        <ParallaxWrapper speed={0.2} layer="background" className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full opacity-5" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="topographic" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topographic)" />
          </svg>
        </ParallaxWrapper>
      </div>
    </section>
  )
}

export default CTASection
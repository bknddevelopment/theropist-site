'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Heart } from 'lucide-react'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import { getPlaceholderDataUrl } from '@/lib/utils/placeholder-images'

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white texture-grain relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center space-x-2 mb-6 bg-sage/10 px-4 py-2 rounded-organic-sm">
              <Leaf className="w-6 h-6 text-sage animate-gentle-sway" />
              <span className="text-sage font-semibold">About Our Practice</span>
            </div>
            
            <h2 className="font-cormorant text-earth-4xl md:text-earth-5xl text-forest font-bold mb-6">
              Where Healing Meets the Beauty of Sonoma
            </h2>
            
            <div className="space-y-4 text-forest/80 mb-8">
              <p className="text-earth-lg">
                Nestled in the heart of Sonoma County, our wellness retreat offers a sanctuary for healing and transformation. We combine evidence-based therapeutic practices with the natural healing power of our serene environment.
              </p>
              <p>
                Our team of experienced therapists and wellness practitioners are dedicated to providing compassionate, personalized care that addresses your unique needs. Whether you&apos;re seeking individual therapy, couples counseling, or a transformative retreat experience, we&apos;re here to support your journey.
              </p>
              <p>
                We believe in treating the whole person—mind, body, and spirit—using an integrative approach that honors your individual path to wellness. Our practice is built on the principles of respect, confidentiality, and genuine care for every person who walks through our doors.
              </p>
            </div>

            {/* Key Values with organic shapes */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3 bg-cream/50 p-3 rounded-organic-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-terracotta to-golden-hour rounded-pebble mt-1 animate-breathing" />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Compassionate Care</h4>
                  <p className="text-earth-sm text-forest/70">Non-judgmental, empathetic support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-cream/50 p-3 rounded-organic-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-terracotta to-golden-hour rounded-pebble mt-1 animate-breathing" style={{ animationDelay: '1s' }} />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Evidence-Based</h4>
                  <p className="text-earth-sm text-forest/70">Proven therapeutic methodologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-cream/50 p-3 rounded-organic-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-terracotta to-golden-hour rounded-pebble mt-1 animate-breathing" style={{ animationDelay: '2s' }} />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Holistic Approach</h4>
                  <p className="text-earth-sm text-forest/70">Mind, body, and spirit wellness</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-cream/50 p-3 rounded-organic-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-terracotta to-golden-hour rounded-pebble mt-1 animate-breathing" style={{ animationDelay: '3s' }} />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Safe Space</h4>
                  <p className="text-earth-sm text-forest/70">Confidential and secure environment</p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 bg-clay-gradient text-cream px-6 py-3 rounded-stone font-semibold transition-all duration-300 shadow-warm-lg hover:shadow-warm-xl group animate-organic-grow animate-ripple pressed-earth"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Main Image with organic shape */}
              <div className="relative h-[500px] rounded-organic-lg overflow-hidden shadow-organic">
                <Image
                  src={getPlaceholderDataUrl(500, 500)}
                  alt="Therapy session room"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              {/* Floating Card with subtle parallax */}
              <ParallaxWrapper speed={0.7} layer="foreground" className="absolute -bottom-8 -left-8">
                <div className="bg-white p-6 rounded-organic shadow-organic max-w-xs animate-breathing texture-linen">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-terracotta/20 to-golden-hour/20 rounded-pebble flex items-center justify-center animate-breathing">
                      <Heart className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-playfair text-2xl font-bold text-forest">98%</p>
                      <p className="text-earth-sm text-forest/70">Client Satisfaction</p>
                    </div>
                  </div>
                  <p className="text-xs text-forest/60">
                    Based on over 500 client reviews and testimonials
                  </p>
                </div>
              </ParallaxWrapper>

              {/* Decorative Organic Elements with parallax */}
              <ParallaxWrapper speed={0.6} layer="midground" className="absolute -top-4 -right-4">
                <div className="w-24 h-24 bg-gradient-to-br from-sage/30 to-moss/20 rounded-pebble blur-2xl animate-gentle-sway" />
              </ParallaxWrapper>
              <ParallaxWrapper speed={0.4} layer="background" className="absolute -bottom-4 -right-4">
                <div className="w-32 h-32 bg-gradient-to-tr from-terracotta/30 to-golden-hour/20 rounded-stone blur-2xl animate-breathing" />
              </ParallaxWrapper>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background organic shapes with parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ParallaxWrapper speed={0.3} layer="background" className="absolute top-20 left-10">
          <div className="w-80 h-80 rounded-pebble bg-gradient-to-br from-sage/5 to-transparent animate-gentle-sway" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.5} layer="midground" className="absolute bottom-10 right-20">
          <div className="w-96 h-96 rounded-stone bg-gradient-to-tl from-terracotta/5 to-transparent animate-breathing" style={{ animationDelay: '3s' }} />
        </ParallaxWrapper>

        {/* River-like divider with parallax */}
        <ParallaxWrapper speed={0.2} layer="background" className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path
              d="M0,50 Q300,20 600,50 T1200,20 L1200,100 L0,100 Z"
              fill="rgba(232, 213, 196, 0.1)"
              className="animate-gentle-sway"
            />
          </svg>
        </ParallaxWrapper>
      </div>
    </section>
  )
}

export default AboutPreview
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Heart } from 'lucide-react'

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
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
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="w-6 h-6 text-sage" />
              <span className="text-sage font-semibold">About Our Practice</span>
            </div>
            
            <h2 className="font-playfair text-4xl md:text-5xl text-forest font-bold mb-6">
              Where Healing Meets the Beauty of Sonoma
            </h2>
            
            <div className="space-y-4 text-forest/80 mb-8">
              <p className="text-lg">
                Nestled in the heart of Sonoma County, our wellness retreat offers a sanctuary for healing and transformation. We combine evidence-based therapeutic practices with the natural healing power of our serene environment.
              </p>
              <p>
                Our team of experienced therapists and wellness practitioners are dedicated to providing compassionate, personalized care that addresses your unique needs. Whether you&apos;re seeking individual therapy, couples counseling, or a transformative retreat experience, we&apos;re here to support your journey.
              </p>
              <p>
                We believe in treating the whole person—mind, body, and spirit—using an integrative approach that honors your individual path to wellness. Our practice is built on the principles of respect, confidentiality, and genuine care for every person who walks through our doors.
              </p>
            </div>

            {/* Key Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-terracotta rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Compassionate Care</h4>
                  <p className="text-sm text-forest/70">Non-judgmental, empathetic support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-terracotta rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Evidence-Based</h4>
                  <p className="text-sm text-forest/70">Proven therapeutic methodologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-terracotta rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Holistic Approach</h4>
                  <p className="text-sm text-forest/70">Mind, body, and spirit wellness</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-terracotta rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-forest mb-1">Safe Space</h4>
                  <p className="text-sm text-forest/70">Confidential and secure environment</p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 bg-terracotta text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest transition-colors group"
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
              {/* Main Image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2"
                  alt="Therapy session room"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <p className="font-playfair text-2xl font-bold text-forest">98%</p>
                    <p className="text-sm text-forest/70">Client Satisfaction</p>
                  </div>
                </div>
                <p className="text-xs text-forest/60">
                  Based on over 500 client reviews and testimonials
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-terracotta/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
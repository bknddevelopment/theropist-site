'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Phone, MessageCircle, ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-20 bg-forest text-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Begin Your Journey to Wellness Today
          </h2>
          <p className="text-xl text-cream/90 mb-8">
            Take the first step towards healing and transformation. We&apos;re here to support you every step of the way.
          </p>

          {/* CTA Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-cream/10 backdrop-blur-sm rounded-xl p-6 text-left group hover:bg-cream/20 transition-colors"
            >
              <Calendar className="w-10 h-10 text-terracotta mb-4" />
              <h3 className="font-semibold text-lg mb-2">Book a Session</h3>
              <p className="text-cream/80 text-sm mb-4">
                Schedule your first appointment online in just a few clicks
              </p>
              <Link
                href="/book"
                className="inline-flex items-center space-x-2 text-terracotta font-medium group-hover:translate-x-2 transition-transform"
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
              className="bg-cream/10 backdrop-blur-sm rounded-xl p-6 text-left group hover:bg-cream/20 transition-colors"
            >
              <Phone className="w-10 h-10 text-terracotta mb-4" />
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-cream/80 text-sm mb-4">
                Speak with our care team to discuss your needs
              </p>
              <a
                href="tel:+17075551234"
                className="inline-flex items-center space-x-2 text-terracotta font-medium group-hover:translate-x-2 transition-transform"
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
              className="bg-cream/10 backdrop-blur-sm rounded-xl p-6 text-left group hover:bg-cream/20 transition-colors"
            >
              <MessageCircle className="w-10 h-10 text-terracotta mb-4" />
              <h3 className="font-semibold text-lg mb-2">Free Consultation</h3>
              <p className="text-cream/80 text-sm mb-4">
                Get a complimentary 15-minute phone consultation
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-terracotta font-medium group-hover:translate-x-2 transition-transform"
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
            className="inline-flex items-center justify-center space-x-2 bg-cream/10 backdrop-blur-sm px-6 py-3 rounded-full"
          >
            <span className="text-sm">
              All consultations are confidential and obligation-free
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
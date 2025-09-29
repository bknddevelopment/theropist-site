'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'
import { getPlaceholderDataUrl } from '@/lib/utils/placeholder-images'

const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Individual Therapy Client',
    content: 'The therapy I received here truly changed my life. The combination of professional expertise and genuine compassion created a safe space for healing I never thought possible.',
    rating: 5,
    image: getPlaceholderDataUrl(200, 200),
  },
  {
    id: '2',
    name: 'Michael & Jennifer K.',
    role: 'Couples Counseling',
    content: 'Our relationship was transformed through the guidance we received. We learned to communicate better and rediscovered the love that brought us together.',
    rating: 5,
    image: getPlaceholderDataUrl(200, 200),
  },
  {
    id: '3',
    name: 'David L.',
    role: 'Retreat Participant',
    content: 'The wellness retreat was a profound experience. The beautiful setting, expert facilitators, and thoughtful program design created the perfect environment for personal growth.',
    rating: 5,
    image: getPlaceholderDataUrl(200, 200),
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sage/10 via-cream to-terracotta/10 texture-paper relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <h2 className="font-cormorant text-earth-4xl md:text-earth-5xl text-forest font-bold mb-4">
            Voices of Transformation
          </h2>
          <p className="text-earth-xl text-forest/80 max-w-2xl mx-auto">
            Hear from those who have walked the path of healing with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-organic p-8 shadow-organic relative texture-linen animate-organic-grow"
              style={{ opacity: 1 }}
            >
              {/* Quote Icon with organic background */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-pebble bg-gradient-to-br from-terracotta/10 to-golden-hour/10 flex items-center justify-center animate-breathing">
                <Quote className="w-6 h-6 text-terracotta/50" />
              </div>

              {/* Rating with organic styling */}
              <div className="flex items-center mb-4 space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-golden-hour text-golden-hour animate-breathing"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-forest/80 mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-pebble overflow-hidden shadow-warm-sm">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-forest">{testimonial.name}</p>
                  <p className="text-earth-sm text-forest/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-white rounded-organic shadow-organic texture-linen"
        >
          <p className="text-lg text-forest/80 mb-4">
            Join hundreds of individuals and couples who have found healing, growth, and transformation at Sonoma Wellness Retreat.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">500+</p>
              <p className="text-sm text-forest/60">Happy Clients</p>
            </div>
            <svg className="w-px h-12" viewBox="0 0 2 48">
              <path d="M1,0 Q1,12 1,24 T1,48" stroke="rgba(139, 149, 116, 0.3)" strokeWidth="1" fill="none" />
            </svg>
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">98%</p>
              <p className="text-sm text-forest/60">Satisfaction Rate</p>
            </div>
            <svg className="w-px h-12" viewBox="0 0 2 48">
              <path d="M1,0 Q1,12 1,24 T1,48" stroke="rgba(139, 149, 116, 0.3)" strokeWidth="1" fill="none" />
            </svg>
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">15+</p>
              <p className="text-sm text-forest/60">Years of Service</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Organic background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating organic elements */}
        <div className="absolute top-10 left-20 w-64 h-64 rounded-pebble bg-gradient-to-br from-sage/5 to-transparent animate-gentle-sway" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-stone bg-gradient-to-tl from-terracotta/5 to-transparent animate-breathing" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-organic bg-gradient-to-br from-golden-hour/5 to-transparent animate-breathing" style={{ animationDelay: '4s' }} />

        {/* Leaf decorations */}
        <div className="absolute top-20 right-32 opacity-10 animate-leaf-fall">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M20,5 Q10,15 20,35 Q30,15 20,5" fill="currentColor" className="text-sage" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
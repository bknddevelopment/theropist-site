'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Individual Therapy Client',
    content: 'The therapy I received here truly changed my life. The combination of professional expertise and genuine compassion created a safe space for healing I never thought possible.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    name: 'Michael & Jennifer K.',
    role: 'Couples Counseling',
    content: 'Our relationship was transformed through the guidance we received. We learned to communicate better and rediscovered the love that brought us together.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999',
  },
  {
    id: '3',
    name: 'David L.',
    role: 'Retreat Participant',
    content: 'The wellness retreat was a profound experience. The beautiful setting, expert facilitators, and thoughtful program design created the perfect environment for personal growth.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sage/10 via-cream to-terracotta/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-forest font-bold mb-4">
            Voices of Transformation
          </h2>
          <p className="text-xl text-forest/80 max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl p-8 shadow-xl relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-terracotta/20" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-terracotta text-terracotta" />
                ))}
              </div>

              {/* Content */}
              <p className="text-forest/80 mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-forest">{testimonial.name}</p>
                  <p className="text-sm text-forest/60">{testimonial.role}</p>
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
          className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg"
        >
          <p className="text-lg text-forest/80 mb-4">
            Join hundreds of individuals and couples who have found healing, growth, and transformation at Sonoma Wellness Retreat.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">500+</p>
              <p className="text-sm text-forest/60">Happy Clients</p>
            </div>
            <div className="w-px h-12 bg-sage/30" />
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">98%</p>
              <p className="text-sm text-forest/60">Satisfaction Rate</p>
            </div>
            <div className="w-px h-12 bg-sage/30" />
            <div>
              <p className="font-playfair text-3xl font-bold text-terracotta">15+</p>
              <p className="text-sm text-forest/60">Years of Service</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
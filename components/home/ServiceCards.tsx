'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { User, Users, UserCheck, Sparkles, Clock, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'individual-therapy',
    title: 'Individual Therapy',
    description: 'Personalized one-on-one sessions tailored to your unique healing journey and personal growth goals.',
    icon: User,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    features: ['60-90 minute sessions', 'Evidence-based approaches', 'Flexible scheduling'],
    price: 'From $180/session',
    color: 'sage',
  },
  {
    id: 'couples-counseling',
    title: 'Couples Counseling',
    description: 'Strengthen your relationship through compassionate guidance and proven therapeutic techniques.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
    features: ['90 minute sessions', 'Communication skills', 'Conflict resolution'],
    price: 'From $250/session',
    color: 'terracotta',
  },
  {
    id: 'group-therapy',
    title: 'Group Therapy',
    description: 'Connect with others on similar journeys in a supportive, professionally facilitated environment.',
    icon: UserCheck,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    features: ['8-10 participants', 'Weekly meetings', 'Themed groups'],
    price: 'From $80/session',
    color: 'forest',
  },
  {
    id: 'wellness-retreat',
    title: 'Wellness Retreats',
    description: 'Immersive healing experiences combining therapy, mindfulness, and the beauty of Sonoma County.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e',
    features: ['3-5 day programs', 'All-inclusive', 'Small groups'],
    price: 'From $2,500',
    color: 'sage',
  },
]

const ServiceCards = () => {
  return (
    <section className="py-20 bg-cream">
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
            Our Healing Services
          </h2>
          <p className="text-xl text-forest/80 max-w-2xl mx-auto">
            Choose the path that resonates with your journey. Each service is designed to support your unique needs and goals.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm p-2 rounded-full">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-2xl text-forest font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-forest/70 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-forest/60">
                        <span className="w-1.5 h-1.5 bg-terracotta rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-sage/20">
                    <span className="text-lg font-semibold text-terracotta">
                      {service.price}
                    </span>
                    <Link
                      href={`/services/${service.id}`}
                      className="group/btn flex items-center space-x-1 text-forest hover:text-terracotta transition-colors"
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 bg-forest text-cream px-8 py-4 rounded-full font-semibold hover:bg-sage transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceCards
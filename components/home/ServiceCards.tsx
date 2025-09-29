'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { User, Users, UserCheck, Sparkles, Clock, ArrowRight } from 'lucide-react'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import { getPlaceholderDataUrl } from '@/lib/utils/placeholder-images'

const services = [
  {
    id: 'individual-therapy',
    title: 'Individual Therapy',
    description: 'Personalized one-on-one sessions tailored to your unique healing journey and personal growth goals.',
    icon: User,
    image: getPlaceholderDataUrl(400, 300),
    features: ['60-90 minute sessions', 'Evidence-based approaches', 'Flexible scheduling'],
    price: 'From $180/session',
    color: 'sage',
  },
  {
    id: 'couples-counseling',
    title: 'Couples Counseling',
    description: 'Strengthen your relationship through compassionate guidance and proven therapeutic techniques.',
    icon: Users,
    image: getPlaceholderDataUrl(400, 300),
    features: ['90 minute sessions', 'Communication skills', 'Conflict resolution'],
    price: 'From $250/session',
    color: 'terracotta',
  },
  {
    id: 'group-therapy',
    title: 'Group Therapy',
    description: 'Connect with others on similar journeys in a supportive, professionally facilitated environment.',
    icon: UserCheck,
    image: getPlaceholderDataUrl(400, 300),
    features: ['8-10 participants', 'Weekly meetings', 'Themed groups'],
    price: 'From $80/session',
    color: 'forest',
  },
  {
    id: 'wellness-retreat',
    title: 'Wellness Retreats',
    description: 'Immersive healing experiences combining therapy, mindfulness, and the beauty of Sonoma County.',
    icon: Sparkles,
    image: getPlaceholderDataUrl(400, 300),
    features: ['3-5 day programs', 'All-inclusive', 'Small groups'],
    price: 'From $2,500',
    color: 'sage',
  },
]

const ServiceCards = () => {
  return (
    <section className="py-20 bg-cream texture-paper relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cormorant text-earth-4xl md:text-earth-5xl text-forest font-bold mb-4">
            Our Healing Services
          </h2>
          <p className="text-earth-xl text-forest/80 max-w-2xl mx-auto">
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
                whileFocus={{ scale: 1.02 }}
                className="group relative bg-white rounded-organic overflow-hidden shadow-organic hover:shadow-warm-xl transition-all duration-300 motion-safe:transition-all focus-within:ring-4 focus-within:ring-terracotta/30 animate-organic-grow texture-linen"
              >
                {/* Image with subtle parallax on hover */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 will-change-transform transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover motion-reduce:transition-none"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                  <ParallaxWrapper speed={0.8} layer="foreground" className="absolute top-4 left-4" disabled={index > 1}>
                    <div className="bg-gradient-to-br from-forest/90 to-bark/80 backdrop-blur-sm p-3 rounded-pebble shadow-warm-md animate-breathing" aria-hidden="true">
                      <Icon className="w-6 h-6 text-cream" />
                    </div>
                  </ParallaxWrapper>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-cormorant text-earth-2xl text-forest font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-forest/70 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-earth-sm text-forest/60">
                        <span className="w-2 h-2 bg-gradient-to-r from-terracotta to-golden-hour rounded-organic mr-2 animate-breathing" style={{ animationDelay: `${idx * 0.2}s` }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  {/* Organic divider */}
                  <div className="mt-6 pt-4 relative">
                    <svg className="absolute top-0 left-0 w-full h-1" viewBox="0 0 200 4" preserveAspectRatio="none">
                      <path d="M0,2 Q50,0 100,2 T200,1" stroke="rgba(139, 149, 116, 0.2)" strokeWidth="1" fill="none" />
                    </svg>
                    <div className="flex items-center justify-between">
                    <span className="text-earth-lg font-semibold text-terracotta">
                      {service.price}
                    </span>
                    <Link
                      href={`/services/${service.id}`}
                      className="group/btn flex items-center space-x-1 text-forest hover:text-terracotta-dark focus:text-terracotta-dark transition-colors focus:outline-none focus:underline focus:decoration-2 min-h-[44px] min-w-[44px] py-2"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <span className="text-earth-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA with organic shape */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 bg-clay-gradient text-cream px-8 py-4 rounded-stone font-semibold transition-all duration-300 shadow-warm-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-terracotta/50 focus:ring-offset-2 focus:ring-offset-cream min-h-[44px] animate-organic-grow animate-ripple pressed-earth"
            aria-label="View all therapy services"
          >
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative organic shapes with parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ParallaxWrapper speed={0.3} layer="background" className="absolute top-10 right-20">
          <div className="w-64 h-64 rounded-pebble bg-gradient-to-br from-sage/5 to-moss/5 animate-gentle-sway" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.5} layer="midground" className="absolute bottom-20 left-10">
          <div className="w-48 h-48 rounded-stone bg-gradient-to-tr from-terracotta/5 to-golden-hour/5 animate-breathing" style={{ animationDelay: '2s' }} />
        </ParallaxWrapper>
      </div>
    </section>
  )
}

export default ServiceCards
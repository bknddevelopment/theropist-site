'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Heart, Users, Star, Clock } from 'lucide-react'

const indicators = [
  {
    icon: Shield,
    title: 'Licensed & Certified',
    description: 'All therapists are state-licensed and board-certified professionals',
  },
  {
    icon: Award,
    title: '15+ Years Excellence',
    description: 'Trusted by the Sonoma community for over a decade and a half',
  },
  {
    icon: Heart,
    title: '500+ Lives Changed',
    description: 'Helping individuals and couples transform their lives',
  },
  {
    icon: Users,
    title: 'Evidence-Based Care',
    description: 'Using proven therapeutic techniques and methodologies',
  },
  {
    icon: Star,
    title: '5.0 Star Rating',
    description: 'Consistently rated excellent by our clients',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Emergency support available for existing clients',
  },
]

const TrustIndicators = () => {
  return (
    <section className="py-16 bg-sage/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cream rounded-full mb-4 mx-auto">
                  <Icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="font-semibold text-forest mb-2">{indicator.title}</h3>
                <p className="text-sm text-forest/70">{indicator.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustIndicators
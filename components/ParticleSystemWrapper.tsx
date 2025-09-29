'use client'

import dynamic from 'next/dynamic'

// Dynamically import ParticleSystem to prevent SSR issues
const ParticleSystem = dynamic(() => import('./ParticleSystem'), {
  ssr: false,
  loading: () => null
})

interface ParticleSystemWrapperProps {
  autoDetectSeason?: boolean
  defaultEnabled?: boolean
  defaultParticleCount?: number
  defaultPerformanceMode?: 'low' | 'medium' | 'high'
}

export default function ParticleSystemWrapper(props: ParticleSystemWrapperProps) {
  return <ParticleSystem {...props} />
}
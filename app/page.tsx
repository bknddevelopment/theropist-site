import HeroSection from '@/components/home/HeroSection'
import ServiceCards from '@/components/home/ServiceCards'
import TrustIndicators from '@/components/home/TrustIndicators'
import AboutPreview from '@/components/home/AboutPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <ServiceCards />
      <AboutPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
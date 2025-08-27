import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sonoma Wellness Retreat | Premium Therapy & Healing',
  description: 'Experience transformative therapy and wellness in the heart of Sonoma County. Individual therapy, couples counseling, and holistic healing retreats.',
  keywords: 'therapy, wellness, retreat, Sonoma County, counseling, healing, mental health',
  openGraph: {
    title: 'Sonoma Wellness Retreat',
    description: 'Transform your life at our premium wellness destination in Sonoma County',
    type: 'website',
    locale: 'en_US',
    url: 'https://sonomawellness.com',
    siteName: 'Sonoma Wellness Retreat',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-forest antialiased">
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
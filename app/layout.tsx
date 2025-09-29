import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import '@/styles/seasonal-themes.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import { ThemeLayout } from '@/components/ThemeLayout'
import { CursorWrapper } from '@/components/ui/CursorWrapper'
import ParticleSystemWrapper from '@/components/ParticleSystemWrapper'
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration'
import { generatePageSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import { AuthProvider } from '@/lib/auth/auth-context'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
})

export const metadata: Metadata = pageMetadata.home

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4A5D23' },
    { media: '(prefers-color-scheme: dark)', color: '#2A3513' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = generatePageSchema('home')

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Critical Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rosa Toral Therapy" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Schema.org Structured Data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="afterInteractive"
        />

        {/* Preload critical CSS */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
      </head>
      <body className={`min-h-screen bg-cream text-forest antialiased ${inter.className}`}>
        <AuthProvider>
          <ThemeLayout>
            <ServiceWorkerRegistration />
            <CursorWrapper />
            <PerformanceMonitor />
            <ParticleSystemWrapper
              autoDetectSeason={true}
              defaultEnabled={true}
              defaultParticleCount={25}
              defaultPerformanceMode="high"
            />
            <Navigation />
            <main className="relative" id="main-content">
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sage text-white px-4 py-2 rounded-md z-50">
                Skip to main content
              </a>
              {children}
            </main>
            <Footer />
          </ThemeLayout>
        </AuthProvider>

        {/* Web Vitals Monitoring */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('web-vitals' in window) {
                import('/lib/performance/web-vitals').then(({ initWebVitals }) => {
                  initWebVitals();
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
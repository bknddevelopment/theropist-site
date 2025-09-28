import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rosatoraltherapy.com'
const siteName = 'Rosa Toral Therapy'
const twitterHandle = '@rosatoraltherapy'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noindex?: boolean
  canonical?: string
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title = 'Licensed Therapist in Sonoma County',
    description = 'Professional therapy and counseling services specializing in anxiety, depression, trauma recovery, and relationship counseling in Sonoma County.',
    keywords = [],
    image = '/images/og-default.jpg',
    noindex = false,
    canonical,
    article
  } = config

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  // Default keywords if none provided
  const defaultKeywords = [
    'therapist near me',
    'therapy Sonoma County',
    'counseling Sonoma',
    'mental health services',
    'anxiety treatment',
    'depression therapy',
    'couples counseling',
    'EMDR therapy',
    'trauma recovery',
    'relationship therapy',
    'mindfulness therapy',
    'stress management',
    'licensed therapist California',
    'LCSW Sonoma',
    'psychotherapy'
  ]

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])].join(', ')

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: 'Rosa Toral', url: baseUrl }],
    creator: 'Rosa Toral',
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonical || baseUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || baseUrl,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${title}`,
        }
      ],
      locale: 'en_US',
      type: article ? 'article' : 'website',
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.author ? [article.author] : undefined,
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: twitterHandle,
      site: twitterHandle,
      images: [imageUrl],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
    },
    category: 'Health & Wellness',
    classification: 'Mental Health Services',
    referrer: 'origin-when-cross-origin',
    generator: 'Next.js',
    applicationName: siteName,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteName,
    },
    other: {
      'msapplication-TileColor': '#4A5D23',
      'theme-color': '#4A5D23',
      'format-detection': 'telephone=no',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': siteName,
      'mobile-web-app-capable': 'yes',
      'msapplication-tap-highlight': 'no',
      'og:locale:alternate': 'es_ES',
      'og:phone_number': '+1-707-555-0123',
      'og:email': 'contact@rosatoraltherapy.com',
      'og:latitude': '38.2919',
      'og:longitude': '-122.4580',
      'og:street-address': '123 Healing Path Lane',
      'og:locality': 'Sonoma',
      'og:region': 'CA',
      'og:postal-code': '95476',
      'og:country-name': 'United States',
      'business:contact_data:street_address': '123 Healing Path Lane',
      'business:contact_data:locality': 'Sonoma',
      'business:contact_data:region': 'CA',
      'business:contact_data:postal_code': '95476',
      'business:contact_data:country_name': 'United States',
      'business:contact_data:email': 'contact@rosatoraltherapy.com',
      'business:contact_data:phone_number': '+1-707-555-0123',
      'business:contact_data:website': baseUrl,
      'business:hours:day:1': 'monday',
      'business:hours:start:1': '09:00',
      'business:hours:end:1': '18:00',
      'business:hours:day:2': 'tuesday',
      'business:hours:start:2': '09:00',
      'business:hours:end:2': '18:00',
      'business:hours:day:3': 'wednesday',
      'business:hours:start:3': '09:00',
      'business:hours:end:3': '18:00',
      'business:hours:day:4': 'thursday',
      'business:hours:start:4': '09:00',
      'business:hours:end:4': '18:00',
      'business:hours:day:5': 'friday',
      'business:hours:start:5': '09:00',
      'business:hours:end:5': '18:00',
    }
  }

  return metadata
}

// Predefined metadata for common pages
export const pageMetadata = {
  home: generateMetadata({
    title: 'Rosa Toral Therapy - Licensed Therapist in Sonoma County',
    description: 'Transform your life with professional therapy services in Sonoma County. Specializing in anxiety, depression, trauma recovery, and relationship counseling.',
    keywords: ['therapist Sonoma County', 'mental health Sonoma', 'counseling near me'],
  }),

  about: generateMetadata({
    title: 'About Rosa Toral - Licensed Clinical Therapist',
    description: 'Learn about Rosa Toral, LCSW - a compassionate therapist with over 15 years of experience helping individuals and couples in Sonoma County.',
    keywords: ['Rosa Toral', 'LCSW Sonoma', 'about therapist'],
  }),

  services: generateMetadata({
    title: 'Therapy Services - Individual, Couples, EMDR & More',
    description: 'Comprehensive therapy services including individual counseling, couples therapy, EMDR for trauma, and mindfulness workshops in Sonoma County.',
    keywords: ['therapy services', 'EMDR therapy', 'couples counseling', 'individual therapy'],
  }),

  contact: generateMetadata({
    title: 'Contact Rosa Toral Therapy - Schedule Your Appointment',
    description: 'Contact Rosa Toral Therapy to schedule your appointment. Located in Sonoma County. Call (707) 555-0123 or book online.',
    keywords: ['contact therapist', 'schedule therapy', 'book appointment'],
  }),

  blog: generateMetadata({
    title: 'Mental Health Blog - Tips & Insights',
    description: 'Expert insights on mental health, therapy techniques, and wellness tips from Rosa Toral, licensed therapist in Sonoma County.',
    keywords: ['mental health blog', 'therapy tips', 'wellness advice'],
  }),
}
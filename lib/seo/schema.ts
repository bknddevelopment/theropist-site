// Comprehensive Schema.org structured data for therapy services
import { Organization, LocalBusiness, MedicalBusiness, Person, Service, FAQPage, BreadcrumbList } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rosatoraltherapy.com'

// Main therapist/organization schema
export const therapistSchema: any = {
  '@type': ['Person', 'MedicalBusiness'],
  '@id': `${baseUrl}#therapist`,
  name: 'Rosa Toral',
  jobTitle: 'Licensed Clinical Therapist',
  description: 'Licensed therapist specializing in anxiety, depression, trauma recovery, and relationship counseling in Sonoma County.',
  image: `${baseUrl}/images/rosa-toral-therapist.jpg`,
  email: 'contact@rosatoraltherapy.com',
  telephone: '+1-707-555-0123',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sonoma',
    addressRegion: 'CA',
    postalCode: '95476',
    addressCountry: 'US',
    streetAddress: '123 Healing Path Lane'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.2919,
    longitude: -122.4580
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  priceRange: '$$',
  acceptsReservations: true,
  isAccessibleForFree: false,
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Health Insurance',
  areaServed: [
    {
      '@type': 'City',
      name: 'Sonoma'
    },
    {
      '@type': 'City',
      name: 'Napa'
    },
    {
      '@type': 'City',
      name: 'Petaluma'
    },
    {
      '@type': 'City',
      name: 'Santa Rosa'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'License',
      name: 'Licensed Clinical Social Worker (LCSW)',
      issuedBy: {
        '@type': 'Organization',
        name: 'California Board of Behavioral Sciences'
      }
    }
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'American Psychological Association'
    },
    {
      '@type': 'Organization',
      name: 'California Association of Marriage and Family Therapists'
    }
  ],
  sameAs: [
    'https://www.linkedin.com/in/rosatoral',
    'https://www.psychologytoday.com/therapists/rosatoral',
    'https://www.facebook.com/rosatoraltherapy'
  ]
}

// Services offered
export const servicesSchema: Service[] = [
  {
    '@type': 'Service',
    '@id': `${baseUrl}#individual-therapy`,
    name: 'Individual Therapy',
    description: 'Personalized one-on-one therapy sessions for anxiety, depression, trauma, and personal growth.',
    provider: { '@id': `${baseUrl}#therapist` },
    areaServed: 'Sonoma County, CA',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Individual Therapy Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '50-minute Individual Session',
          price: '150',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: '80-minute Extended Session',
          price: '225',
          priceCurrency: 'USD'
        }
      ]
    }
  },
  {
    '@type': 'Service',
    '@id': `${baseUrl}#couples-therapy`,
    name: 'Couples Therapy',
    description: 'Relationship counseling for couples seeking to improve communication, resolve conflicts, and strengthen their bond.',
    provider: { '@id': `${baseUrl}#therapist` },
    areaServed: 'Sonoma County, CA',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Couples Therapy Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '75-minute Couples Session',
          price: '200',
          priceCurrency: 'USD'
        }
      ]
    }
  },
  {
    '@type': 'Service',
    '@id': `${baseUrl}#emdr-therapy`,
    name: 'EMDR Therapy',
    description: 'Eye Movement Desensitization and Reprocessing therapy for trauma and PTSD treatment.',
    provider: { '@id': `${baseUrl}#therapist` },
    areaServed: 'Sonoma County, CA',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'EMDR Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '90-minute EMDR Session',
          price: '250',
          priceCurrency: 'USD'
        }
      ]
    }
  },
  {
    '@type': 'Service',
    '@id': `${baseUrl}#mindfulness-workshops`,
    name: 'Mindfulness Workshops',
    description: 'Group workshops focusing on mindfulness, meditation, and stress reduction techniques.',
    provider: { '@id': `${baseUrl}#therapist` },
    areaServed: 'Sonoma County, CA',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Workshop Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '2-hour Mindfulness Workshop',
          price: '75',
          priceCurrency: 'USD'
        }
      ]
    }
  }
]

// FAQ Schema
export const faqSchema: FAQPage = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of therapy do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I offer individual therapy, couples counseling, EMDR for trauma, and mindfulness-based stress reduction. Each approach is tailored to your specific needs and goals.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long are therapy sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Individual therapy sessions are typically 50 minutes. Couples sessions are 75 minutes, and EMDR sessions are 90 minutes to allow for complete processing.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I accept several major insurance plans including Blue Cross Blue Shield, Aetna, and Cigna. I also offer sliding scale fees for those who qualify.'
      }
    },
    {
      '@type': 'Question',
      name: 'What areas do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I serve clients throughout Sonoma County including Sonoma, Napa, Petaluma, and Santa Rosa. I also offer teletherapy sessions for California residents.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I schedule an appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can schedule an appointment by calling (707) 555-0123 or using our online booking system. I offer a free 15-minute consultation to discuss your needs.'
      }
    }
  ]
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  }
}

// Local Business schema for local SEO
export const localBusinessSchema: LocalBusiness = {
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}#business`,
  name: 'Rosa Toral Therapy',
  description: 'Professional therapy and counseling services in Sonoma County',
  url: baseUrl,
  telephone: '+1-707-555-0123',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Healing Path Lane',
    addressLocality: 'Sonoma',
    addressRegion: 'CA',
    postalCode: '95476',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.2919,
    longitude: -122.4580
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  sameAs: [
    'https://www.linkedin.com/in/rosatoral',
    'https://www.psychologytoday.com/therapists/rosatoral',
    'https://www.facebook.com/rosatoraltherapy'
  ],
  image: [
    `${baseUrl}/images/office-exterior.jpg`,
    `${baseUrl}/images/therapy-room.jpg`,
    `${baseUrl}/images/rosa-toral.jpg`
  ],
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: 'Sarah M.'
      },
      reviewBody: 'Rosa has been instrumental in my healing journey. Her compassionate approach and expertise in trauma therapy have truly changed my life.'
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: 'Michael R.'
      },
      reviewBody: 'The couples therapy sessions with Rosa saved our marriage. Her insight and guidance helped us communicate better and reconnect.'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 47
  }
}

// Generate complete schema for a page
export function generatePageSchema(
  pageType: 'home' | 'about' | 'services' | 'contact' | 'blog',
  additionalData?: any
) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      therapistSchema,
      localBusinessSchema,
      ...servicesSchema,
      faqSchema
    ]
  }

  // Add page-specific schema
  if (pageType === 'home') {
    baseSchema['@graph'].push({
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'Rosa Toral Therapy',
      description: 'Professional therapy and counseling services in Sonoma County',
      publisher: { '@id': `${baseUrl}#therapist` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })
  }

  if (additionalData) {
    baseSchema['@graph'].push(additionalData)
  }

  return baseSchema
}
// Placeholder image URLs for development and production
// These can be replaced with actual hosted images later

export const placeholderImages = {
  // Hero section background
  hero: '/images/hero-background.jpg',

  // About section
  about: '/images/about-preview.jpg',

  // Testimonials
  testimonials: {
    sarah: '/images/testimonials/sarah.jpg',
    couple: '/images/testimonials/couple.jpg',
    david: '/images/testimonials/david.jpg',
  },

  // Service cards
  services: {
    individual: '/images/services/individual-therapy.jpg',
    couples: '/images/services/couples-counseling.jpg',
    group: '/images/services/group-therapy.jpg',
    retreat: '/images/services/wellness-retreat.jpg',
  },
}

// Fallback to a gradient placeholder if image fails to load
export const getPlaceholderDataUrl = (width: number = 400, height: number = 300) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238B9574'/%3E%3Cstop offset='100%25' stop-color='%23D4A574'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23grad)'/%3E%3C/svg%3E`
}
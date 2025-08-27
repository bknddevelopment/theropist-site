export interface Service {
  id: string
  title: string
  description: string
  duration: string
  price: string
  features: string[]
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  qualifications: string[]
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  preferredDate?: string
}
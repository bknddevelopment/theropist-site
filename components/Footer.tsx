import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { href: '/services/individual-therapy', label: 'Individual Therapy' },
      { href: '/services/couples-counseling', label: 'Couples Counseling' },
      { href: '/services/group-therapy', label: 'Group Therapy' },
      { href: '/services/wellness-retreat', label: 'Wellness Retreats' },
    ],
    resources: [
      { href: '/resources/blog', label: 'Blog' },
      { href: '/resources/self-help', label: 'Self-Help Tools' },
      { href: '/resources/faqs', label: 'FAQs' },
      { href: '/resources/insurance', label: 'Insurance' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/team', label: 'Our Team' },
      { href: '/testimonials', label: 'Testimonials' },
      { href: '/careers', label: 'Careers' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/hipaa', label: 'HIPAA Compliance' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
  }

  return (
    <footer className="bg-gradient-to-br from-forest via-bark to-forest text-cream pt-16 pb-8 relative overflow-hidden texture-bark">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 relative">
          {/* Organic divider */}
          <svg className="absolute bottom-0 left-0 w-full h-1" viewBox="0 0 1200 4" preserveAspectRatio="none">
            <path d="M0,2 Q300,0 600,2 T1200,1" stroke="rgba(139, 149, 116, 0.3)" strokeWidth="1" fill="none" className="animate-gentle-sway" />
          </svg>
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-cormorant text-earth-2xl font-bold mb-2">
                Sonoma Wellness
              </h2>
              <p className="text-cream/80 text-earth-sm">
                Your journey to healing and wholeness begins here.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center flex-shrink-0 mt-0.5 animate-breathing">
                  <MapPin className="w-4 h-4 text-cream" />
                </div>
                <p className="text-earth-sm text-cream/80">
                  123 Vineyard Lane<br />
                  Healdsburg, CA 95448
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center flex-shrink-0 animate-breathing" style={{ animationDelay: '1s' }}>
                  <Phone className="w-4 h-4 text-cream" />
                </div>
                <a
                  href="tel:+17075551234"
                  className="text-earth-sm text-cream/80 hover:text-cream transition-colors"
                >
                  (707) 555-1234
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-pebble bg-gradient-to-br from-terracotta/30 to-golden-hour/30 flex items-center justify-center flex-shrink-0 animate-breathing" style={{ animationDelay: '2s' }}>
                  <Mail className="w-4 h-4 text-cream" />
                </div>
                <a
                  href="mailto:hello@sonomawellness.com"
                  className="text-earth-sm text-cream/80 hover:text-cream transition-colors"
                >
                  hello@sonomawellness.com
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-cormorant text-earth-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-earth-sm text-cream/80 hover:text-cream transition-colors block p-3 -m-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-cormorant text-earth-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-earth-sm text-cream/80 hover:text-cream transition-colors block p-3 -m-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-cormorant text-earth-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-earth-sm text-cream/80 hover:text-cream transition-colors block p-3 -m-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-cormorant text-earth-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-earth-sm text-cream/80 mb-4">
              Subscribe to our newsletter for wellness tips and updates.
            </p>
            <form className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/50 focus:outline-none focus:border-terracotta transition-colors min-h-[44px]"
              />
              <button
                type="submit"
                className="w-full bg-terracotta text-cream px-4 py-3 rounded-lg hover:bg-terracotta/90 transition-colors font-medium min-h-[44px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-earth-sm text-cream/60">
              © {currentYear} Sonoma Wellness Retreat. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-earth-xs text-cream/60 hover:text-cream transition-colors p-3 inline-block rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="w-12 h-12 bg-cream/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="w-12 h-12 bg-cream/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="w-12 h-12 bg-cream/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-8 pt-8 border-t border-sage/20 text-center">
          <p className="text-earth-xs text-cream/50 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 fill-terracotta text-terracotta" />
            <span>in Sonoma County</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
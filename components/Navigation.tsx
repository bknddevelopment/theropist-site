'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/retreat', label: 'Retreats' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center group-hover:bg-forest transition-colors">
              <span className="text-cream font-playfair text-xl font-bold">S</span>
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-forest">
                Sonoma Wellness
              </h1>
              <p className="text-xs text-sage -mt-1">Retreat & Therapy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-forest hover:text-terracotta transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+17075551234"
              className="flex items-center space-x-2 text-forest hover:text-terracotta transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(707) 555-1234</span>
            </a>
            <Link
              href="/book"
              className="flex items-center space-x-2 bg-terracotta text-cream px-5 py-2.5 rounded-full hover:bg-forest transition-colors font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-forest hover:text-terracotta transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 py-4 border-t border-sage/20"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-forest hover:text-terracotta transition-colors font-medium text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-3 border-t border-sage/20">
                  <a
                    href="tel:+17075551234"
                    className="flex items-center space-x-2 text-forest hover:text-terracotta transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">(707) 555-1234</span>
                  </a>
                  <Link
                    href="/book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-terracotta text-cream px-5 py-3 rounded-full hover:bg-forest transition-colors font-medium"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Session</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navigation
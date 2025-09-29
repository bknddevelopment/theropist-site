'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth/auth-context'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()

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
          ? 'bg-cream/95 backdrop-blur-md shadow-organic py-4 texture-linen'
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
            <div className="w-10 h-10 rounded-pebble bg-gradient-to-br from-sage to-moss flex items-center justify-center group-hover:from-forest group-hover:to-bark transition-all duration-300 animate-organic-grow shadow-warm-sm">
              <span className="text-cream font-cormorant text-earth-xl font-bold">S</span>
            </div>
            <div>
              <h1 className="font-cormorant text-earth-xl font-bold text-forest">
                Sonoma Wellness
              </h1>
              <p className="text-earth-xs text-sage -mt-1">Retreat & Therapy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-forest hover:text-terracotta transition-all duration-300 font-medium relative group/link p-3 -m-3 rounded"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-terracotta to-golden-hour group-hover/link:w-full transition-all duration-300 rounded-full" />
                </span>
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
              href="/booking"
              className="flex items-center space-x-2 bg-clay-gradient text-cream px-5 py-2.5 rounded-stone font-medium shadow-warm-md hover:shadow-warm-lg transition-all duration-300 animate-organic-grow animate-ripple pressed-earth"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </Link>
            {isAuthenticated ? (
              <Link
                href="/portal"
                className="flex items-center space-x-2 bg-sage text-cream px-5 py-2.5 rounded-stone font-medium shadow-warm-md hover:shadow-warm-lg transition-all duration-300"
              >
                <User className="w-4 h-4" />
                <span>Portal</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-forest hover:text-terracotta transition-colors font-medium"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-forest hover:text-terracotta transition-colors p-3 -m-3 rounded"
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
              className="lg:hidden mt-4 py-4 border-t border-sage/20 bg-cream/95 backdrop-blur-md rounded-organic shadow-organic"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-forest hover:text-terracotta transition-all duration-300 font-medium text-earth-lg px-4 py-3 rounded-organic-sm hover:bg-sage/10 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-3 border-t border-sage/20">
                  <a
                    href="tel:+17075551234"
                    className="flex items-center space-x-2 text-forest hover:text-terracotta transition-colors px-4"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">(707) 555-1234</span>
                  </a>
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-clay-gradient text-cream px-5 py-3 rounded-stone hover:shadow-warm-lg transition-all duration-300 font-medium animate-organic-grow pressed-earth mx-4"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Session</span>
                  </Link>
                  {isAuthenticated ? (
                    <Link
                      href="/portal"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 bg-sage text-cream px-5 py-3 rounded-stone hover:shadow-warm-lg transition-all duration-300 font-medium mx-4"
                    >
                      <User className="w-4 h-4" />
                      <span>Client Portal</span>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 text-forest hover:text-terracotta transition-colors font-medium px-4"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign In</span>
                    </Link>
                  )}
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
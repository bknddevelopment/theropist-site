'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  DollarSign,
  MessageSquare,
  Bell,
  Database,
  BarChart3,
  UserCheck,
  Clock,
  Mail
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { path: '/admin/clients', label: 'Clients', icon: Users },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/revenue', label: 'Revenue', icon: DollarSign },
    { path: '/admin/engagement', label: 'Engagement', icon: TrendingUp },
    { path: '/admin/surveys', label: 'Surveys & NPS', icon: MessageSquare },
    { path: '/admin/waitlist', label: 'Waitlist', icon: Clock },
    { path: '/admin/reminders', label: 'Reminders', icon: Bell },
    { path: '/admin/ab-testing', label: 'A/B Testing', icon: UserCheck },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
    { path: '/admin/backup', label: 'Backup & Export', icon: Database },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-sm border-b border-stone-200/50 z-40">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-stone-600" /> : <Menu className="w-5 h-5 text-stone-600" />}
            </button>
            <h1 className="text-xl font-light text-stone-800">Rosa Toral Therapy Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">RT</span>
              </div>
              <span className="text-sm text-stone-600 hidden sm:inline">Admin</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
              <LogOut className="w-4 h-4 text-stone-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Mobile Overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              />
            )}

            {/* Sidebar Content */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-16 bottom-0 w-72 bg-white/95 backdrop-blur-sm border-r border-stone-200/50 z-50 overflow-y-auto"
            >
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-sage-100 to-sage-50 text-sage-700 shadow-sm'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-sage-600' : ''}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-gradient-to-b from-sage-400 to-sage-500 rounded-r-full"
                        />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Quick Stats */}
              <div className="p-4 border-t border-stone-200/50">
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-700">Today's Appointments</span>
                      <span className="text-lg font-semibold text-amber-900">5</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-sage-50 to-sage-100/50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sage-700">Active Clients</span>
                      <span className="text-lg font-semibold text-sage-900">42</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-terracotta-50 to-terracotta-100/50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-terracotta-700">Monthly Revenue</span>
                      <span className="text-lg font-semibold text-terracotta-900">$8,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`
          pt-20 transition-all duration-300
          ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
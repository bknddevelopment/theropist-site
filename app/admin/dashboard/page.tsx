'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Clock,
  MessageSquare,
  Star,
  Activity,
  Target,
  Award,
  AlertCircle,
  FileText,
  Mail,
  Download
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data for demonstration
const appointmentData = [
  { month: 'Jan', appointments: 45, revenue: 6750 },
  { month: 'Feb', appointments: 52, revenue: 7800 },
  { month: 'Mar', appointments: 48, revenue: 7200 },
  { month: 'Apr', appointments: 61, revenue: 9150 },
  { month: 'May', appointments: 58, revenue: 8700 },
  { month: 'Jun', appointments: 65, revenue: 9750 },
]

const clientEngagementData = [
  { day: 'Mon', sessions: 8, messages: 12, bookings: 3 },
  { day: 'Tue', sessions: 10, messages: 15, bookings: 4 },
  { day: 'Wed', sessions: 12, messages: 18, bookings: 5 },
  { day: 'Thu', sessions: 9, messages: 14, bookings: 3 },
  { day: 'Fri', sessions: 11, messages: 20, bookings: 6 },
  { day: 'Sat', sessions: 6, messages: 8, bookings: 2 },
  { day: 'Sun', sessions: 3, messages: 5, bookings: 1 },
]

const serviceDistribution = [
  { name: 'Individual Therapy', value: 45, color: '#8B9E8B' },
  { name: 'Couples Counseling', value: 25, color: '#D4A574' },
  { name: 'Group Sessions', value: 15, color: '#C97064' },
  { name: 'Workshops', value: 15, color: '#E5D5B7' },
]

const satisfactionData = [
  { score: 'Excellent', value: 65, fill: '#8B9E8B' },
  { score: 'Good', value: 25, fill: '#A8B8A8' },
  { score: 'Fair', value: 8, fill: '#D4A574' },
  { score: 'Poor', value: 2, fill: '#C97064' },
]

const conversionFunnel = [
  { stage: 'Website Visits', value: 1250, percentage: 100 },
  { stage: 'Contact Form', value: 380, percentage: 30.4 },
  { stage: 'Consultation Booked', value: 120, percentage: 9.6 },
  { stage: 'Became Client', value: 45, percentage: 3.6 },
]

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isLoading, setIsLoading] = useState(false)

  const statsCards = [
    {
      title: 'Total Clients',
      value: '142',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'sage',
      description: 'Active clients this month'
    },
    {
      title: 'Appointments',
      value: '65',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'amber',
      description: 'Sessions this month'
    },
    {
      title: 'Revenue',
      value: '$9,750',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'terracotta',
      description: 'Monthly earnings'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'sage',
      description: 'Average rating'
    },
    {
      title: 'Avg Session Duration',
      value: '52 min',
      change: '-3 min',
      trend: 'down',
      icon: Clock,
      color: 'amber',
      description: 'Per appointment'
    },
    {
      title: 'Response Time',
      value: '2.4 hrs',
      change: '-30 min',
      trend: 'up',
      icon: MessageSquare,
      color: 'terracotta',
      description: 'To client messages'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-stone-800">Dashboard Overview</h1>
          <p className="text-stone-600 mt-1">Welcome back, Rosa. Here's your practice summary.</p>
        </div>

        <div className="flex gap-2">
          {['day', 'week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${selectedPeriod === period
                  ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-50'
                }
              `}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-stone-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-stone-900">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`
                      flex items-center gap-1 text-sm font-medium
                      ${stat.trend === 'up' ? 'text-green-600' : 'text-amber-600'}
                    `}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </span>
                    <span className="text-xs text-stone-500">{stat.description}</span>
                  </div>
                </div>
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${stat.color === 'sage' ? 'bg-gradient-to-br from-sage-100 to-sage-200' : ''}
                  ${stat.color === 'amber' ? 'bg-gradient-to-br from-amber-100 to-amber-200' : ''}
                  ${stat.color === 'terracotta' ? 'bg-gradient-to-br from-terracotta-100 to-terracotta-200' : ''}
                `}>
                  <Icon className={`
                    w-6 h-6
                    ${stat.color === 'sage' ? 'text-sage-600' : ''}
                    ${stat.color === 'amber' ? 'text-amber-600' : ''}
                    ${stat.color === 'terracotta' ? 'text-terracotta-600' : ''}
                  `} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trends */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-stone-800">Appointment Trends</h2>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Activity className="w-4 h-4" />
              <span>Last 6 months</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={appointmentData}>
              <defs>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B9E8B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B9E8B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4A574" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#8B9E8B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAppointments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Client Engagement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-stone-800">Client Engagement</h2>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Target className="w-4 h-4" />
              <span>This week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientEngagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="sessions" fill="#8B9E8B" radius={[8, 8, 0, 0]} />
              <Bar dataKey="messages" fill="#D4A574" radius={[8, 8, 0, 0]} />
              <Bar dataKey="bookings" fill="#C97064" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          <h2 className="text-lg font-medium text-stone-800 mb-4">Service Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceDistribution.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                  <span className="text-sm text-stone-600">{service.name}</span>
                </div>
                <span className="text-sm font-medium text-stone-800">{service.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client Satisfaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          <h2 className="text-lg font-medium text-stone-800 mb-4">Client Satisfaction</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={satisfactionData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8B9E8B" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-semibold text-stone-800">4.8</span>
              <span className="text-stone-600">/ 5.0</span>
            </div>
            <p className="text-center text-sm text-stone-600 mt-2">Based on 85 reviews</p>
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          <h2 className="text-lg font-medium text-stone-800 mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-stone-600">{stage.stage}</span>
                  <span className="text-sm font-medium text-stone-800">{stage.value}</span>
                </div>
                <div className="relative h-8 bg-stone-100 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="absolute inset-y-0 left-0 rounded-lg"
                    style={{
                      background: `linear-gradient(to right, ${
                        index === 0 ? '#8B9E8B' :
                        index === 1 ? '#A8B8A8' :
                        index === 2 ? '#D4A574' : '#C97064'
                      }, ${
                        index === 0 ? '#A8B8A8' :
                        index === 1 ? '#D4A574' :
                        index === 2 ? '#C97064' : '#E5D5B7'
                      })`
                    }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                      {stage.percentage}%
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-sage-50 to-sage-100/50 rounded-2xl p-6 border border-sage-200/50"
      >
        <h2 className="text-lg font-medium text-stone-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-md transition-all">
            <Calendar className="w-6 h-6 text-sage-600" />
            <span className="text-sm text-stone-700">Schedule Appointment</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-md transition-all">
            <MessageSquare className="w-6 h-6 text-amber-600" />
            <span className="text-sm text-stone-700">Send Survey</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-md transition-all">
            <FileText className="w-6 h-6 text-terracotta-600" />
            <span className="text-sm text-stone-700">Generate Report</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-md transition-all">
            <Award className="w-6 h-6 text-sage-600" />
            <span className="text-sm text-stone-700">View Insights</span>
          </button>
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">3 appointments need confirmation</p>
            <p className="text-sm text-amber-700 mt-1">2 clients are on the waitlist for this week</p>
          </div>
          <button className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
            View All
          </button>
        </div>
      </motion.div>
    </div>
  )
}
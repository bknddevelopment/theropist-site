'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts'
import {
  MessageSquare,
  Send,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Meh,
  Frown,
  Plus,
  Filter,
  Download,
  Mail
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock NPS data
const npsHistory = [
  { month: 'Aug', score: 68, responses: 12 },
  { month: 'Sep', score: 71, responses: 15 },
  { month: 'Oct', score: 73, responses: 18 },
  { month: 'Nov', score: 76, responses: 20 },
  { month: 'Dec', score: 78, responses: 22 },
  { month: 'Jan', score: 81, responses: 25 },
]

const npsBreakdown = [
  { category: 'Promoters', value: 65, color: '#8B9E8B' },
  { category: 'Passives', value: 25, color: '#D4A574' },
  { category: 'Detractors', value: 10, color: '#C97064' },
]

const satisfactionMetrics = [
  { aspect: 'Session Quality', rating: 4.8, total: 5 },
  { aspect: 'Communication', rating: 4.7, total: 5 },
  { aspect: 'Scheduling', rating: 4.5, total: 5 },
  { aspect: 'Environment', rating: 4.9, total: 5 },
  { aspect: 'Value for Money', rating: 4.6, total: 5 },
  { aspect: 'Overall Experience', rating: 4.7, total: 5 },
]

const recentFeedback = [
  {
    id: 1,
    client: 'Sarah M.',
    date: '2024-01-28',
    nps: 9,
    category: 'Promoter',
    comment: 'Rosa has been incredibly helpful in my journey. Her approach is both professional and compassionate.',
    sentiment: 'positive'
  },
  {
    id: 2,
    client: 'Michael L.',
    date: '2024-01-27',
    nps: 10,
    category: 'Promoter',
    comment: 'Best therapy experience I\'ve had. The techniques and insights have been life-changing.',
    sentiment: 'positive'
  },
  {
    id: 3,
    client: 'Jennifer K.',
    date: '2024-01-26',
    nps: 7,
    category: 'Passive',
    comment: 'Good sessions overall. Would appreciate more evening appointment slots.',
    sentiment: 'neutral'
  },
  {
    id: 4,
    client: 'David R.',
    date: '2024-01-25',
    nps: 9,
    category: 'Promoter',
    comment: 'Rosa creates a safe and supportive environment. Highly recommend her services.',
    sentiment: 'positive'
  },
]

const surveyTemplates = [
  { name: 'Post-Session Feedback', lastUsed: '2 days ago', responses: 145, active: true },
  { name: 'Quarterly Check-in', lastUsed: '1 week ago', responses: 89, active: true },
  { name: 'Service Improvement', lastUsed: '3 weeks ago', responses: 67, active: false },
  { name: 'Annual Review', lastUsed: '2 months ago', responses: 42, active: true },
]

export default function SurveysNPSPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false)

  const currentNPS = 81
  const npsChange = +5
  const responseRate = 78

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-800">Client Surveys & NPS</h1>
          <p className="text-stone-600 mt-1">Track client satisfaction and gather valuable feedback</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <Download className="w-4 h-4 inline mr-2" />
            Export Data
          </button>
          <button
            onClick={() => setShowNewSurveyModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            New Survey
          </button>
        </div>
      </div>

      {/* NPS Score Overview */}
      <div className="bg-gradient-to-br from-sage-50 to-sage-100/50 rounded-2xl p-6 border border-sage-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* NPS Score */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-sage-700 mb-2">Current NPS Score</h3>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle
                  className="text-sage-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="52"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-sage-500"
                  strokeWidth="8"
                  strokeDasharray={`${(currentNPS / 100) * 327} 327`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="52"
                  cx="64"
                  cy="64"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div className="absolute">
                <span className="text-3xl font-bold text-sage-800">{currentNPS}</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {npsChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${npsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {npsChange > 0 ? '+' : ''}{npsChange}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-sage-600 mt-2">Excellent Score</p>
          </div>

          {/* Categories Breakdown */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-medium text-stone-700">Response Breakdown</h3>
            {npsBreakdown.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-stone-600">{category.category}</span>
                  <span className="text-sm font-medium text-stone-800">{category.value}%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.value}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-stone-600">Response Rate</span>
              <span className="font-medium text-stone-800">{responseRate}%</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-sage-600" />
                <span className="text-xs text-sage-700">Total Responses</span>
              </div>
              <p className="text-xl font-semibold text-sage-900">427</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-700">This Month</span>
              </div>
              <p className="text-xl font-semibold text-amber-900">25</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NPS Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="text-lg font-medium text-stone-800 mb-4">NPS Score Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={npsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[60, 90]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8B9E8B"
                strokeWidth={3}
                dot={{ fill: '#8B9E8B', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="text-lg font-medium text-stone-800 mb-4">Satisfaction by Aspect</h2>
          <div className="space-y-3">
            {satisfactionMetrics.map((metric) => (
              <div key={metric.aspect}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-stone-600">{metric.aspect}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium text-stone-800">
                      {metric.rating}/{metric.total}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.rating / metric.total) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-stone-800">Recent Feedback</h2>
          <button className="text-sm text-sage-600 hover:text-sage-700 transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentFeedback.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {feedback.client.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{feedback.client}</p>
                    <p className="text-xs text-stone-500">{feedback.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`
                    px-2 py-1 text-xs rounded-full font-medium
                    ${feedback.category === 'Promoter' ? 'bg-green-100 text-green-700' :
                      feedback.category === 'Passive' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'}
                  `}>
                    NPS: {feedback.nps}
                  </span>
                  {feedback.sentiment === 'positive' && <ThumbsUp className="w-4 h-4 text-green-600" />}
                  {feedback.sentiment === 'neutral' && <Meh className="w-4 h-4 text-amber-600" />}
                  {feedback.sentiment === 'negative' && <ThumbsDown className="w-4 h-4 text-red-600" />}
                </div>
              </div>
              <p className="text-sm text-stone-600">{feedback.comment}</p>
              <div className="flex items-center gap-2 mt-3">
                <button className="text-xs text-sage-600 hover:text-sage-700 transition-colors">
                  Reply
                </button>
                <span className="text-stone-300">•</span>
                <button className="text-xs text-stone-600 hover:text-stone-700 transition-colors">
                  Flag for Follow-up
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Survey Templates */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-stone-800">Survey Templates</h2>
          <button className="text-sm text-sage-600 hover:text-sage-700 transition-colors">
            Manage Templates
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {surveyTemplates.map((template) => (
            <div key={template.name} className="p-4 border border-stone-200 rounded-xl hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-stone-800">{template.name}</h3>
                  <p className="text-xs text-stone-500">Last used: {template.lastUsed}</p>
                </div>
                <span className={`
                  px-2 py-1 text-xs rounded-full
                  ${template.active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}
                `}>
                  {template.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-stone-600">{template.responses} responses</span>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-stone-100 rounded transition-colors">
                    <Mail className="w-4 h-4 text-stone-600" />
                  </button>
                  <button className="px-3 py-1 text-xs bg-sage-100 text-sage-700 rounded hover:bg-sage-200 transition-colors">
                    Send Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Action Required</p>
            <ul className="text-sm text-amber-700 mt-2 space-y-1">
              <li>• 3 clients haven't received follow-up after negative feedback</li>
              <li>• Quarterly survey scheduled for next week (42 recipients)</li>
              <li>• 2 survey responses need manual review</li>
            </ul>
          </div>
          <button className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
            Review
          </button>
        </div>
      </div>
    </div>
  )
}
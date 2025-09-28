'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  Beaker,
  Play,
  Pause,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Plus,
  Settings,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock A/B test data
const activeTests = [
  {
    id: 1,
    name: 'Hero Section CTA Button',
    status: 'active',
    startDate: '2024-01-15',
    variants: [
      { name: 'Control (Book Session)', visitors: 450, conversions: 32, rate: 7.1 },
      { name: 'Variant A (Start Journey)', visitors: 445, conversions: 41, rate: 9.2 },
      { name: 'Variant B (Get Started)', visitors: 462, conversions: 38, rate: 8.2 }
    ],
    confidence: 94,
    winner: 'Variant A',
    improvement: '+29.6%'
  },
  {
    id: 2,
    name: 'Service Card Layouts',
    status: 'active',
    startDate: '2024-01-20',
    variants: [
      { name: 'Grid Layout', visitors: 320, conversions: 24, rate: 7.5 },
      { name: 'Carousel Layout', visitors: 315, conversions: 28, rate: 8.9 },
    ],
    confidence: 82,
    winner: 'Carousel Layout',
    improvement: '+18.7%'
  },
  {
    id: 3,
    name: 'Testimonial Display',
    status: 'paused',
    startDate: '2024-01-10',
    variants: [
      { name: 'Static Cards', visitors: 180, conversions: 12, rate: 6.7 },
      { name: 'Animated Slider', visitors: 175, conversions: 14, rate: 8.0 },
    ],
    confidence: 68,
    winner: null,
    improvement: null
  }
]

const testHistory = [
  { date: 'Jan 1', control: 5.2, variant: 5.0 },
  { date: 'Jan 5', control: 5.8, variant: 6.2 },
  { date: 'Jan 10', control: 6.1, variant: 7.5 },
  { date: 'Jan 15', control: 6.5, variant: 8.3 },
  { date: 'Jan 20', control: 6.8, variant: 9.1 },
  { date: 'Jan 25', control: 7.1, variant: 9.2 },
]

export default function ABTestingPage() {
  const [selectedTest, setSelectedTest] = useState(activeTests[0])
  const [showNewTestModal, setShowNewTestModal] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-800">A/B Testing</h1>
          <p className="text-stone-600 mt-1">Optimize your content with data-driven experiments</p>
        </div>
        <button
          onClick={() => setShowNewTestModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          New Test
        </button>
      </div>

      {/* Active Tests Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {activeTests.map((test) => (
          <motion.div
            key={test.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedTest(test)}
            className={`
              bg-white rounded-xl p-5 border cursor-pointer transition-all
              ${selectedTest.id === test.id ? 'border-sage-400 shadow-md' : 'border-stone-200 hover:shadow-sm'}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-sage-600" />
                <h3 className="font-medium text-stone-800">{test.name}</h3>
              </div>
              <span className={`
                px-2 py-1 text-xs rounded-full font-medium
                ${test.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'}
              `}>
                {test.status}
              </span>
            </div>

            <div className="space-y-2">
              {test.variants.map((variant) => (
                <div key={variant.name} className="flex items-center justify-between">
                  <span className="text-xs text-stone-600">{variant.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-800">{variant.rate}%</span>
                    {test.winner === variant.name && (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {test.confidence && (
              <div className="mt-3 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-600">Confidence</span>
                  <span className={`
                    text-sm font-medium
                    ${test.confidence >= 95 ? 'text-green-600' :
                      test.confidence >= 80 ? 'text-amber-600' : 'text-stone-600'}
                  `}>
                    {test.confidence}%
                  </span>
                </div>
                {test.improvement && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-stone-600">Improvement</span>
                    <span className="text-sm font-medium text-green-600">{test.improvement}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Selected Test Details */}
      {selectedTest && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-stone-800">{selectedTest.name}</h2>
            <div className="flex items-center gap-2">
              {selectedTest.status === 'active' ? (
                <button className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">
                  <Pause className="w-4 h-4" />
                  Pause Test
                </button>
              ) : (
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Play className="w-4 h-4" />
                  Resume Test
                </button>
              )}
              <button className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Rate Over Time */}
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-3">Conversion Rate Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={testHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="control"
                    stroke="#D4A574"
                    strokeWidth={2}
                    dot={{ fill: '#D4A574', r: 4 }}
                    name="Control"
                  />
                  <Line
                    type="monotone"
                    dataKey="variant"
                    stroke="#8B9E8B"
                    strokeWidth={2}
                    dot={{ fill: '#8B9E8B', r: 4 }}
                    name="Best Variant"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Variant Performance */}
            <div>
              <h3 className="text-sm font-medium text-stone-700 mb-3">Variant Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={selectedTest.variants}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                    {selectedTest.variants.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#D4A574' : '#8B9E8B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Test Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-stone-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-stone-600" />
                <span className="text-xs text-stone-600">Total Visitors</span>
              </div>
              <p className="text-lg font-semibold text-stone-800">
                {selectedTest.variants.reduce((sum, v) => sum + v.visitors, 0)}
              </p>
            </div>
            <div className="bg-sage-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MousePointer className="w-4 h-4 text-sage-600" />
                <span className="text-xs text-sage-700">Total Conversions</span>
              </div>
              <p className="text-lg font-semibold text-sage-800">
                {selectedTest.variants.reduce((sum, v) => sum + v.conversions, 0)}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-700">Avg. Conversion</span>
              </div>
              <p className="text-lg font-semibold text-amber-800">
                {(selectedTest.variants.reduce((sum, v) => sum + v.rate, 0) / selectedTest.variants.length).toFixed(1)}%
              </p>
            </div>
            <div className="bg-terracotta-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-terracotta-600" />
                <span className="text-xs text-terracotta-700">Days Running</span>
              </div>
              <p className="text-lg font-semibold text-terracotta-800">15</p>
            </div>
          </div>

          {/* Statistical Significance */}
          <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-sage-100/50 rounded-lg border border-sage-200/50">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-sage-900 mb-1">Statistical Analysis</h4>
                <p className="text-sm text-sage-700">
                  {selectedTest.confidence >= 95
                    ? `Test has reached statistical significance with ${selectedTest.confidence}% confidence. ${selectedTest.winner} is the clear winner with ${selectedTest.improvement} improvement.`
                    : selectedTest.confidence >= 80
                    ? `Test is showing promising results but needs more data. Current confidence: ${selectedTest.confidence}%.`
                    : `Test needs more data to reach statistical significance. Current confidence: ${selectedTest.confidence}%.`
                  }
                </p>
                {selectedTest.confidence >= 95 && (
                  <button className="mt-3 px-4 py-1.5 bg-sage-600 text-white rounded-lg text-sm hover:bg-sage-700 transition-colors">
                    Implement Winner
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Ideas Queue */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200">
        <h2 className="text-xl font-medium text-stone-800 mb-4">Test Ideas Queue</h2>
        <div className="space-y-3">
          {[
            { name: 'Appointment form simplification', priority: 'high', impact: 'high' },
            { name: 'Homepage video background', priority: 'medium', impact: 'medium' },
            { name: 'Service pricing display', priority: 'high', impact: 'high' },
            { name: 'Contact form fields optimization', priority: 'low', impact: 'medium' },
            { name: 'Navigation menu restructure', priority: 'medium', impact: 'high' },
          ].map((idea, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-stone-400" />
                <span className="text-stone-700">{idea.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  px-2 py-1 text-xs rounded-full
                  ${idea.priority === 'high' ? 'bg-red-100 text-red-700' :
                    idea.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-stone-100 text-stone-700'}
                `}>
                  {idea.priority} priority
                </span>
                <span className={`
                  px-2 py-1 text-xs rounded-full
                  ${idea.impact === 'high' ? 'bg-green-100 text-green-700' :
                    idea.impact === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-stone-100 text-stone-700'}
                `}>
                  {idea.impact} impact
                </span>
                <button className="px-3 py-1 text-xs bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors">
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
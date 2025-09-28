'use client'

import { useState } from 'react'
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
  ComposedChart
} from 'recharts'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Receipt
} from 'lucide-react'
import { motion } from 'framer-motion'
import { CSVLink } from 'react-csv'

// Mock revenue data
const monthlyRevenue = [
  { month: 'Aug', revenue: 7200, expenses: 1800, profit: 5400, sessions: 48 },
  { month: 'Sep', revenue: 7800, expenses: 1900, profit: 5900, sessions: 52 },
  { month: 'Oct', revenue: 8100, expenses: 2000, profit: 6100, sessions: 54 },
  { month: 'Nov', revenue: 8650, expenses: 2100, profit: 6550, sessions: 58 },
  { month: 'Dec', revenue: 9200, expenses: 2200, profit: 7000, sessions: 61 },
  { month: 'Jan', revenue: 9750, expenses: 2300, profit: 7450, sessions: 65 },
]

const revenueByService = [
  { service: 'Individual Therapy', revenue: 5850, percentage: 60, sessions: 39 },
  { service: 'Couples Counseling', revenue: 2437, percentage: 25, sessions: 13 },
  { service: 'Group Sessions', revenue: 975, percentage: 10, sessions: 8 },
  { service: 'Workshops', revenue: 488, percentage: 5, sessions: 5 },
]

const paymentMethods = [
  { method: 'Insurance', amount: 6825, percentage: 70, color: '#8B9E8B' },
  { method: 'Credit Card', amount: 1950, percentage: 20, color: '#D4A574' },
  { method: 'Cash', amount: 488, percentage: 5, color: '#C97064' },
  { method: 'Check', amount: 487, percentage: 5, color: '#B8A88A' },
]

const outstandingInvoices = [
  { client: 'Sarah Mitchell', amount: 150, daysOverdue: 0, status: 'current' },
  { client: 'Michael Chen', amount: 300, daysOverdue: 15, status: 'overdue' },
  { client: 'Jennifer Davis', amount: 225, daysOverdue: 7, status: 'late' },
  { client: 'David Rodriguez', amount: 150, daysOverdue: 0, status: 'current' },
]

const insuranceBreakdown = [
  { provider: 'Blue Cross', claims: 12, approved: 11, pending: 1, amount: 2400 },
  { provider: 'Aetna', claims: 8, approved: 7, pending: 1, amount: 1600 },
  { provider: 'United Healthcare', claims: 10, approved: 10, pending: 0, amount: 2000 },
  { provider: 'Kaiser', claims: 6, approved: 5, pending: 1, amount: 1200 },
]

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showDetails, setShowDetails] = useState('overview')

  const currentMonthRevenue = 9750
  const lastMonthRevenue = 9200
  const revenueChange = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)

  const totalOutstanding = outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = outstandingInvoices
    .filter(inv => inv.status === 'overdue' || inv.status === 'late')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const csvData = monthlyRevenue.map(month => ({
    Month: month.month,
    Revenue: month.revenue,
    Expenses: month.expenses,
    Profit: month.profit,
    Sessions: month.sessions,
    'Avg per Session': (month.revenue / month.sessions).toFixed(2)
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-800">Revenue Tracking</h1>
          <p className="text-stone-600 mt-1">Monitor your practice's financial performance</p>
        </div>
        <div className="flex gap-2">
          <CSVLink
            data={csvData}
            filename={`revenue-report-${new Date().toISOString().split('T')[0]}.csv`}
            className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </CSVLink>
          <button className="px-4 py-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-lg hover:shadow-lg transition-all">
            <FileText className="w-4 h-4 inline mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-200/50"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-green-700">Monthly Revenue</p>
              <p className="text-3xl font-semibold text-green-900 mt-1">${currentMonthRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                {Number(revenueChange) > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${Number(revenueChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueChange}%
                </span>
                <span className="text-xs text-green-600">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-200/50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-stone-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-stone-600">Monthly Profit</p>
              <p className="text-3xl font-semibold text-stone-900 mt-1">$7,450</p>
              <p className="text-xs text-stone-500 mt-2">After expenses</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-sage-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sage-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-stone-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-stone-600">Avg. per Session</p>
              <p className="text-3xl font-semibold text-stone-900 mt-1">$150</p>
              <p className="text-xs text-stone-500 mt-2">65 sessions</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-stone-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-stone-600">Outstanding</p>
              <p className="text-3xl font-semibold text-stone-900 mt-1">${totalOutstanding}</p>
              <p className="text-xs text-red-500 mt-2">${overdueAmount} overdue</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-terracotta-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-terracotta-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Trends Chart */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-stone-800">Revenue & Profit Trends</h2>
          <div className="flex gap-2">
            {['month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-sage-100 text-sage-700'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}ly
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B9E8B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B9E8B" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis yAxisId="left" stroke="#9ca3af" />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8B9E8B"
              fill="url(#colorRevenue)"
              strokeWidth={2}
              name="Revenue"
            />
            <Bar yAxisId="left" dataKey="profit" fill="#D4A574" radius={[8, 8, 0, 0]} name="Profit" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sessions"
              stroke="#C97064"
              strokeWidth={2}
              dot={{ fill: '#C97064', r: 4 }}
              name="Sessions"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Service */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200">
          <h2 className="text-lg font-medium text-stone-800 mb-4">Revenue by Service</h2>
          <div className="space-y-4">
            {revenueByService.map((service) => (
              <div key={service.service}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-700">{service.service}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-stone-500">{service.sessions} sessions</span>
                    <span className="text-sm font-medium text-stone-800">${service.revenue}</span>
                  </div>
                </div>
                <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200">
          <h2 className="text-lg font-medium text-stone-800 mb-4">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="amount"
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {paymentMethods.map((method) => (
              <div key={method.method} className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                  <span className="text-xs text-stone-600">{method.method}</span>
                </div>
                <span className="text-xs font-medium text-stone-800">${method.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Claims */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-stone-800">Insurance Claims Status</h2>
          <button className="text-sm text-sage-600 hover:text-sage-700 transition-colors">
            View All Claims
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-2 text-sm font-medium text-stone-700">Provider</th>
                <th className="text-center py-2 text-sm font-medium text-stone-700">Total Claims</th>
                <th className="text-center py-2 text-sm font-medium text-stone-700">Approved</th>
                <th className="text-center py-2 text-sm font-medium text-stone-700">Pending</th>
                <th className="text-right py-2 text-sm font-medium text-stone-700">Amount</th>
                <th className="text-center py-2 text-sm font-medium text-stone-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {insuranceBreakdown.map((provider) => (
                <tr key={provider.provider} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="py-3 text-sm text-stone-700">{provider.provider}</td>
                  <td className="text-center py-3 text-sm text-stone-600">{provider.claims}</td>
                  <td className="text-center py-3">
                    <span className="text-sm text-green-600 font-medium">{provider.approved}</span>
                  </td>
                  <td className="text-center py-3">
                    <span className="text-sm text-amber-600 font-medium">{provider.pending}</span>
                  </td>
                  <td className="text-right py-3 text-sm font-medium text-stone-800">${provider.amount}</td>
                  <td className="text-center py-3">
                    {provider.pending === 0 ? (
                      <CheckCircle className="w-4 h-4 text-green-500 inline" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outstanding Invoices */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-stone-800">Outstanding Invoices</h2>
          <span className="text-sm text-stone-600">Total: ${totalOutstanding}</span>
        </div>
        <div className="space-y-3">
          {outstandingInvoices.map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${
                  invoice.status === 'current' ? 'bg-green-500' :
                  invoice.status === 'late' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="font-medium text-stone-800">{invoice.client}</p>
                  <p className="text-xs text-stone-500">
                    {invoice.status === 'current' ? 'Due on time' :
                     invoice.status === 'late' ? `${invoice.daysOverdue} days late` :
                     `${invoice.daysOverdue} days overdue`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-stone-900">${invoice.amount}</span>
                <button className="px-3 py-1 text-xs bg-sage-100 text-sage-700 rounded hover:bg-sage-200 transition-colors">
                  Send Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
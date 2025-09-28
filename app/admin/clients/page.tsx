'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  FileText,
  Download,
  ChevronDown,
  MoreVertical,
  Edit,
  Archive,
  Tag,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock client data
const mockClients = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(707) 555-0123',
    status: 'active',
    joinedDate: '2023-06-15',
    lastSession: '2024-01-26',
    totalSessions: 24,
    therapyType: 'Individual',
    nextAppointment: '2024-01-29',
    tags: ['anxiety', 'stress management'],
    satisfaction: 4.8,
    notes: 'Responds well to CBT techniques',
    insurance: 'Blue Cross',
    balance: 0
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(707) 555-0124',
    status: 'active',
    joinedDate: '2023-08-20',
    lastSession: '2024-01-25',
    totalSessions: 18,
    therapyType: 'Couples',
    nextAppointment: '2024-01-30',
    tags: ['relationship', 'communication'],
    satisfaction: 4.7,
    notes: 'Attending with partner Lisa',
    insurance: 'Aetna',
    balance: 150
  },
  {
    id: 3,
    name: 'Jennifer Davis',
    email: 'jennifer.davis@email.com',
    phone: '(707) 555-0125',
    status: 'inactive',
    joinedDate: '2023-03-10',
    lastSession: '2023-12-15',
    totalSessions: 32,
    therapyType: 'Individual',
    nextAppointment: null,
    tags: ['depression', 'grief'],
    satisfaction: 4.9,
    notes: 'Completed treatment successfully',
    insurance: 'United Healthcare',
    balance: 0
  },
  {
    id: 4,
    name: 'David Rodriguez',
    email: 'david.rodriguez@email.com',
    phone: '(707) 555-0126',
    status: 'active',
    joinedDate: '2023-09-05',
    lastSession: '2024-01-24',
    totalSessions: 15,
    therapyType: 'Individual',
    nextAppointment: '2024-01-31',
    tags: ['work stress', 'burnout'],
    satisfaction: 4.6,
    notes: 'Monthly check-ins working well',
    insurance: 'Kaiser',
    balance: 0
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '(707) 555-0127',
    status: 'waitlist',
    joinedDate: '2024-01-15',
    lastSession: null,
    totalSessions: 0,
    therapyType: 'Individual',
    nextAppointment: null,
    tags: ['anxiety', 'panic attacks'],
    satisfaction: null,
    notes: 'Waiting for evening slot',
    insurance: 'Cigna',
    balance: 0
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredClients = useMemo(() => {
    let clients = [...mockClients]

    // Search filter
    if (searchTerm) {
      clients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (filterStatus !== 'all') {
      clients = clients.filter(client => client.status === filterStatus)
    }

    // Type filter
    if (filterType !== 'all') {
      clients = clients.filter(client => client.therapyType === filterType)
    }

    // Sorting
    clients.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'recent':
          return (b.lastSession || '').localeCompare(a.lastSession || '')
        case 'sessions':
          return b.totalSessions - a.totalSessions
        case 'satisfaction':
          return (b.satisfaction || 0) - (a.satisfaction || 0)
        default:
          return 0
      }
    })

    return clients
  }, [searchTerm, filterStatus, filterType, sortBy])

  const stats = {
    total: mockClients.length,
    active: mockClients.filter(c => c.status === 'active').length,
    inactive: mockClients.filter(c => c.status === 'inactive').length,
    waitlist: mockClients.filter(c => c.status === 'waitlist').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-800">Client Database</h1>
          <p className="text-stone-600 mt-1">Manage and track all your clients in one place</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-lg hover:shadow-lg transition-all">
          <UserPlus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Total Clients</p>
              <p className="text-2xl font-semibold text-stone-800">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-stone-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Active</p>
              <p className="text-2xl font-semibold text-green-700">{stats.active}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Inactive</p>
              <p className="text-2xl font-semibold text-stone-600">{stats.inactive}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
              <Archive className="w-5 h-5 text-stone-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Waitlist</p>
              <p className="text-2xl font-semibold text-amber-700">{stats.waitlist}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-stone-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500/50"
            >
              <option value="name">Sort by Name</option>
              <option value="recent">Recent Activity</option>
              <option value="sessions">Total Sessions</option>
              <option value="satisfaction">Satisfaction</option>
            </select>
            <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
              <Download className="w-4 h-4 text-stone-600" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-stone-200"
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-600">Status:</span>
                  <div className="flex gap-2">
                    {['all', 'active', 'inactive', 'waitlist'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          filterStatus === status
                            ? 'bg-sage-100 text-sage-700'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-600">Type:</span>
                  <div className="flex gap-2">
                    {['all', 'Individual', 'Couples', 'Group'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          filterType === type
                            ? 'bg-sage-100 text-sage-700'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredClients.map((client) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-stone-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{client.name}</p>
                        <p className="text-xs text-stone-500">{client.therapyType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-stone-600">{client.email}</p>
                      <p className="text-sm text-stone-500">{client.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${client.status === 'active' ? 'bg-green-100 text-green-700' :
                        client.status === 'inactive' ? 'bg-stone-100 text-stone-600' :
                        'bg-amber-100 text-amber-700'}
                    `}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-stone-800">{client.totalSessions}</p>
                      <p className="text-xs text-stone-500">
                        Last: {client.lastSession || 'Never'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {client.nextAppointment ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-stone-400" />
                        <span className="text-sm text-stone-600">{client.nextAppointment}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-stone-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {client.satisfaction ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-stone-800">{client.satisfaction}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-stone-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle email action
                        }}
                        className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      >
                        <Mail className="w-4 h-4 text-stone-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle message action
                        }}
                        className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-stone-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle more actions
                        }}
                        className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">
                      {selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800">{selectedClient.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`
                        px-2 py-1 text-xs rounded-full font-medium
                        ${selectedClient.status === 'active' ? 'bg-green-100 text-green-700' :
                          selectedClient.status === 'inactive' ? 'bg-stone-100 text-stone-600' :
                          'bg-amber-100 text-amber-700'}
                      `}>
                        {selectedClient.status}
                      </span>
                      <span className="text-sm text-stone-600">{selectedClient.therapyType} Therapy</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-600">{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-600">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-600">Sonoma County, CA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Treatment Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Total Sessions</span>
                      <span className="text-sm font-medium text-stone-800">{selectedClient.totalSessions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Client Since</span>
                      <span className="text-sm font-medium text-stone-800">{selectedClient.joinedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Insurance</span>
                      <span className="text-sm font-medium text-stone-800">{selectedClient.insurance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Balance</span>
                      <span className={`text-sm font-medium ${selectedClient.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${selectedClient.balance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Treatment Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedClient.notes && (
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-stone-700 mb-3">Notes</h4>
                    <p className="text-sm text-stone-600 bg-stone-50 rounded-lg p-3">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Schedule Appointment
                </button>
                <button className="px-4 py-2 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit
                </button>
                <button className="px-4 py-2 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
                  <FileText className="w-4 h-4 inline mr-2" />
                  View History
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
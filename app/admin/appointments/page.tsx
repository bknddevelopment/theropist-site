'use client'

import { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Video,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Bell,
  Edit,
  Trash2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const localizer = momentLocalizer(moment)

// Mock appointment data
const mockEvents = [
  {
    id: 1,
    title: 'Sarah Mitchell - Individual Therapy',
    start: new Date(2024, 0, 29, 9, 0),
    end: new Date(2024, 0, 29, 10, 0),
    client: 'Sarah Mitchell',
    type: 'individual',
    status: 'confirmed',
    location: 'in-person',
    notes: 'Follow-up on anxiety management techniques'
  },
  {
    id: 2,
    title: 'Michael & Lisa Chen - Couples Counseling',
    start: new Date(2024, 0, 29, 10, 30),
    end: new Date(2024, 0, 29, 11, 30),
    client: 'Michael & Lisa Chen',
    type: 'couples',
    status: 'confirmed',
    location: 'video',
    notes: 'Communication strategies session'
  },
  {
    id: 3,
    title: 'Jennifer Davis - Initial Consultation',
    start: new Date(2024, 0, 29, 14, 0),
    end: new Date(2024, 0, 29, 15, 0),
    client: 'Jennifer Davis',
    type: 'consultation',
    status: 'pending',
    location: 'in-person',
    notes: 'New client intake'
  },
  {
    id: 4,
    title: 'Group Therapy - Stress Management',
    start: new Date(2024, 0, 30, 16, 0),
    end: new Date(2024, 0, 30, 17, 30),
    client: 'Group Session',
    type: 'group',
    status: 'confirmed',
    location: 'in-person',
    notes: '6 participants confirmed'
  },
  {
    id: 5,
    title: 'David Rodriguez - Individual Therapy',
    start: new Date(2024, 0, 31, 11, 0),
    end: new Date(2024, 0, 31, 12, 0),
    client: 'David Rodriguez',
    type: 'individual',
    status: 'confirmed',
    location: 'video',
    notes: 'Monthly check-in'
  },
]

const appointmentTypes = {
  individual: { color: '#8B9E8B', label: 'Individual Therapy' },
  couples: { color: '#D4A574', label: 'Couples Counseling' },
  group: { color: '#C97064', label: 'Group Session' },
  consultation: { color: '#B8A88A', label: 'Consultation' },
}

export default function AppointmentsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [view, setView] = useState<View>(Views.WEEK)
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [filterType, setFilterType] = useState('all')

  const handleSelectSlot = useCallback(({ start, end }: any) => {
    setShowNewAppointment(true)
    // Pre-fill the new appointment form with selected time
  }, [])

  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event)
  }, [])

  const eventStyleGetter = (event: any) => {
    const typeColor = appointmentTypes[event.type as keyof typeof appointmentTypes]?.color || '#8B9E8B'

    return {
      style: {
        backgroundColor: typeColor,
        borderRadius: '6px',
        opacity: event.status === 'cancelled' ? 0.5 : 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '13px',
        padding: '2px 5px',
      }
    }
  }

  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('PREV')}
            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={() => onNavigate('TODAY')}
            className="px-3 py-1.5 text-sm bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => onNavigate('NEXT')}
            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-stone-600" />
          </button>
        </div>
        <h2 className="text-lg font-medium text-stone-800">{label}</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-white border border-stone-200 rounded-lg overflow-hidden">
          {[Views.DAY, Views.WEEK, Views.MONTH].map((viewType) => (
            <button
              key={viewType}
              onClick={() => onView(viewType)}
              className={`px-3 py-1.5 text-sm transition-colors ${
                view === viewType
                  ? 'bg-sage-500 text-white'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-lg hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          New Appointment
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-stone-800">Appointment Calendar</h1>
        <p className="text-stone-600 mt-1">Manage your therapy sessions and consultations</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Today</p>
              <p className="text-2xl font-semibold text-stone-800">5</p>
              <p className="text-xs text-stone-500 mt-1">appointments</p>
            </div>
            <CalendarIcon className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">This Week</p>
              <p className="text-2xl font-semibold text-stone-800">23</p>
              <p className="text-xs text-stone-500 mt-1">scheduled</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Pending</p>
              <p className="text-2xl font-semibold text-stone-800">3</p>
              <p className="text-xs text-stone-500 mt-1">confirmations</p>
            </div>
            <AlertCircle className="w-8 h-8 text-terracotta-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-600">Available</p>
              <p className="text-2xl font-semibold text-stone-800">12</p>
              <p className="text-xs text-stone-500 mt-1">slots this week</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-stone-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-600">Filter by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-sage-100 text-sage-700'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                All Types
              </button>
              {Object.entries(appointmentTypes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterType === key
                      ? 'text-white'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                  style={filterType === key ? { backgroundColor: value.color } : {}}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-stone-600" />
            </button>
            <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-stone-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200" style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={filterType === 'all' ? events : events.filter(e => e.type === filterType)}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
          style={{ height: '100%' }}
        />
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-stone-800">{selectedEvent.client}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: appointmentTypes[selectedEvent.type as keyof typeof appointmentTypes]?.color }}
                    >
                      {appointmentTypes[selectedEvent.type as keyof typeof appointmentTypes]?.label}
                    </span>
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${selectedEvent.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        selectedEvent.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'}
                    `}>
                      {selectedEvent.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="w-4 h-4 text-stone-400" />
                  <span className="text-stone-600">
                    {moment(selectedEvent.start).format('MMMM D, YYYY')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span className="text-stone-600">
                    {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {selectedEvent.location === 'video' ? (
                    <Video className="w-4 h-4 text-stone-400" />
                  ) : (
                    <MapPin className="w-4 h-4 text-stone-400" />
                  )}
                  <span className="text-stone-600">
                    {selectedEvent.location === 'video' ? 'Video Call' : 'In-Person'}
                  </span>
                </div>
                {selectedEvent.notes && (
                  <div className="pt-3 border-t border-stone-100">
                    <p className="text-sm text-stone-600 mb-1">Notes:</p>
                    <p className="text-sm text-stone-500">{selectedEvent.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors">
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit
                </button>
                <button className="px-4 py-2 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Remind
                </button>
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming Appointments List */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200">
        <h2 className="text-lg font-medium text-stone-800 mb-4">Upcoming Appointments</h2>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-4">
                <div
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: appointmentTypes[event.type as keyof typeof appointmentTypes]?.color }}
                />
                <div>
                  <p className="font-medium text-stone-800">{event.client}</p>
                  <p className="text-sm text-stone-600">
                    {moment(event.start).format('MMM D, h:mm A')} • {event.location === 'video' ? 'Video' : 'In-Person'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <MessageSquare className="w-4 h-4 text-stone-600" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <Mail className="w-4 h-4 text-stone-600" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <Phone className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
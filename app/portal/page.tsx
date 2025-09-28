'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Activity,
  Target,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Upload,
  Bell,
  Shield,
  Heart,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';
import { useAuth, withAuth } from '@/lib/auth/auth-context';
import { portalService } from '@/lib/portal/portal-service';
import { bookingService } from '@/lib/booking/booking-service';
import { ClientProfile, TreatmentGoal, ProgressEntry, Document, SessionRecord } from '@/lib/portal/types';
import { Appointment } from '@/lib/booking/types';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

function ClientPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [goals, setGoals] = useState<TreatmentGoal[]>([]);
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPortalData();
    }
  }, [user]);

  const loadPortalData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Load all data in parallel
      const [
        profileData,
        appointmentData,
        goalsData,
        progressData,
        documentsData,
        sessionData,
        statsData
      ] = await Promise.all([
        portalService.getClientProfile(user.id),
        bookingService.getAppointments(user.id),
        portalService.getTreatmentGoals(user.id),
        portalService.getProgressEntries(user.id),
        portalService.getDocuments(user.id),
        portalService.getSessionHistory(user.id),
        portalService.getClientStats(user.id)
      ]);

      setProfile(profileData);
      setAppointments(appointmentData);
      setGoals(goalsData);
      setProgressData(progressData);
      setDocuments(documentsData);
      setSessionHistory(sessionData.sessions);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load portal data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!user) return;

    try {
      const newDoc = await portalService.uploadDocument({
        clientId: user.id,
        name: file.name,
        type: 'other',
        uploadedBy: user.id,
        size: file.size,
        mimeType: file.type,
        isConfidential: true
      });

      setDocuments([...documents, newDoc]);
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'goals', label: 'Treatment Goals', icon: Target },
    { id: 'sessions', label: 'Session History', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-earth-600 to-sage-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <p className="text-white/80">Your journey to wellness continues here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: stats?.totalSessions || 0, icon: Clock, color: 'earth' },
          { label: 'Upcoming', value: stats?.upcomingAppointments || 0, icon: Calendar, color: 'sage' },
          { label: 'Active Goals', value: stats?.activeGoals || 0, icon: Target, color: 'terracotta' },
          { label: 'Resources', value: stats?.documentsCount || 0, icon: FileText, color: 'sand' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-earth-200"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              <span className={`text-3xl font-bold text-${stat.color}-700`}>{stat.value}</span>
            </div>
            <p className="text-earth-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Next Appointment Card */}
      {appointments.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
          <h2 className="text-xl font-semibold text-earth-800 mb-4">Next Appointment</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-earth-600">
                <span className="font-medium">Date:</span>{' '}
                {format(new Date(appointments[0].startTime), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-earth-600">
                <span className="font-medium">Time:</span>{' '}
                {format(new Date(appointments[0].startTime), 'h:mm a')}
              </p>
              <p className="text-earth-600">
                <span className="font-medium">Type:</span> Individual Therapy
              </p>
            </div>
            <button className="px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Progress Chart */}
      {progressData.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
          <h2 className="text-xl font-semibold text-earth-800 mb-4">Your Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#8B7355"
              />
              <YAxis stroke="#8B7355" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #8B7355',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B7355"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B7355" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B7355" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Treatment Goals */}
      {goals.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
          <h2 className="text-xl font-semibold text-earth-800 mb-4">Active Goals</h2>
          <div className="space-y-4">
            {goals.filter(g => g.status === 'active').map(goal => (
              <div key={goal.id} className="border-l-4 border-earth-600 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-earth-700">{goal.title}</h3>
                  <span className="text-sm text-earth-500">{goal.progress}% Complete</span>
                </div>
                <div className="w-full bg-earth-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    className="bg-earth-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-earth-800">Your Appointments</h2>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
        <h3 className="text-lg font-semibold text-earth-700 mb-4">Upcoming</h3>
        <div className="space-y-4">
          {appointments
            .filter(appt => new Date(appt.startTime) > new Date())
            .map(appt => (
              <motion.div
                key={appt.id}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 bg-sand-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-earth-600 text-white rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-earth-800">
                      {format(new Date(appt.startTime), 'EEEE, MMMM d')}
                    </p>
                    <p className="text-sm text-earth-600">
                      {format(new Date(appt.startTime), 'h:mm a')} - {format(new Date(appt.endTime), 'h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-earth-600 hover:bg-earth-100 rounded-lg transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Book New Appointment */}
      <motion.a
        href="/booking"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block bg-gradient-to-r from-earth-600 to-sage-600 text-white rounded-2xl p-6 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Book a New Appointment</h3>
        <p className="text-white/80">Schedule your next therapy session</p>
      </motion.a>
    </div>
  );

  const renderProgress = () => {
    const anxietyData = progressData.filter(p => p.category === 'Anxiety');
    const sleepData = progressData.filter(p => p.category === 'Sleep');

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-earth-800">Progress Tracking</h2>

        {/* Anxiety Tracking */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
          <h3 className="text-lg font-semibold text-earth-700 mb-4">Anxiety Levels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={anxietyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#8B7355"
              />
              <YAxis domain={[0, 10]} stroke="#8B7355" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#C19A6B"
                strokeWidth={3}
                dot={{ fill: '#8B7355', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Tracking */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
          <h3 className="text-lg font-semibold text-earth-700 mb-4">Sleep Quality</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#8B7355"
              />
              <YAxis domain={[0, 10]} stroke="#8B7355" />
              <Tooltip />
              <Bar dataKey="value" fill="#9CAF88" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Add New Entry */}
        <div className="bg-gradient-to-r from-sage-100 to-earth-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-earth-700 mb-4">Log Today's Progress</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-earth-600 mb-2">Anxiety Level (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full"
                onChange={(e) => console.log('Anxiety:', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-earth-600 mb-2">Sleep Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                className="w-full px-3 py-2 border border-earth-300 rounded-lg"
                onChange={(e) => console.log('Sleep:', e.target.value)}
              />
            </div>
          </div>
          <button className="mt-4 px-6 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors">
            Save Entry
          </button>
        </div>
      </div>
    );
  };

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-earth-800">Documents</h2>
        <label className="px-6 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
          <Upload className="w-5 h-5 inline-block mr-2" />
          Upload Document
        </label>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-200">
        <div className="space-y-3">
          {documents.map(doc => (
            <motion.div
              key={doc.id}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 bg-sand-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-earth-600" />
                <div>
                  <p className="font-medium text-earth-800">{doc.name}</p>
                  <p className="text-sm text-earth-600">
                    Uploaded {format(new Date(doc.uploadedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-earth-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-earth-600" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HIPAA Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Your Privacy is Protected</p>
            <p className="text-sm text-blue-700 mt-1">
              All documents are encrypted and stored in compliance with HIPAA regulations. Only you and your therapist have access to these files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-earth-200 min-h-screen sticky top-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-earth-600 text-white rounded-full flex items-center justify-center font-semibold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <p className="font-semibold text-earth-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-earth-600">Client Portal</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${activeTab === item.id
                      ? 'bg-earth-100 text-earth-800'
                      : 'text-earth-600 hover:bg-earth-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 mt-8 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'appointments' && renderAppointments()}
              {activeTab === 'progress' && renderProgress()}
              {activeTab === 'documents' && renderDocuments()}
              {activeTab === 'goals' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">Treatment Goals</h2>
                  {/* Goals content here */}
                </div>
              )}
              {activeTab === 'sessions' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">Session History</h2>
                  {/* Session history content here */}
                </div>
              )}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">Secure Messages</h2>
                  {/* Messages content here */}
                </div>
              )}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">Resource Library</h2>
                  {/* Resources content here */}
                </div>
              )}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">My Profile</h2>
                  {/* Profile content here */}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-earth-800">Settings</h2>
                  {/* Settings content here */}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default withAuth(ClientPortal, ['client']);
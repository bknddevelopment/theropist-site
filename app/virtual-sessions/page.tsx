'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Monitor,
  Users,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Wifi,
  Mic,
  Camera,
  FileText,
  Heart
} from 'lucide-react';
import { VirtualSession } from '@/lib/types/assessment';

const PLATFORMS = [
  {
    id: 'zoom',
    name: 'Zoom',
    icon: Video,
    description: 'Video conferencing with screen sharing',
    features: ['HD Video', 'Screen Sharing', 'Recording Available']
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    icon: Monitor,
    description: 'Simple and secure video meetings',
    features: ['No Download Required', 'Calendar Integration', 'Captions Available']
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: Users,
    description: 'Integrated communication platform',
    features: ['Chat Support', 'File Sharing', 'Background Blur']
  },
  {
    id: 'phone',
    name: 'Phone Call',
    icon: Phone,
    description: 'Traditional phone consultation',
    features: ['Audio Only', 'No Tech Required', 'Privacy Focused']
  }
];

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM'
];

export default function VirtualSessionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionDuration, setSessionDuration] = useState<number>(50);
  const [sessionType, setSessionType] = useState<'initial' | 'follow-up'>('initial');
  const [confirmationDetails, setConfirmationDetails] = useState<VirtualSession | null>(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create session
      const session: VirtualSession = {
        id: `session-${Date.now()}`,
        scheduledAt: new Date(`${selectedDate} ${selectedTime}`),
        duration: sessionDuration,
        platform: selectedPlatform as any,
        status: 'scheduled',
        meetingLink: selectedPlatform !== 'phone' ? `https://meeting.example.com/${Date.now()}` : undefined
      };
      setConfirmationDetails(session);
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPlatform !== '';
      case 2:
        return selectedDate !== '';
      case 3:
        return selectedTime !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (currentStep === 5 && confirmationDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h2 className="text-3xl font-light text-stone-800 mb-2">Session Scheduled!</h2>
              <p className="text-stone-600">Your virtual session has been confirmed</p>
            </div>

            <div className="bg-sage-50 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-stone-800 mb-4">Session Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-2">
                    <Calendar size={16} />
                    Date
                  </span>
                  <span className="font-medium text-stone-800">
                    {new Date(confirmationDetails.scheduledAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-2">
                    <Clock size={16} />
                    Time
                  </span>
                  <span className="font-medium text-stone-800">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-2">
                    <Video size={16} />
                    Platform
                  </span>
                  <span className="font-medium text-stone-800">
                    {PLATFORMS.find(p => p.id === selectedPlatform)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-2">
                    <Clock size={16} />
                    Duration
                  </span>
                  <span className="font-medium text-stone-800">{sessionDuration} minutes</span>
                </div>
              </div>
            </div>

            {confirmationDetails.meetingLink && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="font-medium text-stone-800 mb-2">Meeting Link</h3>
                <p className="text-sm text-stone-600 mb-3">
                  You'll receive an email with the meeting link. Save this information for your reference.
                </p>
                <div className="bg-white rounded-lg p-3 font-mono text-sm text-blue-600 break-all">
                  {confirmationDetails.meetingLink}
                </div>
              </div>
            )}

            <div className="bg-amber-50 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
                <AlertCircle className="text-amber-600" size={20} />
                Preparation Checklist
              </h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start">
                  <CheckCircle className="text-amber-600 mr-2 mt-0.5" size={16} />
                  <span>Find a quiet, private space for your session</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-amber-600 mr-2 mt-0.5" size={16} />
                  <span>Test your camera and microphone beforehand</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-amber-600 mr-2 mt-0.5" size={16} />
                  <span>Ensure stable internet connection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-amber-600 mr-2 mt-0.5" size={16} />
                  <span>Have a notebook ready for any insights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-amber-600 mr-2 mt-0.5" size={16} />
                  <span>Complete any pre-session assessments</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 border border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
              >
                Return Home
              </button>
              <button
                onClick={() => window.location.href = '/session/waiting'}
                className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
              >
                Go to Waiting Room
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light text-stone-800 mb-4">Schedule Virtual Session</h1>
          <p className="text-stone-600 text-lg">Book your therapy session from the comfort of your home</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentStep >= step ? 1 : 0.8,
                  backgroundColor: currentStep >= step ? '#6B8E6B' : '#E5E7EB'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}
              >
                {currentStep > step ? <CheckCircle size={20} /> : step}
              </motion.div>
              {step < 4 && (
                <div className={`w-20 h-1 ${currentStep > step ? 'bg-sage-600' : 'bg-stone-300'}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-soft p-8"
        >
          {/* Step 1: Platform Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-light text-stone-800 mb-6">Choose Your Platform</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        selectedPlatform === platform.id
                          ? 'border-sage-600 bg-sage-50'
                          : 'border-stone-200 hover:border-sage-400'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                          <Icon className="text-sage-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-stone-800 mb-1">{platform.name}</h3>
                          <p className="text-sm text-stone-600 mb-3">{platform.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {platform.features.map((feature) => (
                              <span
                                key={feature}
                                className="text-xs px-2 py-1 bg-stone-100 rounded-full text-stone-600"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-light text-stone-800 mb-6">Select Date</h2>
              <div className="mb-8">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getTodayDate()}
                  className="w-full p-4 border-2 border-stone-200 rounded-xl focus:border-sage-400 focus:outline-none text-stone-800"
                />
              </div>
              <div className="bg-sage-50 rounded-xl p-4">
                <p className="text-sm text-stone-600">
                  <strong>Note:</strong> Sessions are available Monday through Friday.
                  Weekend appointments may be available upon request.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-light text-stone-800 mb-6">Choose Time</h2>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? 'border-sage-600 bg-sage-50'
                        : 'border-stone-200 hover:border-sage-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Session Duration</label>
                  <select
                    value={sessionDuration}
                    onChange={(e) => setSessionDuration(Number(e.target.value))}
                    className="w-full p-3 border-2 border-stone-200 rounded-xl focus:border-sage-400 focus:outline-none"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={50}>50 minutes (Standard)</option>
                    <option value={80}>80 minutes (Extended)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Session Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSessionType('initial')}
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        sessionType === 'initial'
                          ? 'border-sage-600 bg-sage-50'
                          : 'border-stone-200 hover:border-sage-400'
                      }`}
                    >
                      Initial Consultation
                    </button>
                    <button
                      onClick={() => setSessionType('follow-up')}
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        sessionType === 'follow-up'
                          ? 'border-sage-600 bg-sage-50'
                          : 'border-stone-200 hover:border-sage-400'
                      }`}
                    >
                      Follow-up Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Technical Check */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-light text-stone-800 mb-6">Technical Requirements</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <Wifi className="text-green-600 mr-3 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">Internet Connection</h3>
                    <p className="text-sm text-stone-600">
                      Stable broadband connection (minimum 5 Mbps recommended)
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <Camera className="text-green-600 mr-3 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">Camera</h3>
                    <p className="text-sm text-stone-600">
                      Working webcam for video sessions (optional but recommended)
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <Mic className="text-green-600 mr-3 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">Microphone</h3>
                    <p className="text-sm text-stone-600">
                      Clear audio input device (built-in or external)
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <FileText className="text-green-600 mr-3 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">Pre-Session Forms</h3>
                    <p className="text-sm text-stone-600">
                      Complete intake assessment before your session
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-stone-600">
                  <strong>Test your setup:</strong> We recommend testing your chosen platform
                  15 minutes before your session to ensure everything works properly.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-full transition-colors flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-full transition-colors flex items-center gap-2 ${
                canProceed()
                  ? 'bg-sage-600 text-white hover:bg-sage-700'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 4 ? 'Confirm Booking' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
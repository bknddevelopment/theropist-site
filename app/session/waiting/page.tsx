'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Volume2,
  Clock,
  Heart,
  CheckCircle,
  AlertCircle,
  Headphones,
  Wifi,
  Battery,
  RefreshCw
} from 'lucide-react';
import BreathingExercise from '@/components/wellness/BreathingExercise';
import MeditationPlayer from '@/components/wellness/MeditationPlayer';

export default function VirtualWaitingRoom() {
  const [timeUntilSession, setTimeUntilSession] = useState(600); // 10 minutes in seconds
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<'breathing' | 'meditation' | 'checkin' | null>(null);
  const [systemChecks, setSystemChecks] = useState({
    camera: 'checking',
    microphone: 'checking',
    internet: 'checking',
    browser: 'checking'
  });
  const [checkInForm, setCheckInForm] = useState({
    currentMood: 5,
    mainConcerns: [] as string[],
    goals: [] as string[],
    notes: ''
  });

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeUntilSession(prev => {
        if (prev <= 0) {
          // Session is ready
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate system checks
    setTimeout(() => {
      setSystemChecks(prev => ({ ...prev, camera: 'ready' }));
    }, 1000);
    setTimeout(() => {
      setSystemChecks(prev => ({ ...prev, microphone: 'ready' }));
    }, 1500);
    setTimeout(() => {
      setSystemChecks(prev => ({ ...prev, internet: 'ready' }));
    }, 2000);
    setTimeout(() => {
      setSystemChecks(prev => ({ ...prev, browser: 'ready' }));
    }, 2500);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCheckIcon = (status: string) => {
    if (status === 'checking') {
      return <RefreshCw className="text-yellow-600 animate-spin" size={16} />;
    }
    if (status === 'ready') {
      return <CheckCircle className="text-green-600" size={16} />;
    }
    return <AlertCircle className="text-red-600" size={16} />;
  };

  const CONCERNS = [
    'Anxiety',
    'Stress',
    'Relationships',
    'Work',
    'Sleep',
    'Mood',
    'Family',
    'Self-esteem'
  ];

  const GOALS = [
    'Find coping strategies',
    'Process emotions',
    'Gain clarity',
    'Set boundaries',
    'Improve communication',
    'Build confidence',
    'Reduce stress',
    'Work through challenges'
  ];

  const handleConcernToggle = (concern: string) => {
    setCheckInForm(prev => ({
      ...prev,
      mainConcerns: prev.mainConcerns.includes(concern)
        ? prev.mainConcerns.filter(c => c !== concern)
        : [...prev.mainConcerns, concern]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setCheckInForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-stone-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-stone-800">Virtual Waiting Room</h1>
            <p className="text-sm text-stone-600">Your session with Rosa will begin soon</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-stone-800">{formatTime(timeUntilSession)}</div>
            <p className="text-sm text-stone-600">Time remaining</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* Video Preview and Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-2xl overflow-hidden aspect-video relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {videoEnabled ? (
                <div className="text-white/60 text-center">
                  <Video size={48} className="mx-auto mb-2" />
                  <p>Camera Preview</p>
                  <p className="text-sm mt-2">Your video will appear here</p>
                </div>
              ) : (
                <div className="text-white/60 text-center">
                  <VideoOff size={48} className="mx-auto mb-2" />
                  <p>Video Disabled</p>
                </div>
              )}
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-3 rounded-full transition-colors ${
                  videoEnabled ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {videoEnabled ? (
                  <Video className="text-white" size={24} />
                ) : (
                  <VideoOff className="text-white" size={24} />
                )}
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-3 rounded-full transition-colors ${
                  audioEnabled ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {audioEnabled ? (
                  <Mic className="text-white" size={24} />
                ) : (
                  <MicOff className="text-white" size={24} />
                )}
              </button>
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                <Settings className="text-white" size={24} />
              </button>
            </div>
          </motion.div>

          {/* System Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-soft p-6"
          >
            <h3 className="font-medium text-stone-800 mb-4">System Check</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-sm text-stone-600 flex items-center gap-2">
                  <Video size={16} />
                  Camera
                </span>
                {getCheckIcon(systemChecks.camera)}
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-sm text-stone-600 flex items-center gap-2">
                  <Mic size={16} />
                  Microphone
                </span>
                {getCheckIcon(systemChecks.microphone)}
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-sm text-stone-600 flex items-center gap-2">
                  <Wifi size={16} />
                  Internet
                </span>
                {getCheckIcon(systemChecks.internet)}
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-sm text-stone-600 flex items-center gap-2">
                  <Settings size={16} />
                  Browser
                </span>
                {getCheckIcon(systemChecks.browser)}
              </div>
            </div>
          </motion.div>

          {/* While You Wait Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-soft p-6"
          >
            <h3 className="font-medium text-stone-800 mb-4">While You Wait</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedActivity('breathing')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedActivity === 'breathing'
                    ? 'border-sage-600 bg-sage-50'
                    : 'border-stone-200 hover:border-sage-400'
                }`}
              >
                <Heart className="mx-auto mb-2 text-sage-600" size={24} />
                <p className="text-sm text-stone-700">Breathing</p>
              </button>
              <button
                onClick={() => setSelectedActivity('meditation')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedActivity === 'meditation'
                    ? 'border-sage-600 bg-sage-50'
                    : 'border-stone-200 hover:border-sage-400'
                }`}
              >
                <Headphones className="mx-auto mb-2 text-sage-600" size={24} />
                <p className="text-sm text-stone-700">Meditation</p>
              </button>
              <button
                onClick={() => setSelectedActivity('checkin')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedActivity === 'checkin'
                    ? 'border-sage-600 bg-sage-50'
                    : 'border-stone-200 hover:border-sage-400'
                }`}
              >
                <CheckCircle className="mx-auto mb-2 text-sage-600" size={24} />
                <p className="text-sm text-stone-700">Check-in</p>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-soft p-6"
          >
            <h3 className="font-medium text-stone-800 mb-4">Session Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-stone-600">Therapist</p>
                <p className="font-medium text-stone-800">Rosa Toral, LMFT</p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Duration</p>
                <p className="font-medium text-stone-800">50 minutes</p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Session Type</p>
                <p className="font-medium text-stone-800">Individual Therapy</p>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-sage-50 rounded-2xl p-6"
          >
            <h3 className="font-medium text-stone-800 mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li className="flex items-start">
                <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={14} />
                <span>Ensure you're in a private, quiet space</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={14} />
                <span>Have water and tissues nearby</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={14} />
                <span>Turn off notifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-sage-600 mr-2 mt-0.5" size={14} />
                <span>Take a few deep breaths to center yourself</span>
              </li>
            </ul>
          </motion.div>

          {/* Join Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            disabled={timeUntilSession > 0}
            className={`w-full py-4 rounded-full transition-colors ${
              timeUntilSession > 0
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-sage-600 text-white hover:bg-sage-700 animate-pulse'
            }`}
          >
            {timeUntilSession > 0 ? `Session starts in ${formatTime(timeUntilSession)}` : 'Join Session Now'}
          </motion.button>
        </div>
      </div>

      {/* Activity Modals */}
      <AnimatePresence>
        {selectedActivity === 'checkin' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            >
              <h2 className="text-2xl font-light text-stone-800 mb-6">Pre-Session Check-in</h2>

              <div className="space-y-6">
                {/* Mood Scale */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    How are you feeling right now? (1-10)
                  </label>
                  <div className="flex justify-between items-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        onClick={() => setCheckInForm({ ...checkInForm, currentMood: num })}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          checkInForm.currentMood === num
                            ? 'border-sage-600 bg-sage-100'
                            : 'border-stone-200 hover:border-sage-400'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Concerns */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    What would you like to discuss today?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CONCERNS.map(concern => (
                      <button
                        key={concern}
                        onClick={() => handleConcernToggle(concern)}
                        className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          checkInForm.mainConcerns.includes(concern)
                            ? 'border-sage-600 bg-sage-100'
                            : 'border-stone-200 hover:border-sage-400'
                        }`}
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    What are your goals for this session?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {GOALS.map(goal => (
                      <button
                        key={goal}
                        onClick={() => handleGoalToggle(goal)}
                        className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          checkInForm.goals.includes(goal)
                            ? 'border-sage-600 bg-sage-100'
                            : 'border-stone-200 hover:border-sage-400'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Any additional notes? (Optional)
                  </label>
                  <textarea
                    value={checkInForm.notes}
                    onChange={(e) => setCheckInForm({ ...checkInForm, notes: e.target.value })}
                    placeholder="Anything else you'd like Rosa to know before the session..."
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-sage-400 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="flex-1 px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Save check-in data
                      setSelectedActivity(null);
                    }}
                    className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
                  >
                    Save Check-in
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedActivity === 'breathing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full my-8"
            >
              <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                <h2 className="text-2xl font-light text-stone-800">Quick Breathing Exercise</h2>
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>
              <BreathingExercise />
            </motion.div>
          </motion.div>
        )}

        {selectedActivity === 'meditation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full my-8"
            >
              <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                <h2 className="text-2xl font-light text-stone-800">Quick Meditation</h2>
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>
              <MeditationPlayer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
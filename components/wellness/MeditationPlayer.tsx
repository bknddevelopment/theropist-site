'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Clock,
  Headphones,
  Wind,
  CloudRain,
  Trees,
  Bird,
  Waves
} from 'lucide-react';
import { MEDITATION_SESSIONS } from '@/lib/data/assessments';
import { MeditationSession } from '@/lib/types/assessment';

const NATURE_SOUNDS = {
  ocean: { icon: Waves, label: 'Ocean Waves', color: 'from-blue-400 to-blue-600' },
  rain: { icon: CloudRain, label: 'Rainfall', color: 'from-gray-400 to-gray-600' },
  forest: { icon: Trees, label: 'Forest', color: 'from-green-400 to-green-600' },
  birds: { icon: Bird, label: 'Bird Songs', color: 'from-yellow-400 to-yellow-600' },
  silence: { icon: VolumeX, label: 'Silence', color: 'from-stone-400 to-stone-600' }
};

export default function MeditationPlayer() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession>(MEDITATION_SESSIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentTime === 0) {
      // Starting fresh session
      setCurrentTime(0);
    }
  };

  const skipSession = () => {
    const currentIndex = MEDITATION_SESSIONS.findIndex(s => s.id === selectedSession.id);
    const nextIndex = (currentIndex + 1) % MEDITATION_SESSIONS.length;
    setSelectedSession(MEDITATION_SESSIONS[nextIndex]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedSession.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, selectedSession]);

  const progress = (currentTime / selectedSession.duration) * 100;
  const SoundIcon = selectedSession.backgroundSound ? NATURE_SOUNDS[selectedSession.backgroundSound].icon : Wind;
  const soundColor = selectedSession.backgroundSound ? NATURE_SOUNDS[selectedSession.backgroundSound].color : 'from-sage-400 to-sage-600';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3">Guided Meditation</h2>
        <p className="text-stone-600">Find peace and clarity through mindful practice</p>
      </div>

      {/* Session Selector */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {MEDITATION_SESSIONS.map((session) => {
          const Icon = session.backgroundSound ? NATURE_SOUNDS[session.backgroundSound].icon : Wind;
          return (
            <motion.button
              key={session.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedSession(session);
                setIsPlaying(false);
                setCurrentTime(0);
              }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedSession.id === session.id
                  ? 'border-sage-600 bg-sage-50 shadow-md'
                  : 'border-stone-200 hover:border-sage-400 hover:bg-sage-50/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <Icon className="text-sage-600" size={20} />
                <span className="text-xs text-stone-500">{formatTime(session.duration)}</span>
              </div>
              <h3 className="font-medium text-stone-800 mb-1">{session.title}</h3>
              <p className="text-xs text-stone-600 line-clamp-2">{session.description}</p>
              <div className="mt-2">
                <span className="text-xs px-2 py-1 bg-stone-100 rounded-full text-stone-600">
                  {session.category.replace('-', ' ')}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-soft overflow-hidden"
      >
        {/* Visualization Area */}
        <div className={`relative h-64 bg-gradient-to-br ${soundColor} flex items-center justify-center`}>
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 w-32 h-32 rounded-full bg-white/20"
                    animate={{
                      scale: [1, 2 + i * 0.5, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: i * 1.5
                    }}
                  />
                ))}
                <div className="relative w-32 h-32 rounded-full bg-white/30 flex items-center justify-center">
                  <SoundIcon className="text-white" size={48} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Headphones className="text-white" size={48} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/30 to-transparent">
            <h3 className="text-2xl font-light text-white mb-1">{selectedSession.title}</h3>
            <p className="text-white/80 text-sm">{selectedSession.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-100">
          <motion.div
            className="h-1 bg-sage-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Controls */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-stone-600">{formatTime(currentTime)}</span>
            <div className="flex-1 mx-4">
              <div className="text-center text-sm text-stone-600">
                {selectedSession.backgroundSound && (
                  <span className="inline-flex items-center gap-1">
                    <SoundIcon size={16} />
                    {NATURE_SOUNDS[selectedSession.backgroundSound].label}
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm text-stone-600">{formatTime(selectedSession.duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="p-3 rounded-full hover:bg-stone-100 transition-colors"
              >
                {isMuted ? <VolumeX className="text-stone-700" size={24} /> : <Volume2 className="text-stone-700" size={24} />}
              </motion.button>

              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-2"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setVolume(newVolume);
                        setIsMuted(newVolume === 0);
                      }}
                      className="w-24 h-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playPause}
              className="p-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={skipSession}
              className="p-3 rounded-full hover:bg-stone-100 transition-colors"
            >
              <SkipForward className="text-stone-700" size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-sage-50 rounded-2xl p-6"
      >
        <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
          <Clock className="text-sage-600" size={20} />
          Meditation Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-stone-700">Preparation</h4>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>• Find a quiet, comfortable space</li>
              <li>• Sit or lie in a relaxed position</li>
              <li>• Use headphones for best experience</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-stone-700">During Practice</h4>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>• Close your eyes or soften your gaze</li>
              <li>• Focus on your breath naturally</li>
              <li>• Gently return focus when mind wanders</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-stone-600">
            <strong>Remember:</strong> There's no "perfect" meditation. Be patient and kind with yourself.
            Regular practice, even just 5 minutes daily, can make a significant difference in your well-being.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
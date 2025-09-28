'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  Sun,
  Cloud,
  CloudRain,
  Moon,
  Heart,
  Activity,
  Coffee,
  Smile,
  Frown,
  Meh,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { MoodEntry } from '@/lib/types/assessment';

const EMOTIONS = [
  { value: 'happy', label: 'Happy', icon: '😊' },
  { value: 'calm', label: 'Calm', icon: '😌' },
  { value: 'anxious', label: 'Anxious', icon: '😰' },
  { value: 'sad', label: 'Sad', icon: '😢' },
  { value: 'angry', label: 'Angry', icon: '😠' },
  { value: 'excited', label: 'Excited', icon: '🤗' },
  { value: 'tired', label: 'Tired', icon: '😴' },
  { value: 'stressed', label: 'Stressed', icon: '😫' },
  { value: 'grateful', label: 'Grateful', icon: '🙏' },
  { value: 'confused', label: 'Confused', icon: '😕' }
];

const ACTIVITIES = [
  { value: 'exercise', label: 'Exercise', icon: Activity },
  { value: 'meditation', label: 'Meditation', icon: Heart },
  { value: 'socializing', label: 'Socializing', icon: Smile },
  { value: 'work', label: 'Work', icon: Coffee },
  { value: 'reading', label: 'Reading', icon: CalendarIcon },
  { value: 'nature', label: 'Nature', icon: Sun },
  { value: 'creative', label: 'Creative', icon: Heart },
  { value: 'rest', label: 'Rest', icon: Moon }
];

export default function MoodTrackerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<MoodEntry>>({
    mood: 5,
    emotions: [],
    activities: [],
    sleepHours: 7,
    energyLevel: 5
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1),
      1
    ));
  };

  const getMoodForDate = (date: Date) => {
    const entry = moodEntries.find(e =>
      new Date(e.date).toDateString() === date.toDateString()
    );
    return entry?.mood;
  };

  const getMoodColor = (mood: number | undefined) => {
    if (!mood) return 'bg-stone-100';
    if (mood >= 8) return 'bg-green-400';
    if (mood >= 6) return 'bg-yellow-400';
    if (mood >= 4) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="text-green-600" size={24} />;
    if (mood >= 5) return <Meh className="text-yellow-600" size={24} />;
    return <Frown className="text-red-600" size={24} />;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const existingEntry = moodEntries.find(e =>
      new Date(e.date).toDateString() === date.toDateString()
    );

    if (existingEntry) {
      setCurrentEntry(existingEntry);
    } else {
      setCurrentEntry({
        mood: 5,
        emotions: [],
        activities: [],
        sleepHours: 7,
        energyLevel: 5
      });
    }
    setShowEntryForm(true);
  };

  const saveEntry = () => {
    const newEntry: MoodEntry = {
      id: `entry-${Date.now()}`,
      date: selectedDate,
      mood: currentEntry.mood || 5,
      emotions: currentEntry.emotions || [],
      activities: currentEntry.activities || [],
      notes: currentEntry.notes,
      sleepHours: currentEntry.sleepHours,
      energyLevel: currentEntry.energyLevel
    };

    setMoodEntries(prev => [
      ...prev.filter(e => new Date(e.date).toDateString() !== selectedDate.toDateString()),
      newEntry
    ]);
    setShowEntryForm(false);
  };

  const calculateMoodTrend = () => {
    const sortedEntries = [...moodEntries].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (sortedEntries.length < 2) return 'stable';

    const recentAvg = sortedEntries.slice(-7).reduce((sum, e) => sum + e.mood, 0) /
      Math.min(7, sortedEntries.length);
    const previousAvg = sortedEntries.slice(-14, -7).reduce((sum, e) => sum + e.mood, 0) /
      Math.min(7, sortedEntries.slice(-14, -7).length);

    if (recentAvg > previousAvg + 0.5) return 'improving';
    if (recentAvg < previousAvg - 0.5) return 'declining';
    return 'stable';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const mood = getMoodForDate(date);

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateClick(date)}
          className={`aspect-square rounded-lg border-2 transition-all ${
            isToday ? 'border-sage-600 font-bold' : 'border-stone-200'
          } hover:border-sage-400 hover:shadow-md relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-stone-800 z-10">{day}</span>
          </div>
          {mood && (
            <div className={`absolute inset-0 ${getMoodColor(mood)} opacity-30`} />
          )}
        </motion.button>
      );
    }

    return days;
  };

  const trend = calculateMoodTrend();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light text-stone-800 mb-4">Mood Journal</h1>
          <p className="text-stone-600 text-lg">Track your emotional journey and discover patterns</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-stone-800">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-stone-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded opacity-30" />
                  <span className="text-stone-600">Great</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded opacity-30" />
                  <span className="text-stone-600">Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded opacity-30" />
                  <span className="text-stone-600">Okay</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-400 rounded opacity-30" />
                  <span className="text-stone-600">Difficult</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats and Insights */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <h3 className="text-lg font-medium text-stone-800 mb-4">Mood Trend</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-light text-stone-800">
                    {trend === 'improving' && 'Improving'}
                    {trend === 'stable' && 'Stable'}
                    {trend === 'declining' && 'Needs Attention'}
                  </div>
                  <p className="text-sm text-stone-600 mt-1">Over the past week</p>
                </div>
                {trend === 'improving' && <TrendingUp className="text-green-600" size={32} />}
                {trend === 'declining' && <TrendingDown className="text-red-600" size={32} />}
                {trend === 'stable' && <Activity className="text-blue-600" size={32} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <h3 className="text-lg font-medium text-stone-800 mb-4">Recent Entries</h3>
              <div className="space-y-3">
                {moodEntries.slice(-3).reverse().map(entry => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-800">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-stone-600">
                        {entry.emotions.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    {getMoodIcon(entry.mood)}
                  </div>
                ))}
                {moodEntries.length === 0 && (
                  <p className="text-stone-500 text-sm">No entries yet</p>
                )}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => handleDateClick(new Date())}
              className="w-full bg-sage-600 text-white rounded-full py-3 px-6 flex items-center justify-center gap-2 hover:bg-sage-700 transition-colors"
            >
              <Plus size={20} />
              Add Today's Entry
            </motion.button>
          </div>
        </div>
      </div>

      {/* Entry Form Modal */}
      <AnimatePresence>
        {showEntryForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEntryForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            >
              <h2 className="text-2xl font-light text-stone-800 mb-6">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>

              <div className="space-y-6">
                {/* Mood Rating */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    How are you feeling today?
                  </label>
                  <div className="flex justify-between items-center">
                    <Frown className="text-stone-400" size={24} />
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                          key={num}
                          onClick={() => setCurrentEntry({ ...currentEntry, mood: num })}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            currentEntry.mood === num
                              ? 'border-sage-600 bg-sage-100'
                              : 'border-stone-200 hover:border-sage-400'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <Smile className="text-stone-400" size={24} />
                  </div>
                </div>

                {/* Emotions */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    What emotions did you experience?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {EMOTIONS.map(emotion => (
                      <button
                        key={emotion.value}
                        onClick={() => {
                          const emotions = currentEntry.emotions || [];
                          if (emotions.includes(emotion.value)) {
                            setCurrentEntry({
                              ...currentEntry,
                              emotions: emotions.filter(e => e !== emotion.value)
                            });
                          } else {
                            setCurrentEntry({
                              ...currentEntry,
                              emotions: [...emotions, emotion.value]
                            });
                          }
                        }}
                        className={`p-2 rounded-lg border-2 transition-all text-sm ${
                          currentEntry.emotions?.includes(emotion.value)
                            ? 'border-sage-600 bg-sage-100'
                            : 'border-stone-200 hover:border-sage-400'
                        }`}
                      >
                        <span className="text-xl">{emotion.icon}</span>
                        <div className="text-xs mt-1">{emotion.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Activities
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ACTIVITIES.map(activity => {
                      const Icon = activity.icon;
                      return (
                        <button
                          key={activity.value}
                          onClick={() => {
                            const activities = currentEntry.activities || [];
                            if (activities.includes(activity.value)) {
                              setCurrentEntry({
                                ...currentEntry,
                                activities: activities.filter(a => a !== activity.value)
                              });
                            } else {
                              setCurrentEntry({
                                ...currentEntry,
                                activities: [...activities, activity.value]
                              });
                            }
                          }}
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                            currentEntry.activities?.includes(activity.value)
                              ? 'border-sage-600 bg-sage-100'
                              : 'border-stone-200 hover:border-sage-400'
                          }`}
                        >
                          <Icon size={20} />
                          <span className="text-xs">{activity.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sleep and Energy */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Sleep (hours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={currentEntry.sleepHours || 7}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        sleepHours: parseFloat(e.target.value)
                      })}
                      className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-sage-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Energy Level
                    </label>
                    <select
                      value={currentEntry.energyLevel || 5}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        energyLevel: parseInt(e.target.value)
                      })}
                      className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-sage-400 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}/10</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Journal Entry (optional)
                  </label>
                  <textarea
                    value={currentEntry.notes || ''}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                    placeholder="How was your day? What's on your mind?"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-sage-400 focus:outline-none resize-none"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowEntryForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEntry}
                    className="flex-1 px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
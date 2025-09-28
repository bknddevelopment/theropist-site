'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Wind, Info } from 'lucide-react';
import { BREATHING_EXERCISES } from '@/lib/data/assessments';
import { BreathingExercise as BreathingExerciseType } from '@/lib/types/assessment';

export default function BreathingExercise() {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExerciseType>(BREATHING_EXERCISES[0]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startExercise = () => {
    setIsActive(true);
    setIsPaused(false);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeRemaining(selectedExercise.inhaleSeconds);
    setTotalTimeElapsed(0);
  };

  const pauseExercise = () => {
    setIsPaused(!isPaused);
  };

  const resetExercise = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentCycle(0);
    setCurrentPhase('inhale');
    setTimeRemaining(0);
    setTotalTimeElapsed(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0.1) return 0;
          return prev - 0.1;
        });
        setTotalTimeElapsed(prev => prev + 0.1);
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    if (isActive && !isPaused && timeRemaining <= 0) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeRemaining(selectedExercise.holdSeconds);
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeRemaining(selectedExercise.exhaleSeconds);
      } else if (currentPhase === 'exhale') {
        if (currentCycle < selectedExercise.cycles) {
          setCurrentCycle(prev => prev + 1);
          setCurrentPhase('inhale');
          setTimeRemaining(selectedExercise.inhaleSeconds);
        } else {
          // Exercise complete
          resetExercise();
        }
      }
    }
  }, [timeRemaining, currentPhase, currentCycle, isActive, isPaused, selectedExercise]);

  const getCircleScale = () => {
    if (!isActive) return 1;
    switch (currentPhase) {
      case 'inhale':
        return 1 + (1 - timeRemaining / selectedExercise.inhaleSeconds) * 0.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 1.5 - (1 - timeRemaining / selectedExercise.exhaleSeconds) * 0.5;
      default:
        return 1;
    }
  };

  const getPhaseText = () => {
    if (!isActive) return 'Ready to begin';
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return '';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold':
        return 'from-purple-400 to-purple-600';
      case 'exhale':
        return 'from-green-400 to-green-600';
      default:
        return 'from-sage-400 to-sage-600';
    }
  };

  const formatTime = (seconds: number) => {
    return seconds.toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3">Breathing Exercises</h2>
        <p className="text-stone-600">Find calm through guided breathing techniques</p>
      </div>

      {/* Exercise Selector */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {BREATHING_EXERCISES.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedExercise.id === exercise.id
                  ? 'border-sage-600 bg-sage-50'
                  : 'border-stone-200 hover:border-sage-400 hover:bg-sage-50/50'
              }`}
            >
              <h3 className="font-medium text-stone-800 mb-1">{exercise.name}</h3>
              <p className="text-xs text-stone-600 mb-2">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-stone-100 rounded-full text-stone-600">
                  {exercise.difficulty}
                </span>
                <span className="text-xs text-stone-500">{exercise.cycles} cycles</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {/* Breathing Animation */}
      <div className="relative h-96 flex items-center justify-center mb-8">
        <motion.div
          className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-20`}
          animate={{
            scale: getCircleScale(),
            transition: {
              duration: currentPhase === 'inhale' ? selectedExercise.inhaleSeconds :
                       currentPhase === 'hold' ? 0 :
                       selectedExercise.exhaleSeconds,
              ease: 'easeInOut'
            }
          }}
        />
        <motion.div
          className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-30`}
          animate={{
            scale: getCircleScale() * 0.8,
            transition: {
              duration: currentPhase === 'inhale' ? selectedExercise.inhaleSeconds :
                       currentPhase === 'hold' ? 0 :
                       selectedExercise.exhaleSeconds,
              ease: 'easeInOut'
            }
          }}
        />
        <motion.div
          className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-50 flex items-center justify-center`}
          animate={{
            scale: getCircleScale() * 0.6,
            transition: {
              duration: currentPhase === 'inhale' ? selectedExercise.inhaleSeconds :
                       currentPhase === 'hold' ? 0 :
                       selectedExercise.exhaleSeconds,
              ease: 'easeInOut'
            }
          }}
        >
          <Wind className="text-white" size={48} />
        </motion.div>

        {/* Phase Text */}
        <div className="absolute text-center">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-3xl font-light text-stone-800 mb-2"
          >
            {getPhaseText()}
          </motion.div>
          {isActive && (
            <div className="text-5xl font-light text-stone-600">
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="text-center text-sm text-stone-600 mb-2">
              Cycle {currentCycle} of {selectedExercise.cycles}
            </div>
            <div className="bg-stone-200 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-sage-600 h-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentCycle - 1) / selectedExercise.cycles) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        {!isActive ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startExercise}
            className="flex items-center gap-2 px-8 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
          >
            <Play size={20} />
            Start Exercise
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseExercise}
              className="flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
              {isPaused ? 'Resume' : 'Pause'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExercise}
              className="flex items-center gap-2 px-6 py-3 bg-stone-600 text-white rounded-full hover:bg-stone-700 transition-colors"
            >
              <RotateCcw size={20} />
              Reset
            </motion.button>
          </>
        )}
      </div>

      {/* Exercise Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-sage-50 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-sage-600" size={20} />
          <h3 className="font-medium text-stone-800">Exercise Pattern</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-light text-blue-600 mb-1">
              {selectedExercise.inhaleSeconds}s
            </div>
            <div className="text-sm text-stone-600">Inhale</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-light text-purple-600 mb-1">
              {selectedExercise.holdSeconds}s
            </div>
            <div className="text-sm text-stone-600">Hold</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-light text-green-600 mb-1">
              {selectedExercise.exhaleSeconds}s
            </div>
            <div className="text-sm text-stone-600">Exhale</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg">
          <h4 className="font-medium text-stone-800 mb-2">Benefits</h4>
          <ul className="text-sm text-stone-600 space-y-1">
            <li>• Reduces stress and anxiety</li>
            <li>• Improves focus and concentration</li>
            <li>• Promotes relaxation and better sleep</li>
            <li>• Regulates the nervous system</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
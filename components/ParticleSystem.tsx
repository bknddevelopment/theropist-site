'use client';

import React, { useState, useEffect } from 'react';
import { useParticles, Season } from '@/lib/hooks/useParticles';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Settings, Leaf, Flower2, Snowflake, Sun } from 'lucide-react';

interface ParticleSystemProps {
  className?: string;
  autoDetectSeason?: boolean;
  defaultEnabled?: boolean;
  defaultParticleCount?: number;
  defaultPerformanceMode?: 'low' | 'medium' | 'high';
}

const seasonIcons = {
  spring: Flower2,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,
};

const seasonNames = {
  spring: 'Spring Blossoms',
  summer: 'Summer Light',
  autumn: 'Autumn Leaves',
  winter: 'Winter Snow',
};

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

export default function ParticleSystem({
  className = '',
  autoDetectSeason = true,
  defaultEnabled = true,
  defaultParticleCount = 25,
  defaultPerformanceMode = 'high',
}: ParticleSystemProps) {
  const [showControls, setShowControls] = useState(false);
  const [season, setSeason] = useState<Season>(autoDetectSeason ? getCurrentSeason() : 'spring');
  const [particleCount, setParticleCount] = useState(defaultParticleCount);
  const [performanceMode, setPerformanceMode] = useState<'low' | 'medium' | 'high'>(defaultPerformanceMode);
  const [mouseInteraction, setMouseInteraction] = useState(true);

  const {
    canvasRef,
    isEnabled,
    setIsEnabled,
    currentFps,
  } = useParticles({
    enabled: defaultEnabled,
    particleCount,
    season,
    mouseInteraction,
    performanceMode,
  });

  // Auto-detect season on mount and periodically
  useEffect(() => {
    if (!autoDetectSeason) return;

    const updateSeason = () => {
      setSeason(getCurrentSeason());
    };

    updateSeason();
    // Check season every hour
    const interval = setInterval(updateSeason, 3600000);

    return () => clearInterval(interval);
  }, [autoDetectSeason]);

  // Keyboard shortcut to toggle particles
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setIsEnabled]);

  const SeasonIcon = seasonIcons[season];

  return (
    <>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-10 ${className}`}
        style={{ opacity: isEnabled ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        aria-hidden="true"
      />

      {/* Control Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-20 p-3 bg-cream/90 backdrop-blur-sm border border-earth-subtle rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
        aria-label="Toggle particle effects controls"
      >
        <Sparkles
          className={`w-5 h-5 transition-colors ${
            isEnabled ? 'text-terracotta' : 'text-stone'
          }`}
        />
      </button>

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-20 w-80 bg-cream/95 backdrop-blur-md border border-sage/20 rounded-2xl shadow-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-forest font-cormorant text-xl font-semibold">
                Ambient Effects
              </h3>
              <button
                onClick={() => setShowControls(false)}
                className="p-1 hover:bg-sage/10 rounded-lg transition-colors"
                aria-label="Close controls"
              >
                <X className="w-4 h-4 text-stone" />
              </button>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-sourceSans text-forest">
                Particles Enabled
              </span>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEnabled ? 'bg-terracotta' : 'bg-stone/30'
                }`}
                aria-label="Toggle particles"
                role="switch"
                aria-checked={isEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Season Selector */}
            <div className="mb-6">
              <label className="text-sm font-sourceSans text-forest block mb-2">
                Season Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(seasonNames) as Season[]).map((s) => {
                  const Icon = seasonIcons[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        season === s
                          ? 'bg-sage/20 text-forest border border-sage/30'
                          : 'hover:bg-sage/10 text-stone'
                      }`}
                      aria-label={`Select ${seasonNames[s]} theme`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-sourceSans">
                        {seasonNames[s]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Particle Count */}
            <div className="mb-6">
              <label className="text-sm font-sourceSans text-forest block mb-2">
                Particle Density: {particleCount}
              </label>
              <input
                type="range"
                min="10"
                max="40"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full h-2 bg-sage/20 rounded-lg appearance-none cursor-pointer slider"
                aria-label="Adjust particle density"
              />
            </div>

            {/* Performance Mode */}
            <div className="mb-6">
              <label className="text-sm font-sourceSans text-forest block mb-2">
                Performance Mode
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPerformanceMode(mode)}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-lg capitalize transition-all ${
                      performanceMode === mode
                        ? 'bg-terracotta/20 text-forest border border-terracotta/30'
                        : 'hover:bg-sage/10 text-stone'
                    }`}
                    aria-label={`Set ${mode} performance mode`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Mouse Interaction Toggle */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-sourceSans text-forest">
                Mouse Interaction
              </span>
              <button
                onClick={() => setMouseInteraction(!mouseInteraction)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  mouseInteraction ? 'bg-sage' : 'bg-stone/30'
                }`}
                aria-label="Toggle mouse interaction"
                role="switch"
                aria-checked={mouseInteraction}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    mouseInteraction ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Performance Stats */}
            <div className="pt-4 border-t border-sage/20">
              <div className="flex items-center justify-between text-xs text-stone">
                <span className="font-sourceSans">FPS: {currentFps}</span>
                <span className="font-sourceSans">
                  <kbd className="px-1.5 py-0.5 bg-sage/10 rounded text-forest">
                    Cmd+P
                  </kbd>{' '}
                  to toggle
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom styles for range slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #9e5a3f;
          border-radius: 50%;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #9e5a3f;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .slider:focus {
          outline: none;
        }

        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 2px #faf6f0, 0 0 0 4px #9e5a3f;
        }

        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 2px #faf6f0, 0 0 0 4px #9e5a3f;
        }
      `}</style>
    </>
  );
}
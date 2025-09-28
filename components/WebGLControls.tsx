'use client';

import { useState, useEffect } from 'react';
import { BackgroundEffect, QualityLevel } from './WebGLBackground';

interface WebGLControlsProps {
  onEffectChange: (effect: BackgroundEffect) => void;
  onQualityChange: (quality: QualityLevel) => void;
  onIntensityChange: (intensity: number) => void;
  onToggle: (enabled: boolean) => void;
  initialEffect?: BackgroundEffect;
  initialQuality?: QualityLevel;
  initialIntensity?: number;
  initialEnabled?: boolean;
}

const WebGLControls: React.FC<WebGLControlsProps> = ({
  onEffectChange,
  onQualityChange,
  onIntensityChange,
  onToggle,
  initialEffect = 'water',
  initialQuality = 'medium',
  initialIntensity = 0.5,
  initialEnabled = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [effect, setEffect] = useState<BackgroundEffect>(initialEffect);
  const [quality, setQuality] = useState<QualityLevel>(initialQuality);
  const [intensity, setIntensity] = useState(initialIntensity);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setEnabled(false);
      onToggle(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setEnabled(false);
        onToggle(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [onToggle]);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      effect,
      quality,
      intensity,
      enabled
    };
    localStorage.setItem('webgl-preferences', JSON.stringify(preferences));
  }, [effect, quality, intensity, enabled]);

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('webgl-preferences');
    if (stored) {
      try {
        const preferences = JSON.parse(stored);
        setEffect(preferences.effect || initialEffect);
        setQuality(preferences.quality || initialQuality);
        setIntensity(preferences.intensity ?? initialIntensity);
        setEnabled(preferences.enabled ?? initialEnabled);

        onEffectChange(preferences.effect || initialEffect);
        onQualityChange(preferences.quality || initialQuality);
        onIntensityChange(preferences.intensity ?? initialIntensity);
        onToggle(preferences.enabled ?? initialEnabled);
      } catch (e) {
        console.error('Failed to load WebGL preferences:', e);
      }
    }
  }, []);

  const handleEffectChange = (newEffect: BackgroundEffect) => {
    setEffect(newEffect);
    onEffectChange(newEffect);
  };

  const handleQualityChange = (newQuality: QualityLevel) => {
    setQuality(newQuality);
    onQualityChange(newQuality);
  };

  const handleIntensityChange = (newIntensity: number) => {
    setIntensity(newIntensity);
    onIntensityChange(newIntensity);
  };

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onToggle(newEnabled);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="WebGL Background Settings"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      <div
        className={`fixed bottom-20 right-4 z-40 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Background Settings
          </h3>

          {reducedMotion && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Animations disabled due to reduced motion preference
              </p>
            </div>
          )}

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between mb-6">
            <label htmlFor="enable-webgl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Background Animation
            </label>
            <button
              id="enable-webgl"
              role="switch"
              aria-checked={enabled}
              onClick={handleToggle}
              disabled={reducedMotion}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
              } ${reducedMotion ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {enabled && !reducedMotion && (
            <>
              {/* Effect Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Animation Effect
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['water', 'blobs', 'sand', 'aurora'] as BackgroundEffect[]).map((effectType) => (
                    <button
                      key={effectType}
                      onClick={() => handleEffectChange(effectType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        effect === effectType
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {effectType.charAt(0).toUpperCase() + effectType.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Performance Quality
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as QualityLevel[]).map((qualityLevel) => (
                    <button
                      key={qualityLevel}
                      onClick={() => handleQualityChange(qualityLevel)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        quality === qualityLevel
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {qualityLevel.charAt(0).toUpperCase() + qualityLevel.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {quality === 'low' && 'Lower GPU usage, better battery life'}
                  {quality === 'medium' && 'Balanced performance and quality'}
                  {quality === 'high' && 'Best visual quality, higher GPU usage'}
                </p>
              </div>

              {/* Intensity Slider */}
              <div className="mb-4">
                <label htmlFor="intensity" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Animation Intensity: {Math.round(intensity * 100)}%
                </label>
                <input
                  id="intensity"
                  type="range"
                  min="0"
                  max="100"
                  value={intensity * 100}
                  onChange={(e) => handleIntensityChange(Number(e.target.value) / 100)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </>
          )}

          {/* Keyboard Shortcut Info */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Alt</kbd> + <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">B</kbd> to toggle background
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default WebGLControls;
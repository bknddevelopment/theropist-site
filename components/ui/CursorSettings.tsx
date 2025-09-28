'use client';

import React, { useState, useEffect } from 'react';

interface CursorSettingsProps {
  onToggle?: (enabled: boolean) => void;
}

export const CursorSettings: React.FC<CursorSettingsProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [cursorStyle, setCursorStyle] = useState<'simple' | 'advanced'>('simple');

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cursor-preferences');
    if (stored) {
      const prefs = JSON.parse(stored);
      setCursorEnabled(prefs.enabled ?? true);
      setCursorStyle(prefs.style ?? 'simple');
    }
  }, []);

  // Save preferences
  const savePreferences = (enabled: boolean, style: 'simple' | 'advanced') => {
    const prefs = { enabled, style };
    localStorage.setItem('cursor-preferences', JSON.stringify(prefs));
    if (onToggle) {
      onToggle(enabled);
    }
  };

  const handleToggleCursor = () => {
    const newEnabled = !cursorEnabled;
    setCursorEnabled(newEnabled);
    savePreferences(newEnabled, cursorStyle);
  };

  const handleStyleChange = (style: 'simple' | 'advanced') => {
    setCursorStyle(style);
    savePreferences(cursorEnabled, style);
  };

  return (
    <>
      {/* Settings Button - Fixed position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9000] p-3 rounded-full bg-sage/20 backdrop-blur-sm border border-sage/30 hover:bg-sage/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream"
        aria-label="Cursor Settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-forest"
        >
          <path
            d="M3 3L8.5 17L11 11L17 8.5L3 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="14" r="5" fill="currentColor" opacity="0.2" />
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path
            d="M14 11.5V14L16 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[9000] w-72 p-4 bg-cream/95 backdrop-blur-sm rounded-lg border border-sage/30 shadow-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-crimson font-semibold text-forest">
              Cursor Settings
            </h3>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="cursor-toggle" className="text-sm text-forest">
                Custom Cursor
              </label>
              <button
                id="cursor-toggle"
                role="switch"
                aria-checked={cursorEnabled}
                onClick={handleToggleCursor}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2
                  ${cursorEnabled ? 'bg-sage' : 'bg-stone/30'}
                `}
              >
                <span className="sr-only">Enable custom cursor</span>
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${cursorEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Style Selection */}
            {cursorEnabled && (
              <div className="space-y-2">
                <p className="text-sm text-forest">Cursor Style</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStyleChange('simple')}
                    className={`
                      px-3 py-2 text-sm rounded border transition-colors
                      ${cursorStyle === 'simple'
                        ? 'bg-sage/20 border-sage text-forest'
                        : 'bg-transparent border-sage/30 text-forest/70 hover:bg-sage/10'
                      }
                    `}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => handleStyleChange('advanced')}
                    className={`
                      px-3 py-2 text-sm rounded border transition-colors
                      ${cursorStyle === 'advanced'
                        ? 'bg-sage/20 border-sage text-forest'
                        : 'bg-transparent border-sage/30 text-forest/70 hover:bg-sage/10'
                      }
                    `}
                  >
                    Advanced
                  </button>
                </div>
              </div>
            )}

            {/* Info Text */}
            <div className="pt-2 border-t border-sage/20">
              <p className="text-xs text-forest/70">
                {cursorEnabled
                  ? cursorStyle === 'advanced'
                    ? 'Advanced cursor with particle effects and ripples'
                    : 'Simple organic cursor with smooth morphing'
                  : 'Using system default cursor'}
              </p>
            </div>

            {/* Accessibility Note */}
            <div className="bg-sand/50 rounded p-2">
              <p className="text-xs text-forest/80">
                <strong>Note:</strong> Custom cursor is automatically disabled on touch devices and when reduced motion is preferred.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
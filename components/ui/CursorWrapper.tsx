'use client';

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './CustomCursor';
import { CustomCursorAdvanced } from './CustomCursorAdvanced';
import { CursorSettings } from './CursorSettings';

export const CursorWrapper: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [style, setStyle] = useState<'simple' | 'advanced'>('simple');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Load preferences from localStorage
    const stored = localStorage.getItem('cursor-preferences');
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        setEnabled(prefs.enabled ?? true);
        setStyle(prefs.style ?? 'simple');
      } catch (e) {
        console.error('Failed to load cursor preferences:', e);
      }
    }
  }, []);

  // Handle preference changes
  const handleToggle = (newEnabled: boolean) => {
    setEnabled(newEnabled);
  };

  // Update style when preferences change
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('cursor-preferences');
      if (stored) {
        try {
          const prefs = JSON.parse(stored);
          setEnabled(prefs.enabled ?? true);
          setStyle(prefs.style ?? 'simple');
        } catch (e) {
          console.error('Failed to update cursor preferences:', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {enabled && (
        style === 'advanced' ? <CustomCursorAdvanced /> : <CustomCursor />
      )}
      <CursorSettings onToggle={handleToggle} />
    </>
  );
};
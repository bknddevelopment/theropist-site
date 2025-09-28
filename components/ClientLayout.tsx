'use client';

import { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { BackgroundEffect, QualityLevel } from './WebGLBackground';

// Dynamically import WebGL components to prevent SSR issues
const WebGLBackground = dynamic(() => import('./WebGLBackground'), {
  ssr: false,
  loading: () => null
});

const WebGLControls = dynamic(() => import('./WebGLControls'), {
  ssr: false,
  loading: () => null
});

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [webglEffect, setWebglEffect] = useState<BackgroundEffect>('water');
  const [webglQuality, setWebglQuality] = useState<QualityLevel>('medium');
  const [webglIntensity, setWebglIntensity] = useState(0.5);
  const [webglEnabled, setWebglEnabled] = useState(true);

  // Keyboard shortcut for toggling background
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setWebglEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* WebGL Background */}
      <WebGLBackground
        effect={webglEffect}
        quality={webglQuality}
        intensity={webglIntensity}
        seasonal={true}
        disabled={!webglEnabled}
      />

      {/* WebGL Controls */}
      <WebGLControls
        onEffectChange={setWebglEffect}
        onQualityChange={setWebglQuality}
        onIntensityChange={setWebglIntensity}
        onToggle={setWebglEnabled}
        initialEffect={webglEffect}
        initialQuality={webglQuality}
        initialIntensity={webglIntensity}
        initialEnabled={webglEnabled}
      />

      {children}
    </>
  );
}
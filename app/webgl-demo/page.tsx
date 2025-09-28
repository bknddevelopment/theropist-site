'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BackgroundEffect, QualityLevel } from '@/components/WebGLBackground';

// Dynamically import WebGL components
const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), {
  ssr: false,
  loading: () => null
});

const WebGLControls = dynamic(() => import('@/components/WebGLControls'), {
  ssr: false,
  loading: () => null
});

export default function WebGLDemoPage() {
  const [webglEffect, setWebglEffect] = useState<BackgroundEffect>('water');
  const [webglQuality, setWebglQuality] = useState<QualityLevel>('medium');
  const [webglIntensity, setWebglIntensity] = useState(0.5);
  const [webglEnabled, setWebglEnabled] = useState(true);

  return (
    <div className="min-h-screen relative">
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

      {/* Demo Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-light text-gray-800 mb-8">
            WebGL Background Demo
          </h1>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Advanced WebGL Effects
            </h2>
            <p className="text-gray-600 mb-6">
              This page demonstrates the advanced WebGL background system with organic animations.
              The effects are GPU-accelerated and include:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-700 mb-3">Available Effects</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Water Ripples:</strong> Gentle, calming water effects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Organic Blobs:</strong> Flowing, morphing shapes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong>Flowing Sand:</strong> Desert-like dune patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Aurora:</strong> Northern lights gradients</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-700 mb-3">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Seasonal color themes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Scroll-responsive animations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Performance quality controls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Canvas 2D fallback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Accessibility controls</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Performance Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Current Effect: <span className="font-medium">{webglEffect}</span>
              </p>
              <p>
                Quality Level: <span className="font-medium">{webglQuality}</span>
              </p>
              <p>
                Intensity: <span className="font-medium">{Math.round(webglIntensity * 100)}%</span>
              </p>
              <p>
                Status: <span className="font-medium">{webglEnabled ? 'Enabled' : 'Disabled'}</span>
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Controls
            </h2>
            <p className="text-gray-600 mb-4">
              Use the settings button in the bottom-right corner to adjust the WebGL effects.
              You can also press <kbd className="px-2 py-1 bg-gray-100 rounded">Alt</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded">B</kbd> to toggle the background.
            </p>
            <p className="text-gray-600">
              The effects automatically adjust to your system's performance capabilities and respect
              reduced motion preferences for accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
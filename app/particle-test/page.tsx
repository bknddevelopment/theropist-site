'use client';

import ParticleSystem from '@/components/ParticleSystem';

export default function ParticleTestPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ParticleSystem
        autoDetectSeason={true}
        defaultEnabled={true}
        defaultParticleCount={25}
        defaultPerformanceMode="high"
      />

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <h1 className="text-4xl font-cormorant text-forest mb-4">
            Particle System Test
          </h1>
          <p className="text-lg text-stone mb-6">
            Move your mouse around to see particles react
          </p>
          <div className="text-sm text-stone/60 space-y-1">
            <p>• Particles float organically with natural movement</p>
            <p>• They gently drift away from your cursor</p>
            <p>• Click the sparkles button to access controls</p>
            <p>• Press Cmd+P to toggle particles on/off</p>
          </div>
        </div>
      </div>
    </div>
  );
}
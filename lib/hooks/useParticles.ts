import { useEffect, useRef, useState, useCallback } from 'react';

// Particle types for different seasons
export type ParticleType = 'pollen' | 'light-orb' | 'sparkle' | 'cherry-blossom' | 'leaf' | 'snowflake';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: ParticleType;
  color: string;
  glow: number;
  lifespan: number;
  age: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface UseParticlesOptions {
  enabled?: boolean;
  particleCount?: number;
  season?: Season;
  mouseInteraction?: boolean;
  performanceMode?: 'low' | 'medium' | 'high';
}

// Earth-tone color palettes for each season
const SEASON_COLORS = {
  spring: [
    'rgba(139, 149, 116, 0.6)', // sage light
    'rgba(212, 165, 116, 0.5)', // golden hour light
    'rgba(250, 246, 240, 0.8)', // cream
    'rgba(255, 182, 193, 0.4)', // light pink for cherry blossoms
  ],
  summer: [
    'rgba(107, 117, 89, 0.6)',  // sage
    'rgba(158, 122, 77, 0.5)',  // golden hour
    'rgba(232, 213, 196, 0.7)', // sand
    'rgba(250, 246, 240, 0.9)', // cream
  ],
  autumn: [
    'rgba(158, 90, 63, 0.7)',   // terracotta
    'rgba(125, 63, 32, 0.6)',   // rust
    'rgba(139, 105, 20, 0.5)',  // warning/golden
    'rgba(92, 64, 51, 0.6)',    // bark
  ],
  winter: [
    'rgba(250, 246, 240, 0.9)', // cream
    'rgba(247, 243, 237, 0.8)', // bone
    'rgba(232, 213, 196, 0.5)', // sand
    'rgba(118, 112, 102, 0.3)', // ash
  ],
};

// Particle type configurations for each season
const SEASON_PARTICLES: Record<Season, ParticleType[]> = {
  spring: ['cherry-blossom', 'pollen', 'light-orb'],
  summer: ['pollen', 'light-orb', 'sparkle'],
  autumn: ['leaf', 'pollen', 'sparkle'],
  winter: ['snowflake', 'light-orb', 'sparkle'],
};

export function useParticles({
  enabled = true,
  particleCount = 25,
  season = 'spring',
  mouseInteraction = true,
  performanceMode = 'high',
}: UseParticlesOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const animationIdRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);

  const [isEnabled, setIsEnabled] = useState(enabled);
  const [currentFps, setCurrentFps] = useState(60);

  // Get target FPS based on performance mode
  const targetFps = performanceMode === 'low' ? 30 : performanceMode === 'medium' ? 45 : 60;
  const frameInterval = 1000 / targetFps;

  // Create a new particle
  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const particleTypes = SEASON_PARTICLES[season];
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    const colors = SEASON_COLORS[season];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Adjust particle properties based on type
    let size = 3 + Math.random() * 5;
    let opacity = 0.3 + Math.random() * 0.4;
    let glow = 0;

    switch (type) {
      case 'cherry-blossom':
        size = 8 + Math.random() * 6;
        opacity = 0.5 + Math.random() * 0.3;
        break;
      case 'leaf':
        size = 10 + Math.random() * 8;
        opacity = 0.4 + Math.random() * 0.3;
        break;
      case 'light-orb':
        size = 4 + Math.random() * 4;
        opacity = 0.2 + Math.random() * 0.3;
        glow = 8 + Math.random() * 12;
        break;
      case 'sparkle':
        size = 2 + Math.random() * 3;
        opacity = 0.4 + Math.random() * 0.4;
        glow = 4 + Math.random() * 6;
        break;
      case 'snowflake':
        size = 4 + Math.random() * 4;
        opacity = 0.6 + Math.random() * 0.3;
        break;
      case 'pollen':
        size = 2 + Math.random() * 4;
        opacity = 0.3 + Math.random() * 0.3;
        glow = 2 + Math.random() * 4;
        break;
    }

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.2, // Slight upward bias
      size,
      opacity,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type,
      color,
      glow,
      lifespan: 1000 + Math.random() * 2000,
      age: 0,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.001 + Math.random() * 0.003,
      wobbleAmplitude: 10 + Math.random() * 20,
    };
  }, [season]);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));
  }, [particleCount, createParticle]);

  // Update particle physics
  const updateParticle = useCallback((particle: Particle, deltaTime: number, canvas: HTMLCanvasElement) => {
    // Age the particle
    particle.age += deltaTime;

    // Organic movement with sine wave wobble
    particle.wobblePhase += particle.wobbleSpeed * deltaTime;
    const wobbleX = Math.sin(particle.wobblePhase) * particle.wobbleAmplitude * 0.01;
    const wobbleY = Math.cos(particle.wobblePhase * 0.7) * particle.wobbleAmplitude * 0.01;

    // Update position with wobble
    particle.x += (particle.vx + wobbleX) * deltaTime * 0.06;
    particle.y += (particle.vy + wobbleY) * deltaTime * 0.06;

    // Mouse interaction - particles drift away from cursor
    if (mouseInteraction && mouseRef.current.x > 0 && mouseRef.current.y > 0) {
      const dx = particle.x - mouseRef.current.x;
      const dy = particle.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.02;
        particle.vy += (dy / distance) * force * 0.02;
      }
    }

    // Apply friction
    particle.vx *= 0.99;
    particle.vy *= 0.99;

    // Update rotation
    particle.rotation += particle.rotationSpeed * deltaTime;

    // Fade based on lifespan
    if (particle.age > particle.lifespan * 0.7) {
      const fadePhase = (particle.age - particle.lifespan * 0.7) / (particle.lifespan * 0.3);
      particle.opacity *= (1 - fadePhase);
    }

    // Wrap around screen edges with margin
    const margin = particle.size + particle.glow;
    if (particle.x < -margin) particle.x = canvas.width + margin;
    if (particle.x > canvas.width + margin) particle.x = -margin;
    if (particle.y < -margin) particle.y = canvas.height + margin;
    if (particle.y > canvas.height + margin) particle.y = -margin;

    // Reset particle if it's too old
    if (particle.age > particle.lifespan) {
      const newParticle = createParticle(canvas);
      Object.assign(particle, newParticle);
      particle.y = canvas.height + margin; // Start from bottom
      particle.opacity = 0; // Fade in
    }
  }, [mouseInteraction, createParticle]);

  // Draw particle based on type
  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.globalAlpha = particle.opacity;

    // Apply glow effect
    if (particle.glow > 0) {
      ctx.shadowBlur = particle.glow;
      ctx.shadowColor = particle.color;
    }

    ctx.fillStyle = particle.color;
    ctx.strokeStyle = particle.color;

    switch (particle.type) {
      case 'cherry-blossom':
        // Draw 5-petal flower
        for (let i = 0; i < 5; i++) {
          ctx.rotate((Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -particle.size / 2, particle.size / 3, particle.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'leaf':
        // Draw simple leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size / 3, particle.size, 0, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'snowflake':
        // Draw 6-pointed snowflake
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          ctx.rotate((Math.PI * 2) / 6);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -particle.size);
          ctx.stroke();
          // Small branches
          ctx.beginPath();
          ctx.moveTo(0, -particle.size * 0.5);
          ctx.lineTo(-particle.size * 0.3, -particle.size * 0.3);
          ctx.moveTo(0, -particle.size * 0.5);
          ctx.lineTo(particle.size * 0.3, -particle.size * 0.3);
          ctx.stroke();
        }
        break;

      case 'light-orb':
        // Draw glowing orb with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        const baseColor = particle.color.replace(/[\d.]+\)/, '0.8)');
        const fadedColor = particle.color.replace(/[\d.]+\)/, '0)');
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, fadedColor);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'sparkle':
        // Draw 4-pointed star
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const x = Math.cos(angle) * particle.size;
          const y = Math.sin(angle) * particle.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'pollen':
      default:
        // Draw simple circle
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.restore();
  }, []);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isEnabled) return;

    // Calculate delta time and FPS
    const deltaTime = currentTime - lastTimeRef.current;

    // Only render if enough time has passed (FPS limiting)
    if (deltaTime < frameInterval) {
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }

    lastTimeRef.current = currentTime - (deltaTime % frameInterval);

    // Update FPS counter
    frameCountRef.current++;
    if (currentTime - lastFpsUpdateRef.current >= 1000) {
      fpsRef.current = frameCountRef.current;
      setCurrentFps(fpsRef.current);
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = currentTime;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle, deltaTime, canvas);
      drawParticle(ctx, particle);
    });

    animationIdRef.current = requestAnimationFrame(animate);
  }, [isEnabled, updateParticle, drawParticle, frameInterval]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !mouseInteraction) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, [mouseInteraction]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize particles on resize
    if (particlesRef.current.length === 0) {
      initializeParticles();
    }
  }, [initializeParticles]);

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    handleResize();

    // Initialize particles
    initializeParticles();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    if (isEnabled) {
      animationIdRef.current = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isEnabled, initializeParticles, handleResize, handleMouseMove, handleMouseLeave, animate]);

  // Update enabled state
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  return {
    canvasRef,
    isEnabled,
    setIsEnabled,
    currentFps,
    particleCount: particlesRef.current.length,
  };
}
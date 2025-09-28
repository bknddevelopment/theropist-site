'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCustomCursor } from '@/lib/hooks/useCustomCursor';

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  vx: number;
  vy: number;
}

export const CustomCursorAdvanced: React.FC = () => {
  const {
    position,
    isVisible,
    isHovering,
    isClicking,
    isPointer,
    isText,
    velocity,
    isTouchDevice,
    prefersReducedMotion
  } = useCustomCursor();

  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Don't render on touch devices or when reduced motion is preferred
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  // Create ripple effect on click
  useEffect(() => {
    if (isClicking) {
      const newRipple = {
        id: Date.now(),
        x: position.x,
        y: position.y
      };
      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    }
  }, [isClicking, position.x, position.y]);

  // Initialize particle system for trail effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation loop for particles
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particle when moving
      if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
        if (Math.random() > 0.7) {
          particlesRef.current.push({
            x: position.x,
            y: position.y,
            size: Math.random() * 3 + 1,
            life: 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
          });
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.size *= 0.98;

        if (particle.life <= 0) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life * 0.3;
        ctx.fillStyle = isPointer ? 'rgba(158, 90, 63, 0.3)' : 'rgba(107, 117, 89, 0.3)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [position, velocity, isPointer]);

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      const transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      cursorRef.current.style.transform = transform;
    }
  }, [position]);

  // Cursor morphing based on state
  const getMorphStyle = () => {
    if (isClicking) {
      return {
        scale: 0.7,
        rotate: '45deg',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
      };
    } else if (isPointer) {
      return {
        scale: 1.3,
        rotate: '0deg',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
      };
    } else if (isText) {
      return {
        scale: 0.5,
        rotate: '90deg',
        borderRadius: '80% 20% 55% 45% / 55% 20% 80% 45%'
      };
    } else {
      return {
        scale: 1,
        rotate: '0deg',
        borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%'
      };
    }
  };

  const morphStyle = getMorphStyle();

  return (
    <>
      {/* Particle canvas for trail effect */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-[9998]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="absolute inset-0 animate-ping"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: '2px solid rgba(158, 90, 63, 0.4)',
              borderRadius: '50%',
            }}
          />
        </div>
      ))}

      {/* Main cursor with organic blob */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: '30px',
          height: '30px',
          marginLeft: '-15px',
          marginTop: '-15px',
          transition: 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer organic blob */}
        <svg
          viewBox="0 0 30 30"
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `scale(${morphStyle.scale}) rotate(${morphStyle.rotate})`,
            transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              <feColorMatrix
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 18 -7
                "
              />
            </filter>
          </defs>

          {/* Animated organic shape */}
          <g filter="url(#gooey)">
            <circle
              cx="15"
              cy="15"
              r="6"
              fill={isPointer ? 'rgba(158, 90, 63, 0.3)' : 'rgba(107, 117, 89, 0.3)'}
              className="animate-pulse"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="15"
              cy="15"
              r="4"
              fill={isPointer ? 'rgba(158, 90, 63, 0.5)' : 'rgba(107, 117, 89, 0.5)'}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 15 15"
                to="360 15 15"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Center dot */}
          <circle
            cx="15"
            cy="15"
            r="1.5"
            fill={isClicking ? 'rgba(158, 90, 63, 0.8)' : 'rgba(61, 47, 39, 0.6)'}
          />
        </svg>

        {/* Glow effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: isPointer ? 'rgba(158, 90, 63, 0.1)' : 'rgba(107, 117, 89, 0.1)',
            borderRadius: morphStyle.borderRadius,
            filter: 'blur(8px)',
            transform: `scale(${morphStyle.scale * 1.5})`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'breathe 3s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1.5);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.8);
          }
        }
      `}</style>
    </>
  );
};
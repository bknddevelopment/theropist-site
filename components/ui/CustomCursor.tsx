'use client';

import React, { useEffect, useRef } from 'react';
import { useCustomCursor } from '@/lib/hooks/useCustomCursor';

export const CustomCursor: React.FC = () => {
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
  const trailRef = useRef<HTMLDivElement>(null);
  const morphTimeoutRef = useRef<number | null>(null);

  // Don't render on touch devices or when reduced motion is preferred
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  // Update cursor position with smooth animation
  useEffect(() => {
    if (cursorRef.current) {
      const transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      cursorRef.current.style.transform = transform;
    }

    if (trailRef.current) {
      // Trail follows with a slight delay for organic effect
      const trailTransform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      trailRef.current.style.transform = trailTransform;
    }
  }, [position]);

  // Calculate dynamic blur based on velocity
  const motionBlur = Math.min(Math.sqrt(velocity.x ** 2 + velocity.y ** 2) * 0.1, 2);

  // Cursor size and morph based on state
  const getCursorStyle = () => {
    let scale = 1;
    let borderRadius = '50% 30% 70% 40% / 60% 40% 60% 40%'; // Organic blob shape
    let backgroundColor = 'rgba(107, 117, 89, 0.3)'; // sage with transparency
    let borderColor = 'rgba(107, 117, 89, 0.5)';

    if (isClicking) {
      scale = 0.8;
      backgroundColor = 'rgba(158, 90, 63, 0.4)'; // terracotta when clicking
      borderColor = 'rgba(158, 90, 63, 0.6)';
      borderRadius = '40% 60% 60% 40% / 70% 30% 70% 30%'; // Morph shape
    } else if (isPointer) {
      scale = 1.2;
      backgroundColor = 'rgba(158, 90, 63, 0.3)'; // terracotta for interactive
      borderColor = 'rgba(158, 90, 63, 0.5)';
      borderRadius = '60% 40% 50% 50% / 50% 60% 40% 50%'; // Different organic shape
    } else if (isText) {
      scale = 0.6;
      backgroundColor = 'rgba(85, 98, 69, 0.3)'; // moss for text
      borderColor = 'rgba(85, 98, 69, 0.5)';
      borderRadius = '70% 30% 30% 70% / 30% 70% 70% 30%'; // Elongated shape
    }

    return {
      scale,
      borderRadius,
      backgroundColor,
      borderColor
    };
  };

  const cursorStyle = getCursorStyle();

  return (
    <>
      {/* Trail/Shadow effect */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-multiply"
        style={{
          width: '32px',
          height: '32px',
          marginLeft: '-16px',
          marginTop: '-16px',
          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          opacity: isVisible ? 0.2 : 0,
        }}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundColor: 'rgba(61, 47, 39, 0.1)', // forest shadow
            borderRadius: cursorStyle.borderRadius,
            transform: `scale(${cursorStyle.scale * 1.3})`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: `blur(${4 + motionBlur}px)`,
          }}
        />
      </div>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: '24px',
          height: '24px',
          marginLeft: '-12px',
          marginTop: '-12px',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0"
          style={{
            border: `2px solid ${cursorStyle.borderColor}`,
            borderRadius: cursorStyle.borderRadius,
            transform: `scale(${cursorStyle.scale})`,
            transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'organicMorph 4s ease-in-out infinite',
            filter: `blur(${motionBlur * 0.5}px)`,
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: cursorStyle.backgroundColor,
            borderRadius: cursorStyle.borderRadius,
            transform: `scale(${cursorStyle.scale * 0.6})`,
            transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'organicMorph 4s ease-in-out infinite reverse',
            filter: `blur(${motionBlur * 0.3}px)`,
          }}
        />

        {/* Center dot (always visible) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${cursorStyle.scale})`,
            transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: '4px',
              height: '4px',
              backgroundColor: cursorStyle.borderColor,
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes organicMorph {
          0%, 100% {
            border-radius: 50% 30% 70% 40% / 60% 40% 60% 40%;
          }
          25% {
            border-radius: 30% 60% 40% 70% / 50% 60% 40% 50%;
          }
          50% {
            border-radius: 60% 40% 60% 40% / 40% 70% 30% 60%;
          }
          75% {
            border-radius: 40% 50% 50% 60% / 60% 30% 70% 40%;
          }
        }
      `}</style>
    </>
  );
};
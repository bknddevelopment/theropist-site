import { useEffect, useState, useRef, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  position: CursorPosition;
  isVisible: boolean;
  isHovering: boolean;
  isClicking: boolean;
  isPointer: boolean;
  isText: boolean;
  velocity: { x: number; y: number };
}

export const useCustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    isVisible: false,
    isHovering: false,
    isClicking: false,
    isPointer: false,
    isText: false,
    velocity: { x: 0, y: 0 }
  });

  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });

  // Check for touch device
  const isTouchDevice = useCallback(() => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Smooth cursor movement with velocity calculation
  const updateCursorPosition = useCallback((clientX: number, clientY: number) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const dx = clientX - lastPositionRef.current.x;
      const dy = clientY - lastPositionRef.current.y;

      // Calculate velocity for organic motion
      velocityRef.current = {
        x: dx * 0.5,
        y: dy * 0.5
      };

      lastPositionRef.current = { x: clientX, y: clientY };

      setCursorState(prev => ({
        ...prev,
        position: { x: clientX, y: clientY },
        velocity: velocityRef.current,
        isVisible: true
      }));
    });
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    updateCursorPosition(e.clientX, e.clientY);
  }, [isTouchDevice, prefersReducedMotion, updateCursorPosition]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    setCursorState(prev => ({ ...prev, isVisible: true }));
  }, [isTouchDevice, prefersReducedMotion]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setCursorState(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    setCursorState(prev => ({ ...prev, isClicking: true }));
  }, [isTouchDevice, prefersReducedMotion]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, [isTouchDevice, prefersReducedMotion]);

  // Check element hover state
  const checkHoverState = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Check if hovering over interactive elements
    const isInteractive =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button' ||
      target.getAttribute('role') === 'link' ||
      target.style.cursor === 'pointer' ||
      window.getComputedStyle(target).cursor === 'pointer';

    // Check if hovering over text input
    const isTextInput =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true' ||
      window.getComputedStyle(target).cursor === 'text';

    setCursorState(prev => ({
      ...prev,
      isPointer: isInteractive,
      isText: isTextInput,
      isHovering: isInteractive || isTextInput
    }));
  }, []);

  // Initialize cursor
  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) {
      return;
    }

    // Hide default cursor globally
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      * {
        cursor: none !important;
      }

      /* Fallback for elements that might override */
      a, button, input, textarea, [role="button"], [role="link"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', checkHoverState);

    // Cleanup
    return () => {
      const styleEl = document.getElementById('custom-cursor-style');
      if (styleEl) {
        styleEl.remove();
      }

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', checkHoverState);
    };
  }, [
    isTouchDevice,
    prefersReducedMotion,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    checkHoverState
  ]);

  return {
    ...cursorState,
    isTouchDevice: isTouchDevice(),
    prefersReducedMotion: prefersReducedMotion()
  };
};
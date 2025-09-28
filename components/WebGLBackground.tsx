'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  vertexShader,
  waterRippleShader,
  organicBlobShader,
  flowingSandShader,
  auroraShader
} from '@/lib/webgl/shaders';

export type BackgroundEffect = 'water' | 'blobs' | 'sand' | 'aurora';
export type QualityLevel = 'low' | 'medium' | 'high';

interface WebGLBackgroundProps {
  effect?: BackgroundEffect;
  quality?: QualityLevel;
  intensity?: number;
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  seasonal?: boolean;
  disabled?: boolean;
}

interface SeasonalColors {
  spring: { primary: string; secondary: string; tertiary: string };
  summer: { primary: string; secondary: string; tertiary: string };
  autumn: { primary: string; secondary: string; tertiary: string };
  winter: { primary: string; secondary: string; tertiary: string };
}

const seasonalColors: SeasonalColors = {
  spring: {
    primary: '#E8F5E9',
    secondary: '#AED581',
    tertiary: '#689F38'
  },
  summer: {
    primary: '#FFF3E0',
    secondary: '#FFB74D',
    tertiary: '#FF8A65'
  },
  autumn: {
    primary: '#FBE9E7',
    secondary: '#FFAB91',
    tertiary: '#A1887F'
  },
  winter: {
    primary: '#E8EAF6',
    secondary: '#9FA8DA',
    tertiary: '#7986CB'
  }
};

const qualitySettings = {
  low: { resolution: 0.5, fps: 30 },
  medium: { resolution: 0.75, fps: 45 },
  high: { resolution: 1, fps: 60 }
};

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({
  effect = 'water',
  quality = 'medium',
  intensity = 0.5,
  colors,
  seasonal = true,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameIdRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [currentEffect, setCurrentEffect] = useState<BackgroundEffect>(effect);

  // Get seasonal colors
  const getCurrentSeason = useCallback(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }, []);

  const getColors = useCallback(() => {
    if (!seasonal || colors) {
      return colors || {
        primary: '#F5F0E8',
        secondary: '#D4C5A0',
        tertiary: '#8B7355'
      };
    }
    const season = getCurrentSeason();
    return seasonalColors[season];
  }, [seasonal, colors, getCurrentSeason]);

  // Convert hex to RGB
  const hexToRGB = (hex: string): THREE.Vector3 => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? new THREE.Vector3(
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255
        )
      : new THREE.Vector3(1, 1, 1);
  };

  // Get shader based on effect
  const getShader = (effectType: BackgroundEffect) => {
    switch (effectType) {
      case 'water':
        return waterRippleShader;
      case 'blobs':
        return organicBlobShader;
      case 'sand':
        return flowingSandShader;
      case 'aurora':
        return auroraShader;
      default:
        return waterRippleShader;
    }
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Three.js
  useEffect(() => {
    if (disabled || !containerRef.current || !canvasRef.current) return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvasEl = canvasRef.current;
    const settings = qualitySettings[quality];

    // Setup Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0.1, 10
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: quality === 'high',
      alpha: true,
      powerPreference: quality === 'low' ? 'low-power' : 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * settings.resolution);
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    // Material
    const currentColors = getColors();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: getShader(currentEffect),
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight)
        },
        uScrollY: { value: 0 },
        uIntensity: { value: intensity },
        uColor1: { value: hexToRGB(currentColors.primary) },
        uColor2: { value: hexToRGB(currentColors.secondary) },
        uColor3: { value: hexToRGB(currentColors.tertiary) }
      },
      transparent: true
    });
    materialRef.current = material;

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const targetFPS = settings.fps;
    const frameDuration = 1000 / targetFPS;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Frame rate limiting
      if (currentTime - lastTime < frameDuration) return;
      lastTime = currentTime;

      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = currentTime * 0.001;
        materialRef.current.uniforms.uScrollY.value = scrollYRef.current;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer || !materialRef.current) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      materialRef.current.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [disabled, quality, currentEffect, intensity, getColors]);

  // Update effect when prop changes
  useEffect(() => {
    setCurrentEffect(effect);
    if (materialRef.current) {
      materialRef.current.fragmentShader = getShader(effect);
      materialRef.current.needsUpdate = true;
    }
  }, [effect]);

  // Canvas 2D fallback
  useEffect(() => {
    if (webGLSupported || disabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = getColors();
    let animationId: number;

    const drawFallback = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(0.5, colors.secondary);
      gradient.addColorStop(1, colors.tertiary);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle animation
      const time = Date.now() * 0.001;
      ctx.globalAlpha = 0.1;

      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i) * width * 0.3 + width * 0.5;
        const y = Math.cos(time * 0.7 + i) * height * 0.3 + height * 0.5;
        const radius = Math.sin(time * 0.5 + i) * 50 + 100;

        const radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        radialGradient.addColorStop(0, colors.secondary);
        radialGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(drawFallback);
    };

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFallback();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [webGLSupported, disabled, getColors]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{
          mixBlendMode: 'multiply',
          filter: `blur(${quality === 'low' ? 2 : quality === 'medium' ? 1 : 0}px)`
        }}
      />
      {!webGLSupported && (
        <div className="sr-only">
          Using Canvas 2D fallback for background animation
        </div>
      )}
    </div>
  );
};

export default WebGLBackground;
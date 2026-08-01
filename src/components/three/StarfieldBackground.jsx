import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// A scattered starfield (not spiral-shaped like the Hero's galaxy — a
// spiral only reads correctly viewed from roughly one angle/position, which
// doesn't work for something that has to sit behind every section as the
// page scrolls). Same star-sprite technique and accent palette as the Hero
// galaxy so the two read as one universe rather than two different effects.
const TIER_CONFIG = {
  high: { count: 2200 },
  medium: { count: 1200 },
  low: { count: 600 },
};

const PALETTE = [
  new THREE.Color('#e0e7ff'),
  new THREE.Color('#818cf8'),
  new THREE.Color('#d946ef'),
  new THREE.Color('#22d3ee'),
];

function buildStarGeometry(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Spread wide in X/Y (covers the full scrollable viewport at any scroll
    // position) and shallow in Z (stays behind content, doesn't clump into
    // a visible sphere silhouette).
    positions[i3] = (Math.random() * 2 - 1) * 12;
    positions[i3 + 1] = (Math.random() * 2 - 1) * 12;
    positions[i3 + 2] = (Math.random() * 2 - 1) * 4 - 3;

    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function useStarTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

// Tracks the pointer across the *whole window*, not just this canvas — the
// canvas is fixed full-viewport behind everything, so window-level tracking
// is what makes stars respond to the cursor even when it's hovering over
// text/cards sitting in front of the canvas.
function useWindowPointer() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  return mouse;
}

function Stars({ count, isTouchDevice }) {
  const geometry = useMemo(() => buildStarGeometry(count), [count]);
  const texture = useStarTexture();
  const groupRef = useRef();
  const mouse = useWindowPointer();
  const { viewport } = useThree();

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle constant drift so it's never fully static, plus the star field
    // actually pans opposite the cursor (parallax) rather than rotating —
    // reads more like "looking around a starfield" than a spinning object.
    groupRef.current.rotation.z = t * 0.01;

    if (!isTouchDevice) {
      const targetX = mouse.current.x * (viewport.width * 0.04);
      const targetY = mouse.current.y * (viewport.height * 0.04);
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          vertexColors
          size={0.05}
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.001}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default function StarfieldBackground({ tier = 'high', isTouchDevice = false }) {
  const { count } = TIER_CONFIG[tier] || TIER_CONFIG.medium;

  return (
    <Canvas
      dpr={tier === 'low' ? 1 : Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Stars count={count} isTouchDevice={isTouchDevice} />
    </Canvas>
  );
}

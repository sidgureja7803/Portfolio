import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const TIER_CONFIG = {
  high: { count: 1400 },
  medium: { count: 800 },
  low: { count: 400 },
};

// Indigo -> fuchsia -> cyan, matching the Hero's aurora glow so the site's
// one accent-color language carries through to the closing section too.
const PALETTE = [
  new THREE.Color('#6366f1'),
  new THREE.Color('#d946ef'),
  new THREE.Color('#22d3ee'),
];

function buildGeometry(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const radius = 4 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6 - 2;

    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 0.02 + Math.random() * 0.05;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  return geometry;
}

function useNormalizedPointer(enabled) {
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const handlePointerMove = useCallback(
    (e) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    },
    [size]
  );

  useEffect(() => {
    if (!enabled) return undefined;
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove, enabled]);

  return mouse;
}

function Particles({ tier, isTouchDevice }) {
  const { count } = TIER_CONFIG[tier];
  const geometry = useMemo(() => buildGeometry(count), [count]);
  const groupRef = useRef();
  const mouse = useNormalizedPointer(!isTouchDevice);
  const introScale = useRef(0);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 1,
      duration: 1.6,
      delay: 0.1,
      ease: 'power3.out',
      onUpdate: () => {
        introScale.current = obj.v;
      },
    });
    return () => tween.kill();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    const targetRotY = isTouchDevice ? t * 0.02 : mouse.current.x * 0.15 + t * 0.02;
    const targetRotX = isTouchDevice ? 0 : mouse.current.y * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.scale.setScalar(introScale.current);
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function ParticleField({ tier = 'high', isTouchDevice = false }) {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2);

  return (
    <Canvas
      dpr={tier === 'low' ? 1 : dpr}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Particles tier={tier} isTouchDevice={isTouchDevice} />
    </Canvas>
  );
}

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createStarTexture } from '../../lib/starTexture';

// Classic procedural spiral-galaxy particle field: thousands of points seeded
// along N spiral arms, jittered outward with randomness that grows with
// radius, colored on a gradient from a bright core color out to a dim rim
// color. Slow whole-group rotation is what actually reads as "a galaxy,"
// rather than static scattered points.
const TIER_CONFIG = {
  high: { count: 18000 },
  medium: { count: 9000 },
  low: { count: 3500 },
};

const BRANCHES = 4;
const RADIUS = 6.5;
const SPIN = 1.4;
const RANDOMNESS = 0.4;
const RANDOMNESS_POWER = 2.6;

// Same accent language as the rest of the site: a bright indigo-white core
// fading out to fuchsia/cyan at the rim, rather than a realistic yellow/blue
// galaxy palette — this is the site's one recurring color story.
const INSIDE_COLOR = new THREE.Color('#c7d2fe');
const OUTSIDE_COLOR_A = new THREE.Color('#d946ef');
const OUTSIDE_COLOR_B = new THREE.Color('#22d3ee');

function buildGalaxyGeometry(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * RADIUS;
    const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
    const spinAngle = radius * SPIN;

    const randomX = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;
    const randomY = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius * 0.4;
    const randomZ = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const outsideColor = OUTSIDE_COLOR_A.clone().lerp(OUTSIDE_COLOR_B, Math.random());
    const mixed = INSIDE_COLOR.clone().lerp(outsideColor, radius / RADIUS);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;

    sizes[i] = Math.random() * 0.06 + 0.015;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  return geo;
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

function Galaxy({ count, isTouchDevice }) {
  const geometry = useMemo(() => buildGalaxyGeometry(count), [count]);
  const texture = useMemo(() => createStarTexture(), []);
  const groupRef = useRef();
  const mouse = useNormalizedPointer(!isTouchDevice);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Continuous slow rotation — this alone is what sells "galaxy," a static
    // spiral just reads as a flat texture.
    groupRef.current.rotation.y = t * 0.035;

    if (!isTouchDevice) {
      const targetRotX = mouse.current.y * 0.1;
      const targetRotZ = mouse.current.x * 0.06;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.03;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0.15]}>
      <points geometry={geometry}>
        <pointsMaterial
          vertexColors
          size={0.045}
          map={texture}
          alphaMap={texture}
          transparent
          alphaTest={0.001}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function GalaxyScene({ tier = 'high', isTouchDevice = false }) {
  const { count } = TIER_CONFIG[tier] || TIER_CONFIG.medium;
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2);

  return (
    <Canvas
      dpr={tier === 'low' ? 1 : dpr}
      camera={{ position: [0, 2.4, 9], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.lookAt(0, 0, 0);
      }}
    >
      <Galaxy count={count} isTouchDevice={isTouchDevice} />
    </Canvas>
  );
}

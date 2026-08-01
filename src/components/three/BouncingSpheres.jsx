import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Real, always-on motion: N spheres bouncing off invisible walls and off
// each other (naive O(n^2) elastic collision — fine at these counts), not a
// drifting/idle accent. This is deliberately the opposite design choice from
// NetworkScene (which is a static, faint texture) — the brief here was
// specifically "something should always be visibly happening."
const PALETTE = ['#6366f1', '#818cf8', '#d946ef', '#22d3ee'];

const TIER_CONFIG = {
  high: { count: 22, bloom: true },
  medium: { count: 14, bloom: false },
  low: { count: 8, bloom: false },
};

const BOUNDS = { x: 6.5, y: 3.4, z: 2.2 };
const Z_OFFSET = -1.5; // sits slightly behind the text plane

function makeBalls(count) {
  const balls = [];
  for (let i = 0; i < count; i++) {
    const radius = 0.22 + Math.random() * 0.32;
    balls.push({
      position: new THREE.Vector3(
        (Math.random() * 2 - 1) * (BOUNDS.x - radius),
        (Math.random() * 2 - 1) * (BOUNDS.y - radius),
        Z_OFFSET + (Math.random() * 2 - 1) * (BOUNDS.z - radius)
      ),
      velocity: new THREE.Vector3(
        (Math.random() * 2 - 1) * 1.4,
        (Math.random() * 2 - 1) * 1.4,
        (Math.random() * 2 - 1) * 0.7
      ),
      radius,
      color: PALETTE[i % PALETTE.length],
    });
  }
  return balls;
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

function Scene({ count, isTouchDevice }) {
  const balls = useMemo(() => makeBalls(count), [count]);
  const meshRefs = useRef([]);
  const groupRef = useRef();
  const mouse = useNormalizedPointer(!isTouchDevice);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30); // clamp so a stalled/backgrounded tab doesn't fling balls on return

    for (const b of balls) {
      b.position.addScaledVector(b.velocity, dt);

      const minZ = Z_OFFSET - BOUNDS.z + b.radius;
      const maxZ = Z_OFFSET + BOUNDS.z - b.radius;
      if (b.position.x > BOUNDS.x - b.radius) { b.position.x = BOUNDS.x - b.radius; b.velocity.x *= -1; }
      if (b.position.x < -BOUNDS.x + b.radius) { b.position.x = -BOUNDS.x + b.radius; b.velocity.x *= -1; }
      if (b.position.y > BOUNDS.y - b.radius) { b.position.y = BOUNDS.y - b.radius; b.velocity.y *= -1; }
      if (b.position.y < -BOUNDS.y + b.radius) { b.position.y = -BOUNDS.y + b.radius; b.velocity.y *= -1; }
      if (b.position.z > maxZ) { b.position.z = maxZ; b.velocity.z *= -1; }
      if (b.position.z < minZ) { b.position.z = minZ; b.velocity.z *= -1; }
    }

    // Ball-ball elastic collisions (equal mass: velocities swap along the
    // collision normal). O(n^2) is trivial at ~20 balls.
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        const diff = new THREE.Vector3().subVectors(a.position, b.position);
        const dist = diff.length();
        const minDist = a.radius + b.radius;
        if (dist > 0 && dist < minDist) {
          const normal = diff.multiplyScalar(1 / dist);
          const overlap = minDist - dist;
          a.position.addScaledVector(normal, overlap / 2);
          b.position.addScaledVector(normal, -overlap / 2);

          const relVel = new THREE.Vector3().subVectors(a.velocity, b.velocity);
          const sep = relVel.dot(normal);
          if (sep < 0) {
            a.velocity.addScaledVector(normal, -sep);
            b.velocity.addScaledVector(normal, sep);
          }
        }
      }
    }

    balls.forEach((b, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) mesh.position.copy(b.position);
    });

    if (groupRef.current && !isTouchDevice) {
      const targetRotY = mouse.current.x * 0.08;
      const targetRotX = mouse.current.y * 0.05;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color="#818cf8" />
      {balls.map((b, i) => (
        <mesh key={i} ref={(el) => (meshRefs.current[i] = el)} position={b.position}>
          <sphereGeometry args={[b.radius, 32, 32]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BouncingSpheres({ tier = 'high', isTouchDevice = false }) {
  const { count, bloom } = TIER_CONFIG[tier] || TIER_CONFIG.medium;
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2);

  return (
    <Canvas
      dpr={tier === 'low' ? 1 : dpr}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene count={count} isTouchDevice={isTouchDevice} />
      {bloom && (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.4} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}

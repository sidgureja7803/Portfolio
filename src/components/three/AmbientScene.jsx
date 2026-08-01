import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Same indigo/fuchsia/cyan accent language as the Hero's aurora glow and the
// Contact particle field — every section's WebGL accent draws from one
// palette so they read as one system, not six unrelated demos.
const PALETTE = [
  new THREE.Color('#6366f1'),
  new THREE.Color('#d946ef'),
  new THREE.Color('#22d3ee'),
];

function usePointsGeometry(count, spread) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = spread * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = PALETTE[i % PALETTE.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, spread]);
}

function PointsVariant({ count, spread }) {
  const geometry = usePointsGeometry(count, spread);
  const ref = useRef();

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.15;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Edges rendered as glowing additive-blended lines rather than a wireframe
// material — a wireframe mesh renders as 1px hairlines that are barely
// visible on most displays; this reads as a clean, bright, glowing polyhedron.
function WireVariant({ color }) {
  const groupRef = useRef();
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  const edgesGeometry = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(2, 1);
    const edges = new THREE.EdgesGeometry(base);
    base.dispose();
    return edges;
  }, []);

  useEffect(() => () => edgesGeometry.dispose(), [edgesGeometry]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = t * 0.1;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={threeColor}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function AmbientScene({ variant = 'points', count = 200, spread = 3, color = '#6366f1' }) {
  return variant === 'wire' ? <WireVariant color={color} /> : <PointsVariant count={count} spread={spread} />;
}

import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { getSceneThemeColors } from '../../lib/theme-colors';
import ScrollCameraRig from './ScrollCameraRig';

// Node count kept deliberately minimal — this is a faint accent, not a
// diagram. Bloom/edge-particles removed entirely: every bit of extra glow or
// motion made prior attempts read as "busy" even at low counts, so the
// scene is now plain lit points + thin static lines and nothing else.
const TIER_CONFIG = {
  high: { nodeCount: 6 },
  medium: { nodeCount: 4 },
  low: { nodeCount: 3 },
};

const SEED_RADIUS = 8.5; // scatter radius — large relative to the camera's view so nodes land near the frame edges, not across the centered headline
const CAMERA_Z = 9;
const CAMERA_FOV = 45;
const GROUP_Z_OFFSET = -3; // pushes nodes slightly behind the text's visual plane for depth separation
const CONNECT_DISTANCE = 3.4; // max distance between two nodes for an edge to form between them
const MOUSE_PARALLAX_RANGE = 0.18; // radians of max camera-facing group rotation from mouse position — capped so it never feels chaotic
const DAMPING = 0.06; // lerp factor for mouse-driven rotation — lower is smoother/slower, avoids any snapping

// Text-column exclusion, expressed in NDC (-1..1 normalized screen space),
// not world units. Nodes and edges are checked by actually projecting them
// through the real camera — not by hand-tuning a world-space rectangle that
// silently goes wrong whenever camera distance, FOV, or Z-offset change
// (which is exactly what broke the previous version: a node clearly placed
// outside a world-space box still projected onscreen behind the headline
// once its depth put it at a different apparent position).
const EXCLUSION_NDC_HALF_WIDTH = 0.42;
const EXCLUSION_NDC_HALF_HEIGHT = 0.32;

function projectToNDC(worldPos, camera) {
  const projected = worldPos.clone().project(camera);
  return { x: projected.x, y: projected.y };
}

function isInsideExclusionZone(ndc) {
  return Math.abs(ndc.x) < EXCLUSION_NDC_HALF_WIDTH && Math.abs(ndc.y) < EXCLUSION_NDC_HALF_HEIGHT;
}

function segmentCrossesExclusionZone(aWorld, bWorld, camera) {
  const SAMPLES = 10;
  for (let s = 0; s <= SAMPLES; s++) {
    const t = s / SAMPLES;
    const point = new THREE.Vector3().lerpVectors(aWorld, bWorld, t);
    if (isInsideExclusionZone(projectToNDC(point, camera))) return true;
  }
  return false;
}

// Nodes are static once generated — no per-frame position drift. Drift was
// the root cause of edges migrating into the text over time (edges are
// validated once, at generation time, against node positions that used to
// keep moving afterward). A static field plus the group's own slow rotation
// is enough for the scene to feel alive without that failure mode.
function generateNodes(count, camera) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    let point;
    let attempts = 0;
    do {
      const r = SEED_RADIUS * (0.6 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      point = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.55,
        r * Math.cos(phi) * 0.35 + GROUP_Z_OFFSET
      );
      attempts += 1;
      // Safety valve: if the RNG can't find a valid spot after many tries
      // (shouldn't happen at these radii, but this is cheap insurance
      // against an infinite loop if constants are ever retuned badly),
      // push the point far to the side instead of looping forever.
      if (attempts > 200) {
        point.x = Math.sign(point.x || 1) * SEED_RADIUS;
        break;
      }
    } while (isInsideExclusionZone(projectToNDC(point, camera)));

    positions.push(point);
  }
  return positions;
}

function buildEdges(positions, maxDistance, camera) {
  const edges = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (
        positions[i].distanceTo(positions[j]) < maxDistance &&
        !segmentCrossesExclusionZone(positions[i], positions[j], camera)
      ) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

// Lit, instanced node spheres — small, dim, matte. This is texture, not
// content: brightness stays low deliberately.
function Nodes({ positions, color }) {
  return (
    <Instances limit={positions.length} range={positions.length}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.05}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.4}
      />
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  );
}

// Static edge lines connecting nodes — thin, faint.
function Edges({ edges, positions, color }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      linePositions.set([positions[a].x, positions[a].y, positions[a].z], i * 6);
      linePositions.set([positions[b].x, positions[b].y, positions[b].z], i * 6 + 3);
    });
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [edges, positions]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return <lineSegments geometry={geometry} material={material} />;
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

function Scene({ tier, isTouchDevice }) {
  const { nodeCount } = TIER_CONFIG[tier];
  const colors = useMemo(() => getSceneThemeColors(), []);
  const { camera } = useThree();

  // Generated once against the real camera the scene actually renders with —
  // both node placement and edge validity are computed here, up front, and
  // never touched again.
  const positions = useMemo(() => generateNodes(nodeCount, camera), [nodeCount, camera]);
  const edges = useMemo(
    () => buildEdges(positions, CONNECT_DISTANCE, camera),
    [positions, camera]
  );

  const groupRef = useRef();
  const mouse = useNormalizedPointer(!isTouchDevice);
  const introScale = useRef(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 1,
      duration: 1.4,
      delay: 0.2,
      ease: 'power3.out',
      onUpdate: () => {
        introScale.current = obj.v;
      },
    });
    return () => tween.kill();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      const targetRotY = isTouchDevice ? t * 0.015 : mouse.current.x * MOUSE_PARALLAX_RANGE + t * 0.015;
      const targetRotX = isTouchDevice ? 0 : mouse.current.y * (MOUSE_PARALLAX_RANGE * 0.5);
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * DAMPING;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * DAMPING;
      groupRef.current.scale.setScalar(introScale.current);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={0.25} color={colors.primary} />

      <group ref={groupRef}>
        <Nodes positions={positions} color={colors.primary} />
        <Edges edges={edges} positions={positions} color={colors.primary} />
      </group>

      <ScrollCameraRig />
    </>
  );
}

export default function NetworkScene({ tier = 'high', isTouchDevice = false }) {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2); // capped per spec — uncapped DPR on high-density displays tanks fill-rate for no visible gain

  return (
    <Canvas
      dpr={tier === 'low' ? 1 : dpr}
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Scene tier={tier} isTouchDevice={isTouchDevice} />
    </Canvas>
  );
}

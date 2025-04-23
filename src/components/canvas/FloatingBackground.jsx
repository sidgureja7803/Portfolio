import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBackground = ({ count = 5000, mousePosition }) => {
  const points = useRef();

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.1;
      points.current.rotation.y += delta * 0.1;

      // Interactive mouse movement
      if (mousePosition) {
        points.current.rotation.x += mousePosition.y * 0.01;
        points.current.rotation.y += mousePosition.x * 0.01;
      }

      // Animate individual points
      const positions = points.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8d5eff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default FloatingBackground; 
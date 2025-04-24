import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBackground = ({ count = 2000, mousePosition }) => {
  const points = useRef();

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.min(Math.max((Math.random() - 0.5) * 10, -10), 10);
      positions[i * 3 + 1] = Math.min(Math.max((Math.random() - 0.5) * 10, -10), 10);
      positions[i * 3 + 2] = Math.min(Math.max((Math.random() - 0.5) * 10, -10), 10);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x = (points.current.rotation.x + delta * 0.05) % (Math.PI * 2);
      points.current.rotation.y = (points.current.rotation.y + delta * 0.05) % (Math.PI * 2);

      if (mousePosition) {
        points.current.rotation.x += mousePosition.y * 0.005;
        points.current.rotation.y += mousePosition.x * 0.005;
      }

      if (state.clock.elapsedTime % 0.1 < delta) {
        const positions = points.current.geometry.attributes.position.array;
        const portion = Math.floor(positions.length / 3 / 4);
        const startIndex = Math.floor(Math.random() * portion) * 3;
        
        for (let i = startIndex; i < startIndex + portion * 3; i += 3) {
          if (i < positions.length) {
            positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.01;
          }
        }
        points.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <Points ref={points} positions={particlePositions} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#8d5eff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default FloatingBackground; 
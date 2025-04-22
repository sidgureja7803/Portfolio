import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';

const Character = () => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) * 0.1;
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <Cylinder
        args={[0.5, 0.5, 2, 32]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>

      {/* Head */}
      <Sphere
        args={[0.4, 32, 32]}
        position={[0, 1.2, 0]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Sphere>

      {/* Arms */}
      <Cylinder
        args={[0.15, 0.15, 1, 32]}
        position={[-0.7, 0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>
      <Cylinder
        args={[0.15, 0.15, 1, 32]}
        position={[0.7, 0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>

      {/* Legs */}
      <Cylinder
        args={[0.2, 0.2, 1, 32]}
        position={[-0.3, -1.5, 0]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>
      <Cylinder
        args={[0.2, 0.2, 1, 32]}
        position={[0.3, -1.5, 0]}
      >
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>
    </group>
  );
};

export default Character; 
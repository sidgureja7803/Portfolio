import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const TechSphere = ({ technologies, onSelect }) => {
  const group = useRef();
  const textRefs = useRef([]);

  // Calculate positions on a sphere
  const positions = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const radius = 3;

    for (let i = 0; i < technologies.length; i++) {
      const y = 1 - (i / (technologies.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      temp.push([x * radius, y * radius, z * radius]);
    }

    return temp;
  }, [technologies.length]);

  // Rotate the sphere
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.1;
    
    // Update text rotations to face camera
    textRefs.current.forEach((text, i) => {
      if (text) {
        text.lookAt(state.camera.position);
      }
    });
  });

  return (
    <group ref={group}>
      {technologies.map((tech, i) => (
        <group key={tech.name} position={positions[i]}>
          <Text
            ref={(el) => (textRefs.current[i] = el)}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => onSelect(tech)}
            onPointerOver={(e) => {
              document.body.style.cursor = 'pointer';
              e.object.scale.multiplyScalar(1.2);
            }}
            onPointerOut={(e) => {
              document.body.style.cursor = 'auto';
              e.object.scale.divideScalar(1.2);
            }}
          >
            {tech.icon}
          </Text>
        </group>
      ))}

      {/* Connecting lines */}
      {positions.map((pos, i) => (
        <React.Fragment key={`line-${i}`}>
          {positions.slice(i + 1).map((pos2, j) => (
            <line key={`line-${i}-${j}`}>
              <bufferGeometry attach="geometry">
                <float32BufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([...pos, ...pos2]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color="#4a90e2"
                transparent
                opacity={0.2}
              />
            </line>
          ))}
        </React.Fragment>
      ))}
    </group>
  );
};

export default TechSphere; 
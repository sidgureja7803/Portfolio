import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const FormField = ({ position, label, color = '#ffffff', onClick }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (hovered) {
      mesh.current.material.opacity = THREE.MathUtils.lerp(
        mesh.current.material.opacity,
        1,
        0.1
      );
    } else {
      mesh.current.material.opacity = THREE.MathUtils.lerp(
        mesh.current.material.opacity,
        0.5,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          ref={mesh}
          onClick={onClick}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <planeGeometry args={[2, 0.5]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
};

const ContactForm = () => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.1) * 0.1;
  });

  const handleFieldClick = (field) => {
    // In a real application, this would focus the actual form field
    console.log(`Clicked ${field}`);
  };

  return (
    <group ref={group}>
      <FormField
        position={[0, 1, 0]}
        label="Name"
        onClick={() => handleFieldClick('name')}
      />
      <FormField
        position={[0, 0, 0]}
        label="Email"
        onClick={() => handleFieldClick('email')}
      />
      <FormField
        position={[0, -1, 0]}
        label="Message"
        onClick={() => handleFieldClick('message')}
      />

      {/* Submit Button */}
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, -2, 0]}>
          <mesh>
            <boxGeometry args={[2, 0.5, 0.1]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Send Message
          </Text>
        </group>
      </Float>

      {/* Decorative Elements */}
      <group>
        {[...Array(20)].map((_, i) => {
          const theta = (i / 20) * Math.PI * 2;
          const radius = 3;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(theta) * radius,
                Math.sin(theta) * radius,
                0,
              ]}
            >
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#4a90e2" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export default ContactForm; 
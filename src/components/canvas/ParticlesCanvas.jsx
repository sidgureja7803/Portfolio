import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simplified particles component with minimal particles
const SimpleParticles = ({ count = 500 }) => {
  const ref = useRef();
  
  // Create a simple static array of particles
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
        color="#8d5eff"
        size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
  );
};

const ParticlesCanvas = ({ mousePosition }) => {
  return (
    <div className="three-js-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ touchAction: 'none' }}
        dpr={0.6} // Very low pixel ratio for better performance
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          depth: false,
          stencil: false
        }}
        frameloop="demand" // Only render when needed
      >
        <Suspense fallback={null}>
          <SimpleParticles />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParticlesCanvas; 
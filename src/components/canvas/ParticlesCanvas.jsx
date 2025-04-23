import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import FloatingBackground from './FloatingBackground';

const Particles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ParticlesCanvas = ({ mousePosition }) => {
  const groupRef = useRef();
  
  useEffect(() => {
    if (groupRef.current && mousePosition) {
      // Add subtle movement based on mouse position for interactivity
      groupRef.current.rotation.y = mousePosition.x * 0.01;
      groupRef.current.rotation.x = mousePosition.y * 0.01;
    }
  }, [mousePosition]);

  return (
    <div className="absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ touchAction: 'none' }}
        dpr={[1, 2]} // Optimize for mobile by limiting pixel ratio
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <FloatingBackground mousePosition={mousePosition} />
          <ambientLight intensity={0.5} />
          <group ref={groupRef}>
            <Particles />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParticlesCanvas; 
import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

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
    <div className="w-full h-auto absolute inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <group ref={groupRef}>
            <Particles />
          </group>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ParticlesCanvas; 
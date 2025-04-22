import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <group position={[0, -2, 0]} rotation={[-0.01, -0.2, -0.1]} scale={isMobile ? 0.6 : 0.75}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 0.5, 4]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <group position={[0, 2, -1.8]} rotation={[0.5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[5, 3, 0.2]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0, 0, 0.11]} castShadow receiveShadow>
            <planeGeometry args={[4.5, 2.5]} />
            <meshStandardMaterial color="#0066cc" emissive="#004488" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas; 
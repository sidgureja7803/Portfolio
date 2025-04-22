import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Preload,
} from '@react-three/drei';
import CanvasLoader from '../Loader';

const Ball = (props) => {
  // Instead of loading a texture, use color to represent technology
  const getColorFromName = (name) => {
    // Simple hash function to get consistent color from name
    const hash = props.name?.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0) || 0;
    return `hsl(${hash % 360}, 70%, 60%)`;
  };
  
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={getColorFromName(props.name)}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, name }) => {
  return (
    <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball name={name} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas; 
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Preload,
  Html,
} from '@react-three/drei';
import CanvasLoader from '../Loader';

const Ball = ({ icon: Icon, color, name }) => {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Html distanceFactor={10} center>
          <div className="text-4xl" style={{ color }}>
            <Icon />
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, name, color }) => {
  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-pointer"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Ball icon={icon} color={color} name={name} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas; 
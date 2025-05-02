import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Background from './Background';
import Loader from '../Loader';

const BackgroundCanvas = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full -z-10 opacity-70'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={<Loader />}>
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas; 
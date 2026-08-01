import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { useInView } from '../hooks/useInView';

const AmbientScene = lazy(() => import('./three/AmbientScene.jsx'));

function useIdleGate() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setIsIdle(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(() => setIsIdle(true), 200);
    return () => clearTimeout(id);
  }, []);

  return isIdle;
}

// A decorative WebGL accent for a single section. The canvas only exists in
// the DOM while its section is within `rootMargin` of the viewport — scroll
// past it and the context is torn down, so the page never accumulates more
// than one or two live GPU contexts at once regardless of how many sections
// use this. Skipped outright below "medium" device tier: these are ambient
// texture, not core content, so low-end devices simply don't pay for them.
const SectionCanvas = ({ variant = 'points', count = 200, spread = 3, color = '#6366f1', className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const tier = useDeviceCapability();
  const isIdle = useIdleGate();
  const [ref, inView] = useInView({ rootMargin: '150px 0px' });

  const eligible = !prefersReducedMotion && (tier === 'high' || tier === 'medium');

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {eligible && isIdle && inView && (
        <Canvas
          dpr={1}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Suspense fallback={null}>
            <AmbientScene variant={variant} count={count} spread={spread} color={color} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default SectionCanvas;

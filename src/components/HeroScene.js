import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

const NetworkScene = lazy(() => import('./three/NetworkScene.jsx'));

// Waits for the browser to be idle (or a short timeout fallback) before even
// starting the fetch+mount of the 3D scene. WebGL context creation and shader
// compilation are real main-thread cost — deferring them past first paint
// keeps LCP/TBT clean instead of competing with the initial render.
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

// Static gradient shown when motion is reduced, WebGL is unavailable, or while the 3D bundle loads.
function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(circle at 75% 65%, rgba(125,211,252,0.12), transparent 50%)',
      }}
    />
  );
}

const HeroScene = () => {
  const prefersReducedMotion = useReducedMotion();
  const tier = useDeviceCapability();
  const isIdle = useIdleGate();
  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || tier === 'none' || !isIdle) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Suspense fallback={<StaticFallback />}>
        <NetworkScene tier={tier} isTouchDevice={isTouchDevice} />
      </Suspense>
    </div>
  );
};

export default HeroScene;

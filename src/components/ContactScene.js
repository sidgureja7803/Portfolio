import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

const ParticleField = lazy(() => import('./three/ParticleField.jsx'));

// Same idle-gate pattern as HeroScene — defer WebGL context creation past
// first paint/idle so it never competes with more important work.
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

const ContactScene = () => {
  const prefersReducedMotion = useReducedMotion();
  const tier = useDeviceCapability();
  const isIdle = useIdleGate();
  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || tier === 'none' || !isIdle) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Suspense fallback={null}>
        <ParticleField tier={tier} isTouchDevice={isTouchDevice} />
      </Suspense>
    </div>
  );
};

export default ContactScene;

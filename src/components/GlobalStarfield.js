import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

const StarfieldBackground = lazy(() => import('./three/StarfieldBackground.jsx'));

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

// Mounted once, fixed behind the entire page — this is what makes stars
// present on every section as you scroll and reactive to the cursor
// everywhere, instead of a WebGL canvas duplicated per section (which was
// the previous approach: cheap individually, but N contexts once you scroll
// past N sections). One canvas, one context, covers the whole page.
const GlobalStarfield = () => {
  const prefersReducedMotion = useReducedMotion();
  const tier = useDeviceCapability();
  const isIdle = useIdleGate();
  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || tier === 'none' || !isIdle) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <StarfieldBackground tier={tier} isTouchDevice={isTouchDevice} />
      </Suspense>
    </div>
  );
};

export default GlobalStarfield;

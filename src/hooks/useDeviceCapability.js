import { useEffect, useState } from 'react';

const TIER_ORDER = ['none', 'low', 'medium', 'high'];

// Rough heuristic to decide how much 3D work a device can afford, based on
// static device signals available synchronously (no rendering yet).
function detectStaticTier() {
  if (typeof window === 'undefined') return 'high';

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const isSmallScreen = window.innerWidth < 768;

  let gl;
  try {
    const canvas = document.createElement('canvas');
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  } catch {
    gl = null;
  }

  if (!gl) return 'none';

  if ((isTouch && isSmallScreen) || cores <= 2 || memory <= 2) return 'low';
  if (cores <= 4 || memory <= 4 || isSmallScreen) return 'medium';
  return 'high';
}

// Samples real frame rate for ~800ms. Devices that pass the static WebGL/core
// checks but are still slow in practice (thermal throttling, older integrated
// GPUs, background-tab contention) get caught here and stepped down a tier.
function probeFrameRate(durationMs, onResult) {
  let frameCount = 0;
  let rafId;
  const start = performance.now();

  const tick = (now) => {
    frameCount += 1;
    if (now - start >= durationMs) {
      const fps = (frameCount * 1000) / (now - start);
      onResult(fps);
      return;
    }
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}

export function useDeviceCapability() {
  const [tier, setTier] = useState(detectStaticTier);

  useEffect(() => {
    const staticTier = detectStaticTier();
    setTier(staticTier);

    if (staticTier === 'none') return undefined;

    const PROBE_DURATION_MS = 800; // long enough to smooth out one-off frame hitches, short enough not to delay the scene
    const LOW_FPS_THRESHOLD = 30; // below this, the device can't sustain the current tier's workload

    const cancel = probeFrameRate(PROBE_DURATION_MS, (fps) => {
      if (fps < LOW_FPS_THRESHOLD) {
        setTier((current) => {
          const idx = TIER_ORDER.indexOf(current);
          return TIER_ORDER[Math.max(0, idx - 1)];
        });
      }
    });

    return cancel;
  }, []);

  return tier;
}

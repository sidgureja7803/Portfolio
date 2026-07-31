import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Drives the camera's position/lookAt target via scroll progress through the
// hero section, rather than animating the whole canvas DOM element (which is
// what Hero.js's own ScrollTrigger does for opacity/scale as a cheap fallback
// layer). This one lives inside the R3F render tree so it can move the actual
// three.js camera smoothly, with damping so scroll input never causes snapping.
const DAMPING = 0.08; // lower = smoother/slower to catch up, higher = snappier but risks feeling jittery on fast scroll

export default function ScrollCameraRig({ heroSectionSelector = 'section' }) {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetPosition = useRef({ x: 0, y: 0, z: 9 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.querySelector(heroSectionSelector),
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [heroSectionSelector]);

  useFrame(() => {
    const p = scrollProgress.current;
    // As the user scrolls past the hero, the camera drifts back and slightly
    // up/away — reinforces the sense of "pulling back" from the scene rather
    // than it simply fading, without ever moving so far it feels chaotic.
    targetPosition.current.z = 9 + p * 4;
    targetPosition.current.y = p * 1.5;

    camera.position.z += (targetPosition.current.z - camera.position.z) * DAMPING;
    camera.position.y += (targetPosition.current.y - camera.position.y) * DAMPING;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

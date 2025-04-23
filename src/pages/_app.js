import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/globals.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger on route change
    const onRouteChange = () => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      lenis.destroy();
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [router]);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 
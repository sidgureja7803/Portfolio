import { useEffect, useRef, useState } from 'react';

// Generic viewport-visibility gate. Used to mount/unmount WebGL canvases so
// only sections actually on (or near) screen keep a live GPU context —
// without this, a canvas per section would mean every section the user has
// ever scrolled past staying mounted and rendering forever.
export function useInView({ rootMargin = '200px 0px', once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}

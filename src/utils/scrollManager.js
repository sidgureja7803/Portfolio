import Lenis from '@studio-freight/lenis';

class ScrollManager {
  constructor() {
    this.lenis = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Create the Lenis instance with optimal settings
    this.lenis = new Lenis({
      duration: 0.8, // Shorter duration for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: true, // Enable touch support
      touchMultiplier: 2,
      wheelMultiplier: 1,
      normalizeWheel: true,
      infinite: false,
    });

    // Connect Lenis to RAF for consistent timing
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Add native scroll event listeners for immediate response
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.scrollTo(target);
        }
      });
    });

    // Make the instance globally available
    window.lenisManager = this;
    window.lenis = this.lenis;

    this.initialized = true;
    console.log('ScrollManager: Lenis initialized successfully');
  }

  // Method to scroll to an element
  scrollTo(target, options = {}) {
    if (!this.lenis) return;
    
    if (typeof target === 'string') {
      // If target is a string, find the element
      const element = document.querySelector(target);
      if (element) {
        console.log(`ScrollManager: Scrolling to element ${target}`);
        this.lenis.scrollTo(element, { 
          offset: -80, 
          duration: 0.8, // Shorter duration
          ...options 
        });
      } else {
        console.warn(`ScrollManager: Element not found for ${target}`);
      }
    } else if (target instanceof Element) {
      // If target is already an element
      console.log('ScrollManager: Scrolling to provided element');
      this.lenis.scrollTo(target, { 
        offset: -80, 
        duration: 0.8, // Shorter duration
        ...options 
      });
    } else if (typeof target === 'number') {
      // If target is a number (position)
      console.log(`ScrollManager: Scrolling to position ${target}`);
      this.lenis.scrollTo(target, {
        duration: 0.8, // Shorter duration
        ...options
      });
    }
  }

  // Method to destroy the instance
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
      this.initialized = false;
      window.lenis = null;
      window.lenisManager = null;
      console.log('ScrollManager: Lenis destroyed');
    }
  }
}

// Create and export a singleton instance
const scrollManager = new ScrollManager();
export default scrollManager; 
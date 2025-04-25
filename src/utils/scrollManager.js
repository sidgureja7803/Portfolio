import Lenis from '@studio-freight/lenis';

class ScrollManager {
  constructor() {
    this.lenis = null;
    this.initialized = false;
    this.rafId = null;
  }

  init() {
    if (this.initialized) {
      this.destroy();
    }

    try {
      // Create the Lenis instance with optimal settings
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
        touchMultiplier: 2,
        wheelMultiplier: 1,
        normalizeWheel: true,
        infinite: false,
      });

      // Connect Lenis to RAF
      const raf = (time) => {
        if (!this.lenis) return;
        this.lenis.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      
      this.rafId = requestAnimationFrame(raf);

      // Make the instance globally available
      window.lenisManager = this;
      window.lenis = this.lenis;

      this.initialized = true;
      console.log('ScrollManager: Lenis initialized successfully');
    } catch (error) {
      console.error('ScrollManager: Failed to initialize Lenis:', error);
      this.initialized = false;
      throw error;
    }
  }

  scrollTo(target, options = {}) {
    if (!this.lenis || !this.initialized) {
      console.warn('ScrollManager: Lenis not initialized');
      this.fallbackScroll(target);
      return;
    }
    
    try {
      const defaultOptions = {
        offset: -80,
        duration: 1.2,
        immediate: false
      };

      const mergedOptions = { ...defaultOptions, ...options };

      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          this.lenis.scrollTo(element, mergedOptions);
        } else {
          console.warn(`ScrollManager: Element not found for ${target}`);
          this.fallbackScroll(target);
        }
      } else if (target instanceof Element) {
        this.lenis.scrollTo(target, mergedOptions);
      } else if (typeof target === 'number') {
        this.lenis.scrollTo(target, mergedOptions);
      }
    } catch (error) {
      console.error('ScrollManager: Error during scroll:', error);
      this.fallbackScroll(target);
    }
  }

  fallbackScroll(target) {
    try {
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (target instanceof Element) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('ScrollManager: Fallback scroll failed:', error);
    }
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }

    window.lenis = null;
    window.lenisManager = null;
    this.initialized = false;
    console.log('ScrollManager: Destroyed successfully');
  }
}

// Create and export a singleton instance
const scrollManager = new ScrollManager();
export default scrollManager; 
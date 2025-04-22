import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Lenis from 'lenis';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, OpenSource, Coding, ParticlesCanvas } from './components';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to between -1 and 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Initialize Lenis smooth scrolling
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
    
    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <ParticlesCanvas mousePosition={mousePosition} />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <OpenSource />
        <Coding />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App; 
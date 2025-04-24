import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import scrollManager from './utils/scrollManager';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, Education, Blogs, ParticlesCanvas } from './components';

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
  
  // Initialize smooth scrolling with our ScrollManager
  useEffect(() => {
    // Initialize our ScrollManager
    scrollManager.init();

    // Fallback vanilla JS smooth scroll setup
    const setupVanillaScroll = () => {
      // Add click handlers to all navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    };

    // Setup vanilla scroll as a backup
    setTimeout(setupVanillaScroll, 1000);
    
    return () => {
      scrollManager.destroy();
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
        <Education />
        <Experience />
        <Works />
        <Tech />
        <Blogs />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App; 
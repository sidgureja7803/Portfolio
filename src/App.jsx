import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initSmoothScroll, destroy } from './utils/scroll';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, Education, Blogs } from './components';
import { Background } from './components/canvas';
import BlogsPage from './pages/BlogsPage';

const HomePage = () => {
  return (
    <>
      <Background />
      <div className="relative z-10">
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
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll();
    
    return () => {
      // Cleanup
      destroy();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <div className="relative bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App; 
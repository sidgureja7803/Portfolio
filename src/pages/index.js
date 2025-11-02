import { useEffect, useState } from 'react';
import Head from 'next/head';
import { 
  About, 
  Contact, 
  Experience, 
  Hero, 
  Navbar, 
  Tech, 
  Works, 
  Education,
  Blogs,
  ParticlesCanvas 
} from '../components';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>Your Portfolio | Full Stack Developer</title>
        <meta name="description" content="Your portfolio description" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="relative z-0 bg-primary-900">
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
    </>
  );
} 
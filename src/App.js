import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';

// Only Header + Hero are needed for first paint. Everything below the fold
// is code-split so it doesn't compete with the hero for parse/execute time
// on the main thread — this was the actual bottleneck behind a slow LCP
// (measured via Lighthouse: ~1.2s of main-bundle script execution before
// first paint could even happen).
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const LeetCodeStats = lazy(() => import('./components/LeetCodeStats'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Sections below the fold are lazy-loaded, so an incoming #hash (e.g. from
// navigating "/blogs" -> "/#about") can't scroll to its target until that
// section has actually mounted — poll briefly instead of scrolling immediately.
const useScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let attempts = 0;
    const id = setInterval(() => {
      const el = document.querySelector(hash);
      attempts += 1;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        clearInterval(id);
      } else if (attempts > 20) {
        clearInterval(id);
      }
    }, 100);

    return () => clearInterval(id);
  }, [hash]);
};

const HomePage = () => {
  useScrollToHash();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <LeetCodeStats />
          <Achievements />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={null}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={null}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/blogs/:slug"
            element={
              <Suspense fallback={null}>
                <BlogPost />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
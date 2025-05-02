import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  About, 
  Contact, 
  Experience, 
  Hero, 
  Navbar, 
  Tech, 
  Works,
  OpenSource,
  Blogs,
  Education 
} from './components';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

// Main content component
const MainContent = () => (
  <div className="relative z-0 bg-primary">
    <BackgroundCanvas />
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Education />
    <Experience />
    <Tech />
    <Works />
    <OpenSource />
    <Blogs />
    <div className="relative z-0">
      <Contact />
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <MainContent />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App; 
import { BrowserRouter } from 'react-router-dom';
import { 
  About, 
  Contact, 
  Experience, 
  Hero, 
  Navbar, 
  Works,
  OpenSource,
  Blogs,
  Education 
} from './components';
import LeetCodeStats from './components/LeetCodeStats';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

// Main content component
const MainContent = () => (
  <div className="relative z-0 bg-primary">
    <div>
      <Navbar />
      <Hero />
    </div>
    <About />
    <Education />
    <Experience />
    <LeetCodeStats />
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
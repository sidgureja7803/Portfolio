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
  Education,
  Tech
} from './components';
import LeetCodeStats from './components/LeetCodeStats';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

const App = () => {
  return (
    <ErrorBoundary fallback={<div className="flex items-center justify-center min-h-screen bg-primary-900 text-white">Something went wrong</div>}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-primary-900 text-white">Loading...</div>}>
        <BrowserRouter>
          <div className="bg-primary-900 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Hero />
              <About />
              <Tech />
              <Education />
              <Experience />
              <LeetCodeStats />
              <Works />
              <OpenSource />
              <Blogs />
              <Contact />
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
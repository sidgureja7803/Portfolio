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
const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
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
  );
};

export default App;
import { BrowserRouter } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App; 
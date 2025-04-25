import { BrowserRouter } from 'react-router-dom';
import { Navbar, Hero, About, Experience, Tech, Works, OpenSource, Blogs, Contact, Education } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
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
        <Contact />
      </div>
    </BrowserRouter>
  );
};

export default App; 
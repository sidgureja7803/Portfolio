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
        <main className="container mx-auto">
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
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
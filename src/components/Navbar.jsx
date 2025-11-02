import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import Gureja from './Gureja.svg';


const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // Find the current section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActive(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    setActive(id);
    setToggle(false);

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 ${scrolled ? 'bg-primary-900 shadow-md' : 'bg-transparent'}`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={Gureja} alt="Gureja" className="w-9 h-9" />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Siddhant Gureja&nbsp;
            <span className='sm:block hidden'>| Portfolio</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className='list-none hidden sm:flex flex-row gap-8'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.id ? 'text-white' : 'text-secondary'} hover:text-white text-[16px] font-medium cursor-pointer`}
              onClick={() => handleClick(link.id)}
            >
              {link.title}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            className='w-[28px] h-[28px] flex items-center justify-center text-white cursor-pointer'
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-4">
              <span className={`absolute h-0.5 w-full bg-white ${toggle ? 'rotate-45 translate-y-1.5' : '-translate-y-2'}`} />
              <span className={`absolute h-0.5 w-full bg-white ${toggle ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-0.5 w-full bg-white ${toggle ? '-rotate-45 translate-y-1.5' : 'translate-y-2'}`} />
            </div>
          </button>

          {toggle && (
            <div className='fixed top-0 right-0 bottom-0 w-[min(75vw,300px)] bg-primary-900 shadow-lg p-6 pt-20'>
              <ul className='list-none flex flex-col gap-5'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${active === nav.id ? 'text-white' : 'text-secondary'} font-medium cursor-pointer text-[16px]`}
                    onClick={() => handleClick(nav.id)}
                  >
                    {nav.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

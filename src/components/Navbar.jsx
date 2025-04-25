import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';

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
      const offset = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src="/Gureja.svg" alt="Gureja" className="w-9 h-9" />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Siddhant Gureja&nbsp;
            <span className='sm:block hidden'>| Portfolio</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.id ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => handleClick(link.id)}
            >
              {link.title}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            className='w-[28px] h-[28px] flex items-center justify-center text-white cursor-pointer z-50'
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <div className={`relative w-6 h-4 transform transition-all duration-300 ${toggle ? 'rotate-180' : ''}`}>
              <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
                toggle ? 'rotate-45 translate-y-2' : '-translate-y-2'
              }`} />
              <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
                toggle ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
                toggle ? '-rotate-45 translate-y-2' : 'translate-y-2'
              }`} />
            </div>
          </button>

          {toggle && (
            <div className='fixed top-0 right-0 bottom-0 w-[min(75vw,400px)] bg-primary/95 backdrop-blur-lg shadow-xl p-6 pt-24'>
              <ul className='list-none flex flex-col gap-6'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${
                      active === nav.id ? 'text-white' : 'text-secondary'
                    } font-poppins font-medium cursor-pointer text-[16px] transition-colors duration-300`}
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

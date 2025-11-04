import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';
import Gureja from './Gureja.svg';


const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Set scrolled state for blur effect
      setScrolled(scrollY > 50);
      
      // Show/hide navigation based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down - hide nav
        setVisible(false);
      } else {
        // Scrolling up - show nav
        setVisible(true);
      }
      setLastScrollY(scrollY);

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
  }, [lastScrollY]);

  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeIndex = navLinks.findIndex(link => link.id === active);
      if (activeIndex !== -1) {
        const navList = document.querySelector('.nav-list');
        const activeLink = document.querySelector(`[data-nav-id="${active}"]`);
        
        if (navList && activeLink) {
          const navRect = navList.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          const left = linkRect.left - navRect.left + linkRect.width / 2;
          
          setIndicatorStyle({
            left: `${left}px`,
            opacity: 1
          });
        }
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [active]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [toggle]);

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
      className={`px-6 sm:px-16 w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10' 
          : 'bg-transparent'
      } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
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
        <ul className='nav-list list-none hidden sm:flex flex-row gap-8 relative'>
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              data-nav-id={link.id}
              className={`nav-link ${active === link.id ? 'active text-white' : 'text-gray-400'} hover:text-white text-[16px] font-medium cursor-pointer transition-all duration-300 relative py-2 px-1`}
              onClick={() => handleClick(link.id)}
            >
              {link.title}
            </li>
          ))}
          
          {/* Animated dot indicator */}
          <div 
            className="nav-indicator absolute -bottom-3 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{
              left: indicatorStyle.left,
              opacity: indicatorStyle.opacity,
              transform: 'translateX(-50%)'
            }}
          />
        </ul>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            className='hamburger-menu w-8 h-8 flex flex-col items-center justify-center text-white cursor-pointer relative z-50'
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
              toggle ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`} />
            <span className={`hamburger-line block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
              toggle ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`} />
            <span className={`hamburger-line block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
              toggle ? '-rotate-45 -translate-y-0.5' : 'translate-y-2'
            }`} />
          </button>

          {/* Mobile Menu Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
              toggle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setToggle(false)}
          />

          {/* Mobile Menu */}
          <div className={`mobile-menu fixed top-0 right-0 bottom-0 w-[min(75vw,320px)] bg-black/95 backdrop-blur-md border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out z-40 ${
            toggle ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full pt-20 px-6">
              <ul className='list-none flex flex-col gap-6'>
                {navLinks.map((nav, index) => (
                  <li
                    key={nav.id}
                    className={`mobile-nav-item transform transition-all duration-300 ease-out ${
                      toggle ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <button
                      className={`${
                        active === nav.id 
                          ? 'text-white border-l-2 border-blue-500 pl-4' 
                          : 'text-gray-300 pl-4'
                      } hover:text-white hover:border-l-2 hover:border-purple-500 hover:pl-4 font-medium text-lg transition-all duration-300 w-full text-left py-2`}
                      onClick={() => handleClick(nav.id)}
                    >
                      {nav.title}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Mobile menu footer */}
              <div className="mt-auto pb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                <p className="text-gray-400 text-sm text-center">
                  Siddhant Gureja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

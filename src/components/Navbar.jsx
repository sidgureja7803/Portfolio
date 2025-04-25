import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { scrollTo, initSmoothScroll } from '../utils/scroll';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    initSmoothScroll();
  }, []);

  const handleClick = (id) => {
    setActive(id);
    setToggle(false);
    
    // Add a small delay to ensure the menu is closed before scrolling
    setTimeout(() => {
      scrollTo(`#${id}`);
    }, 100);
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary font-bold text-lg'>
            S
          </div>
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Siddhant &nbsp;
            <span className='sm:block hidden'>| Portfolio</span>
          </p>
        </Link>

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

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            className='w-[28px] h-[28px] flex items-center justify-center text-white cursor-pointer'
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? '✕' : '☰'}
          </button>

          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
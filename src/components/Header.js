import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About', type: 'section' },
    { href: '#skills', label: 'Skills', type: 'section' },
    { href: '#experience', label: 'Experience', type: 'section' },
    { href: '#projects', label: 'Projects', type: 'section' },
    { href: '/blogs', label: 'Blog', type: 'route' },
    { href: '#contact', label: 'Contact', type: 'section' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const goToNavItem = (item) => {
    if (item.type === 'route') {
      navigate(item.href);
      setIsMobileMenuOpen(false);
      return;
    }
    if (location.pathname === '/') {
      scrollToSection(item.href);
    } else {
      navigate(`/${item.href}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 md:py-7">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => (location.pathname === '/' ? scrollToSection('#hero') : navigate('/'))}
            className="font-display text-sm font-semibold tracking-[0.2em] uppercase"
          >
            SG
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => goToNavItem(item)}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 border-t border-border pt-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => goToNavItem(item)}
                className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors font-medium rounded-xl"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
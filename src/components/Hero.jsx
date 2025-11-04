import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socialLinks } from '../constants';

const Hero = () => {
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Start content animation after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Complete typewriter effect
    const typewriterTimer = setTimeout(() => {
      setTypewriterComplete(true);
    }, 3500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(typewriterTimer);
    };
  }, []);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Handle button magnetic effect
  const handleButtonMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = (x / distance) * strength * 10;
      const moveY = (y / distance) * strength * 10;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-4px) scale(1.05)`;
    }
  };

  const handleButtonMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  // Function to handle scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Animated Background with Subtle Effects */}
      <div className="hero-animated-bg">
        {/* Geometric Pattern Layer */}
        <div className="geometric-pattern"></div>
        
        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        
        {/* Grid Overlay */}
        <div className="grid-overlay"></div>
        
        {/* Depth Layer */}
        <div className="hero-depth-layer"></div>
      </div>
      
      {/* Pure Black Base */}
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-8 flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center pt-20 md:pt-0 pr-0 md:pr-10 lg:pr-16">
          {/* Status Indicator with Animation */}
          <div className={`status-indicator mb-6 ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <div className="status-dot"></div>
            <span className="text-sm font-medium text-gray-300">Available for work</span>
          </div>

          {/* Main Heading with Typewriter Effect */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              <span className={`${showContent ? 'stagger-item' : 'opacity-0'}`}>Hi, I'm </span>
              <span className={`gradient-text-animated ${typewriterComplete ? 'completed' : 'typewriter-container'}`}>
                Siddhant
              </span>
            </h1>
          </div>

          {/* Role with Staggered Animation */}
          <div className={`mb-8 flex items-center ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <span className="text-xl md:text-2xl font-medium text-gray-300 mr-2">I'm a </span>
            <span className="text-xl md:text-2xl font-bold text-accent-primary">
              Developer
            </span>
          </div>

          {/* Description with Word Reveals */}
          <div className={`mb-8 ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
              <span className="word-reveal" style={{animationDelay: '0.8s'}}>Full-Stack</span>{' '}
              <span className="word-reveal" style={{animationDelay: '0.9s'}}>Developer</span>{' '}
              <span className="word-reveal" style={{animationDelay: '1.0s'}}>specializing</span>{' '}
              <span className="word-reveal" style={{animationDelay: '1.1s'}}>in</span>{' '}
              <span className="text-blue-400 font-semibold word-reveal" style={{animationDelay: '1.2s'}}>React</span>,{' '}
              <span className="text-green-400 font-semibold word-reveal" style={{animationDelay: '1.3s'}}>Node.js</span>,{' '}
              <span className="word-reveal" style={{animationDelay: '1.4s'}}>and</span>{' '}
              <span className="text-purple-400 font-semibold word-reveal" style={{animationDelay: '1.5s'}}>Cloud</span>{' '}
              <span className="text-purple-400 font-semibold word-reveal" style={{animationDelay: '1.6s'}}>Solutions</span>
              <br className="hidden sm:block" />
              <span className="word-reveal" style={{animationDelay: '1.7s'}}>Building</span>{' '}
              <span className="word-reveal" style={{animationDelay: '1.8s'}}>scalable</span>{' '}
              <span className="word-reveal" style={{animationDelay: '1.9s'}}>web</span>{' '}
              <span className="word-reveal" style={{animationDelay: '2.0s'}}>applications</span>{' '}
              <span className="word-reveal" style={{animationDelay: '2.1s'}}>and</span>{' '}
              <span className="word-reveal" style={{animationDelay: '2.2s'}}>user</span>{' '}
              <span className="word-reveal" style={{animationDelay: '2.3s'}}>experiences</span>
            </p>
          </div>

          {/* Location with Staggered Animation */}
          <div className={`flex items-center gap-2 mb-8 text-gray-400 ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <FaMapMarkerAlt className="text-red-400" />
            <span>Patiala, Punjab, India</span>
          </div>

          {/* Progressive Call-to-Action Button Flow */}
          <div className={`cta-container mb-8 ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <button
              onClick={() => scrollToSection('projects')}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="cta-button cta-primary cta-magnetic cta-ripple cta-progressive cta-attract"
            >
              <span className="cta-text">View My Work</span>
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="cta-button cta-secondary cta-magnetic cta-ripple cta-progressive cta-attract"
            >
              <span className="cta-text">Get In Touch</span>
            </button>
            
            <a
              href="/resume.pdf"
              download
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="cta-button cta-tertiary cta-magnetic cta-ripple cta-progressive cta-attract"
            >
              <FaDownload className="text-sm" />
              <span className="cta-text">Resume</span>
            </a>
          </div>

          {/* Social Links with Staggered Animation */}
          <div className={`flex gap-6 ${showContent ? 'stagger-item' : 'opacity-0'}`}>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
              title="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              title="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
              title="LeetCode"
            >
              <SiLeetcode className="text-2xl" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              title="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Side - Interactive 3D Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
          <div className="profile-3d-container">
            <div 
              className="profile-3d-wrapper w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 20}deg) rotateY(${(mousePosition.x - 0.5) * -20}deg)`
              }}
            >
              {/* Particle Effects */}
              <div className="profile-particles">
                <div className="profile-particle"></div>
                <div className="profile-particle"></div>
                <div className="profile-particle"></div>
                <div className="profile-particle"></div>
              </div>
              
              {/* Glow Ring */}
              <div className="profile-glow-ring"></div>
              
              {/* Lighting Effects */}
              <div className="profile-lighting"></div>
              
              {/* Profile Image Container */}
              <div className="profile-image-container w-full h-full">
                <img 
                  src="/images/profile.png" 
                  alt="Siddhant Gureja" 
                  className="profile-image"
                />
                
                {/* Inner Glow */}
                <div className="profile-inner-glow"></div>
                
                {/* Reflection */}
                <div className="profile-reflection"></div>
              </div>
              
              {/* Shadow */}
              <div className="profile-shadow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-gray-400 text-sm cursor-pointer" onClick={() => scrollToSection('about')}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default Hero;
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { styles } from '../styles';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socialLinks } from '../constants';
import SplitLayout from './layout/SplitLayout';
import Button from './ui/Button';

const Hero = () => {
  // References for animations
  const typeTextRef = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  
  // Animation control for scroll-triggered animations
  const controls = useAnimation();
  
  // Scroll position for parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Text for typing effect
  const [typeText, setTypeText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const phrases = ['Developer', 'Designer', 'Problem Solver', 'Open Source Contributor'];
  
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Typing animation effect
  useEffect(() => {
    let timeout;
    
    if (typeIndex < phrases.length) {
      const currentPhrase = phrases[typeIndex];
      let charIndex = 0;
      const typingInterval = 100; // typing speed
      const pauseDuration = 1000; // pause between phrases
      
      const type = () => {
        if (charIndex < currentPhrase.length) {
          setTypeText(prev => prev + currentPhrase[charIndex]);
          charIndex++;
          timeout = setTimeout(type, typingInterval);
        } else {
          // Pause at the end of typing a word
          timeout = setTimeout(() => {
            // Clear text letter by letter
            const eraseText = () => {
              if (typeText.length > 0) {
                setTypeText(prev => prev.slice(0, -1));
                timeout = setTimeout(eraseText, typingInterval / 2);
              } else {
                setTypeIndex(prevIndex => (prevIndex + 1) % phrases.length);
              }
            };
            
            timeout = setTimeout(eraseText, pauseDuration);
          }, pauseDuration);
        }
      };
      
      if (typeText === '') {
        timeout = setTimeout(type, typingInterval);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [typeIndex, typeText, phrases.length]);
  
  // Cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 500);
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-800 dark:from-primary-950 dark:to-primary-900"></div>
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-soft-light"></div>
      
      {/* Subtle geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] rounded-full bg-accent-600/5 blur-3xl"
        />
        <svg className="absolute top-0 right-0 w-full h-full text-accent-500/[0.01] dark:text-accent-400/[0.01]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none">
          <motion.path 
            d="M0,0 L100,0 L100,100 L0,100 Z" 
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <SplitLayout
        fullHeight={true}
        className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-8"
        leftClassName="flex flex-col justify-center pt-20 md:pt-0"
        rightClassName="flex items-center justify-center pt-6 md:pt-0"
        leftContent={
          <div className="pr-0 md:pr-10 lg:pr-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4 text-accent-500"
            >
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-50 dark:text-primary-50"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
                Siddhant
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex items-center"
            >
              <span className="text-xl md:text-2xl font-medium text-primary-200 dark:text-primary-200 mr-1">I'm a </span>
              <span className="text-xl md:text-2xl font-bold text-accent-500 min-w-[180px]">
                {typeText}
                <span ref={cursorRef} className="opacity-100 animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-primary-300 dark:text-primary-300 mb-8 leading-relaxed max-w-lg"
            >
              Full-Stack Developer specializing in{' '}
              <span className="text-blue-400 font-semibold">React</span>,{' '}
              <span className="text-green-400 font-semibold">Node.js</span>, and{' '}
              <span className="text-purple-400 font-semibold">Cloud Solutions</span>
              <br className="hidden sm:block" />
              Building scalable web applications and user experiences
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2 mb-8 text-gray-400"
            >
              <FaMapMarkerAlt className="text-red-400" />
              <span>Patiala, Punjab, India</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <FaDownload className="text-sm" />
                Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex gap-6"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                title="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                title="LeetCode"
              >
                <SiLeetcode className="text-2xl" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                title="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            {/* Animated border */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full blur-sm opacity-75"
            />
            
            {/* Profile image container */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="/images/profile.png" 
                alt="Siddhant Gureja" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20"></div>
            </div>

            {/* Floating elements around profile */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg"
            >
              <FaGithub className="text-xl" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
              <SiLeetcode className="text-xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';

// Animated typing effect component
const TypedText = ({ phrases }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const phrase = phrases[currentPhrase];
      
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(phrase.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }
      
      if (!isDeleting && currentText === phrase) {
        // Once phrase is fully typed, wait a bit then start deleting
        setIsDeleting(true);
        setTypingSpeed(1000);
      } else if (isDeleting && currentText === '') {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(300);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentPhrase, isDeleting, phrases, typingSpeed]);
  
  return (
    <span className="inline-block min-w-[150px]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 inline-block w-[3px] h-[1.2em] bg-blue-500 align-middle"
      />
    </span>
  );
};

// Animated particles background
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, index) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 8 + 10;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={index}
            className="particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${initialY}%`,
              left: `${initialX}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// Floating animation for profile image
const FloatingImage = ({ src, alt, className }) => {
  return (
    <motion.div
      className={`${className} relative`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="rounded-full object-cover shadow-lg border-2 border-blue-500/30"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300?text=Profile+Image';
        }}
      />
      
      <motion.div
        className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-sm -z-10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Animated social icon
const SocialIcon = ({ icon: Icon, href, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "#3B82F6",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label={label}
    >
      <Icon size={20} />
    </motion.a>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
  }, [controls]);
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);
  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center px-4"
      onMouseMove={handleMouseMove}
    >
      <ParticleEffect />
      
      {/* Background gradients */}
      <div className="blur-gradient-blue w-[500px] h-[500px] -top-[100px] -left-[100px]" />
      <div className="blur-gradient-purple w-[500px] h-[500px] -bottom-[100px] -right-[100px]" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content - text */}
          <motion.div 
            className="lg:w-7/12 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            <motion.div 
              className="mb-4 inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-sm text-blue-400 border border-blue-500/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to my portfolio
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ 
                rotateY, 
                rotateX,
                perspective: "1000px",
              }}
            >
              Hi, I'm <span className="text-gradient">Siddhant Gureja</span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I'm a <TypedText phrases={["Web Developer", "Designer", "3D Enthusiast"]} />
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Creating immersive digital experiences with cutting-edge technologies. Specializing in React, Three.js, and interactive web applications.
            </motion.p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                className="px-8 py-3 rounded-lg bg-gradient text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleScrollToAbout}
              >
                Explore My Work
              </motion.button>
              
              <motion.a
                href="#contact"
                className="px-8 py-3 rounded-lg border border-blue-500/30 text-white font-medium hover:bg-blue-500/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Contact Me
              </motion.a>
            </div>
            
            <motion.div 
              className="mt-10 flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <SocialIcon 
                icon={FaGithub} 
                href="https://github.com/" 
                label="GitHub Profile" 
              />
              <SocialIcon 
                icon={FaLinkedin} 
                href="https://linkedin.com/in/" 
                label="LinkedIn Profile" 
              />
              <SocialIcon 
                icon={FaTwitter} 
                href="https://twitter.com/" 
                label="Twitter Profile" 
              />
            </motion.div>
          </motion.div>
          
          {/* Right content - image */}
          <motion.div 
            className="lg:w-5/12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <FloatingImage 
              src="/images/profile.jpg"
              alt="Siddhant Gureja"
              className="w-64 h-64 sm:w-80 sm:h-80"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleScrollToAbout}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowDown className="text-blue-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home; 
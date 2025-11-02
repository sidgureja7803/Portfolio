import { useState, useEffect } from 'react';
import { styles } from '../styles';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socialLinks } from '../constants';

const Hero = () => {
  // Function to handle scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-800"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-8 flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center pt-20 md:pt-0 pr-0 md:pr-10 lg:pr-16">
          <div className="flex items-center gap-2 mb-4 text-accent-500">
            <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
            <span className="text-sm font-medium">Available for work</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-50">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
              Siddhant
            </span>
          </h1>

          <div className="mb-6 flex items-center">
            <span className="text-xl md:text-2xl font-medium text-primary-200 mr-1">I'm a </span>
            <span className="text-xl md:text-2xl font-bold text-accent-500">
              Developer
            </span>
          </div>

          <p className="text-base md:text-lg text-primary-300 mb-8 leading-relaxed max-w-lg">
            Full-Stack Developer specializing in{' '}
            <span className="text-blue-400 font-semibold">React</span>,{' '}
            <span className="text-green-400 font-semibold">Node.js</span>, and{' '}
            <span className="text-purple-400 font-semibold">Cloud Solutions</span>
            <br className="hidden sm:block" />
            Building scalable web applications and user experiences
          </p>

          <div className="flex items-center gap-2 mb-8 text-gray-400">
            <FaMapMarkerAlt className="text-red-400" />
            <span>Patiala, Punjab, India</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold"
            >
              Get In Touch
            </button>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <FaDownload className="text-sm" />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              title="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              title="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              title="LeetCode"
            >
              <SiLeetcode className="text-2xl" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              title="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
          <div className="relative">
            {/* Simple border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75"></div>
            
            {/* Profile image container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
              <img 
                src="/images/profile.png" 
                alt="Siddhant Gureja" 
                className="w-full h-full object-cover"
              />
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
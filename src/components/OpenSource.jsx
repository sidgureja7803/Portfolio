import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { fadeIn, textVariant } from '../utils/motion';
import { FaGithub } from 'react-icons/fa';

const ContributionCard = ({ title, description, type, link }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6 rounded-2xl sm:w-[400px] w-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-500/20"
      onClick={() => window.open(link, '_blank')}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-white font-bold text-[24px] mb-4">{title}</h3>
        
        {/* Image Placeholder */}
        <div className="relative h-48 mb-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center group">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-sm">Add {title} image here</p>
            <p className="text-xs mt-2 text-gray-500">
              Upload to: public/images/{title.toLowerCase().replace(/\s+/g, '-')}.jpg
            </p>
          </div>
          
          {/* This will show the actual image when user uploads */}
          <img
            src={`/images/${title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 opacity-0"
            onLoad={(e) => {
              e.target.style.opacity = '1';
              e.target.previousElementSibling.style.display = 'none';
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Overlay for uploaded images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold drop-shadow-lg">{title}</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 text-[16px] leading-relaxed mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
            {type}
          </span>
          <div className="text-purple-400 hover:text-purple-300 transition-colors">
            <FaGithub className="text-xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenSourceCard = ({ title, description, link, stars, forks, tech }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full hover:shadow-card transition-shadow duration-300"
    >
      <div className="relative w-full h-[230px] cursor-pointer group" onClick={() => window.open(link, "_blank")}>
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>
            <h3 className="text-white font-bold text-[24px]">{title}</h3>
            <p className="text-secondary text-[14px] mt-2">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">⭐ {stars}</span>
            <span className="text-white">🍴 {forks}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex flex-wrap gap-2">
            {tech.map((tag, index) => (
              <span
                key={index}
                className="text-[14px] text-white bg-black bg-opacity-50 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const contributionPrograms = [
    {
      title: "Hacktoberfest 2024",
      description: "Participated in Hacktoberfest 2024, contributing to multiple open source projects. Made meaningful contributions to improve documentation, fix bugs, and add new features across various repositories.",
      type: "Global Event",
      link: "https://holopin.io/@siddhantgureja"
    },
    {
      title: "C4GT 2024",
      description: "Selected for Code for GovTech (C4GT) 2024 program. Contributed to government technology projects aimed at improving digital infrastructure and citizen services in India.",
      type: "Government Program", 
      link: "https://www.codeforgovtech.in/"
    }
  ];

  const contributions = [
    {
      title: "React Three Fiber",
      description: "Contributed to the development of React Three Fiber, a React renderer for Three.js.",
      link: "https://github.com/pmndrs/react-three-fiber",
      stars: "22.5k",
      forks: "1.2k",
      tech: ["React", "Three.js", "TypeScript"]
    },
    // Add more contributions
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Contributions</p>
        <h2 className={styles.sectionHeadText}>Open Source.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I actively contribute to open source projects through various programs and initiatives.
        My contributions focus on improving digital infrastructure, fixing bugs, adding features,
        and making technology more accessible to everyone.
      </motion.p>

      {/* Major Contribution Programs */}
      <div className="mt-20">
        <motion.h3 
          variants={fadeIn("up", "spring", 0.1, 0.75)}
          className="text-white font-bold text-[30px] mb-10 text-center"
        >
          Major Programs
        </motion.h3>
        
        <div className="flex flex-wrap gap-8 justify-center">
          {contributionPrograms.map((program, index) => (
            <ContributionCard key={index} {...program} />
          ))}
        </div>
      </div>

      {/* Other Contributions */}
      {contributions.length > 0 && (
        <div className="mt-20">
          <motion.h3 
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            className="text-white font-bold text-[30px] mb-10 text-center"
          >
            Project Contributions
          </motion.h3>
          
          <div className="flex flex-wrap gap-7 justify-center">
            {contributions.map((contribution, index) => (
              <OpenSourceCard key={index} {...contribution} />
            ))}
          </div>
        </div>
      )}

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className="mt-16 flex justify-center"
      >
        <a
          href="https://www.holopin.io/@sidgureja7803#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaGithub className="text-xl" />
          <span>View my Holopin Board</span>
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(OpenSource, "opensource"); 
import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode, FaEye } from 'react-icons/fa';
import SectionWrapper from '../hoc/SectionWrapper';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  github_link,
}) => {
  // Fix for image paths - use .png extension
  const imagePath = `/images/${image}.png`;
  
  return (
    <motion.div 
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="w-full"
    >
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-6 rounded-3xl w-full relative group hover:shadow-2xl transition-all duration-500 border border-purple-500/10 hover:border-purple-500/30"
      >
        {/* Featured badge for top projects */}
        {index < 3 && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 z-10 shadow-lg">
            <FaStar className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-2xl mb-6 group-hover:shadow-xl transition-all duration-500">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            {github_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(github_link, '_blank')}
                className="bg-gray-800/90 backdrop-blur-sm hover:bg-purple-600 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                title="View Source Code"
              >
                <FaGithub className="w-5 h-5" />
              </motion.button>
            )}
            
            {source_code_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(source_code_link, '_blank')}
                className="bg-gray-800/90 backdrop-blur-sm hover:bg-green-600 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                title="Live Demo"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-purple-400 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-gray-300 text-base leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, tagIndex) => {
              const TagIcon = tag.icon;
              
              return (
                <motion.div 
                  key={`${tag.name}-${tagIndex}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  {TagIcon && <TagIcon className={`w-4 h-4 ${tag.color}`} />}
                  <span className="text-gray-300 text-sm font-medium">{tag.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Project Stats/Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <FaCode className="w-4 h-4" />
                <span>Code</span>
              </div>
              <div className="flex items-center gap-1">
                <FaEye className="w-4 h-4" />
                <span>Demo</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {github_link && (
                <motion.a
                  href={github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
              )}
              {source_code_link && (
                <motion.a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      {/* Enhanced Project Stats */}
      <motion.div 
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-6 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
          <motion.h3 
            className="text-white text-4xl font-bold mb-2"
            whileHover={{ scale: 1.05 }}
          >
            {projects.length}+
          </motion.h3>
          <p className="text-blue-400 text-sm font-medium">Projects Completed</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl p-6 text-center border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <motion.h3 
            className="text-white text-4xl font-bold mb-2"
            whileHover={{ scale: 1.05 }}
          >
            15+
          </motion.h3>
          <p className="text-purple-400 text-sm font-medium">Technologies Used</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-6 text-center border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          <motion.h3 
            className="text-white text-4xl font-bold mb-2"
            whileHover={{ scale: 1.05 }}
          >
            1000+
          </motion.h3>
          <p className="text-green-400 text-sm font-medium">Lines of Code</p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
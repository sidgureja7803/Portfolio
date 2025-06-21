import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
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
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full relative group hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div className="flex gap-2">
              {github_link && (
                <div
                  onClick={() => window.open(github_link, '_blank')}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
                  title="View GitHub Repository"
                >
                  <FaGithub className="text-white w-5 h-5" />
                </div>
              )}
              
              {source_code_link && (
                <div
                  onClick={() => window.open(source_code_link, '_blank')}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110"
                  title="View Live Demo"
                >
                  <FaExternalLinkAlt className="text-white w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Featured badge for top projects */}
          {index < 3 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px] hover:text-purple-400 transition-colors duration-300">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => {
            const TagIcon = tag.icon;
            
            return (
              <div 
                key={`${tag.name}-${tagIndex}`} 
                className="text-[12px] flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              >
                {TagIcon && <TagIcon className={`w-3 h-3 ${tag.color}`} />}
                <span className="text-white font-medium">{tag.name}</span>
              </div>
            );
          })}
        </div>

        {/* Hover overlay with project details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-5">
          <div className="text-white">
            <h4 className="font-bold text-lg mb-2">{name}</h4>
            <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
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

      {/* Projects Stats */}
      <motion.div 
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className="mt-10 flex flex-wrap gap-6 justify-center"
      >
        <div className="bg-tertiary rounded-2xl p-6 min-w-[200px] text-center">
          <h3 className="text-white text-3xl font-bold">{projects.length}+</h3>
          <p className="text-secondary text-sm">Projects Completed</p>
        </div>
        <div className="bg-tertiary rounded-2xl p-6 min-w-[200px] text-center">
          <h3 className="text-white text-3xl font-bold">15+</h3>
          <p className="text-secondary text-sm">Technologies Used</p>
        </div>
        <div className="bg-tertiary rounded-2xl p-6 min-w-[200px] text-center">
          <h3 className="text-white text-3xl font-bold">100+</h3>
          <p className="text-secondary text-sm">GitHub Commits</p>
        </div>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
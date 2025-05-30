import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full relative group"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {github_link && (
              <div
                onClick={() => window.open(github_link, '_blank')}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2"
                title="View GitHub Repository"
              >
                <FaGithub className="text-white w-5 h-5" />
              </div>
            )}
            
            {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, '_blank')}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                title="View Live Demo"
              >
                <FaExternalLinkAlt className="text-white w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-3">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => {
        const TagIcon = tag.icon;
    
          return (
          <div 
        key={`${tag.name}-${index}`} 
        className="text-[14px] flex items-center gap-1 px-3 py-1 rounded-full bg-black bg-opacity-70 border border-opacity-20 border-white"
          >
        {TagIcon && <TagIcon className={`w-4 h-4 ${tag.color}`} />}
        <span className="text-white">{tag.name}</span>
        </div>
        );
      })}
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
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
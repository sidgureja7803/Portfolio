import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode, FaEye } from 'react-icons/fa';
import { projects } from '../constants';

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
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-900 to-gray-900 p-6 rounded-xl w-full relative group shadow-md hover:shadow-lg transition-all duration-300 border border-purple-500/10 hover:border-purple-500/30">
      
        {/* Featured badge for top projects */}
        {index < 3 && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 z-10 shadow-lg">
            <FaStar className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-lg mb-6">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover"
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {github_link && (
              <button
                onClick={() => window.open(github_link, '_blank')}
                className="bg-gray-800/90 hover:bg-purple-600 text-white p-3 rounded-full transition-colors duration-300 shadow-md"
                title="View Source Code"
              >
                <FaGithub className="w-5 h-5" />
              </button>
            )}
            
            {source_code_link && (
              <button
                onClick={() => window.open(source_code_link, '_blank')}
                className="bg-gray-800/90 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-300 shadow-md"
                title="Live Demo"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </button>
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
                <div 
                  key={`${tag.name}-${tagIndex}`}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700"
                >
                  {TagIcon && <TagIcon className={`w-3 h-3 ${tag.color}`} />}
                  <span className="text-gray-300 text-xs font-medium">{tag.name}</span>
                </div>
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
                <a
                  href={github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <div className="py-10">
      <div>
        <p className="text-sm text-secondary uppercase tracking-wider">My work</p>
        <h2 className="text-white font-black text-4xl md:text-5xl">Projects.</h2>
      </div>

      <div className="w-full">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </p>
      </div>

      {/* Project Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      
        <div className="bg-tertiary rounded-lg p-6 text-center shadow-md">
          <h3 className="text-white text-4xl font-bold mb-2">
            {projects.length}+
          </h3>
          <p className="text-blue-400 text-sm font-medium">Projects Completed</p>
        </div>
        
        <div className="bg-tertiary rounded-lg p-6 text-center shadow-md">
          <h3 className="text-white text-4xl font-bold mb-2">
            15+
          </h3>
          <p className="text-purple-400 text-sm font-medium">Technologies Used</p>
        </div>
        
        <div className="bg-tertiary rounded-lg p-6 text-center shadow-md">
          <h3 className="text-white text-4xl font-bold mb-2">
            1000+
          </h3>
          <p className="text-green-400 text-sm font-medium">Lines of Code</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
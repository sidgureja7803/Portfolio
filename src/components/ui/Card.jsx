import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  padding = true,
  border = false,
  shadow = true,
  rounded = true,
  ...props
}) => {
  return (
    <motion.div
      className={`
        ${padding ? 'p-6' : ''}
        ${border ? 'border border-primary-200 dark:border-primary-700' : ''}
        ${shadow ? 'shadow-md hover:shadow-lg' : ''}
        ${rounded ? 'rounded-lg' : ''}
        bg-white dark:bg-primary-800
        transition-all duration-300 ease-in-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Project card with tech stack and image overlay
export const ProjectCard = ({
  title,
  description,
  image,
  techStack = [],
  demoLink,
  codeLink,
  className = '',
  ...props
}) => {
  return (
    <Card
      padding={false}
      shadow={true}
      className={`overflow-hidden group ${className}`}
      hover={false}
      {...props}
    >
      {/* Image with overlay */}
      <div className="relative h-48 md:h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2 flex-wrap">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium text-white bg-primary-800/70 rounded-md backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-primary-900 dark:text-primary-100">{title}</h3>
        <p className="text-primary-600 dark:text-primary-300 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Links */}
        <div className="flex space-x-3 pt-2">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center"
            >
              <span className="mr-1">Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center"
            >
              <span className="mr-1">Code</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

// Blog card with reading time and tags
export const BlogCard = ({
  title,
  excerpt,
  coverImage,
  readingTime,
  date,
  tags = [],
  url,
  className = '',
  ...props
}) => {
  return (
    <Card
      padding={false}
      shadow={true}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {/* Image */}
      {coverImage && (
        <div className="h-40 md:h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex justify-between items-center text-xs text-primary-500 dark:text-primary-400 mb-2">
          <span>{date}</span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min read
          </span>
        </div>
        
        {/* Title & Excerpt */}
        <h3 className="text-lg font-semibold mb-2 text-primary-900 dark:text-primary-100">{title}</h3>
        <p className="text-primary-600 dark:text-primary-300 text-sm mb-4 line-clamp-3">{excerpt}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-300 bg-primary-100 dark:bg-primary-700 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Read More */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center"
        >
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </Card>
  );
};

// Achievement card for education section
export const AchievementCard = ({
  title,
  subtitle,
  date,
  icon,
  description,
  className = '',
  ...props
}) => {
  return (
    <Card className={`border-l-4 border-l-accent-600 ${className}`} {...props}>
      <div className="flex items-start">
        {icon && <div className="mr-4 text-accent-600">{icon}</div>}
        <div>
          <div className="text-xs text-primary-500 dark:text-primary-400 mb-1">{date}</div>
          <h3 className="text-lg font-semibold mb-1 text-primary-900 dark:text-primary-100">{title}</h3>
          <h4 className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">{subtitle}</h4>
          {description && <p className="text-primary-600 dark:text-primary-400 text-sm">{description}</p>}
        </div>
      </div>
    </Card>
  );
};

export default Card;

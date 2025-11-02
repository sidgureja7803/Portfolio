import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences, incubatorCRM } from '../constants';
import SectionWrapper from '../hoc/SectionWrapper';
import { FaChevronDown, FaChevronUp, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => (
  <div className="bg-tertiary p-4 rounded-lg mt-2 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-white text-[18px] font-medium">{project.name}</h4>
      <div className="flex gap-2">
        {project.source_code_link && (
          <a 
            href={project.source_code_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white p-2 hover:text-blue-400 transition-colors"
          >
            <FaCode />
          </a>
        )}
        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white p-2 hover:text-blue-400 transition-colors"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
    <p className="text-secondary text-[14px]">{project.description}</p>
    <div className="flex flex-wrap gap-2 mt-2">
      {project.tags && project.tags.map((tag, index) => (
        <span key={index} className={`text-xs px-2 py-1 rounded-full ${tag.color}`}>
          {tag.name}
        </span>
      ))}
    </div>
    
    {/* Show project image if it exists */}
    {project.image && (
      <div className="mt-3 w-full h-[120px] overflow-hidden rounded-lg">
        <img
          src={`/images/${project.image}.png`}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>
    )}
  </div>
);

const ExperienceCard = ({ experience }) => {
  const [showProjects, setShowProjects] = useState(false);
  
  // Check if we need to add the incubatorCRM project to Thapar Innovate experience
  const isInnovate = experience.company_name === "Thapar Innovate";
  const projectsToShow = isInnovate ? [incubatorCRM] : experience.projects || [];
  const hasProjects = isInnovate || (experience.projects && experience.projects.length > 0);
  
  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
      
      {hasProjects && (
        <>
          <button 
            className="mt-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => setShowProjects(!showProjects)}
          >
            {showProjects ? 'Hide Projects' : 'Show Projects'} 
            {showProjects ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {showProjects && (
            <div className="mt-2">
              {projectsToShow.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="py-10">
      <div className="text-center">
        <p className={`${styles.sectionSubText}`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Work Experience.
        </h2>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'work'); 
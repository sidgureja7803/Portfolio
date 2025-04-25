import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { education } from '../constants';
import SectionWrapper from '../hoc/SectionWrapper';
import { textVariant } from '../utils/motion';
import { FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ education }) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#1d1836', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    date={education.date}
    iconStyle={{ background: education.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <FaGraduationCap className="w-[60%] h-[60%] text-white" />
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">{education.degree}</h3>
      <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
        {education.school}
      </p>
      <p className="text-white-100 text-[14px]">{education.location}</p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {education.points.map((point, index) => (
        <li
          key={`education-point-${index}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>

    {education.achievements && (
      <div className="mt-4">
        <h4 className="text-white text-[16px] font-semibold">Achievements:</h4>
        <ul className="mt-2 list-disc ml-5 space-y-1">
          {education.achievements.map((achievement, index) => (
            <li
              key={`achievement-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    )}
  </VerticalTimelineElement>
);

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My academic journey</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education"); 
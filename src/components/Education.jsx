import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { education } from '../constants';
import SectionWrapper from '../hoc/SectionWrapper';
import { textVariant } from '../utils/motion';
import { FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ education, index }) => (
  <VerticalTimelineElement
    contentStyle={{ 
      background: 'linear-gradient(135deg, #1e1e2e 0%, #16213e 50%, #1d1836 100%)', 
      color: '#fff',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px'
    }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    date={education.date}
    iconStyle={{ background: education.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <FaGraduationCap className="w-[60%] h-[60%] text-white" />
      </div>
    }
  >
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Content Section */}
      <div className={`flex-1 ${index === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
        <div>
          <h3 className="text-white text-[24px] font-bold leading-tight">{education.degree}</h3>
          <p className="text-secondary text-[18px] font-semibold mt-2" style={{ margin: 0 }}>
            {education.school}
          </p>
          <p className="text-white-100 text-[16px] mt-1">{education.location}</p>
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {education.points.map((point, index) => (
            <li
              key={`education-point-${index}`}
              className="text-white-100 text-[15px] pl-1 tracking-wider leading-relaxed"
            >
              {point}
            </li>
          ))}
        </ul>

        {education.achievements && (
          <div className="mt-6">
            <h4 className="text-white text-[18px] font-semibold">Achievements:</h4>
            <ul className="mt-3 list-disc ml-5 space-y-2">
              {education.achievements.map((achievement, index) => (
                <li
                  key={`achievement-${index}`}
                  className="text-white-100 text-[15px] pl-1 tracking-wider leading-relaxed"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Image Section */}
      {education.image && (
        <div className={`flex-none w-full lg:w-80 ${index === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <img
                src={education.image}
                alt={education.school}
                className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg drop-shadow-lg">
                  {education.school}
                </p>
                <p className="text-gray-200 text-sm drop-shadow-md">
                  {education.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education"); 
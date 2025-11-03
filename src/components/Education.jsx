import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { education } from '../constants';
import { FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ education, index }) => {
  // College (index 0): Description LEFT, Image RIGHT
  // School (index 1): Description RIGHT, Image LEFT
  const isCollege = index === 0;
  
  return (
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
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Content Section */}
        <div className={`flex-1 ${isCollege ? 'lg:order-1' : 'lg:order-2'}`}>
          <div>
            <h3 className="text-white text-[24px] font-bold leading-tight">{education.degree}</h3>
            <p className="text-secondary text-[18px] font-semibold mt-2" style={{ margin: 0 }}>
              {education.school}
            </p>
            <p className="text-white-100 text-[16px] mt-1">{education.location}</p>
          </div>

          <ul className="mt-5 list-disc ml-5 space-y-2">
            {education.points.map((point, pointIndex) => (
              <li
                key={`education-point-${pointIndex}`}
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
                {education.achievements.map((achievement, achievementIndex) => (
                  <li
                    key={`achievement-${achievementIndex}`}
                    className="text-white-100 text-[15px] pl-1 tracking-wider leading-relaxed"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image Section - College: Description LEFT, Image RIGHT; School: Description RIGHT, Image LEFT */}
        <div className={`flex-none w-full lg:w-80 ${isCollege ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative group">
            {/* Placeholder for user to add their own images */}
            <div className="relative h-64 lg:h-80 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-4">📸</div>
                <p className="text-sm">
                  Add your {isCollege ? 'college' : 'school'} photo here
                </p>
                <p className="text-xs mt-2 text-gray-500">
                  Upload to: public/images/{isCollege ? 'college' : 'school'}.jpg
                </p>
              </div>
            </div>
            
            {/* This will show the actual image when user uploads */}
            <img
              src={`/images/${isCollege ? 'college' : 'school'}.jpg`}
              alt={education.school}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100"
              onLoad={(e) => {
                e.target.style.opacity = '1';
                e.target.previousElementSibling.style.display = 'none';
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Overlay for uploaded images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </div>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  return (
    <div className="py-10">
      <div>
        <p className="text-sm text-secondary uppercase tracking-wider">My academic journey</p>
        <h2 className="text-white font-black text-4xl md:text-5xl">Education.</h2>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Education; 
import React from 'react';
import { services } from '../constants';

const ServiceCard = ({ title, icon, description, link }) => {
  const CardContent = () => (
    <div
      className='bg-tertiary rounded-lg py-5 px-6 min-h-[280px] flex justify-evenly items-center flex-col shadow-md'
    >
      <img src={icon} alt={title} className='w-16 h-16 object-contain' />
      <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      {description && (
        <p className='text-secondary text-[14px] text-center mt-2'>{description}</p>
      )}
    </div>
  );

  return (
    <div className='xs:w-[250px] w-full'>
      <div className='w-full p-[1px] rounded-lg border border-accent-500 shadow-lg'>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full h-full hover:bg-tertiary/80 transition-colors"
          >
            <CardContent />
          </a>
        ) : (
          <CardContent />
        )}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="py-10">
      <div>
        <p className="text-sm text-secondary uppercase tracking-wider text-center">Introduction</p>
        <h2 className="text-white font-black text-4xl md:text-5xl text-center">Overview.</h2>
      </div>

      <p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mx-auto'>
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </p>

      <div className='mt-20 flex flex-wrap gap-6 justify-center'>
        {services.map((service, index) => (
          <ServiceCard 
            key={service.title} 
            {...service} 
          />
        ))}
      </div>
    </div>
  );
};

export default About; 
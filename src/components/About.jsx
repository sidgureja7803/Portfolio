import React, { useEffect, useRef } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { fadeInUp, slideInLeft, slideInRight, staggerFadeInUp } from '../utils/animations';
import SectionWrapper from '../hoc/SectionWrapper';
import { useGSAP } from '@gsap/react';
import profilePic from './image.png';

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    fadeInUp(cardRef.current, index * 0.2);
  }, []);

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        ref={cardRef}
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const servicesRef = useRef(null);

  useGSAP(() => {
    slideInLeft(contentRef.current);
    slideInRight(imageRef.current, 0.3);
    const serviceCards = servicesRef.current.querySelectorAll('.service-card');
    staggerFadeInUp(serviceCards, 0.2);
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="flex-1" ref={contentRef}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            I'm a skilled software developer with experience in TypeScript and
            JavaScript, and expertise in frameworks like React, Node.js, and
            Three.js. I'm a quick learner and collaborate closely with clients to
            create efficient, scalable, and user-friendly solutions that solve
            real-world problems. Let's work together to bring your ideas to life!
          </motion.p>
        </div>

        <motion.div
          ref={imageRef}
          variants={fadeIn('left', 'spring', 0.3, 0.75)}
          className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] flex-shrink-0"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 transform hover:scale-105 transition-transform duration-300">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      <div ref={servicesRef} className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <div key={service.title} className="service-card">
            <ServiceCard index={index} {...service} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about'); 
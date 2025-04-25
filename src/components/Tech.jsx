import { Suspense, useState } from 'react';
import { BallCanvas } from './canvas';
import SectionWrapper from '../hoc/SectionWrapper';
import { technologies } from '../constants';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';

const TechCard = ({ technology, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className={`w-28 h-28 relative group ${isHovered ? 'scale-110' : ''} transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Suspense fallback={<div className="w-full h-full bg-tertiary rounded-full animate-pulse" />}>
        <BallCanvas icon={technology.icon} name={technology.name} />
      </Suspense>
      <div className={`
        absolute -bottom-10 left-1/2 transform -translate-x-1/2 
        bg-black bg-opacity-80 px-3 py-1 rounded-lg
        transition-all duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <p className="text-white text-sm whitespace-nowrap">{technology.name}</p>
      </div>
    </motion.div>
  );
};

const Tech = () => {  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <motion.div 
        variants={fadeIn("", "", 0.1, 1)}
        className="flex flex-row flex-wrap justify-center gap-10 mt-20"
      >
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} technology={technology} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, 'tech'); 
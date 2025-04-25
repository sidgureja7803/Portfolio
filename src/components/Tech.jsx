import { motion } from 'framer-motion';
import { styles } from '../styles';
import { technologies } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const TechCard = ({ icon: Icon, name, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
    initial="hidden"
    animate="show"
    className="w-28 h-28 rounded-xl bg-tertiary flex items-center justify-center relative group cursor-pointer"
  >
    <div className="w-16 h-16 relative flex items-center justify-center">
      <Icon className="w-12 h-12 text-white transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </div>
    <span className="absolute -bottom-8 text-white text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {name}
    </span>
  </motion.div>
);

const Tech = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <motion.div 
        className='mt-20 flex flex-wrap gap-12 justify-center max-w-5xl mx-auto px-4'
        variants={fadeIn('', '', 0.1, 1)}
        initial="hidden"
        animate="show"
      >
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} index={index} {...technology} />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech"); 
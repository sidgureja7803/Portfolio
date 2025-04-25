import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import SectionWrapper from '../hoc/SectionWrapper';
import { slideIn } from '../utils/motion';
import ContactForm from './ContactForm';
import GurejaSvgCanvas from './canvas/GurejaSvg';

const Contact = () => {
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <ContactForm />
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-center justify-center bg-transparent rounded-2xl"
      >
        <GurejaSvgCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact'); 
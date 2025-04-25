import { motion } from 'framer-motion';
import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section id={idName} className="relative w-full">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={`${styles.padding} max-w-7xl mx-auto relative z-0 mt-[100px]`}
        >
          <span className="hash-span" style={{ display: 'block', marginTop: '-100px', paddingBottom: '100px', visibility: 'hidden' }}>&nbsp;</span>
          <Component />
        </motion.div>
      </section>
    );
  };

export default SectionWrapper;
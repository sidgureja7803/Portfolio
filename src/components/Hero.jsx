import { motion } from 'framer-motion';
import { styles } from '../styles';
import GurejaSvgCanvas from './canvas/GurejaSvg';
import { Suspense } from 'react';
import Loader from './Loader';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '200px' }}
            transition={{ duration: 1.5 }}
            className="w-1 sm:h-80 h-40 violet-gradient"
          />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#915eff]"
            >
              Siddhant
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I develop full-stack web applications,<br className="sm:block hidden" />
            user interfaces and cloud solutions
          </motion.p>
        </div>

        <div className="flex-1 relative">
          {/* 3D Gureja Logo - positioned between text and image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] z-10">
            <GurejaSvgCanvas />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-purple-500/30"
          >
            <img 
              src="/image.png" 
              alt="Siddhant Gureja" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
      >
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero; 
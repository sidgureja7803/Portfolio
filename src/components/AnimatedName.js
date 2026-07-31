import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.018, delayChildren: 0 },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: '100%', rotateX: -60 },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Per-character reveal with a 3D rotate-up entrance, each letter masked
// inside overflow-hidden so it rises into place rather than simply fading.
const AnimatedName = ({ text, className = '' }) => {
  const words = text.split(' ');
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={container}
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em] last:mr-0" aria-hidden="true">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={charVariant}>
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedName;

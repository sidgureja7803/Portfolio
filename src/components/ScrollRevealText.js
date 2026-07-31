import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Word-by-word opacity/blur reveal tied directly to scroll progress through
// the element (not a one-shot viewport-enter fade) — each word brightens as
// the block scrolls up through the viewport, like a "focus pull" effect.
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block will-change-[opacity]">
      {children}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className = '' }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  });

  const words = text.split(' ');

  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={i} className="mr-[0.3em]">
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          </span>
        );
      })}
    </p>
  );
};

export default ScrollRevealText;

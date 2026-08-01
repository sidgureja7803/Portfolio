import React from 'react';
import { motion } from 'framer-motion';

// Masked slide-up reveal for section labels — same technique as the Hero
// title/tagline and the Contact heading, applied consistently everywhere a
// section starts, so every section announces itself instead of the label
// just appearing.
const SectionEyebrow = ({ children, className = '' }) => (
  <div className="overflow-hidden mb-10 md:mb-16">
    <motion.p
      className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground ${className}`}
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.p>
  </div>
);

export default SectionEyebrow;

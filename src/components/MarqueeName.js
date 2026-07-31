import React from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Continuous horizontal scroll of the name — two copies placed edge to edge,
// animated -50% so the loop seams invisibly. Falls back to a single static
// copy when the user prefers reduced motion.
const MarqueeName = ({ text, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="overflow-hidden">
        <span className={className}>{text}</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden" role="img" aria-label={text}>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        <span className={`${className} pr-16 md:pr-24`}>{text}</span>
        <span className={`${className} pr-16 md:pr-24`}>{text}</span>
      </div>
    </div>
  );
};

export default MarqueeName;

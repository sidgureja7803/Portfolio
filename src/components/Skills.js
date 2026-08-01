import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skills } from '../mock';
import { getSkillIcon } from '../lib/skillIcons';
import SectionCanvas from './SectionCanvas';
import SectionEyebrow from './SectionEyebrow';

const CATEGORY_LABELS = {
  programming: 'Programming',
  frontend: 'Frontend',
  styling: 'UI / Styling',
  backend: 'Backend & Data',
  devops: 'Cloud & DevOps',
  tools: 'Tooling',
  ai: 'AI',
  core: 'Fundamentals',
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const MAX_TILT = 14;

const SkillTile = ({ label, category }) => {
  const { icon: Icon, color } = getSkillIcon(label);
  const tileRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const tile = tileRef.current;
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -MAX_TILT, y: px * MAX_TILT });
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={tileRef}
      variants={tileVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onFocus={() => setHovered(true)}
      onBlur={handleLeave}
      tabIndex={0}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.06 : 1})`,
        transition: 'transform 0.2s ease-out',
      }}
      className="relative aspect-square flex items-center justify-center rounded-2xl bg-accent/60 hover:bg-accent outline-none"
    >
      <Icon
        className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-200"
        style={{ color, transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 pointer-events-none"
            style={{ transform: 'translateX(-50%) translateZ(40px)' }}
          >
            <div className="flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-neutral-950 text-white border border-white/10 shadow-2xl px-4 py-2.5">
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} aria-hidden="true" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-[10px] text-white/45 uppercase tracking-wide">{category}</span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 bg-neutral-950 border-r border-b border-white/10 rotate-45 mx-auto -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const allSkills = useMemo(() => {
    const seen = new Set();
    const result = [];
    Object.entries(skills).forEach(([categoryKey, list]) => {
      list.forEach((label) => {
        if (seen.has(label)) return;
        seen.add(label);
        result.push({ label, category: CATEGORY_LABELS[categoryKey] || categoryKey });
      });
    });
    return result;
  }, []);

  return (
    <section id="skills" className="relative px-6 md:px-10 overflow-hidden">
      <SectionCanvas
        variant="points"
        count={150}
        spread={3}
        color="#22d3ee"
        className="absolute -bottom-20 -left-20 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-45"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionEyebrow>Skills &amp; Technology Experience</SectionEyebrow>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5"
          style={{ perspective: 800 }}
        >
          {allSkills.map(({ label, category }) => (
            <SkillTile key={label} label={label} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

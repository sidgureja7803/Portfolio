import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../mock';
import { getSkillIcon } from '../lib/skillIcons';
import ScrollRevealText from './ScrollRevealText';
import { Code, Palette, Database, Cpu, Wrench, Brain, Layers } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', icon: Code, skills: skills.frontend },
  { key: 'styling', label: 'UI / Styling', icon: Palette, skills: skills.styling },
  { key: 'backend', label: 'Backend & Data', icon: Database, skills: skills.backend },
  { key: 'devops', label: 'Cloud & DevOps', icon: Cpu, skills: skills.devops },
  { key: 'tools', label: 'Tooling', icon: Wrench, skills: skills.tools },
  { key: 'ai', label: 'AI', icon: Brain, skills: skills.ai },
  { key: 'core', label: 'Fundamentals', icon: Layers, skills: skills.core },
];

const SkillTile = ({ label }) => {
  const { icon: Icon, color } = getSkillIcon(label);
  return (
    <motion.div
      variants={tileVariants}
      whileHover={{ y: -6, transition: { duration: 0.15 } }}
      className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-card hover:shadow-lg transition-colors text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${color}1a` }}
      >
        <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
      </div>
      <span className="text-sm font-medium text-foreground leading-snug">{label}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [activeKey, setActiveKey] = useState(CATEGORIES[0].key);
  const active = CATEGORIES.find((c) => c.key === activeKey);

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Code className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-foreground">Expertise</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">
            Technical <span className="font-normal text-primary">Skills</span>
          </h2>
          <ScrollRevealText
            text="Technologies and tools I use to design, build, and ship production systems"
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed justify-center"
          />
        </motion.div>

        {/* Category Switcher */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Skill categories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = cat.key === activeKey;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(cat.key)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <CatIcon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active category tiles */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {active.skills.map((skill) => (
              <SkillTile key={skill} label={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;

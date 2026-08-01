import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { experience } from '../mock';
import { getSkillIcon } from '../lib/skillIcons';
import { Calendar } from 'lucide-react';
import SectionCanvas from './SectionCanvas';
import SectionEyebrow from './SectionEyebrow';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Real brand marks served as local assets (all with transparent backgrounds,
// so they sit directly on the row without a boxed container); a colored
// monogram fallback covers everything else so the layout stays consistent.
const COMPANY_LOGO = {
  Zscaler: '/Zscaler.svg',
  'Code for GovTech': '/C4GT.png',
  'Thapar Innovate': '/Venture Lab.png',
};

const COMPANY_BRAND = {};

const CompanyBadge = ({ company }) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = COMPANY_LOGO[company];

  if (logoSrc && !logoFailed) {
    return (
      <img
        src={encodeURI(logoSrc)}
        alt={`${company} logo`}
        className="max-h-14 md:max-h-16 max-w-[180px] w-auto h-auto object-contain flex-shrink-0"
        onError={() => setLogoFailed(true)}
      />
    );
  }

  const brand = COMPANY_BRAND[company] || { initials: company.charAt(0), bg: 'from-primary to-primary/60' };
  return (
    <div
      className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${brand.bg} flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0`}
      aria-hidden="true"
    >
      {brand.initials}
    </div>
  );
};

const ExperienceRow = ({ exp, isLast }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`relative border-t border-border ${isLast ? 'border-b' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      tabIndex={0}
    >
      <div className="w-full text-left py-8 md:py-10 group cursor-default">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5 md:gap-7 min-w-0">
            <CompanyBadge company={exp.company} />
            <div className="min-w-0">
              <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                {exp.company}
              </h3>
              {exp.project && (
                <p className="text-sm md:text-base text-muted-foreground mt-1 truncate">{exp.project}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 flex-shrink-0 text-right">
            <span className="text-sm md:text-base text-foreground font-medium whitespace-nowrap">
              {exp.position}
            </span>
            <span className="flex items-center text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              <Calendar className="w-3 h-3 mr-1.5" />
              {exp.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Floats above the rows below it rather than pushing them down —
          a modal-style card, not an inline accordion. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%-1px)] z-30 rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-8 md:p-10"
          >
            {exp.summary && <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{exp.summary}</p>}

            <ul className="space-y-3 mb-6">
              {exp.description.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{item}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => {
                const { icon: TechIcon, color } = getSkillIcon(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <TechIcon className="w-3.5 h-3.5" style={{ color }} aria-hidden="true" />
                    {tech}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative px-6 md:px-10 overflow-hidden">
      <SectionCanvas
        variant="points"
        count={120}
        spread={3}
        color="#d946ef"
        className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-45"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionEyebrow>Work Experience</SectionEyebrow>

        <div>
          {experience.map((exp, index) => (
            <ExperienceRow key={exp.id} exp={exp} isLast={index === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

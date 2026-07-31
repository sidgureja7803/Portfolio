import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { experience } from '../mock';
import { getSkillIcon } from '../lib/skillIcons';
import ScrollRevealText from './ScrollRevealText';
import { Calendar, ChevronDown, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Real company logo where we have a proper asset (public/Zscaler.png); a
// colored monogram fallback for everything else so the layout stays consistent.
const COMPANY_LOGO = {
  Zscaler: '/Zscaler.svg',
};

const COMPANY_BRAND = {
  'Thapar Innovate': { initials: 'TI', bg: 'from-purple-600 to-purple-400' },
};

const CompanyBadge = ({ company }) => {
  const logoSrc = COMPANY_LOGO[company];

  if (logoSrc) {
    return (
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0 p-2">
        <img src={logoSrc} alt={`${company} logo`} className="w-full h-full object-contain" />
      </div>
    );
  }

  const brand = COMPANY_BRAND[company] || { initials: company.charAt(0), bg: 'from-primary to-primary/60' };
  return (
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.bg} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}
      aria-hidden="true"
    >
      {brand.initials}
    </div>
  );
};

const ExperienceCard = ({ exp, isLatest }) => {
  const [showAll, setShowAll] = useState(isLatest);
  const visibleBullets = showAll ? exp.description : exp.description.slice(0, 1);
  const hasMore = exp.description.length > 1;

  return (
    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/60 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <CompanyBadge company={exp.company} />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
          <div className="flex items-center flex-wrap gap-x-2 text-primary font-medium mt-0.5">
            <span>{exp.company}</span>
            {exp.project && (
              <span className="text-sm text-muted-foreground font-normal">&middot; {exp.project}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {exp.duration}
          </div>
        </div>
      </div>

      {/* Summary */}
      {exp.summary && <p className="text-muted-foreground leading-relaxed mb-6">{exp.summary}</p>}

      {/* Impact bullets — always visible, not hidden behind a click */}
      <ul className="space-y-3 mb-6">
        {visibleBullets.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
            <p className="text-muted-foreground leading-relaxed text-[15px]">{item}</p>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mb-6"
        >
          {showAll ? 'Show less' : `Show ${exp.description.length - 1} more detail${exp.description.length - 1 > 1 ? 's' : ''}`}
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Technologies */}
      <div className="pt-5 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Technologies
        </p>
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
      </div>
    </Card>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-accent/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">
            Work <span className="font-normal">Experience</span>
          </h2>
          <ScrollRevealText
            text="Backend systems, data integration, and product platforms I've built in production"
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed justify-center"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border hidden md:block" aria-hidden="true" />

          <div className="space-y-10">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative md:pl-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div
                  className="absolute left-[19px] top-10 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block"
                  aria-hidden="true"
                />
                <ExperienceCard exp={exp} isLatest={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Ready for New Challenges</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              I'm always excited to work on innovative projects and collaborate with talented teams.
              Let's create something amazing together!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Available for hire
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Remote & On-site
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;

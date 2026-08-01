import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, education } from '../mock';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import SectionCanvas from './SectionCanvas';
import SectionEyebrow from './SectionEyebrow';
import ScrollRevealText from './ScrollRevealText';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  return (
    <section id="about" className="relative px-6 md:px-10 overflow-hidden">
      <SectionCanvas
        variant="wire"
        color="#6366f1"
        className="absolute -top-16 -right-16 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-45"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionEyebrow>About</SectionEyebrow>

        <motion.div
          className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <ScrollRevealText
            text={personalInfo.bio}
            className="font-display text-2xl md:text-4xl font-medium tracking-tight leading-snug max-w-3xl"
          />
          <div className="hidden md:flex flex-col text-sm text-muted-foreground text-right space-y-1 pt-2">
            <span>My passion for programming, design, and</span>
            <span>problem solving uniquely positions me within</span>
            <span>the software development landscape.</span>
          </div>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-10 md:gap-16 border-t border-border pt-10 md:pt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">Contact</h3>
            <div className="flex items-center text-foreground/90">
              <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center text-foreground/90">
              <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-primary transition-colors">
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex items-center text-foreground/90">
              <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id}>
                <p className="font-medium text-foreground">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

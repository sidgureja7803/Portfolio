import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../mock';
import { Award, ExternalLink, FileText, Star } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const LINK_CONFIG = [
  { key: 'githubUrl', label: 'View Project', Icon: Star },
  { key: 'certificateUrl', label: 'Certificate', Icon: FileText },
  { key: 'profileUrl', label: 'Profile', Icon: ExternalLink },
];

const Achievements = () => {
  return (
    <section id="achievements" className="px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-10 md:mb-16">
          Awards &amp; Achievements
        </p>

        <div>
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`border-t border-border ${index === achievements.length - 1 ? 'border-b' : ''} py-8 md:py-10`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground mb-1.5">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{achievement.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {LINK_CONFIG.filter(({ key }) => achievement[key]).map(({ key, label, Icon }) => (
                      <a
                        key={key}
                        href={achievement[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

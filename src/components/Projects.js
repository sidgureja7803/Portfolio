import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import ProjectCard from './ProjectCard';
import { projects } from '../mock';
import { Github } from 'lucide-react';
import SectionCanvas from './SectionCanvas';
import SectionEyebrow from './SectionEyebrow';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Projects = () => {
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => (p.category || []).forEach((c) => tags.add(c)));
    return Array.from(tags).sort();
  }, []);

  const [activeTag, setActiveTag] = useState('All');

  const filtered = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter((p) => (p.category || []).includes(activeTag));
  }, [activeTag]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative px-6 md:px-10 overflow-hidden">
      <SectionCanvas
        variant="wire"
        color="#22d3ee"
        className="absolute -top-10 -left-10 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-45"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionEyebrow>Projects</SectionEyebrow>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by technology">
          <Button
            size="sm"
            variant={activeTag === 'All' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setActiveTag('All')}
            aria-pressed={activeTag === 'All'}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={activeTag === tag ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        {featured.length > 0 && (
          <motion.div
            className="grid gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {featured.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} featured />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Remaining Projects */}
        {rest.length > 0 && (
          <>
            {featured.length > 0 && (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
                More Projects
              </h3>
            )}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
            >
              {rest.map((project) => (
                <motion.div key={project.id} variants={fadeUp}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects match this filter yet.</p>
        )}

        {/* More Projects CTA */}
        <div className="mt-16 border-t border-border pt-10 flex flex-col items-center text-center gap-4">
          <p className="text-muted-foreground max-w-xl">
            Check out my GitHub for more projects and open-source contributions.
          </p>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => window.open('https://github.com/sidgureja7803', '_blank', 'noopener,noreferrer')}
          >
            <Github className="w-4 h-4 mr-2" />
            View GitHub Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

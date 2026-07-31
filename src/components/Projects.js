import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import ProjectCard from './ProjectCard';
import ScrollRevealText from './ScrollRevealText';
import { projects } from '../mock';
import { Github, Code } from 'lucide-react';

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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-4">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Projects</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <ScrollRevealText
            text="Real-time systems, AI-integrated products, and full-stack platforms — built end-to-end"
            className="text-muted-foreground text-lg max-w-2xl"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by technology">
          <Button
            size="sm"
            variant={activeTag === 'All' ? 'default' : 'outline'}
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
        <div className="mt-16 text-center">
          <Card className="p-8 bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Want to See More?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out my GitHub for more projects and open-source contributions
            </p>
            <Button onClick={() => window.open('https://github.com/sidgureja7803', '_blank', 'noopener,noreferrer')}>
              <Github className="w-4 h-4 mr-2" />
              View GitHub Profile
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;

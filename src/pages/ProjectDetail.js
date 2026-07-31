import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Contact from '../components/Contact';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projects } from '../mock';
import { ArrowLeft, ExternalLink, Github, Lock } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 pt-32">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="text-muted-foreground">This project doesn't exist or may have been moved.</p>
          <Button onClick={() => navigate('/#projects')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to projects
          </Button>
        </main>
        <Contact />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.liveUrl ? (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Private / internal project
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {project.problem && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </section>
              )}
              {project.role && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">My Role</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.role}</p>
                </section>
              )}
              {project.architecture && (
                <section className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-3">Architecture & Approach</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
                </section>
              )}
              {project.metrics && project.metrics.length > 0 && (
                <section className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-3">Impact & Metrics</h2>
                  <ul className="space-y-2">
                    {project.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Contact />
    </div>
  );
};

export default ProjectDetail;

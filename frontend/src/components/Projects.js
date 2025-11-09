import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { projects } from '../mock';
import { ExternalLink, Github, Code } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-4">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of projects showcasing my work in web development and AI
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Want to See More?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out my GitHub for more projects and open-source contributions
            </p>
            <Button 
              onClick={() => window.open('https://github.com/sidgureja7803', '_blank')}
            >
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
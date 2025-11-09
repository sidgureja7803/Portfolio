import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { projects } from '../mock';
import { ExternalLink, Github, Star, Sparkles, ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">Projects That</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Make an Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Crafting innovative solutions with cutting-edge technologies
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-700 bg-card/30 backdrop-blur-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 ${
                index === 0 ? 'md:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[-2px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm"></div>
              </div>

              {/* Project Image */}
              <div className={`relative overflow-hidden ${
                index === 0 ? 'h-full min-h-[400px]' : 'h-64'
              }`}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg shadow-blue-500/50">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50 backdrop-blur-sm">
                  <div className="flex gap-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    {project.liveUrl && (
                      <Button 
                        size="sm" 
                        className="bg-white text-black hover:bg-white/90 shadow-xl"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`relative p-6 space-y-4 bg-gradient-to-b from-card/95 to-card backdrop-blur-xl ${
                index === 0 ? 'absolute bottom-0 left-0 right-0' : ''
              }`}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {index === 0 ? project.longDescription : project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, index === 0 ? 6 : 3).map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > (index === 0 ? 6 : 3) && (
                    <Badge variant="secondary" className="text-xs px-3 py-1">
                      +{project.technologies.length - (index === 0 ? 6 : 3)}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons - Hidden on hover, replaced by overlay */}
                <div className="flex gap-2 pt-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-primary/20"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-20">
          <Card className="relative overflow-hidden p-12 border border-primary/20 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Want to See More?</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Explore My Full Portfolio
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                These are just highlights. Dive deeper into my work to see more projects, experiments, and open-source contributions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-primary/30"
                  onClick={() => window.open('https://github.com/sidgureja7803', '_blank')}
                >
                  <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View GitHub Profile
                  <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
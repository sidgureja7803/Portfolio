import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { openSource } from '../mock';
import { Github, GitBranch, Star, Calendar, ExternalLink } from 'lucide-react';

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24 px-6 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <GitBranch className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm font-medium text-foreground">Open Source</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Open Source <span className="font-normal">Contributions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Contributing to the developer community and building in public
          </p>
        </div>

        {/* Contributions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {openSource.map((contribution) => (
            <Card 
              key={contribution.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm relative"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="p-8 space-y-6 relative z-10">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 group-hover:scale-110 transition-transform">
                        <Github className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {contribution.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {contribution.project}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{contribution.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  {contribution.description.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {contribution.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-background/50 hover:bg-accent/80 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button 
                    className="w-full group/btn"
                    onClick={() => window.open(contribution.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Overview */}
        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">5+</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">10+</div>
              <div className="text-sm text-muted-foreground">Pull Requests</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">2+</div>
              <div className="text-sm text-muted-foreground">Programs</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Passion</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default OpenSource;

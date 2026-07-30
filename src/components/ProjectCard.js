import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getSkillIcon } from '../lib/skillIcons';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const MAX_TILT = 6;

const TechPill = ({ label }) => {
  const { icon: Icon, color } = getSkillIcon(label);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border/70 bg-background/50">
      <Icon className="w-3.5 h-3.5" style={{ color }} aria-hidden="true" />
      {label}
    </span>
  );
};

const ProjectCard = ({ project, featured = false }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -MAX_TILT, y: px * MAX_TILT });
  }, []);

  const resetTilt = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  const goToDetail = () => navigate(`/projects/${project.slug}`);

  const visibleTechs = project.technologies.slice(0, featured ? 6 : 4);
  const hiddenCount = project.technologies.length - visibleTechs.length;

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/60 backdrop-blur-sm ${
        featured ? 'md:grid md:grid-cols-2' : ''
      }`}
    >
      {/* Project Image */}
      <button
        type="button"
        onClick={goToDetail}
        className={`relative overflow-hidden bg-muted block w-full ${
          featured ? 'aspect-video md:aspect-auto md:h-full' : 'aspect-video'
        }`}
        aria-label={`View details for ${project.title}`}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r" />
        {featured && (
          <span className="absolute top-4 left-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 tracking-wide">
            FEATURED
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <ArrowUpRight className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>

      {/* Project Content */}
      <div className={`p-6 md:p-8 flex flex-col ${featured ? 'justify-center' : ''}`}>
        <h3 className={`font-semibold group-hover:text-primary transition-colors mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {project.title}
        </h3>
        <p className={`text-muted-foreground leading-relaxed mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Top metric, if available — gives the featured card immediate credibility */}
        {featured && project.metrics?.[0] && (
          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            {project.metrics[0]}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {visibleTechs.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
          {hiddenCount > 0 && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-border/70 text-muted-foreground">
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <Button size="sm" className="flex-1" onClick={goToDetail}>
            View details
          </Button>
          {project.liveUrl && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          {project.githubUrl && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label={`Open GitHub repository for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;

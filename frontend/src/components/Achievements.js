import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { achievements } from '../mock';
import { Trophy, Award, ExternalLink, FileText, Star } from 'lucide-react';

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-6 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">Recognition</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Awards & <span className="font-normal">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Recognition for technical excellence and competitive achievements
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm relative"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-full transform -translate-x-6 translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10 p-8 space-y-4">
                {/* Header with Icon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {achievement.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="group/btn"
                      onClick={() => window.open(achievement.githubUrl, '_blank')}
                    >
                      <Star className="w-4 h-4 mr-2 group-hover/btn:rotate-180 transition-transform duration-500" />
                      View Project
                    </Button>
                  )}
                  {achievement.certificateUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="group/btn"
                      onClick={() => window.open(achievement.certificateUrl, '_blank')}
                    >
                      <FileText className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Certificate
                    </Button>
                  )}
                  {achievement.profileUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="group/btn"
                      onClick={() => window.open(achievement.profileUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                      Profile
                    </Button>
                  )}
                </div>

                {/* Achievement Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white border-0 shadow-lg">
                    #{achievement.id}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card className="mt-12 p-8 border-0 shadow-lg bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
            <h3 className="text-2xl font-semibold text-foreground">
              Continuous Growth & Learning
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Each achievement represents countless hours of dedication, problem-solving, and pushing boundaries. 
              The journey of learning and growing never stops.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">Major Awards</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">$300</div>
                <div className="text-sm text-muted-foreground">Prize Money</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">Top 3</div>
                <div className="text-sm text-muted-foreground">Placements</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">2213</div>
                <div className="text-sm text-muted-foreground">LC Rating</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Achievements;

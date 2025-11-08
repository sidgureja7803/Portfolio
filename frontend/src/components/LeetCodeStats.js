import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Target, TrendingUp, Code2, Award, ExternalLink } from 'lucide-react';

const LeetCodeStats = () => {
  const leetcodeUsername = "sidgureja";
  const profileUrl = "https://leetcode.com/u/sidgureja";

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        
        // Use LeetCode API through a CORS proxy
        const API_URL = `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`;
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }
        
        const data = await response.json();

        // Parse the API response
        const totalSolved = data.totalSolved || 0;
        const ranking = data.ranking || 'N/A';
        const contributionPoints = data.contributionPoints || 0;
        
        // Create achievements based on real data
        const achievements = [];
        if (totalSolved >= 100) {
          achievements.push({
            title: `${totalSolved} Problems Solved`,
            description: 'Great progress on problem solving!'
          });
        }
        if (ranking && ranking !== 'N/A') {
          achievements.push({
            title: `Rank: ${ranking.toLocaleString()}`,
            description: 'Global LeetCode Ranking'
          });
        }
        if (contributionPoints > 0) {
          achievements.push({
            title: `${contributionPoints} Contribution Points`,
            description: 'Active community contributor'
          });
        }

        // Get badges
        const badges = [];
        if (totalSolved >= 50) badges.push('50+ Problems');
        if (totalSolved >= 100) badges.push('100+ Problems');
        if (totalSolved >= 200) badges.push('200+ Problems');
        if (totalSolved >= 300) badges.push('300+ Problems');
        if (data.acceptanceRate >= 50) badges.push('High Acceptance Rate');

        setStats({
          contestRating: 0, // This API doesn't provide contest rating
          contestsParticipated: 0, // This API doesn't provide contest count
          problemsSolved: totalSolved,
          ranking: ranking,
          badges: badges.length > 0 ? badges : ['Getting Started'],
          recentAchievements: achievements.length > 0 ? achievements : [
            { title: 'Getting Started', description: 'Continue solving problems!' }
          ]
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError('Failed to load LeetCode stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [leetcodeUsername]);

  if (loading) {
    return (
      <section id="leetcode" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
              <Trophy className="w-4 h-4 mr-2 text-orange-500" />
              <span className="text-sm font-medium text-foreground">Competitive Programming</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              LeetCode <span className="font-normal">Journey</span>
            </h2>
          </div>
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-background">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="text-muted-foreground">Loading LeetCode stats...</p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="leetcode" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
              <Trophy className="w-4 h-4 mr-2 text-orange-500" />
              <span className="text-sm font-medium text-foreground">Competitive Programming</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              LeetCode <span className="font-normal">Journey</span>
            </h2>
          </div>
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-red-500/10 via-orange-500/5 to-background">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-red-500 text-center">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <section id="leetcode" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
            <Trophy className="w-4 h-4 mr-2 text-orange-500" />
            <span className="text-sm font-medium text-foreground">Competitive Programming</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            LeetCode <span className="font-normal">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Consistently solving problems and participating in competitive programming contests
          </p>
        </div>

        {/* Main Stats Card */}
        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-background backdrop-blur-sm overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Main stats */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                    <Award className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-500">LeetCode Stats</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                    {stats.problemsSolved}+
                  </h3>
                  <p className="text-muted-foreground text-lg">Problems Solved</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Global Rank</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{typeof stats.ranking === 'number' ? stats.ranking.toLocaleString() : stats.ranking}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Status</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">Active</p>
                  </div>
                </div>

                <Button 
                  className="w-full md:w-auto group"
                  onClick={() => window.open(profileUrl, '_blank')}
                >
                  <Code2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View LeetCode Profile
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Right side - Achievements */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Achievements
                </h4>
                <div className="space-y-3">
                  {stats.recentAchievements.map((achievement, index) => (
                    <Card key={index} className="p-4 bg-background/70 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20">
                          <Award className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground text-sm">{achievement.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <Card className="p-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <h4 className="text-lg font-semibold text-foreground mb-6 text-center">Earned Badges</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {stats.badges.map((badge, index) => (
              <Badge 
                key={index} 
                className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all"
              >
                <Trophy className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LeetCodeStats;

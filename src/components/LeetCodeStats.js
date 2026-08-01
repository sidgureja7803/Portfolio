import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Code2, ExternalLink, Trophy } from 'lucide-react';
import SectionCanvas from './SectionCanvas';

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

        const API_URL = `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }

        const data = await response.json();

        const totalSolved = data.totalSolved || 0;
        const ranking = data.ranking || 'N/A';
        const contributionPoints = data.contributionPoints || 0;

        const badges = [];
        if (totalSolved >= 50) badges.push('50+ Problems');
        if (totalSolved >= 100) badges.push('100+ Problems');
        if (totalSolved >= 200) badges.push('200+ Problems');
        if (totalSolved >= 300) badges.push('300+ Problems');
        if (data.acceptanceRate >= 50) badges.push('High Acceptance Rate');

        setStats({
          problemsSolved: totalSolved,
          ranking,
          contributionPoints,
          badges: badges.length > 0 ? badges : ['Getting Started'],
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

  return (
    <section id="leetcode" className="relative px-6 md:px-10 overflow-hidden">
      <SectionCanvas
        variant="points"
        count={150}
        spread={3}
        color="#d946ef"
        className="absolute -top-16 -left-16 w-96 h-96 md:w-[32rem] md:h-[32rem] z-0 pointer-events-none opacity-80"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-10 md:mb-16">
          Competitive Programming
        </p>

        {loading && (
          <div className="flex items-center gap-3 text-muted-foreground py-8">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-border border-t-foreground" />
            Loading LeetCode stats&hellip;
          </div>
        )}

        {!loading && error && (
          <div className="border-t border-b border-border py-8 space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && stats && (
          <div className="border-t border-border pt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="font-display text-4xl md:text-5xl font-medium tracking-tight">{stats.problemsSolved}+</p>
                <p className="text-sm text-muted-foreground mt-1">Problems Solved</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                  {typeof stats.ranking === 'number' ? stats.ranking.toLocaleString() : stats.ranking}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Global Rank</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-medium tracking-tight">{stats.contributionPoints}</p>
                <p className="text-sm text-muted-foreground mt-1">Contribution Points</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              {stats.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  {badge}
                </span>
              ))}
            </div>

            <Button variant="outline" className="rounded-full group" onClick={() => window.open(profileUrl, '_blank')}>
              <Code2 className="w-4 h-4 mr-2" />
              View LeetCode Profile
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCodeStats;

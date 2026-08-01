import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Code2, ExternalLink, Trophy } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';

const LEETCODE_USERNAME = 'siddhant_gureja_07';
const LEETCODE_PROFILE_URL = 'https://leetcode.com/u/siddhant_gureja_07/';

const CODEFORCES_HANDLE = 'sidgureja';
const CODEFORCES_PROFILE_URL = 'https://codeforces.com/profile/sidgureja';

const useLeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      setStatus('loading');
      try {
        // Community-maintained LeetCode API — LeetCode itself has no public
        // stats endpoint, so this (like any third-party proxy) can go down
        // independent of anything in this codebase.
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);
        if (!response.ok) throw new Error('Failed to fetch LeetCode data');
        const data = await response.json();

        const totalSolved = data.solvedProblem ?? data.totalSolved ?? 0;
        if (!totalSolved) throw new Error('Empty LeetCode response');

        const badges = [];
        if (totalSolved >= 50) badges.push('50+ Problems');
        if (totalSolved >= 100) badges.push('100+ Problems');
        if (totalSolved >= 200) badges.push('200+ Problems');
        if (totalSolved >= 300) badges.push('300+ Problems');

        if (!cancelled) {
          setStats({
            problemsSolved: totalSolved,
            easySolved: data.easySolved ?? 0,
            mediumSolved: data.mediumSolved ?? 0,
            hardSolved: data.hardSolved ?? 0,
            badges: badges.length > 0 ? badges : ['Getting Started'],
          });
          setStatus('ready');
        }
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        if (!cancelled) setStatus('error');
      }
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status };
};

const useCodeforcesStats = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      setStatus('loading');
      try {
        // Codeforces' own official public API — no third-party proxy involved.
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`);
        if (!response.ok) throw new Error('Failed to fetch Codeforces data');
        const data = await response.json();
        if (data.status !== 'OK' || !data.result?.[0]) throw new Error('Empty Codeforces response');

        const user = data.result[0];
        if (!cancelled) {
          setStats({
            rating: user.rating ?? null,
            maxRating: user.maxRating ?? null,
            rank: user.rank ?? 'Unrated',
            maxRank: user.maxRank ?? 'Unrated',
          });
          setStatus('ready');
        }
      } catch (err) {
        console.error('Error fetching Codeforces stats:', err);
        if (!cancelled) setStatus('error');
      }
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status };
};

const StatBlock = ({ value, label }) => (
  <div>
    <p className="font-display text-4xl md:text-5xl font-medium tracking-tight">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const PlatformCard = ({ title, status, children, profileUrl, ctaLabel }) => (
  <div className="border-t border-border pt-10">
    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">{title}</h3>

    {status === 'loading' && (
      <div className="flex items-center gap-3 text-muted-foreground py-4">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-border border-t-foreground" />
        Loading&hellip;
      </div>
    )}

    {status === 'error' && (
      <div className="py-4 space-y-4">
        <p className="text-muted-foreground text-sm">
          Couldn&rsquo;t load live stats right now — the profile is still up to date.
        </p>
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View profile directly
          </a>
        </Button>
      </div>
    )}

    {status === 'ready' && (
      <>
        {children}
        <Button variant="outline" className="rounded-full group mt-2" asChild>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <Code2 className="w-4 h-4 mr-2" />
            {ctaLabel}
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </>
    )}
  </div>
);

const CompetitiveProgramming = () => {
  const { stats: lcStats, status: lcStatus } = useLeetCodeStats();
  const { stats: cfStats, status: cfStatus } = useCodeforcesStats();

  return (
    <section id="leetcode" className="relative px-6 md:px-10">
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionEyebrow>Competitive Programming</SectionEyebrow>

        <div className="space-y-14">
          <PlatformCard
            title="LeetCode"
            status={lcStatus}
            profileUrl={LEETCODE_PROFILE_URL}
            ctaLabel="View LeetCode Profile"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <StatBlock value={`${lcStats?.problemsSolved}+`} label="Problems Solved" />
              <StatBlock value={lcStats?.easySolved} label="Easy" />
              <StatBlock value={lcStats?.mediumSolved} label="Medium" />
              <StatBlock value={lcStats?.hardSolved} label="Hard" />
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {lcStats?.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  {badge}
                </span>
              ))}
            </div>
          </PlatformCard>

          <PlatformCard
            title="Codeforces"
            status={cfStatus}
            profileUrl={CODEFORCES_PROFILE_URL}
            ctaLabel="View Codeforces Profile"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <StatBlock value={cfStats?.rating ?? 'Unrated'} label="Current Rating" />
              <StatBlock value={cfStats?.maxRating ?? 'Unrated'} label="Max Rating" />
              <StatBlock value={cfStats?.rank} label="Rank" />
              <StatBlock value={cfStats?.maxRank} label="Best Rank" />
            </div>
          </PlatformCard>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgramming;

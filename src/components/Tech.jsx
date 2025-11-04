import { useEffect, useState } from 'react';
import { technologies } from '../constants';
import { fetchLeetCodeStats, getFallbackStats, formatRanking } from '../utils/leetcodeApi';

const TechCard = ({ icon: Icon, name, link, color }) => {
  const Card = (
    <div className="w-28 h-28 rounded-lg bg-tertiary flex items-center justify-center relative group cursor-pointer shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 relative flex items-center justify-center">
        <Icon className="w-12 h-12 text-white" style={{ color }} />
      </div>
      <span className="absolute -bottom-8 text-white text-[14px] whitespace-nowrap">
        {name}
      </span>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {Card}
    </a>
  ) : Card;
};


const LeetCodeStats = () => {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Your LeetCode username
  const username = "sidgureja";
  
  // LeetCode profile URL
  const LEETCODE_PROFILE_URL = `https://leetcode.com/${username}`;

  useEffect(() => {
    const loadLeetCodeData = async () => {
      try {
        const data = await fetchLeetCodeStats(username);
        setLeetCodeData(data);
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
        setError(err.message);
        
        // Use fallback data
        setLeetCodeData(getFallbackStats(username));
      } finally {
        setLoading(false);
      }
    };

    loadLeetCodeData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadLeetCodeData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [username]);

  if (loading) {
    return (
      <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl mx-auto shadow-2xl border border-gray-800">
        <div className="flex items-center justify-center space-x-4 py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="text-white text-lg">Loading LeetCode stats...</span>
        </div>
      </div>
    );
  }

  if (error && !leetCodeData) {
    return (
      <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl mx-auto shadow-2xl border border-red-800">
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-2">⚠️ Error loading LeetCode stats</div>
          <div className="text-gray-400 text-sm">{error}</div>
          <div className="text-gray-500 text-xs mt-2">Using fallback data...</div>
        </div>
      </div>
    );
  }

  if (!leetCodeData) {
    return (
      <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl mx-auto shadow-2xl border border-gray-800">
        <div className="text-center py-12 text-gray-400">
          No LeetCode data available
        </div>
      </div>
    );
  }

  // Get ranking display safely using utility function
  const getRankingDisplay = () => {
    return formatRanking(leetCodeData?.ranking);
  };

  return (
    <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl mx-auto shadow-2xl border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3">
              <img 
                src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" 
                alt="LeetCode Logo" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center">
              {username}
              <span className="ml-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full">
                Live Stats
              </span>
            </h3>
            <p className="text-gray-400">Global Ranking: #{getRankingDisplay()}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              // Trigger a manual refresh
              const loadData = async () => {
                try {
                  const data = await fetchLeetCodeStats(username);
                  setLeetCodeData(data);
                } catch (err) {
                  setError(err.message);
                  setLeetCodeData(getFallbackStats(username));
                } finally {
                  setLoading(false);
                }
              };
              loadData();
            }}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh stats"
          >
            {loading ? '⟳' : '↻'}
          </button>
          
          <a 
            href={LEETCODE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            View Profile
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Problems Solved */}
        <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div className="text-4xl font-bold text-white mb-2">{leetCodeData.totalSolved}</div>
          <div className="text-gray-400 text-sm">Problems Solved</div>
          <div className="text-green-400 text-xs mt-1">{leetCodeData.rankingPercentage}</div>
        </div>

        {/* Contest Rating */}
        <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{leetCodeData.contestRating}</div>
          <div className="text-gray-400 text-sm">Contest Rating</div>
          <div className="text-blue-400 text-xs mt-1">Max: {leetCodeData.highestRating}</div>
        </div>

        {/* Acceptance Rate */}
        <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div className="text-4xl font-bold text-purple-400 mb-2">{leetCodeData.acceptanceRate}</div>
          <div className="text-gray-400 text-sm">Acceptance Rate</div>
          <div className="text-green-400 text-xs mt-1">+{leetCodeData.contributionPoints} points</div>
        </div>
      </div>

      {/* Problem Difficulty Breakdown */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Problem Difficulty Breakdown</h4>
        
        {/* Easy Problems */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white font-medium">Easy</span>
          </div>
          <div className="flex items-center space-x-4 flex-1 mx-4">
            <div className="bg-gray-700 h-3 flex-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{width: `${Math.min((leetCodeData.easySolved / leetCodeData.totalEasy) * 100, 100)}%`}} 
              />
            </div>
            <span className="text-gray-300 text-sm min-w-[80px]">
              {leetCodeData.easySolved}/{leetCodeData.totalEasy}
            </span>
          </div>
        </div>
        
        {/* Medium Problems */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-white font-medium">Medium</span>
          </div>
          <div className="flex items-center space-x-4 flex-1 mx-4">
            <div className="bg-gray-700 h-3 flex-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{width: `${Math.min((leetCodeData.mediumSolved / leetCodeData.totalMedium) * 100, 100)}%`}} 
              />
            </div>
            <span className="text-gray-300 text-sm min-w-[80px]">
              {leetCodeData.mediumSolved}/{leetCodeData.totalMedium}
            </span>
          </div>
        </div>
        
        {/* Hard Problems */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-white font-medium">Hard</span>
          </div>
          <div className="flex items-center space-x-4 flex-1 mx-4">
            <div className="bg-gray-700 h-3 flex-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{width: `${Math.min((leetCodeData.hardSolved / leetCodeData.totalHard) * 100, 100)}%`}} 
              />
            </div>
            <span className="text-gray-300 text-sm min-w-[80px]">
              {leetCodeData.hardSolved}/{leetCodeData.totalHard}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400">
        <span>Last updated: {leetCodeData.lastUpdated ? new Date(leetCodeData.lastUpdated).toLocaleTimeString() : new Date().toLocaleTimeString()}</span>
        <span className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${leetCodeData.isFallback ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          {leetCodeData.isFallback ? 'Fallback data (API unavailable)' : 'Live data from LeetCode API'}
        </span>
      </div>
    </div>
  );
};

const Tech = () => {
  return (
    <div className="py-10">
      <div className="text-center">
        <p className="text-sm text-secondary uppercase tracking-wider">My technical expertise</p>
        <h2 className="text-white font-black text-4xl md:text-5xl">Technologies.</h2>
      </div>

      <div className='mt-20 flex flex-wrap gap-12 justify-center max-w-5xl mx-auto px-4'>
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} {...technology} />
        ))}
      </div>

      <LeetCodeStats />
    </div>
  );
};

export default Tech; 
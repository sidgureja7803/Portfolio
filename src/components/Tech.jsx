import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { technologies } from '../constants';
import SectionWrapper from '../hoc/SectionWrapper';

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
    const fetchLeetCodeData = async () => {
      try {
        // Using the unofficial API endpoint
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }
        
        const data = await response.json();
        
        // Validate data and ensure all values are properly formatted
        const validatedData = {
          username: username,
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          totalEasy: data.totalEasy || 100,
          mediumSolved: data.mediumSolved || 0,
          totalMedium: data.totalMedium || 100,
          hardSolved: data.hardSolved || 0,
          totalHard: data.totalHard || 100,
          contestRating: data.contestRating || 1500,
          highestRating: data.highestRating || 1500,
          ranking: typeof data.ranking === 'string' ? data.ranking : 
                  typeof data.ranking === 'number' ? data.ranking.toString() : "N/A",
          rankingPercentage: data.rankingPercentage || "Top 10%",
        };
        
        setLeetCodeData(validatedData);
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
        setError(err.message);
        
        // Fallback data in case of error
        setLeetCodeData({
          username: username,
          totalSolved: 450,
          easySolved: 200,
          totalEasy: 600,
          mediumSolved: 180,
          totalMedium: 1200,
          hardSolved: 70,
          totalHard: 500,
          contestRating: 1850,
          highestRating: 1920,
          ranking: "10000",
          rankingPercentage: "Top 7%",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [username]);

  if (loading) {
    return <div className="text-center py-10">Loading LeetCode stats...</div>;
  }

  if (error && !leetCodeData) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading LeetCode stats: {error}
      </div>
    );
  }

  if (!leetCodeData) {
    return <div className="text-center py-10">No LeetCode data available</div>;
  }

  // Get ranking display safely
  const getRankingDisplay = () => {
    try {
      if (!leetCodeData || !leetCodeData.ranking || leetCodeData.ranking === "N/A") {
        return "N/A";
      }
      
      // Check if ranking is a string and contains a slash (indicating format like "10000 / 100000")
      if (typeof leetCodeData.ranking === 'string' && leetCodeData.ranking.includes('/')) {
        const parts = leetCodeData.ranking.split('/');
        return parts[0].trim();
      }
      
      // If it's just a number as string, return it directly
      return leetCodeData.ranking;
    } catch (error) {
      console.error("Error parsing ranking:", error);
      return "N/A";
    }
  };

  return (
    <div className="mt-8 p-6 bg-tertiary rounded-xl max-w-3xl mx-auto shadow-lg">
    
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 rounded-full p-2">
            <img 
              src="https://assets.leetcode.com/users/avatars/avatar_1628467120.png" 
              alt="LeetCode Avatar" 
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://leetcode.com/static/images/LeetCode_logo.png";
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{username}</h3>
            <p className="text-gray-400 text-sm">#{getRankingDisplay()}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-gray-400 text-sm">Easy</span>
          <div className="bg-gray-700 h-2 w-48 rounded-full mt-1 mb-3">
            <div 
              className="bg-green-500 h-full rounded-full" 
              style={{width: `${(leetCodeData.easySolved / leetCodeData.totalEasy) * 100}%`}} 
            />
          </div>
          
          <span className="text-gray-400 text-sm">Medium</span>
          <div className="bg-gray-700 h-2 w-48 rounded-full mt-1 mb-3">
            <div 
              className="bg-yellow-500 h-full rounded-full" 
              style={{width: `${(leetCodeData.mediumSolved / leetCodeData.totalMedium) * 100}%`}} 
            />
          </div>
          
          <span className="text-gray-400 text-sm">Hard</span>
          <div className="bg-gray-700 h-2 w-48 rounded-full mt-1">
            <div 
              className="bg-red-500 h-full rounded-full" 
              style={{width: `${(leetCodeData.hardSolved / leetCodeData.totalHard) * 100}%`}} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Contest Rating</span>
            <span className="text-white text-4xl font-bold">{leetCodeData.contestRating}</span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Highest Rating</span>
            <span className="text-white text-4xl font-bold">{leetCodeData.highestRating}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-700">
            <span className="text-4xl font-bold text-white">{leetCodeData.totalSolved}</span>
          </div>
          <div className="mt-2 flex items-center">
            <img 
              src="https://leetcode.com/static/images/badges/2023/gif/2023-12.gif" 
              alt="Badge" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-white">{leetCodeData.rankingPercentage}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-800 h-32 rounded-lg p-4">
          {/* Rating graph - You could implement an actual chart here using a library like recharts */}
          <div className="text-xs text-gray-400">Contest Rating History</div>
        </div>
      </div>
    </div>
  );
};

const Tech = () => {
  return (
    <div className="py-10">
      <div className="text-center">
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
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

export default SectionWrapper(Tech, "tech"); 
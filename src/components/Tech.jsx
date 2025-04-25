import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { technologies, LEETCODE_PROFILE_URL } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { SiLeetcode } from 'react-icons/si';

const TechCard = ({ icon: Icon, name, index, link, color }) => {
  const Card = (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      initial="hidden"
      animate="show"
      className="w-28 h-28 rounded-xl bg-tertiary flex items-center justify-center relative group cursor-pointer"
    >
      <div className="w-16 h-16 relative flex items-center justify-center">
        <Icon className="w-12 h-12 text-white transition-transform duration-300 group-hover:scale-110" style={{ color }} />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
      <span className="absolute -bottom-8 text-white text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
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

  useEffect(() => {
    // This is a mockup since we can't directly fetch from LeetCode API
    // In a real scenario, you would use a backend proxy or their API
    setTimeout(() => {
      setLeetCodeData({
        username: "sidgureja",
        totalSolved: 450,
        contestRating: 1850,
        ranking: 15420,
        badges: ["Weekly Contest", "Biweekly Contest"],
        recentSubmissions: [
          { problem: "Maximum Subarray", difficulty: "Easy", date: "2023-05-15" },
          { problem: "Merge Intervals", difficulty: "Medium", date: "2023-05-10" },
          { problem: "LRU Cache", difficulty: "Hard", date: "2023-05-05" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <motion.div 
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className="mt-16 p-6 bg-tertiary rounded-xl max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin mr-2" />
          <p className="text-secondary">Loading LeetCode profile data...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className="mt-16 p-6 bg-tertiary rounded-xl max-w-3xl mx-auto text-center"
      >
        <p className="text-red-400">Failed to load LeetCode profile. Please check back later.</p>
      </motion.div>
    );
  }

  if (!leetCodeData) return null;

  return (
    <motion.div 
      variants={fadeIn('up', 'spring', 0.2, 0.75)}
      className="mt-16 p-6 bg-tertiary rounded-xl max-w-3xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-4">
        <SiLeetcode className="w-10 h-10" style={{ color: "#FFA116" }} />
        <div>
          <h3 className="text-xl font-bold text-white">LeetCode Profile</h3>
          <a 
            href={LEETCODE_PROFILE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            @{leetCodeData.username}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-black-100 p-4 rounded-lg text-center">
          <p className="text-secondary text-sm">Problems Solved</p>
          <p className="text-white text-xl font-bold">{leetCodeData.totalSolved}+</p>
        </div>
        <div className="bg-black-100 p-4 rounded-lg text-center">
          <p className="text-secondary text-sm">Contest Rating</p>
          <p className="text-white text-xl font-bold">{leetCodeData.contestRating}</p>
        </div>
        <div className="bg-black-100 p-4 rounded-lg text-center">
          <p className="text-secondary text-sm">Global Ranking</p>
          <p className="text-white text-xl font-bold">#{leetCodeData.ranking}</p>
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-2">Recent Submissions</h4>
        <div className="space-y-2">
          {leetCodeData.recentSubmissions.map((submission, index) => (
            <div key={index} className="flex justify-between bg-black-100 p-2 rounded-lg">
              <p className="text-white">{submission.problem}</p>
              <p className={`text-sm ${
                submission.difficulty === "Easy" ? "text-green-400" : 
                submission.difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
              }`}>
                {submission.difficulty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <motion.div 
        className='mt-20 flex flex-wrap gap-12 justify-center max-w-5xl mx-auto px-4'
        variants={fadeIn('', '', 0.1, 1)}
        initial="hidden"
        animate="show"
      >
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} index={index} {...technology} />
        ))}
      </motion.div>

      <LeetCodeStats />
    </div>
  );
};

export default SectionWrapper(Tech, "tech"); 
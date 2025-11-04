/**
 * LeetCode API utility functions
 * Provides reliable data fetching from multiple API endpoints
 */

const LEETCODE_USERNAME = "sidgureja";

// Multiple API endpoints for better reliability
const API_ENDPOINTS = [
  `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
  `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`,
  `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
];

/**
 * Fetches LeetCode user statistics from multiple API sources
 * @param {string} username - LeetCode username
 * @returns {Promise<Object>} Normalized user statistics
 */
export const fetchLeetCodeStats = async (username = LEETCODE_USERNAME) => {
  let data = null;
  let lastError = null;

  // Try each endpoint until one works
  for (const endpoint of API_ENDPOINTS) {
    try {
      console.log(`Trying LeetCode API: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (response.ok) {
        data = await response.json();
        console.log('LeetCode API response:', data);
        break;
      }
    } catch (apiError) {
      console.warn(`API endpoint failed: ${endpoint}`, apiError);
      lastError = apiError;
      continue;
    }
  }

  if (!data) {
    throw new Error(lastError?.message || 'All LeetCode API endpoints failed');
  }

  // Normalize data from different API formats
  return normalizeApiResponse(data, username);
};

/**
 * Normalizes API response data from different LeetCode API formats
 * @param {Object} data - Raw API response
 * @param {string} username - LeetCode username
 * @returns {Object} Normalized statistics object
 */
const normalizeApiResponse = (data, username) => {
  return {
    username: username,
    totalSolved: data.totalSolved || data.solvedProblem || data.totalQuestionsSolved || 0,
    easySolved: data.easySolved || data.easySolved || 0,
    totalEasy: data.totalEasy || data.totalEasy || 800,
    mediumSolved: data.mediumSolved || data.mediumSolved || 0,
    totalMedium: data.totalMedium || data.totalMedium || 1700,
    hardSolved: data.hardSolved || data.hardSolved || 0,
    totalHard: data.totalHard || data.totalHard || 700,
    contestRating: data.contestRating || data.ranking || 1500,
    highestRating: data.highestRating || data.contestRating || data.ranking || 1500,
    ranking: data.ranking || data.globalRanking || "N/A",
    rankingPercentage: data.rankingPercentage || "Top 10%",
    acceptanceRate: data.acceptanceRate || "N/A",
    contributionPoints: data.contributionPoints || 0,
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Gets fallback data when API calls fail
 * @param {string} username - LeetCode username
 * @returns {Object} Fallback statistics object
 */
export const getFallbackStats = (username = LEETCODE_USERNAME) => {
  return {
    username: username,
    totalSolved: 700,
    easySolved: 280,
    totalEasy: 800,
    mediumSolved: 320,
    totalMedium: 1700,
    hardSolved: 100,
    totalHard: 700,
    contestRating: 1850,
    highestRating: 1920,
    ranking: "8,500",
    rankingPercentage: "Top 5%",
    acceptanceRate: "85.2%",
    contributionPoints: 1250,
    lastUpdated: new Date().toISOString(),
    isFallback: true,
  };
};

/**
 * Formats ranking display safely
 * @param {string|number} ranking - Raw ranking data
 * @returns {string} Formatted ranking string
 */
export const formatRanking = (ranking) => {
  try {
    if (!ranking || ranking === "N/A") {
      return "N/A";
    }
    
    // Handle format like "10000 / 100000"
    if (typeof ranking === 'string' && ranking.includes('/')) {
      const parts = ranking.split('/');
      return parts[0].trim();
    }
    
    // Return as string
    return ranking.toString();
  } catch (error) {
    console.error("Error parsing ranking:", error);
    return "N/A";
  }
};

export default {
  fetchLeetCodeStats,
  getFallbackStats,
  formatRanking,
  LEETCODE_USERNAME,
};
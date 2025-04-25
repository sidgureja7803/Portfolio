import thaparInnovate from './thapar_innovate.png';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaPython, FaAws, FaLinux } from 'react-icons/fa';

import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiKubernetes,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
  SiRedux,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiNginx,
  SiLeetcode,
  SiExpress,
} from 'react-icons/si';

// LeetCode profile URL
export const LEETCODE_PROFILE_URL = "https://leetcode.com/sidgureja/";

// Social links
export const socialLinks = {
  github: "https://github.com/sidgureja7803",
  linkedin: "https://linkedin.com/in/sidgureja",
  twitter: "https://twitter.com/sidgureja",
  leetcode: LEETCODE_PROFILE_URL
};

export const education = [
  {
    degree: "Bachelor of Technology in Electronics and Computer Engineering",
    school: "Thapar Institute of Engineering & Technology",
    location: "Patiala, Punjab",
    date: "2020 - 2026",
    iconBg: "#383E56",
    points: [
      "Maintained a CGPA of 8.8/10 throughout the academic program",
      "Participated in various hackathons and coding competitions",
      "Won 3rd prize at ACM TIET Intra Society Codesprint - Feb 2024",
    ],
  },
  {
    degree: "High School",
    school: "Omkarananda Sarswati Nilyam",
    location: "Rishikesh, Uttarakhand",
    date: "2019-2021",
    iconBg: "#383E56",
    points: [
      "Graduated with 95.75% in ICSE Board Examinations",
      "Went to Lucknow, to participate in Odyessy 2016",
      "Won 3rd prize in Group Discussion Competition - 2019"
    ],
  },
];

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "opensource",
    title: "Open Source",
  },
  {
    id: "tech",
    title: "Tech Stack",
  },
  {
    id: "blogs",
    title: "Blogs",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "Problem Solver",
    icon: "/icons/problem-solver.svg",
    description: "Solved 450+ problems on LeetCode with a contest rating of 1850",
    link: LEETCODE_PROFILE_URL
  },
  {
    title: "React Developer",
    icon: "/icons/react-dev.svg",
    description: "Building modern web applications with React and its ecosystem"
  },
  {
    title: "Backend Developer",
    icon: "/icons/backend-dev.svg",
    description: "Creating scalable server-side applications with Node.js and Express"
  },
  {
    title: "DevOps Engineer",
    icon: "/icons/devops.svg",
    description: "Implementing CI/CD pipelines and managing cloud infrastructure"
  },
];

export const technologies = [
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB"
  },
  {
    name: "Three.js",
    icon: SiThreedotjs,
    color: "#000000"
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6"
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "#00599C"
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776AB"
  },
  {
    name: "Docker",
    icon: FaDocker,
    color: "#2496ED"
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    color: "#326CE5"
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#339933"
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#000000"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248"
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791"
  },
  {
    name: "Redis",
    icon: SiRedis,
    color: "#DC382D"
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    color: "#E10098"
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "#764ABC"
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "#F05032"
  },
  {
    name: "AWS",
    icon: FaAws,
    color: "#232F3E"
  },
  {
    name: "Linux",
    icon: FaLinux,
    color: "#FCC624"
  },
  {
    name: "Nginx",
    icon: SiNginx,
    color: "#009639"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4"
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    color: "#FFA116",
    link: LEETCODE_PROFILE_URL
  }
];

export const experiences = [
  {
    title: "Frontend Developer",
    company_name: "Thapar Innovate",
    icon: thaparInnovate,
    iconBg: "#383E56",
    date: "Oct 2020 - Present",
    points: [
      "Designed a comprehensive platform for incubators to manage startups applying for incubation, monitor multiple programs, and oversee cohort-specific activities and progress.",
      "Enabled detailed startup tracking by integrating functionalities to view funding status, team size, and mentorship under specific cohorts.",
      "Streamlined API management by utilizing Context API to handle overlapping calls, enhancing performance and reducing redundancy across 110+ APIs.",
    ],
  },
  // Add more experiences here
];

export const projects = [
  {
    name: "CIB on the Mobile",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "project1",
    source_code_link: "https://github.com/",
  },
  // Add more projects here
];

export const leetcodeStats = {
  rating: 1850,
  problemsSolved: 450,
  contestRating: "Guardian",
  icon: SiLeetcode,
  color: "#FFA116",
  badges: [
    {
      name: "Dynamic Programming",
      count: 120,
      color: "#00B8D9"
    },
    {
      name: "Graph Theory",
      count: 85,
      color: "#36B37E"
    },
    {
      name: "Binary Search",
      count: 65,
      color: "#FF5630"
    },
    {
      name: "Tree Algorithms",
      count: 95,
      color: "#6554C0"
    }
  ]
}; 
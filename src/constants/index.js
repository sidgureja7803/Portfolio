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
  SiNextdotjs,
  SiFirebase,
  SiOpenai,
} from 'react-icons/si';

// LeetCode profile URL - Fixed username
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
    date: "2022 - 2026",
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
    id: "leetcode",
    title: "LeetCode",
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
    description: "Solved 700+ problems on LeetCode with a contest rating of 1850",
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
    date: "Oct 2024 - Present",
    points: [
      "Designed a comprehensive platform for incubators to manage startups applying for incubation, monitor multiple programs, and oversee cohort-specific activities and progress.",
      "Enabled detailed startup tracking by integrating functionalities to view funding status, team size, and mentorship under specific cohorts.",
      "Streamlined API management by utilizing Context API to handle overlapping calls, enhancing performance and reducing redundancy across 110+ APIs.",
    ],
  },
  // Add more experiences here
];


export const incubatorCRM = {
  name: "IncubatorCRM",
  description: "A comprehensive CRM system for managing startup incubator operations, including member tracking, event management, and resource allocation.",
  tags: [
    {
      name: "react",
      color: "bg-blue-500/20 text-blue-300",
    },
    {
      name: "mongodb",
      color: "bg-green-500/20 text-green-300",
    },
    {
      name: "express",
      color: "bg-gray-500/20 text-gray-300",
    },
    {
      name: "node.js",
      color: "bg-emerald-500/20 text-emerald-300",
    }
  ],
  image: "project5",
  source_code_link: "https://github.com/siddhantgureja/incubator-crm",
  demo: "https://incubator-crm.vercel.app",
};

export const projects = [
  {
    name: "CodeFusion",
    description:
      "A collaborative code editor platform that enables real-time collaboration, syntax highlighting, and integrated chat functionality. Built with modern web technologies for seamless developer experience.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
        icon: FaNodeJs
      },
      {
        name: "Socket.io",
        color: "pink-text-gradient",
      },
      {
        name: "MongoDB",
        color: "orange-text-gradient",
        icon: SiMongodb
      },
    ],
    image: "codefusion",
    source_code_link: "https://codefusion-app.vercel.app/",
    github_link: "https://github.com/sidgureja7803/codefusion"
  },
  {
    name: "TwitPilot",
    description:
      "An advanced Twitter automation and analytics tool that helps users schedule tweets, track engagement metrics, and manage multiple accounts with intelligent content suggestions.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
        icon: SiNextdotjs
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
        icon: SiTypescript
      },
      {
        name: "Twitter API",
        color: "pink-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "orange-text-gradient",
        icon: SiPostgresql
      },
    ],
    image: "twitpilot",
    source_code_link: "https://twitpilot.vercel.app/",
    github_link: "https://github.com/sidgureja7803/twitpilot"
  },
  {
    name: "ResumeGenerator",
    description:
      "An AI-powered resume builder that creates professional resumes using customizable templates, real-time preview, and intelligent content suggestions based on job descriptions.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "OpenAI API",
        color: "green-text-gradient",
        icon: SiOpenai
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
        icon: SiTailwindcss
      },
      {
        name: "Firebase",
        color: "orange-text-gradient",
        icon: SiFirebase
      },
    ],
    image: "resumegen",
    source_code_link: "https://resume-generator-ai.vercel.app/",
    github_link: "https://github.com/sidgureja7803/resume-generator"
  },
  {
    name: "AI-Powered Code Reviewer",
    description:
      "AI-Powered Code Reviewer is an intelligent assistant that helps developers write cleaner, optimized, and more secure code by providing detailed feedback, best practices, and performance improvements.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "Gemini API",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
        icon: SiTailwindcss
      },
    ],
    image: "project1",
    source_code_link: "https://code-review-wine.vercel.app/",
    github_link: "https://github.com/sidgureja7803/code-reviewer"
  },
  {
    name: "Dev-Tinder",
    description:
      "Dev-Tinder is a MERN-based platform that connects developers across the globe. Users can swipe through developer profiles, collaborate on open-source projects, and build meaningful tech connections.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "Express",
        color: "green-text-gradient",
        icon: SiExpress
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
        icon: SiMongodb
      },
    ],
    image: "project2",
    source_code_link: "https://dev-tinder-jet.vercel.app/",
    github_link: "https://github.com/sidgureja7803/dev-tinder"
  },
  {
    name: "IMDb Clone",
    description:
      "A movie discovery app that fetches and displays movies using the TMDb API. Users can search, filter, and explore movie details with a clean UI mimicking IMDb.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "TMDb API",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
        icon: SiTailwindcss
      },
    ],
    image: "project3",
    source_code_link: "https://movie-app-n8ci.vercel.app/",
    github_link: "https://github.com/sidgureja7803/imdb-clone"
  },
  {
    name: "Netflix GPT",
    description:
      "Netflix GPT is an AI-powered movie recommendation app that integrates OpenAI with Firebase and TMDb APIs. Users get smart movie suggestions based on genres and watch history.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "OpenAI API",
        color: "green-text-gradient",
      },
      {
        name: "Firebase Auth",
        color: "pink-text-gradient",
      },
    ],
    image: "project4",
    source_code_link: "https://netflix-gpt-five-sandy.vercel.app",
    github_link: "https://github.com/sidgureja7803/netflix-gpt"
  },
  {
    name: "IncubatorCRM",
    description:
      "A comprehensive CRM system for managing startup incubator operations, including member tracking, event management, and resource allocation.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
        icon: FaReact
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
        icon: SiMongodb
      },
      {
        name: "Express",
        color: "pink-text-gradient",
        icon: SiExpress
      },
      {
        name: "Node.js",
        color: "orange-text-gradient",
        icon: FaNodeJs
      },
    ],
    image: "project5",
    source_code_link: "https://incubator-crm.vercel.app",
    github_link: "https://github.com/siddhantgureja/incubator-crm"
  },
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
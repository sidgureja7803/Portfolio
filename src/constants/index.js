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
    description: "Active competitive programmer with live LeetCode stats and contest participation",
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
    name: "IncubatorCRM",
    description:
      "A web platform for TIET Venture Labs to manage startup applications, multiple incubation programs, and cohort-specific workflows.",
    tags: [
      { name: "React", color: "blue-text-gradient", icon: FaReact },
      { name: "Express", color: "pink-text-gradient", icon: SiExpress },
      { name: "MongoDB", color: "green-text-gradient", icon: SiMongodb },
      { name: "Node.js", color: "orange-text-gradient", icon: FaNodeJs },
    ],
    image: "incubatorcrm",
    source_code_link: "https://incubator-crm.vercel.app", // live
    github_link: "https://github.com/sidgureja7803/Incubator-CRM.git"
  },
  {
    name: "CodeFusion",
    description:
      "Real-time collaborative coding platform with Liveblocks, Dockerized Judge0 for multi-language execution, and LLaMA-powered AI debugging; scaled to 100+ concurrent sessions.",
    tags: [
      { name: "React", color: "blue-text-gradient", icon: FaReact },
      { name: "Docker", color: "green-text-gradient" },
      { name: "Liveblocks", color: "pink-text-gradient" },
      { name: "Judge0", color: "orange-text-gradient" },
      { name: "LLaMA API", color: "purple-text-gradient" },
    ],
    image: "codefusion",
    source_code_link: "https://www.code-fusion.live/",
    github_link: "https://github.com/sidgureja7803/codefusion"
  },
  {
    name: "LiveCV",
    description:
      "AI-powered resume builder with real-time editing, template switching, Appwrite-backed auth/storage, and instant PDF export.",
    tags: [
      { name: "React", color: "blue-text-gradient", icon: FaReact },
      { name: "Node.js", color: "green-text-gradient", icon: FaNodeJs },
      { name: "Express", color: "pink-text-gradient", icon: SiExpress },
      { name: "MongoDB", color: "orange-text-gradient", icon: SiMongodb },
      { name: "Appwrite", color: "purple-text-gradient" },
      { name: "Tailwind CSS", color: "teal-text-gradient", icon: SiTailwindcss },
    ],
    image: "livecv",
    source_code_link: "https://livecv.online/",
    github_link: "https://github.com/sidgureja7803/LiveCV"
  },
  {
    name: "IdeaHub",
    description:
      "Collaborative platform to share, refine, and pitch ideas with a GenAI assistant that suggests titles, tech stacks, and improved descriptions.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient", icon: SiNextdotjs },
      { name: "Node.js", color: "green-text-gradient", icon: FaNodeJs },
      { name: "Express", color: "pink-text-gradient", icon: SiExpress },
      { name: "MongoDB", color: "orange-text-gradient", icon: SiMongodb },
      { name: "GenAI APIs", color: "purple-text-gradient" },
    ],
    image: "ideahub",
    source_code_link: "",
    github_link: "https://github.com/sidgureja7803/FutureStack_GenAI.git"
  },
  {
    name: "MergeMates",
    description:
      "“Tinder for Developers” matching collaborators via GitHub data, tech stack, and interests; real-time matching & chat with WebSockets and scheduled email workflows.",
    tags: [
      { name: "React", color: "blue-text-gradient", icon: FaReact },
      { name: "MongoDB", color: "green-text-gradient", icon: SiMongodb },
      { name: "WebSockets", color: "pink-text-gradient" },
      { name: "AWS", color: "orange-text-gradient" },
      { name: "Cron Jobs", color: "purple-text-gradient" },
    ],
    image: "mergemates",
    source_code_link: "https://www.mergemates.site/",
    github_link: "https://github.com/sidgureja7803/MergeMates_client.git"
  },
];



// LeetCode stats are now fetched dynamically in the LeetCodeStats component
// This ensures real-time data similar to GitHub README.md badges
export const leetcodeConfig = {
  username: "sidgureja",
  profileUrl: LEETCODE_PROFILE_URL,
  icon: SiLeetcode,
  color: "#FFA116",
  // These are the problem categories we track
  categories: [
    {
      name: "Dynamic Programming",
      color: "#00B8D9"
    },
    {
      name: "Graph Theory", 
      color: "#36B37E"
    },
    {
      name: "Binary Search",
      color: "#FF5630"
    },
    {
      name: "Tree Algorithms",
      color: "#6554C0"
    },
    {
      name: "Array & String",
      color: "#9C27B0"
    },
    {
      name: "Linked List",
      color: "#FF9800"
    }
  ]
}; 
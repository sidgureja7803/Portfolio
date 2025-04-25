import thaparInnovate from './thapar_innovate.png';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa';

import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiKubernetes,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
} from 'react-icons/si';

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
    title: "Web Developer",
    icon: "web",
  },
  {
    title: "React Developer",
    icon: "mobile",
  },
  {
    title: "Backend Developer",
    icon: "backend",
  },
  {
    title: "Content Creator",
    icon: "creator",
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
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248"
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "#F05032"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4"
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
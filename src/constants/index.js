import thaparInnovate from './thapar_innovate.png';

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "opensource",
    title: "Open Source",
  },
  {
    id: "coding",
    title: "Coding",
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
    name: "HTML 5",
    icon: "html",
  },
  {
    name: "CSS 3",
    icon: "css",
  },
  {
    name: "JavaScript",
    icon: "javascript",
  },
  {
    name: "TypeScript",
    icon: "typescript",
  },
  {
    name: "React JS",
    icon: "reactjs",
  },
  {
    name: "Redux Toolkit",
    icon: "redux",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
  },
  {
    name: "Node JS",
    icon: "nodejs",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
  },
  {
    name: "Three JS",
    icon: "threejs",
  },
  {
    name: "git",
    icon: "git",
  },
  {
    name: "figma",
    icon: "figma",
  },
  {
    name: "docker",
    icon: "docker",
  },
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
// Mock data for Siddhant Gureja's Portfolio

export const personalInfo = {
  name: "SIDDHANT GUREJA",
  title: "Full Stack Developer",
  tagline: "Building scalable web applications and AI-driven products",
  email: "siddhantgureja39@gmail.com",
  phone: "+91 8193006167",
  location: "India",
  bio: "Full Stack Developer specializing in JavaScript, React.js, and Node.js with a passion for building AI-driven, scalable, and real-time web applications. Experienced in full-stack product development, open-source contributions, and cloud deployment using AWS, Docker, and Render."
};

export const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/sidgureja", icon: "linkedin" },
  { name: "GitHub", url: "https://github.com/sidgureja7803", icon: "github" },
  { name: "LeetCode", url: "https://leetcode.com/u/siddhant_gureja_07/", icon: "code" },
  { name: "Portfolio", url: "https://sidgureja.netlify.app/", icon: "globe" }
];

export const skills = {
  programming: ["JavaScript (ES6+)", "C++", "Java"],
  frontend: ["React.js", "Next.js", "HTML", "CSS", "Redux"],
  styling: ["Tailwind CSS", "CSS3", "SCSS", "Material-UI", "Shadcn/ui"],
  backend: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
  devops: ["Docker", "AWS", "Render", "Vercel"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Webpack"],
  ai: ["LLaMA API", "OpenAI", "GenAI Integration", "Prompt Engineering"],
  core: ["Data Structures & Algorithms", "OOPS", "Computer Networks", "DBMS"]
};

export const experience = [
  {
    id: 1,
    company: "Thapar Innovate",
    position: "Full Stack Developer",
    duration: "Oct 2024 – Jan 2025",
    description: [
      "Developed a comprehensive web platform for TIET Venture Labs to manage startup applications, multiple incubation programs, and cohort-specific workflows."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "http://139.59.46.75/",
    githubUrl: "https://github.com/sidgureja7803/Incubator-CRM.git"
  }
];

export const openSource = [
  {
    id: 1,
    title: "Code for GovTech ’25",
    project: "Land Demarcation Tracker",
    duration: "June 2025 – Present",
    description: [
      "Developing a digital platform for ADC Mahendragarh to log, track, and visualize plot-wise land demarcation.",
      "Integrated timestamped officer logs, duplicate detection, and a data-driven dashboard to improve transparency."
    ],
    technologies: ["Node.js", "PostgreSQL", "React.js"],
    githubUrl: "https://github.com/sidgureja7803/Land_Demarcation.git"
  },
  {
    id: 2,
    title: "Hacktoberfest 2024",
    project: "Open Source Contributor",
    duration: "Oct 2024",
    description: [
      "Contributed to 5+ repositories resolving issues, enhancing UI/UX, and adding new features.",
      "Earned verified contribution badges and community recognition."
    ],
    technologies: ["JavaScript", "TypeScript", "Git"],
    githubUrl: "https://www.holopin.io/@sidgureja7803"
  }
];

export const projects = [
  {
    id: 1,
    title: "CodeFusion",
    description: "A real-time collaborative coding platform for solving DSA problems together.",
    longDescription:
      "Built using React, Docker, Liveblocks, and Judge0 for multi-language execution. Integrated LLaMA API for AI-driven debugging and scaled to 100+ concurrent sessions.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
    technologies: ["React.js", "Docker", "Liveblocks", "Judge0", "LLaMA API"],
    liveUrl: "https://www.code-fusion.live/",
    githubUrl: "https://github.com/sidgureja7803/CollabCode.git",
    featured: true
  },
  {
    id: 2,
    title: "MergeMates",
    description: "A 'Tinder for Developers' that matches collaborators based on GitHub data and tech interests.",
    longDescription:
      "Implemented real-time matching and chat using WebSockets with event-driven architecture. Deployed on AWS EC2 + Route 53 with automated workflows using Cron Jobs.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600&h=400&fit=crop&auto=format",
    technologies: ["React.js", "MongoDB", "WebSockets", "AWS", "Cron Jobs"],
    liveUrl: "https://www.mergemates.site/",
    githubUrl: "https://github.com/sidgureja7803/MergeMates_client.git",
    featured: true
  },
  {
    id: 3,
    title: "LiveCV",
    description: "An AI-powered resume builder that dynamically updates resumes in real time.",
    longDescription:
      "Developed with React.js, Node.js, and Appwrite for secure authentication and data handling. Supports real-time editing, PDF export, and template switching.",
    image: "https://images.unsplash.com/photo-1587614382346-ac5ce068fe85?w=600&h=400&fit=crop&auto=format",
    technologies: ["React.js", "Appwrite", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://livecv.online/",
    githubUrl: "https://github.com/sidgureja7803/LiveCV"
  },
  {
    id: 4,
    title: "IdeaHub",
    description: "A collaborative GenAI-powered platform to share and enhance project ideas.",
    longDescription:
      "Implemented AI-powered idea suggestions, scalable backend, and interactive UX for idea submission, refinement, and collaboration.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop&auto=format",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "GenAI APIs"],
    githubUrl: "https://github.com/sidgureja7803/FutureStack_GenAI.git"
  }
];

export const education = [
  {
    id: 1,
    institution: "Thapar Institute of Engineering and Technology",
    degree: "B.E. in Computer and Electronics Engineering",
    duration: "Sep 2022 – Present",
    description: "Patiala"
  }
];

export const achievements = [
  {
    id: 1,
    title: "IBM TechXchange Dev Day – AI and Automation Hackathon",
    description:
      "Won 3rd prize for building ClauseGuard, an AI-powered contract analysis tool. Awarded $300 in IBM Cloud credits.",
    githubUrl: "https://github.com/sidgureja7803/ClauseGuard.git"
  },
  {
    id: 2,
    title: "CodeSprint 2024 – ACM TIET",
    description: "Secured 3rd place among 100+ participants in a coding contest at ACM TIET.",
    certificateUrl: "https://drive.google.com/file/d/1LkLrb5oxWo_3tk87CLv_WRjCxCk9dVaT/view?usp=drivesdk"
  },
  {
    id: 3,
    title: "LeetCode Guardian Badge",
    description:
      "Completed 20+ contests, achieved 2213 contest rating, ranked among top LeetCode participants.",
    profileUrl: "https://leetcode.com/u/siddhant_gureja_07/"
  },
  {
    id: 4,
    title: "AWS Certified Cloud Practitioner",
    description:
      "Earned AWS certification, demonstrating foundational knowledge of AWS cloud concepts and services.",
    certificateUrl: "https://drive.google.com/file/d/1Lp6cHqajN2hNVyAuVdO57xr9fB76kSzo/view?usp=drivesdk"
  }
];

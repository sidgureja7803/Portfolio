// Mock data for Siddhant Gureja's Portfolio
import CodeFusionImg from './assets/CodeFusion.png';
import MergeMatesImg from './assets/MergeMates.png';
import LiveCVImg from './assets/LiveCV.png';
import IdeaHubImg from './assets/IdeaHub.png';

export const personalInfo = {
  name: "SIDDHANT GUREJA",
  title: "Software Engineer | Full Stack Developer | AI Enthusiast",
  tagline: "Building scalable web applications and AI-driven products",
  email: "siddhantgureja39@gmail.com",
  phone: "+91 8193006167",
  location: "India",
  bio: " Full-Stack Developer passionate about building intelligent, scalable, and high-performance web products using TypeScript, React.js, and FastAPI. Experienced in generative AI, real-time systems, cloud deployment, and open-source development, with a strong focus on transforming ideas into production-ready applications using AWS, Docker, and Render."
};


export const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/sidgureja", icon: "linkedin" },
  { name: "GitHub", url: "https://github.com/sidgureja7803", icon: "github" },
  { name: "LeetCode", url: "https://leetcode.com/u/siddhant_gureja_07/", icon: "code" },
  { name: "Portfolio", url: "https://sidgureja.dev/", icon: "globe" }
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
    company: "Zscaler",
    position: "Software Engineer Intern",
    duration: "Jan 2026 – Present",
    summary:
      "Built backend systems for Zscaler's internal product operations platform, integrating enterprise data sources and enabling roadmap tracking, analytics, and customer-impact reporting at scale.",
    description: [
      "Developed backend services that integrated and synchronized data across Jira (engineering tasks/milestones), Salesforce (customer/sales data), Snowflake (analytics warehouse), PostgreSQL (application DB), and internal enrichment services — ensuring consistency and freshness across systems.",
      "Built the Product Initiative (PI) module, enabling teams to track roadmaps, milestones, feature progress, customer impact, KPIs, and generate stakeholder reports.",
      "Designed and shipped scalable APIs for filtering, search, pagination, KPI rollups, milestone tracking, activity feeds, customer-impact reporting, and caching — supporting thousands of product initiatives efficiently.",
      "Deployed and maintained production services on AWS using ECS (container orchestration), ECR (container registry), and RDS (managed databases)."
    ],
    technologies: [
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Snowflake",
      "AWS ECS",
      "AWS ECR",
      "AWS RDS",
      "Salesforce Integration",
      "Jira API",
      "Data Pipelines",
      "System Design"
    ],
    project: "Maestro (Zscaler Product Operations Platform)"
  },
  {
    id: 2,
    company: "Code for GovTech",
    position: "Full Stack Developer",
    duration: "June - August 2025",
    summary:
      "Built a digital platform for ADC Mahendragarh to log, track, and visualize plot-wise land demarcation.",
    description: [
      "Developed a digital platform for ADC Mahendragarh to log, track, and visualize plot-wise land demarcation.",
      "Integrated timestamped officer logs, duplicate detection, and a data-driven dashboard to improve transparency."
    ],
    technologies: ["Node.js", "PostgreSQL", "React.js"],
    project: "Land Demarcation Tracker",
    githubUrl: "https://github.com/sidgureja7803/Land_Demarcation.git"
  },
  {
    id: 3,
    company: "Thapar Innovate",
    position: "Full Stack Developer",
    duration: "Oct 2024 – Jan 2025",
    summary:
      "Built a CRM-style web platform for TIET Venture Labs to run startup incubation programs end-to-end.",
    description: [
      "Developed a comprehensive web platform for TIET Venture Labs to manage startup applications, multiple incubation programs, and cohort-specific workflows.",
      "Designed application forms, review pipelines, and cohort dashboards used by the incubation team to track startups from application through onboarding."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "http://139.59.46.75/",
    githubUrl: "https://github.com/sidgureja7803/Incubator-CRM.git"
  }
];

export const projects = [
  {
    id: 1,
    slug: "codefusion",
    title: "CodeFusion",
    category: ["Full-Stack", "Real-Time", "AI"],
    description: "A real-time collaborative coding platform for solving DSA problems together.",
    longDescription:
      "Built using React, Docker, Liveblocks, and Judge0 for multi-language execution. Integrated LLaMA API for AI-driven debugging and scaled to 100+ concurrent sessions.",
    problem:
      "Developers practicing DSA and pair-programming lacked a lightweight, real-time collaborative environment that could execute code in multiple languages and offer AI-assisted debugging without heavyweight IDE setup.",
    role: "Sole full-stack developer — designed the architecture, built the frontend and backend, and handled deployment.",
    architecture:
      "React frontend with Liveblocks for real-time cursor/document sync (CRDT-based), a Node.js backend orchestrating Judge0 in Docker containers for sandboxed multi-language code execution, and the LLaMA API integrated for on-demand AI debugging suggestions.",
    metrics: [
      "Scaled to 100+ concurrent collaborative sessions",
      "Multi-language execution via isolated Docker/Judge0 sandboxes",
      "Real-time sync latency low enough for live pair-programming"
    ],
    image: CodeFusionImg,
    technologies: ["React.js", "Docker", "Liveblocks", "Judge0", "LLaMA API"],
    liveUrl: "https://www.code-fusion.live/",
    githubUrl: "https://github.com/sidgureja7803/CollabCode.git",
    featured: true
  },
  {
    id: 2,
    slug: "mergemates",
    title: "MergeMates",
    category: ["Full-Stack", "Real-Time", "AWS"],
    description: "A 'Tinder for Developers' that matches collaborators based on GitHub data and tech interests.",
    longDescription:
      "Implemented real-time matching and chat using WebSockets with event-driven architecture. Deployed on AWS EC2 + Route 53 with automated workflows using Cron Jobs.",
    problem:
      "Developers looking for side-project collaborators had no way to discover people with complementary skills based on real GitHub activity rather than static profiles.",
    role: "Sole full-stack developer — designed the matching logic, real-time chat system, and AWS deployment pipeline.",
    architecture:
      "React client with a Node.js/WebSocket backend for real-time matching and chat using an event-driven architecture; GitHub API data feeds the matching algorithm; deployed on AWS EC2 behind Route 53 DNS, with Cron Jobs automating periodic profile re-syncing.",
    metrics: [
      "Real-time matching and chat over WebSockets",
      "Automated GitHub data refresh via scheduled Cron Jobs",
      "Deployed and load-tested on AWS EC2 + Route 53"
    ],
    image: MergeMatesImg,
    technologies: ["React.js", "MongoDB", "WebSockets", "AWS", "Cron Jobs"],
    liveUrl: "https://www.mergemates.site/",
    githubUrl: "https://github.com/sidgureja7803/MergeMates_client.git",
    featured: true
  },
  {
    id: 3,
    slug: "livecv",
    title: "LiveCV",
    category: ["Full-Stack", "AI"],
    description: "An AI-powered resume builder that dynamically updates resumes in real time.",
    longDescription:
      "Developed with React.js, Node.js, and Appwrite for secure authentication and data handling. Supports real-time editing, PDF export, and template switching.",
    problem:
      "Job seekers needed a fast way to maintain multiple resume versions and export polished PDFs without wrestling with design tools or static templates.",
    role: "Sole full-stack developer — built the editor, auth/data layer, and export pipeline.",
    architecture:
      "React front end with a live-editing document model, Appwrite handling authentication and data persistence, and a Node.js service generating PDF exports on demand with template switching.",
    metrics: [
      "Real-time editing with instant preview updates",
      "Multi-template switching with PDF export",
      "Secure auth and data handling via Appwrite"
    ],
    image: LiveCVImg,
    technologies: ["React.js", "Appwrite", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://livecv.online/",
    githubUrl: "https://github.com/sidgureja7803/LiveCV"
  },
  {
    id: 4,
    slug: "ideahub",
    title: "IdeaHub",
    category: ["Full-Stack", "AI"],
    description: "A collaborative GenAI-powered platform to share and enhance project ideas.",
    longDescription:
      "Implemented AI-powered idea suggestions, scalable backend, and interactive UX for idea submission, refinement, and collaboration.",
    problem:
      "Builders often have raw project ideas but no structured way to refine, validate, or get feedback on them collaboratively before committing time to build.",
    role: "Full-stack developer — built the idea submission/refinement flow and GenAI integration.",
    architecture:
      "Next.js frontend with a Node.js/Express backend, MongoDB for idea and comment storage, and GenAI APIs integrated to generate refinement suggestions on submitted ideas.",
    metrics: [
      "AI-generated refinement suggestions on every submitted idea",
      "Collaborative comment/refinement flow for shared ideas"
    ],
    image: IdeaHubImg,
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "GenAI APIs"],
    githubUrl: "https://github.com/sidgureja7803/FutureStack_GenAI.git"
  }
];

export const education = [
  {
    id: 1,
    institution: "Thapar Institute of Engineering and Technology",
    degree: "B.E. in Computer and Electronics Engineering",
    duration: "Sep 2022 – June 2026",
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

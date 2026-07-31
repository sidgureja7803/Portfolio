import {
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiRedux,
  SiTailwindcss,
  SiSass,
  SiMui,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiRender,
  SiVercel,
  SiGit,
  SiGithub,
  SiPostman,
  SiWebpack,
  SiSnowflake,
  SiJira,
} from 'react-icons/si';
import { FaAws, FaJava, FaCode, FaBrain, FaSalesforce, FaCss3Alt } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { TbApi, TbNetwork } from 'react-icons/tb';
import { BsDatabaseFill } from 'react-icons/bs';

// Maps a skill label (as authored in mock.js) to a real brand icon + brand color.
// Falls back to a neutral generic icon when no accurate brand mark exists —
// never substitute an unrelated company's logo for one that doesn't exist in the icon set.
export const SKILL_ICON_MAP = {
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#F7DF1E' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  Java: { icon: FaJava, color: '#E76F00' },
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  HTML: { icon: SiHtml5, color: '#E34F26' },
  CSS: { icon: FaCss3Alt, color: '#1572B6' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  CSS3: { icon: FaCss3Alt, color: '#1572B6' },
  SCSS: { icon: SiSass, color: '#CC6699' },
  'Material-UI': { icon: SiMui, color: '#007FFF' },
  'Shadcn/ui': { icon: SiShadcnui, color: '#FFFFFF' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  'Express.js': { icon: SiExpress, color: '#FFFFFF' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  AWS: { icon: FaAws, color: '#FF9900' },
  'AWS ECS': { icon: FaAws, color: '#FF9900' },
  'AWS ECR': { icon: FaAws, color: '#FF9900' },
  'AWS RDS': { icon: FaAws, color: '#FF9900' },
  Render: { icon: SiRender, color: '#46E3B7' },
  Vercel: { icon: SiVercel, color: '#FFFFFF' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: '#FFFFFF' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  Webpack: { icon: SiWebpack, color: '#8DD6F9' },
  'LLaMA API': { icon: FaBrain, color: '#8B5CF6' },
  OpenAI: { icon: FaBrain, color: '#8B5CF6' },
  'GenAI Integration': { icon: FaBrain, color: '#8B5CF6' },
  'Prompt Engineering': { icon: FaBrain, color: '#8B5CF6' },
  'Data Structures & Algorithms': { icon: FaCode, color: '#F59E0B' },
  OOPS: { icon: FaCode, color: '#F59E0B' },
  'Computer Networks': { icon: TbNetwork, color: '#F59E0B' },
  DBMS: { icon: BsDatabaseFill, color: '#F59E0B' },
  Snowflake: { icon: SiSnowflake, color: '#29B5E8' },
  'Jira API': { icon: SiJira, color: '#0052CC' },
  'Salesforce Integration': { icon: FaSalesforce, color: '#00A1E0' },
  'REST APIs': { icon: TbApi, color: '#10B981' },
};

export function getSkillIcon(label) {
  return SKILL_ICON_MAP[label] || { icon: FaCode, color: '#94A3B8' };
}

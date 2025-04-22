import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const ContributionCard = ({ title, description, link, year, repos }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
    >
      <div className="relative w-full h-[230px] bg-black rounded-2xl overflow-hidden mb-5">
        <div className="absolute inset-0 flex justify-center items-center bg-black/60">
          <h3 className="text-white text-[24px] font-bold">{year}</h3>
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-[24px]">{title}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {repos.map((repo, index) => (
          <p key={`repo-${index}`} className="text-[14px] text-[#915eff]">
            #{repo}
          </p>
        ))}
      </div>

      <div className="mt-4">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gradient font-bold"
        >
          View Contributions →
        </a>
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const contributions = [
    {
      title: "Hacktoberfest 2023",
      description: "Contributed to 4 open source projects focusing on web development and accessibility improvements.",
      link: "https://github.com/your-username?tab=repositories",
      year: "2023",
      repos: ["react-ui", "open-source", "accessibility", "web-components"]
    },
    {
      title: "Hacktoberfest 2022",
      description: "Participated by improving documentation and adding new features to JavaScript libraries.",
      link: "https://github.com/your-username?tab=repositories",
      year: "2022",
      repos: ["documentation", "javascript", "libraries", "community"]
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Contributions</p>
        <h2 className={styles.sectionHeadText}>Open Source.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I actively contribute to open source projects, particularly during Hacktoberfest.
          These contributions demonstrate my ability to collaborate with developers globally,
          understand existing codebases, and make meaningful improvements to real-world projects.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {contributions.map((contribution, index) => (
          <ContributionCard key={`contribution-${index}`} {...contribution} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(OpenSource, "opensource"); 
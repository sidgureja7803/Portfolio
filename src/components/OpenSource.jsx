import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { fadeIn, textVariant } from '../utils/motion';
import { FaGithub } from 'react-icons/fa';
import GurejaSvg from './canvas/GurejaSvg';

const HacktoberfestCard = ({ year, badges }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full hover:shadow-card transition-all duration-300 transform hover:scale-105"
      onClick={() => window.open('https://holopin.io/@siddhantgureja', '_blank')}
    >
      <h3 className="text-white font-bold text-[24px] mb-4">Hacktoberfest {year}</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
          >
            <img
              src={badge.image}
              alt={`Hacktoberfest ${year} Badge ${index + 1}`}
              className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <p className="text-white text-sm text-center px-2">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const OpenSourceCard = ({ title, description, link, stars, forks, tech }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full hover:shadow-card transition-shadow duration-300"
    >
      <div className="relative w-full h-[230px] cursor-pointer group" onClick={() => window.open(link, "_blank")}>
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>
            <h3 className="text-white font-bold text-[24px]">{title}</h3>
            <p className="text-secondary text-[14px] mt-2">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">⭐ {stars}</span>
            <span className="text-white">🍴 {forks}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex flex-wrap gap-2">
            {tech.map((tag, index) => (
              <span
                key={index}
                className="text-[14px] text-white bg-black bg-opacity-50 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const hacktoberfestData = [
    {
      year: 2024,
      badges: [
        {
          image: "path_to_badge_1.png",
          description: "Contributed to 4 open source projects"
        },
        {
          image: "path_to_badge_2.png",
          description: "Hacktoberfest 2023 Completion Badge"
        }
      ]
    },
    // Add more years if needed
  ];

  const contributions = [
    {
      title: "React Three Fiber",
      description: "Contributed to the development of React Three Fiber, a React renderer for Three.js.",
      link: "https://github.com/pmndrs/react-three-fiber",
      stars: "22.5k",
      forks: "1.2k",
      tech: ["React", "Three.js", "TypeScript"]
    },
    // Add more contributions
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Contributions</p>
        <h2 className={styles.sectionHeadText}>Open Source.</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-10">
        <div className="w-full h-[400px]">
          <GurejaSvg />
        </div>
        
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="flex flex-col gap-4"
        >
          <p className="text-secondary text-[17px] leading-[30px]">
            I actively contribute to open source projects, particularly during Hacktoberfest.
            My contributions range from bug fixes to feature implementations, helping make
            the open source community stronger.
          </p>
          
          <div className="mt-4">
            <h3 className="text-white font-bold text-[20px] mb-4">Hacktoberfest Achievements</h3>
            <div className="grid gap-6">
              {hacktoberfestData.map((data, index) => (
                <HacktoberfestCard key={index} {...data} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {contributions.map((contribution, index) => (
          <OpenSourceCard key={index} {...contribution} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 1, 0.75)}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://www.holopin.io/@sidgureja7803#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300"
        >
          <FaGithub className="text-2xl" />
          <span>View my Holopin board</span>
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(OpenSource, "opensource"); 
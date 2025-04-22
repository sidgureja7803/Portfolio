import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const RatingCard = () => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="bg-tertiary p-8 rounded-2xl w-full max-w-3xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="relative h-48 w-48 mx-auto">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-40 w-40 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center">
                <div className="h-36 w-36 rounded-full bg-tertiary flex justify-center items-center">
                  <span className="text-white text-4xl font-bold">2100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-[24px] mb-4">LeetCode Expert</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-secondary">Rating</span>
              <span className="text-white font-medium">2100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Global Rank</span>
              <span className="text-white font-medium">Top 5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Problems Solved</span>
              <span className="text-white font-medium">500+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Contests Participated</span>
              <span className="text-white font-medium">50+</span>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="https://leetcode.com/your-username/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gradient font-bold"
            >
              View Profile →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Coding = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Competitive Skills</p>
        <h2 className={styles.sectionHeadText}>Coding Proficiency.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I regularly participate in coding competitions and have achieved a significant rating on LeetCode.
          My competitive programming skills showcase my ability to solve complex problems efficiently,
          with strong algorithm and data structure knowledge.
        </motion.p>
      </div>

      <div className="mt-16">
        <RatingCard />
      </div>
    </>
  );
};

export default SectionWrapper(Coding, "coding"); 
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { FaGraduationCap, FaUniversity, FaSchool } from 'react-icons/fa';

const EducationCard = ({ title, school, duration, description, icon: Icon, index }) => (
  <motion.div
    variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
    className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
        <Icon className="text-blue-400 text-2xl" />
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">{title}</h3>
        <p className="text-secondary text-[16px] font-semibold">{school}</p>
      </div>
    </div>
    <p className="text-blue-400 text-[14px] mt-2">{duration}</p>
    <ul className="mt-4 list-disc ml-5 space-y-2">
      {description.map((item, idx) => (
        <li key={idx} className="text-white-100 text-[14px] pl-1 tracking-wider">
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Education = () => {
  const educationData = [
    {
      title: "Bachelor's Degree",
      school: "Your University Name",
      duration: "2020 - 2024",
      icon: FaUniversity,
      description: [
        "Computer Science and Engineering",
        "CGPA: 8.5/10",
        "Relevant coursework: Data Structures, Algorithms, Database Management, Web Development",
      ],
    },
    {
      title: "Higher Secondary",
      school: "Your School Name",
      duration: "2018 - 2020",
      icon: FaGraduationCap,
      description: [
        "Science Stream with Computer Science",
        "Percentage: 95%",
        "Board Rank: Top 1%",
      ],
    },
    {
      title: "Secondary Education",
      school: "Your School Name",
      duration: "2016 - 2018",
      icon: FaSchool,
      description: [
        "CBSE Board",
        "Percentage: 92%",
        "Active participation in coding competitions and science exhibitions",
      ],
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My academic journey</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {educationData.map((education, index) => (
          <EducationCard key={index} index={index} {...education} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education"); 
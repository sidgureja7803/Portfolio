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
      school: "Thapar Institute of Engineering and Technology, Patiala",
      duration: "2022 - 22026",
      icon: FaUniversity,
      description: [
        "Electronics and Computer Engineering",
        "Relevant coursework: Data Structures, Algorithms, Devops, Analog and Digital Electronics, Computer Networks, Operating Systems, Object Oriented Programming, Computer Organization and Architecture, Database Management, Web Development",
      ],
    },
    {
      title: "Higher Secondary",
      school: "Omkarananda Saraswati Nilyam, Rishikesh",
      duration: "2019 - 2021",
      icon: FaGraduationCap,
      description: [
        "Science Stream with Computer Science",
        "Percentage: 95.75",
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
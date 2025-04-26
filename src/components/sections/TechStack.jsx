import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaReact, FaNode, FaJs, FaDocker, FaGithub, FaNpm } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiMongodb, SiExpress, SiGraphql, SiRedux, SiKubernetes, SiApache, SiC, SiCplusplus } from 'react-icons/si';
import { TbBrandVscode, TbBrandGit } from 'react-icons/tb';

// Custom Three.js icon component
const ThreeJsIcon = () => (
  <div className="flex items-center justify-center">
    <span className="text-white font-bold">Three.js</span>
  </div>
);

// Map of technology icons
const techIcons = {
  'React': FaReact,
  'Node.js': FaNode,
  'Express': SiExpress,
  'MongoDB': SiMongodb,
  'JavaScript': FaJs,
  'TypeScript': SiTypescript,
  'Three.js': ThreeJsIcon,
  'TailwindCSS': SiTailwindcss,
  'GraphQL': SiGraphql,
  'Redux': SiRedux,
  'Docker': FaDocker,
  'Kubernetes': SiKubernetes,
  'Git': TbBrandGit,
  'GitHub': FaGithub,
  'VS Code': TbBrandVscode,
  'npm': FaNpm,
  'Apache': SiApache,
  'C': SiC,
  'C++': SiCplusplus,
  'GSAP': () => <span className="text-[#8dd300] font-bold">GS</span>
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const SkillCard = ({ skill, icon: Icon, level, category, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      className="glass p-5 rounded-xl cursor-pointer border border-gray-700/30 hover:border-blue-500/30 transition-colors relative overflow-hidden group"
      onClick={() => onClick(skill)}
    >
      <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-500/10 rounded-full" />
      <div className="absolute right-6 bottom-4 text-blue-500/10 text-9xl font-bold -z-10 group-hover:text-blue-500/20 transition-colors">
        {level}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-blue-400">
          {Icon ? <Icon /> : skill.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">{skill}</h3>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${level * 10}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

const SkillForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    skill: '',
    category: 'Frontend',
    level: 5
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      skill: '',
      category: 'Frontend',
      level: 5
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass p-6 rounded-xl border border-gray-700/30"
    >
      <h3 className="text-xl font-bold mb-4">Add New Skill</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Skill Name</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Tools">Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Skill Level: {formData.level}/10
          </label>
          <input
            type="range"
            name="level"
            min="1"
            max="10"
            value={formData.level}
            onChange={handleChange}
            className="w-full h-2 rounded-lg appearance-none bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient text-white rounded-lg flex-1"
          >
            Add Skill
          </motion.button>
          
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/30 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const TechStack = () => {
  const [skills, setSkills] = useState([
    { skill: 'React.js', category: 'Frontend', level: 9 },
    { skill: 'JavaScript', category: 'Frontend', level: 9 },
    { skill: 'Three.js', category: 'Frontend', level: 8 },
    { skill: 'Node.js', category: 'Backend', level: 8 },
    { skill: 'Express', category: 'Backend', level: 7 },
    { skill: 'MongoDB', category: 'Backend', level: 7 },
    { skill: 'TailwindCSS', category: 'Frontend', level: 9 },
    { skill: 'TypeScript', category: 'Frontend', level: 8 },
    { skill: 'Docker', category: 'DevOps', level: 6 },
    { skill: 'Git', category: 'Tools', level: 8 },
    { skill: 'C', category: 'Other', level: 7 },
    { skill: 'C++', category: 'Other', level: 6 },
    { skill: 'Kubernetes', category: 'DevOps', level: 5 },
    { skill: 'Apache', category: 'DevOps', level: 6 },
    { skill: 'GSAP', category: 'Frontend', level: 7 },
  ]);
  
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(skills.find(s => s.skill === skill));
  };
  
  const addSkill = (newSkill) => {
    setSkills(prev => [...prev, newSkill]);
    setShowForm(false);
  };
  
  const filters = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools', 'Other'];
  
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);
  
  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="blur-gradient-blue w-[400px] h-[400px] top-[20%] -left-[150px] opacity-20" />
      <div className="blur-gradient-purple w-[500px] h-[500px] bottom-[10%] -right-[200px] opacity-20" />
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My <span className="text-gradient">Tech Stack</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient mx-auto rounded mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of technologies I've worked with and my proficiency levels.
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {filters.map(filterName => (
            <motion.button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === filterName 
                  ? 'bg-gradient text-white' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterName}
            </motion.button>
          ))}
          
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors ml-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Skill
          </motion.button>
        </div>
        
        {/* Skills Grid */}
        {showForm ? (
          <SkillForm onAdd={addSkill} onCancel={() => setShowForm(false)} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.skill}
                skill={skill.skill}
                icon={techIcons[skill.skill]}
                category={skill.category}
                level={skill.level}
                onClick={handleSkillClick}
              />
            ))}
          </motion.div>
        )}
        
        {/* Selected Skill Detail */}
        {selectedSkill && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 glass p-6 rounded-xl border border-gray-700/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-blue-400">
                  {techIcons[selectedSkill.skill] 
                    ? <>{techIcons[selectedSkill.skill]()}</> 
                    : selectedSkill.skill.charAt(0)
                  }
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedSkill.skill}</h3>
                  <p className="text-gray-400">{selectedSkill.category}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedSkill(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Proficiency</span>
                <span className="text-sm text-blue-400">{selectedSkill.level}/10</span>
              </div>
              <div className="bg-gray-700/30 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level * 10}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            
            <p className="text-gray-300">
              {selectedSkill.skill === 'React.js' && 'Building modern user interfaces with component-based architecture and state management.'}
              {selectedSkill.skill === 'JavaScript' && 'Creating interactive web applications with vanilla JS and modern ES6+ features.'}
              {selectedSkill.skill === 'Three.js' && 'Developing 3D experiences and visualizations for the web.'}
              {selectedSkill.skill === 'Node.js' && 'Building scalable server-side applications and APIs.'}
              {selectedSkill.skill === 'Express' && 'Creating RESTful APIs and web servers with Node.js.'}
              {selectedSkill.skill === 'MongoDB' && 'Designing and querying NoSQL databases for web applications.'}
              {selectedSkill.skill === 'TailwindCSS' && 'Implementing utility-first CSS for rapid UI development.'}
              {selectedSkill.skill === 'TypeScript' && 'Writing type-safe JavaScript applications for better maintainability.'}
              {selectedSkill.skill === 'Docker' && 'Containerizing applications for consistent deployment across environments.'}
              {selectedSkill.skill === 'Git' && 'Version control and collaborative development workflows.'}
              {selectedSkill.skill === 'GSAP' && 'Creating advanced animations and interactive effects for the web.'}
              {!['React.js', 'JavaScript', 'Three.js', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'TypeScript', 'Docker', 'Git', 'GSAP'].includes(selectedSkill.skill) && 
                `Experience with ${selectedSkill.skill} for ${selectedSkill.category.toLowerCase()} development tasks.`
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TechStack; 
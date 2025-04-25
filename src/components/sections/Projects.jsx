import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaPlus, FaImage, FaLink } from 'react-icons/fa';
import { styles } from '../../styles';
import { projects as initialProjects } from '../../constants';
import { fadeIn, textVariant } from '../../utils/motion';

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
  },
  tap: { scale: 0.98 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });
  const [imageError, setImageError] = useState(false);
  const { title, description, image, github, demo, tech, featured } = project;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      className="relative bg-tertiary rounded-2xl p-5 sm:w-[360px] w-full hover:shadow-card transition-all duration-300 ease-out"
    >
      <div className="relative w-full h-[230px] rounded-2xl overflow-hidden group">
        {!imageError ? (
          <img
            src={image}
            alt={`${title} project thumbnail`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/10">
            <FaImage className="w-12 h-12 text-gray-400" aria-label="Image not available" />
          </div>
        )}
        
        <div className="absolute inset-0 flex justify-end m-3 gap-2 card-img_hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <FaGithub className="w-1/2 h-1/2 text-white" />
            </motion.a>
          )}
          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <FaExternalLinkAlt className="w-1/2 h-1/2 text-white" />
            </motion.a>
          )}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-[24px] group-hover:bg-gradient-to-r from-purple-400 to-pink-600 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          {featured && (
            <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-400 to-pink-600 rounded-full text-white" aria-label="Featured project">
              Featured
            </span>
          )}
        </div>
        <p className="mt-2 text-secondary text-[14px] line-clamp-3">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((tag, index) => (
          <motion.p
            key={`${tag}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`text-[14px] text-white-100 bg-black/20 px-3 py-1 rounded-full ${index >= 3 ? 'hidden sm:inline-block' : ''}`}
          >
            #{tag}
          </motion.p>
        ))}
        {tech.length > 3 && (
          <motion.div
            className="text-[14px] text-white-100 bg-black/20 px-3 py-1 rounded-full flex items-center gap-1 sm:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="w-3 h-3" />
            <span>{tech.length - 3}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-64 sm:h-80 overflow-hidden">
            {!imageError ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                <div className="text-center p-4">
                  <FaImage size={40} className="mx-auto mb-2" />
                  <p className="text-lg">{project.title}</p>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </motion.a>
                )}
                
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Project Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
              <ul className="text-gray-300 list-disc pl-5 space-y-1">
                <li>Implemented responsive design for all device sizes</li>
                <li>Utilized modern JavaScript frameworks and libraries</li>
                <li>Integrated with third-party APIs for enhanced functionality</li>
                <li>Optimized performance for better user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectForm = ({ onAdd, onCancel }) => {
  const initialState = {
    title: '',
    description: '',
    tech: [],
    github: '',
    live: '',
    image: '',
    featured: false
  };
  
  const [formData, setFormData] = useState(initialState);
  const [newTech, setNewTech] = useState('');
  const [imageType, setImageType] = useState('url'); // 'url' or 'file'
  const fileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' && newTech.trim()) {
      e.preventDefault();
      if (!formData.tech.includes(newTech.trim())) {
        setFormData(prev => ({
          ...prev,
          tech: [...prev.tech, newTech.trim()]
        }));
      }
      setNewTech('');
    }
  };
  
  const handleAddTech = () => {
    if (newTech.trim() && !formData.tech.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()]
      }));
      setNewTech('');
    }
  };
  
  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter(t => t !== tech)
    }));
  };
  
  const handleImageTypeChange = (type) => {
    setImageType(type);
    if (type === 'file') {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tech.length === 0) {
      alert('Please add at least one technology.');
      return;
    }
    
    onAdd({ ...formData, id: Date.now() });
    setFormData(initialState);
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="glass p-6 rounded-xl border border-gray-700/30"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Add New Project</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Featured Project
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 focus:ring-2 bg-gray-800 border-gray-700"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                Mark as featured project
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Project Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Technologies *
          </label>
          <div className="flex">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={handleTechKeyDown}
              placeholder="Add technology and press Enter"
              className="flex-1 bg-gray-800/50 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tech.map((tech, index) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="ml-2 text-blue-400 hover:text-blue-300"
                >
                  <FaTimes size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              name="live"
              value={formData.live}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Project Image
          </label>
          
          <div className="flex mb-2 space-x-2">
            <button
              type="button"
              onClick={() => handleImageTypeChange('url')}
              className={`px-3 py-1 rounded text-sm ${
                imageType === 'url' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              <FaLink className="inline mr-1" size={12} /> URL
            </button>
            
            <button
              type="button"
              onClick={() => handleImageTypeChange('file')}
              className={`px-3 py-1 rounded text-sm ${
                imageType === 'file' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              <FaImage className="inline mr-1" size={12} /> Upload File
            </button>
          </div>
          
          {imageType === 'url' ? (
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full py-8 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-colors"
              >
                <FaImage size={24} className="mb-2" />
                <span className="text-sm">{formData.image ? 'Change Image' : 'Upload Image'}</span>
                <span className="text-xs mt-1">PNG, JPG or WEBP (max 2MB)</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {formData.image && (
                <div className="mt-2 relative h-24 w-full overflow-hidden rounded-lg">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient text-white rounded-lg flex-1 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add Project
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

const Projects = () => {
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const addProject = (newProject) => {
    setProjectsList(prev => [newProject, ...prev]);
    setShowForm(false);
  };
  
  const filteredProjects = filter === 'all' 
    ? projectsList 
    : projectsList.filter(project => project.featured);
  
  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="blur-gradient-blue w-[500px] h-[500px] -top-[100px] -right-[150px] opacity-20" />
      <div className="blur-gradient-purple w-[400px] h-[400px] bottom-[20%] -left-[100px] opacity-30" />
      
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. These projects reflect my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
        
        {/* Filter and Actions */}
        <div className="flex flex-wrap justify-center my-10 gap-3">
          <motion.button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all' 
                ? 'bg-gradient text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          
          <motion.button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'featured' 
                ? 'bg-gradient text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Featured
          </motion.button>
          
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors ml-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Project
          </motion.button>
        </div>
        
        {/* Project List */}
        {showForm ? (
          <ProjectForm onAdd={addProject} onCancel={() => setShowForm(false)} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id || project.name}
                project={project}
              />
            ))}
          </motion.div>
        )}
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects; 
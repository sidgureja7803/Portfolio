import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const TimelineItem = ({ date, title, description, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <div ref={ref} className="relative flex items-start">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-8 w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-500/0" />
      )}
      
      {/* Date bubble */}
      <motion.div 
        className="relative z-10 mt-7 mr-6 w-12 h-12 rounded-full bg-gradient flex items-center justify-center text-white font-medium shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {index + 1}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="flex-1 pb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
          <span className="text-sm text-blue-400">{date}</span>
          <h3 className="text-xl font-bold mt-1 mb-3">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: "Projects", value: "20+" },
    { label: "Experience", value: "3+ Years" },
    { label: "Clients", value: "15+" },
    { label: "Languages", value: "5+" }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="glass rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <motion.h4 
            className="text-3xl md:text-4xl font-bold text-gradient"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          >
            {stat.value}
          </motion.h4>
          <p className="text-gray-400 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const timelineEvents = [
    {
      date: "2018 - 2020",
      title: "Computer Science Degree",
      description: "Completed my bachelor's degree in Computer Science with a focus on web technologies and application development."
    },
    {
      date: "2020 - 2021",
      title: "Frontend Developer",
      description: "Worked as a frontend developer at a tech startup, building responsive web applications using React and modern CSS frameworks."
    },
    {
      date: "2021 - Present",
      title: "Full Stack Developer",
      description: "Currently working as a full stack developer, creating interactive experiences with React, Three.js, and Node.js."
    }
  ];
  
  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="blur-gradient-blue w-[400px] h-[400px] top-1/4 -right-[100px] opacity-30" />
      <div className="blur-gradient-purple w-[500px] h-[500px] bottom-1/4 -left-[150px] opacity-20" />
      
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
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient mx-auto rounded mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experienced developer with a passion for creating stunning web experiences using modern technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            
            <div className="space-y-4 text-gray-300">
              <p>
                Hello! I'm Siddhant, a passionate web developer with expertise in creating immersive digital experiences. 
                I specialize in building applications with React, Three.js, and modern JavaScript.
              </p>
              
              <p>
                My journey in web development began during my computer science studies, where I discovered my passion for 
                combining aesthetics with functionality. Since then, I've been crafting visually appealing and user-friendly 
                websites and applications.
              </p>
              
              <p>
                I enjoy tackling complex problems and turning them into simple, beautiful, and intuitive designs. 
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or improving my 3D modeling skills.
              </p>
            </div>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            
            {['Frontend', 'Backend', 'Design', 'Tools'].map((category, catIndex) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-300">{category}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((_, i) => {
                    const skills = {
                      Frontend: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Three.js', 'GSAP'],
                      Backend: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'REST API', 'GraphQL'],
                      Design: ['Figma', 'UI/UX', 'Responsive Design', 'Animation', '3D Modeling', 'Wireframing'],
                      Tools: ['Git', 'VS Code', 'Webpack', 'Docker', 'CI/CD', 'Testing']
                    };
                    
                    return i < skills[category].length ? (
                      <motion.div
                        key={i}
                        className="glass-light p-2 rounded text-center text-gray-300 text-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + (catIndex * 0.1) + (i * 0.05) }}
                      >
                        {skills[category][i]}
                      </motion.div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Stats section */}
        <div className="mb-16">
          <Stats />
        </div>
        
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-10">My Experience</h3>
          
          <div className="pl-4">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={index}
                date={event.date}
                title={event.title}
                description={event.description}
                index={index}
                isLast={index === timelineEvents.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 
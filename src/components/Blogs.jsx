import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ id, title, date, readTime, excerpt, tags, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer group"
    onClick={() => window.open(`/blog/${id}`, '_blank')}
  >
    <div className="relative w-full h-[230px] mb-4">
      <img
        src={`https://source.unsplash.com/800x600/?${tags[0]}`}
        alt={title}
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white flex items-center gap-2">
          Read More <FaArrowRight />
        </span>
      </div>
    </div>

    <div className="flex gap-4 text-sm text-secondary mb-3">
      <div className="flex items-center gap-1">
        <FaCalendar className="text-blue-400" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaClock className="text-blue-400" />
        <span>{readTime} min read</span>
      </div>
    </div>

    <h3 className="text-white font-bold text-[24px] mb-2 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    
    <p className="text-secondary text-[14px] mb-4 line-clamp-3">
      {excerpt}
    </p>

    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="text-[12px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// This would normally be in a separate file
const blogs = [
  {
    id: "getting-started-with-threejs",
    title: "Getting Started with Three.js: A Beginner's Guide",
    date: "Mar 15, 2024",
    readTime: 8,
    excerpt: "Learn how to create stunning 3D graphics for the web using Three.js. This comprehensive guide covers everything from basic setup to advanced techniques.",
    tags: ["threejs", "webgl", "javascript"],
  },
  {
    id: "docker-kubernetes-guide",
    title: "Building Scalable Applications with Docker and Kubernetes",
    date: "Mar 10, 2024",
    readTime: 12,
    excerpt: "Explore containerization and orchestration with Docker and Kubernetes. Learn best practices for deploying and scaling your applications.",
    tags: ["docker", "kubernetes", "devops"],
  },
  {
    id: "advanced-react-patterns",
    title: "Advanced React Patterns and Best Practices",
    date: "Mar 5, 2024",
    readTime: 10,
    excerpt: "Deep dive into advanced React patterns including compound components, render props, and custom hooks. Learn how to write cleaner and more maintainable code.",
    tags: ["react", "javascript", "webdev"],
  },
  {
    id: "ml-for-web-devs",
    title: "Machine Learning for Web Developers",
    date: "Feb 28, 2024",
    readTime: 15,
    excerpt: "Introduction to machine learning concepts for web developers. Learn how to integrate ML models into your web applications using TensorFlow.js.",
    tags: ["machinelearning", "tensorflow", "javascript"],
  },
  {
    id: "react-state-management",
    title: "State Management in Modern React Applications",
    date: "Feb 20, 2024",
    readTime: 11,
    excerpt: "Compare different state management solutions in React including Context API, Redux, Zustand, and Jotai. Learn which one to choose for your project.",
    tags: ["react", "redux", "webdev"],
  },
  {
    id: "portfolio-threejs-react",
    title: "Building a Portfolio with Three.js and React",
    date: "Feb 15, 2024",
    readTime: 9,
    excerpt: "Step-by-step guide to creating an impressive portfolio website using Three.js and React. Learn how to showcase your skills with interactive 3D elements.",
    tags: ["threejs", "react", "portfolio"],
  },
];

const Blogs = () => {
  // Only show the first 3 blogs in the main view
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My thoughts and learnings</p>
        <h2 className={styles.sectionHeadText}>Blog Posts.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {displayedBlogs.map((blog, index) => (
          <BlogCard key={index} index={index} {...blog} />
        ))}
      </div>

      <div className="w-full flex justify-center mt-10">
        <Link to="/blogs" className="bg-tertiary hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors">
          View More Blogs <FaArrowRight />
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Blogs, "blogs"); 
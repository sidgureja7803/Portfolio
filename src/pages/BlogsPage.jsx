import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { FaCalendar, FaClock, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Import blogs data (in a real app, this would be in a separate file)
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

const BlogCard = ({ id, title, date, readTime, excerpt, tags }) => (
  <div 
    className="bg-tertiary p-5 rounded-2xl w-full cursor-pointer group mb-8"
    onClick={() => window.open(`/blog/${id}`, '_blank')}
  >
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative md:w-1/3 h-[200px]">
        <img
          src={`https://source.unsplash.com/800x600/?${tags[0]}`}
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
      <div className="md:w-2/3">
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
        
        <p className="text-secondary text-[16px] mb-4">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-[12px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300">
          Read More <FaArrowRight className="ml-2" />
        </div>
      </div>
    </div>
  </div>
);

const BlogsPage = () => {
  return (
    <div className="bg-primary">
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <div className="py-10">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-2">
            Blog Posts
          </h1>
          <p className="text-secondary text-[17px] max-w-3xl mb-10">
            Thoughts, tutorials, and insights about technology, development, and design.
          </p>
          
          <div className="mt-8">
            {blogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage; 
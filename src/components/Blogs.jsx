import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ title, date, readTime, excerpt, link, tags, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer group"
    onClick={() => window.open(link, '_blank')}
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

const Blogs = () => {
  const blogs = [
    {
      title: "Getting Started with Three.js: A Beginner's Guide",
      date: "Mar 15, 2024",
      readTime: 8,
      excerpt: "Learn how to create stunning 3D graphics for the web using Three.js. This comprehensive guide covers everything from basic setup to advanced techniques.",
      link: "/blog/getting-started-with-threejs",
      tags: ["threejs", "webgl", "javascript"],
    },
    {
      title: "Building Scalable Applications with Docker and Kubernetes",
      date: "Mar 10, 2024",
      readTime: 12,
      excerpt: "Explore containerization and orchestration with Docker and Kubernetes. Learn best practices for deploying and scaling your applications.",
      link: "/blog/docker-kubernetes-guide",
      tags: ["docker", "kubernetes", "devops"],
    },
    {
      title: "Advanced React Patterns and Best Practices",
      date: "Mar 5, 2024",
      readTime: 10,
      excerpt: "Deep dive into advanced React patterns including compound components, render props, and custom hooks. Learn how to write cleaner and more maintainable code.",
      link: "/blog/advanced-react-patterns",
      tags: ["react", "javascript", "webdev"],
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My thoughts and learnings</p>
        <h2 className={styles.sectionHeadText}>Blog Posts.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {blogs.map((blog, index) => (
          <BlogCard key={index} index={index} {...blog} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Blogs, "blogs"); 
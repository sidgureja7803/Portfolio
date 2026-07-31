import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Contact from '../components/Contact';
import { blogPosts } from '../data/blogPosts';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const Blog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-40 pb-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Writing
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-16 md:mb-20">
            Blog
          </h1>

          {blogPosts.length === 0 ? (
            <p className="text-muted-foreground py-12">No posts yet — check back soon.</p>
          ) : (
            <div>
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  className={`border-t border-border ${index === blogPosts.length - 1 ? 'border-b' : ''}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <Link to={`/blogs/${post.slug}`} className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-10 py-8 md:py-10">
                    <span className="text-sm text-muted-foreground w-40 flex-shrink-0">{formatDate(post.date)}</span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mt-2 max-w-2xl">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Contact />
    </div>
  );
};

export default Blog;

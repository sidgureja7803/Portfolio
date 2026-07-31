import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Contact from '../components/Contact';
import { Button } from '../components/ui/button';
import { blogPosts, getPostBySlug } from '../data/blogPosts';
import { ArrowLeft } from 'lucide-react';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const markdownComponents = {
  h2: ({ children }) => (
    <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight mt-10 mb-3">{children}</h3>
  ),
  p: ({ children }) => <p className="text-foreground/90 leading-relaxed mb-6">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children }) => <ul className="space-y-2 mb-6 pl-1">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-foreground/90 leading-relaxed">
      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-6 italic text-muted-foreground my-6">{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-accent px-1.5 py-0.5 rounded">{children}</code>
  ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 pt-32">
          <h1 className="text-3xl font-semibold">Post not found</h1>
          <p className="text-muted-foreground">This post doesn't exist or may have been moved.</p>
          <Button onClick={() => navigate('/blogs')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Button>
        </main>
        <Contact />
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-40 pb-24 px-6 md:px-10">
        <motion.article
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-border pt-10">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>

          {nextPost && (
            <div className="border-t border-border mt-16 pt-10">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Next</p>
              <Link to={`/blogs/${nextPost.slug}`} className="group inline-flex items-center gap-2">
                <span className="font-display text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            </div>
          )}
        </motion.article>
      </main>
      <Contact />
    </div>
  );
};

export default BlogPost;

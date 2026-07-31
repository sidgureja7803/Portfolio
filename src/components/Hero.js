import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo, socialLinks } from '../mock';
import ResumePDF from '../assets/siddhant_tiet.pdf';
import HeroScene from './HeroScene';
import AnimatedName from './AnimatedName';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    // Delay kept short even for later elements — the subtitle (custom={1})
    // is the page's LCP element, and any animation delay on it directly
    // inflates measured LCP under throttled/low-end conditions.
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const sceneWrapperRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll-linked parallax: hero content fades/lifts and the 3D layer scales
  // slightly as the user scrolls past the hero, tied directly to scroll position
  // (not a viewport-enter reveal) — this is GSAP's job, kept separate from the
  // Framer Motion whileInView reveals used for section entrances elsewhere.
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: 20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(sceneWrapperRef.current, {
        scale: 1.15,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden"
    >
      <div ref={sceneWrapperRef} className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Name & Title */}
          <div className="space-y-6">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
              <AnimatedName text={personalInfo.name} />
            </h1>

            <div className="space-y-4">
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground font-medium"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
              >
                {personalInfo.title}
              </motion.p>
              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
              >
                {personalInfo.tagline}
              </motion.p>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            <Button
              size="lg"
              className="group px-6 py-3 font-medium"
              onClick={scrollToContact}
            >
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group px-6 py-3 font-medium"
              asChild
            >
              <a href={ResumePDF} download="Siddhant_Gureja_Resume.pdf">
                Download CV
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4 pt-4"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 inline-block"
                aria-label={link.name}
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
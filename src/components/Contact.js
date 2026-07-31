import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { personalInfo, socialLinks } from '../mock';
import { ArrowDownLeft, Mail, Phone } from 'lucide-react';
import ContactScene from './ContactScene';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const useLocalTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
};

const initials = personalInfo.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2);

// Cursor-following "magnetic" button — the circle nudges toward the pointer
// while it's inside a radius around it, and springs back to center on leave.
const MagneticButton = ({ children, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

// Deliberately fixed dark colors (not the `background`/`foreground` theme
// tokens) — this section is meant to stay a dark, high-contrast close to the
// page regardless of whether the rest of the site is in light or dark mode.
const Contact = () => {
  const localTime = useLocalTime();
  const socialByName = (name) => socialLinks.find((l) => l.name.toLowerCase() === name.toLowerCase());
  const github = socialByName('GitHub');
  const linkedin = socialByName('LinkedIn');

  return (
    <footer id="contact" className="relative bg-neutral-950 text-white px-6 md:px-10 pt-20 pb-10 overflow-hidden">
      <ContactScene />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="flex items-start gap-5 mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
            className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-semibold flex-shrink-0"
          >
            {initials}
          </motion.div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[0.95] overflow-hidden">
            <motion.span className="block overflow-hidden">
              <motion.span variants={wordVariant} className="inline-block">
                Let&rsquo;s work
              </motion.span>
            </motion.span>
            <motion.span className="block overflow-hidden">
              <motion.span variants={wordVariant} className="inline-block">
                together
              </motion.span>
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          className="relative flex items-center border-t border-white/20 pt-8 md:pt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <MagneticButton
            href={`mailto:${personalInfo.email}`}
            className="ml-auto relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-indigo-500 text-white flex items-center justify-center text-center text-sm md:text-base font-medium flex-shrink-0"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-indigo-400/60"
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden="true"
            />
            Get in touch
          </MagneticButton>
          <motion.div
            className="hidden md:block absolute right-40 top-4 text-white/40"
            animate={{ y: [0, -6, 0], x: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDownLeft className="w-6 h-6" aria-hidden="true" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-10 md:mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-sm hover:bg-white/5 hover:border-white/50 transition-colors"
          >
            <Mail className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
            {personalInfo.email}
          </motion.a>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={`tel:${personalInfo.phone}`}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-sm hover:bg-white/5 hover:border-white/50 transition-colors"
          >
            <Phone className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
            {personalInfo.phone}
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-24 pt-8 border-t border-white/10 flex flex-wrap items-end justify-between gap-8 text-xs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="flex gap-10">
            <motion.div variants={fadeUp}>
              <p className="text-white/40 uppercase tracking-wide mb-1">Version</p>
              <p className="text-white/80">{new Date().getFullYear()} © Edition</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-white/40 uppercase tracking-wide mb-1">Local Time</p>
              <p className="text-white/80">{localTime} IST</p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <p className="text-white/40 uppercase tracking-wide mb-1 text-right">Socials</p>
            <div className="flex gap-4 justify-end">
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Github
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Contact;

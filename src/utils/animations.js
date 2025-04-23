import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element, delay = 0) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
  });
};

export const staggerFadeInUp = (elements, stagger = 0.2) => {
  return gsap.from(elements, {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
  });
};

export const scaleIn = (element, delay = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
  });
};

export const slideInLeft = (element, delay = 0) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
  });
};

export const slideInRight = (element, delay = 0) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
  });
};

export const parallaxScroll = (element, yPercent = 30) => {
  return gsap.to(element, {
    yPercent: -yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}; 
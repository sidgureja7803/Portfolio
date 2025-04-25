import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initSmoothScroll = () => {
  // Enable native smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Initialize GSAP ScrollTrigger
  ScrollTrigger.defaults({
    markers: false
  });

  // Refresh ScrollTrigger on page load
  ScrollTrigger.refresh();
};

export const scrollTo = (target) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (element) {
    const navbarHeight = 100; // Height of your fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const destroy = () => {
  // Remove smooth scrolling
  document.documentElement.style.scrollBehavior = 'auto';
  
  // Kill all GSAP animations and ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}; 
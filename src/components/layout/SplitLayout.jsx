import React from 'react';
import { motion } from 'framer-motion';

const SplitLayout = ({ 
  leftContent, 
  rightContent, 
  reverse = false,
  className = '',
  leftClassName = '',
  rightClassName = '',
  fullHeight = false,
}) => {
  return (
    <div className={`flex flex-col ${fullHeight ? 'min-h-screen' : ''} ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`w-full md:w-1/2 ${leftClassName}`}
      >
        {leftContent}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`w-full md:w-1/2 ${rightClassName}`}
      >
        {rightContent}
      </motion.div>
    </div>
  );
};

export default SplitLayout;

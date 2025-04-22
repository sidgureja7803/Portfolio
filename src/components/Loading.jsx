import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 2,
          rotate: {
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut"
          }
        }}
      >
        <div className="text-4xl font-bold text-gradient">Portfolio</div>
        <div className="absolute -top-3 -right-3 w-6 h-6">
          <motion.div 
            className="w-full h-full rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
        <motion.div 
          className="h-full bg-gradient"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
        />
      </div>
      
      <motion.div 
        className="text-gray-400 text-sm"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading assets... {Math.round(progress)}%
      </motion.div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                y: ["0%", "-50%", "0%"],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loading; 
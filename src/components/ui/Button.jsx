import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-accent-600 text-white hover:bg-accent-700',
  secondary: 'bg-primary-200 text-primary-800 hover:bg-primary-300 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700',
  outline: 'bg-transparent border border-accent-600 text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20',
  ghost: 'bg-transparent text-primary-700 hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800',
  link: 'bg-transparent text-accent-600 hover:underline p-0 h-auto',
};

const sizes = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
  xl: 'text-xl px-6 py-3',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    disabled: { opacity: 0.6 },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        inline-flex items-center justify-center rounded-md font-medium
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-accent-600
        ${className}
      `}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "disabled"}
      whileTap={!disabled && !loading ? "tap" : "disabled"}
      variants={buttonVariants}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && (
        <svg
          className={`animate-spin -ml-1 mr-2 h-4 w-4 ${
            variant === 'primary' ? 'text-white' : 'text-accent-600'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;

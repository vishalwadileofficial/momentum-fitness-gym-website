import React from 'react';
import { motion } from 'framer-motion';

// 1. Premium Loading Spinner
export const Spinner = ({
  size = 'md', // sm | md | lg | xl
  color = 'primary', // 'primary' | 'secondary' | 'white'
  className = '',
  ...props
}) => {
  const sizeMap = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-4',
  };

  const colorMap = {
    primary: 'border-t-primary border-primary/20',
    secondary: 'border-t-secondary border-secondary/20',
    white: 'border-t-white border-white/20',
  };

  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        className={`rounded-full border-solid ${sizeMap[size]} ${colorMap[color]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

// 2. Premium Shimmering Skeleton Loader
export const Skeleton = ({
  className = '',
  variant = 'rect', // 'rect' | 'circle' | 'text'
  ...props
}) => {
  const baseClasses = 'bg-gym-gray-800/80 overflow-hidden relative';
  
  const variants = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'h-4 rounded w-3/4 my-1.5',
  };

  // Shimmer pulse animation
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// 3. Full Screen Page Loader
export const PageLoader = ({
  text = 'MOMENTUM FITNESS',
  ...props
}) => {
  return (
    <div
      className="fixed inset-0 z-100 bg-gym-dark flex flex-col items-center justify-center gap-6"
      role="dialog"
      aria-modal="true"
      aria-label="Loading page"
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-24 h-24 rounded-full border border-dashed border-primary"
        />

        {/* Middle reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="absolute w-20 h-20 rounded-full border border-dotted border-secondary"
        />

        {/* Center core pulse */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)]"
        >
          <span className="font-display font-black text-gym-dark text-lg leading-none">M</span>
        </motion.div>
      </div>

      {/* Animated Text */}
      <div className="flex flex-col items-center gap-1.5">
        <motion.h2
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="font-display text-lg font-black tracking-widest text-white uppercase"
        >
          {text}
        </motion.h2>
        <span className="text-xs text-gym-gray-400 font-medium tracking-wider uppercase">Loading experience...</span>
      </div>
    </div>
  );
};

const Loader = {
  Spinner,
  Skeleton,
  Page: PageLoader,
};

export default Loader;

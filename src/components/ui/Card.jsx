import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  variant = 'glass', // 'glass' | 'solid' | 'neon'
  hoverable = false,
  onClick,
  ref,
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded-xl overflow-hidden border border-white/5 transition-all duration-300';
  
  // Style variations
  const variants = {
    glass: 'glass-card text-white',
    solid: 'bg-gym-gray-900 border-gym-gray-800 text-white',
    neon: 'glass-card border-t-2 border-t-primary text-white shadow-[0_0_15px_rgba(204,255,0,0.05)]',
  };

  // Hover styles (interactive animations)
  const hoverClasses = hoverable 
    ? 'cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)]' 
    : '';

  // framer-motion props for highly responsive micro-interactions
  const motionProps = hoverable ? {
    whileHover: { y: -6, scale: 1.01 },
    whileTap: onClick ? { scale: 0.99 } : {},
    transition: { type: 'spring', stiffness: 450, damping: 22 }
  } : {};

  return (
    <motion.div
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-6 pb-4 flex flex-col gap-1.5 ${className}`} {...props}>
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-display font-bold tracking-tight text-white ${className}`} {...props}>
    {children}
  </h3>
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gym-gray-400 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

CardDescription.displayName = 'CardDescription';

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

CardContent.displayName = 'CardContent';

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 border-t border-white/5 flex items-center justify-end gap-2 ${className}`} {...props}>
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';

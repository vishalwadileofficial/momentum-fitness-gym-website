import React from 'react';
import { motion } from 'framer-motion';

export const Card = React.forwardRef(({
  children,
  className = '',
  variant = 'glass', // 'glass' | 'solid' | 'neon'
  hoverable = false,
  onClick,
  ...props
}, ref) => {
  // Base classes
  let baseClasses = 'rounded-xl overflow-hidden border border-white/5 transition-all duration-300';
  
  // Style variations
  const variants = {
    glass: 'glass-card text-white',
    solid: 'bg-gym-gray-900 border-gym-gray-800 text-white',
    neon: 'glass-card border-t-2 border-t-primary border-r-white/5 border-b-white/5 border-l-white/5 text-white',
  };

  // Hover styles (interactive animations)
  const hoverClasses = hoverable 
    ? 'cursor-pointer hover:border-primary/20 hover:shadow-[0_0_30px_rgba(204,255,0,0.08)]' 
    : '';

  const Component = onClick ? motion.div : 'div';
  
  const motionProps = (onClick && hoverable) ? {
    whileHover: { y: -4, scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { type: 'spring', stiffness: 350, damping: 25 }
  } : {};

  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

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
  <p className={`text-sm text-gym-gray-400 ${className}`} {...props}>
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

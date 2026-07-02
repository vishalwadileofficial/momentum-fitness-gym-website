import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({
  children,
  id,
  className = '',
  bg = 'dark', // 'dark' | 'gray' | 'black' | 'transparent'
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  animate = true,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  ...props
}) => {
  // Background styles matching index.css colors
  const backgrounds = {
    dark: 'bg-gym-dark',
    gray: 'bg-gym-gray-900',
    black: 'bg-black',
    transparent: 'bg-transparent',
  };

  // Padding styles
  const paddings = {
    none: 'py-0',
    sm: 'py-8 sm:py-12',
    default: 'py-16 sm:py-24',
    lg: 'py-24 sm:py-36',
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // premium cubic-bezier easing
        delay: delay,
      },
    },
  };

  if (!animate) {
    return (
      <section
        id={id}
        className={`${backgrounds[bg]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      className={`${backgrounds[bg]} ${paddings[padding]} relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

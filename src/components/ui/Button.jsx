import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'primary', // primary | secondary | outline | text
  size = 'md',        // sm | md | lg | xl
  isLoading = false,
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Base classes for consistent focus styles, transitions, alignment
  const baseStyles = 'inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-colors duration-200 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  // Variant styles mapped to index.css variables
  const variants = {
    primary: 'bg-primary text-gym-dark hover:bg-primary-dark focus-visible:outline-primary shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]',
    secondary: 'bg-secondary text-gym-dark hover:brightness-110 focus-visible:outline-secondary shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]',
    outline: 'border-2 border-gym-gray-800 bg-transparent text-white hover:bg-gym-gray-800/50 hover:border-primary/50 focus-visible:outline-primary',
    text: 'bg-transparent text-white hover:text-primary focus-visible:outline-primary hover:bg-gym-gray-900/40 px-2!',
  };

  // Size styles
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
    xl: 'text-lg px-8 py-4.5 gap-3',
  };

  const isBtnDisabled = isDisabled || isLoading;

  // Animation variants for Framer Motion
  const motionProps = !isBtnDisabled ? {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  } : {};

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isBtnDisabled}
      onClick={onClick}
      aria-busy={isLoading}
      {...motionProps}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left Icon (if not loading) */}
      {!isLoading && leftIcon && (
        <span className="flex items-center pointer-events-none" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Button Text */}
      <span className="leading-none">{children}</span>

      {/* Right Icon */}
      {!isLoading && rightIcon && (
        <span className="flex items-center pointer-events-none" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

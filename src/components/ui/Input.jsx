import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = React.forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  wrapperClassName = '',
  id,
  required = false,
  floating = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const hasIconLeft = !!leftIcon;
  const hasIconRight = !!rightIcon;

  // Input states
  const borderClass = error
    ? 'border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10'
    : 'border-gym-gray-800 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${wrapperClassName}`}>
      {/* Standard Label (Non-floating) */}
      {label && !floating && (
        <label
          htmlFor={inputId}
          className="text-xs font-display font-semibold uppercase tracking-wider text-gym-gray-400 select-none"
        >
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className={`relative flex items-center bg-gym-gray-900/60 rounded-md border backdrop-blur-sm transition-all duration-200 ${borderClass}`}>
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center justify-center text-gym-gray-400 pointer-events-none" aria-hidden="true">
            {leftIcon}
          </div>
        )}

        {/* The actual Input element */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          className={`w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gym-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
            ${hasIconLeft ? 'pl-11' : ''}
            ${hasIconRight ? 'pr-11' : ''}
            ${floating ? 'pt-5 pb-1.5' : ''}
            ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
          {...props}
        />

        {/* Floating Label */}
        {label && floating && (
          <label
            htmlFor={inputId}
            className={`absolute left-4 top-1.5 text-[10px] font-display font-bold uppercase tracking-wider text-gym-gray-400 select-none transition-all duration-200 pointer-events-none
              ${hasIconLeft ? 'left-11' : ''}`}
          >
            {label} {required && <span className="text-primary">*</span>}
          </label>
        )}

        {/* Right Icon/Element */}
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center justify-center text-gym-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error and Helper texts with elegant Framer Motion entrance */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-red-500 font-medium"
            role="alert"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            id={helperId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gym-gray-400"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

import React from 'react';

const Container = React.forwardRef(({
  children,
  className = '',
  clean = false, // If true, removes paddings and only applies max-width/centering
  size = 'lg', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
  ...props
}, ref) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  const paddingClass = clean ? '' : 'px-4 sm:px-6 lg:px-8';

  return (
    <div
      ref={ref}
      className={`w-full mx-auto ${sizes[size]} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;

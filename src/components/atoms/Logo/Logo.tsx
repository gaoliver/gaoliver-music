import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'nav' | 'lg' | 'xl';
}

/**
 * The artwork is 2385x1821 (aspect ~1.31), far taller relative to its width
 * than the reference site's wordmark, so header usage is constrained by
 * height to sit inside the 88px shell header rather than by width.
 */
const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    nav: 'h-14 w-auto',
    lg: 'w-64',
    xl: 'w-80',
  };

  return (
    <img
      src="/images/Logo.png"
      alt="Oliver"
      className={`${sizeStyles[size]} opacity-90 ${className}`}
    />
  );
};

export default Logo;


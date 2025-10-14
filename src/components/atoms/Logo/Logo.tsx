import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'w-64',
    xl: 'w-80',
  };

  return (
    <img
      src="/images/Logo.png"
      alt="Oliver"
      className={`${sizeStyles[size]} ${size === 'sm' || size === 'md' ? 'w-auto' : ''} opacity-90 ${className}`}
    />
  );
};

export default Logo;


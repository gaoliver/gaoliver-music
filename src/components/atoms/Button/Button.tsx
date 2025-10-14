import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  as = 'button',
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition rounded-md';
  
  const variantStyles = {
    primary: 'bg-brand-accent text-black hover:opacity-90 shadow-soft',
    secondary: 'bg-white/5 border border-white/10 hover:bg-white/10',
    ghost: 'hover:text-brand-accent',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;


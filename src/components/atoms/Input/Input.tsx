import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  const baseStyles = 'rounded-md bg-white/5 border border-white/10 px-4 py-3 text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent w-full disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="w-full">
      {label && <label className="block text-sm mb-2 text-brand-text">{label}</label>}
      <input className={`${baseStyles} ${className}`} {...props} />
    </div>
  );
};

export default Input;


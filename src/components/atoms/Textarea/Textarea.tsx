import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  const baseStyles = 'rounded-md bg-white/5 border border-white/10 px-4 py-3 text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent w-full resize-none disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="w-full">
      {label && <label className="block text-sm mb-2 text-brand-text">{label}</label>}
      <textarea className={`${baseStyles} ${className}`} {...props} />
    </div>
  );
};

export default Textarea;


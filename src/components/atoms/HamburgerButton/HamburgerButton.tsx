import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span
        className={`h-0.5 w-6 bg-brand-text transition-all duration-300 ${
          isOpen ? 'translate-y-2 rotate-45' : ''
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-brand-text transition-all duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-brand-text transition-all duration-300 ${
          isOpen ? '-translate-y-2 -rotate-45' : ''
        }`}
      />
    </button>
  );
};

export default HamburgerButton;


import { forwardRef } from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controls: string;
}

const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(function HamburgerButton(
  { isOpen, onClick, controls },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-1.5 text-[var(--shell-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      <span
        className={`h-0.5 w-7 bg-current transition-all duration-300 motion-reduce:transition-none ${
          isOpen ? 'translate-y-2 rotate-45' : ''
        }`}
      />
      <span
        className={`h-0.5 w-7 bg-current transition-all duration-300 motion-reduce:transition-none ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`h-0.5 w-7 bg-current transition-all duration-300 motion-reduce:transition-none ${
          isOpen ? '-translate-y-2 -rotate-45' : ''
        }`}
      />
    </button>
  );
});

export default HamburgerButton;

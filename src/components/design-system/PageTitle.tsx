import type { ReactNode } from 'react';

export interface PageTitleProps {
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}

/**
 * Oversized centred route title floating over the shell backdrop.
 * Reference geometry, measured at 1280px: 80px top margin below the 88px
 * sticky header, 5rem/3.5rem uppercase at weight 700 with a 1.0 line-height,
 * then a 40svh visual pause before the content surface rises.
 */
export function PageTitle({ children, eyebrow, className = '' }: PageTitleProps) {
  return (
    <header
      className={`mx-auto w-full max-w-[var(--shell-content-width)] px-5 pb-[40svh] pt-20 text-center md:px-10 ${className}`}
    >
      {eyebrow && (
        <p className="mb-4 text-[13px] uppercase text-[var(--shell-muted)]">{eyebrow}</p>
      )}
      <h1 className="text-[clamp(3.5rem,8vw,5rem)] font-bold uppercase leading-none text-[var(--shell-text)]">
        {children}
      </h1>
    </header>
  );
}

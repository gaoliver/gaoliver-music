import type { ReactNode } from 'react';

export interface PageTitleProps {
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}

/**
 * Oversized centred route title floating over the shell backdrop.
 * Reference geometry: 5rem desktop / 3.5rem mobile, weight 700, uppercase,
 * followed by a ~40svh visual pause before the content surface rises.
 */
export function PageTitle({ children, eyebrow, className = '' }: PageTitleProps) {
  return (
    <header
      className={`mx-auto w-full max-w-[var(--shell-content-width)] px-5 pb-[clamp(6rem,40svh,28rem)] pt-[calc(var(--shell-header-height)+clamp(1rem,8svh,4rem))] text-center md:px-10 ${className}`}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-[var(--shell-muted-light)]">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[clamp(3.5rem,8vw,5rem)] font-bold uppercase leading-[1.05] text-[var(--shell-text)]">
        {children}
      </h1>
    </header>
  );
}

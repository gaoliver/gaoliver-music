import type { ReactNode } from 'react';

export interface PageTitleProps {
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}

export function PageTitle({ children, eyebrow, className = '' }: PageTitleProps) {
  return (
    <header className={`mx-auto w-full max-w-[1280px] px-5 pb-[clamp(6rem,40svh,28rem)] pt-[clamp(6rem,18svh,12rem)] md:px-10 ${className}`}>
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>}
      <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">{children}</h1>
    </header>
  );
}

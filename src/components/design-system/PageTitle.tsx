import type { ReactNode } from 'react';
import BackgroundMedia from '../media/BackgroundMedia';

export interface PageTitleProps {
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export function PageTitle({
  children,
  eyebrow,
  className = '',
  backgroundImage,
  backgroundImageAlt,
}: PageTitleProps) {
  return (
    <header
      className={`relative isolate mx-auto w-full max-w-[1280px] overflow-hidden px-5 pb-[clamp(6rem,40svh,28rem)] pt-[calc(var(--shell-header-height)+clamp(1rem,8svh,4rem))] md:px-10 ${className}`}
    >
      {backgroundImage && (
        <BackgroundMedia image={backgroundImage} imageAlt={backgroundImageAlt ?? ''} className="-z-10" />
      )}
      <div className="relative z-10">
        {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>}
        <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">{children}</h1>
      </div>
    </header>
  );
}

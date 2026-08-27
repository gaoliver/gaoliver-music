import type { HTMLAttributes, ReactNode } from 'react';

export interface PageContentSurfaceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function PageContentSurface({ children, className = '', ...props }: PageContentSurfaceProps) {
  return (
    <section className={`relative isolate overflow-hidden bg-black shadow-[0_-5rem_6rem_3rem_rgba(0,0,0,0.92)] before:pointer-events-none before:absolute before:inset-x-0 before:-top-32 before:h-40 before:bg-gradient-to-t before:from-black before:to-transparent ${className}`} {...props}>
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-12 md:px-10 md:py-20">{children}</div>
    </section>
  );
}

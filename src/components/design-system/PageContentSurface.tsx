import type { HTMLAttributes, ReactNode } from 'react';

export interface PageContentSurfaceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/**
 * Opaque content plane rising over the shell backdrop. The very wide, soft
 * shadow reproduces the reference site's deep fade where the surface meets
 * the background media.
 */
export function PageContentSurface({ children, className = '', ...props }: PageContentSurfaceProps) {
  return (
    <section
      className={`relative flex-1 bg-[var(--shell-bg)] shadow-surface ${className}`}
      {...props}
    >
      <div className="relative mx-auto w-full max-w-[var(--shell-content-width)] px-5 pb-20 md:px-10">
        {children}
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';

export interface PageSectionProps {
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function PageSection({ title, children, action, className = '' }: PageSectionProps) {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <div className="mb-5 flex items-end justify-between gap-6">
        <h2 className="text-2xl font-bold uppercase leading-none text-white md:text-3xl">{title}</h2>
        {action && <div className="shrink-0 text-base uppercase text-[var(--shell-muted)]">{action}</div>}
      </div>
      {children}
    </section>
  );
}

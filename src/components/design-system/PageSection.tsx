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
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-white/15 pb-4">
        <h2 className="text-2xl font-bold uppercase leading-none tracking-tight text-white md:text-3xl">{title}</h2>
        {action && <div className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 [&_a]:underline [&_a]:underline-offset-4">{action}</div>}
      </div>
      {children}
    </section>
  );
}

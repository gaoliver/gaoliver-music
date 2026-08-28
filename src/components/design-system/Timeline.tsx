import type { ReactNode } from 'react';

export interface TimelineItem { year: ReactNode; title?: ReactNode; children: ReactNode; }
export function Timeline({ items, className = '' }: { items: TimelineItem[]; className?: string }) {
  return <ol className={`relative ml-3 border-l border-white/20 ${className}`}>
    {items.map((item, index) => <li key={index} className="relative pb-10 pl-8 last:pb-0">
      <span aria-hidden="true" className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-[var(--shell-accent)] ring-4 ring-black" />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--shell-accent-hover)]">{item.year}</p>
      {item.title && <h3 className="mt-2 text-xl font-bold uppercase text-white">{item.title}</h3>}
      <div className="mt-2 text-sm leading-relaxed text-white/70">{item.children}</div>
    </li>)}
  </ol>;
}

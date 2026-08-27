import type { ReactNode } from 'react';

export interface FeaturedTileProps {
  image: string;
  imageAlt?: string;
  title: ReactNode;
  description?: ReactNode;
  date?: ReactNode;
  href?: string;
  className?: string;
}

export function FeaturedTile({ image, imageAlt = '', title, description, date, href, className = '' }: FeaturedTileProps) {
  const content = <>
    <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none" />
    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
    <span className="relative mt-auto block p-5 md:p-6">
      {date && <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-white/65">{date}</span>}
      <span className="block text-xl font-bold uppercase leading-tight text-white md:text-2xl">{title}</span>
      {description && <span className="mt-2 block max-w-xl text-sm leading-relaxed text-white/75">{description}</span>}
    </span>
  </>;
  const classes = `group relative flex min-h-[18rem] overflow-hidden bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--shell-accent-hover)] ${className}`;
  return href ? <a href={href} className={classes}>{content}</a> : <article className={classes}>{content}</article>;
}

import React from 'react';
import ReleaseCard from '../../molecules/ReleaseCard';
import type { CTA } from '../../../types/cta';

interface Release {
  id: string;
  title: string;
  type: string;
  year: string;
  cover: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    other?: string;
  };
  featured?: boolean;
}

interface ReleasesProps {
  releases: Release[];
  viewAllCta?: CTA;
  detailBasePath?: string;
  /** Section heading. Omit on the releases route, where the page title already says it. */
  title?: string;
}

const Releases: React.FC<ReleasesProps> = ({ releases, viewAllCta, detailBasePath, title }) => {
  const isExternalLink = viewAllCta?.url && (viewAllCta.url.startsWith('http://') || viewAllCta.url.startsWith('https://'));
  
  return (
    <section id="releases" className="pt-12 pb-12">
      <div>
        {(title || (viewAllCta && viewAllCta.isActive)) && (
          <div className="mb-5 flex items-end justify-between gap-6">
            {title && (
              <h2 className="text-2xl font-bold uppercase leading-none text-white md:text-3xl">
                {title}
              </h2>
            )}
            {viewAllCta && viewAllCta.isActive && (
              <a
                href={viewAllCta.url}
                className="shrink-0 text-base uppercase text-[var(--shell-muted)] transition-colors hover:text-brand-accentHover"
                target={isExternalLink ? '_blank' : undefined}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
              >
                {viewAllCta.label}
              </a>
            )}
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <ReleaseCard
              key={release.id}
              title={release.title}
              type={release.type}
              year={release.year}
              cover={release.cover}
              links={release.links}
              detailUrl={detailBasePath ? `${detailBasePath}/${release.id}` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Releases;

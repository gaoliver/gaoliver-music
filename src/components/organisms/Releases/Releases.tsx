import React from 'react';
import ReleaseCard from '../../molecules/ReleaseCard';
import type { CTA } from '../../../types/cta';

interface Album {
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
  albums: Album[];
  viewAllCta?: CTA;
  detailBasePath?: string;
  /** Section heading. Omit on the releases route, where the page title already says it. */
  title?: string;
}

const Releases: React.FC<ReleasesProps> = ({ albums, viewAllCta, detailBasePath, title }) => {
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
          {albums.map((album) => (
            <ReleaseCard
              key={album.id}
              title={album.title}
              type={album.type}
              year={album.year}
              cover={album.cover}
              links={album.links}
              detailUrl={detailBasePath ? `${detailBasePath}/${album.id}` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Releases;

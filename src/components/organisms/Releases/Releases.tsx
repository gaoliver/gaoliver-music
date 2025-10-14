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
}

const Releases: React.FC<ReleasesProps> = ({ releases, viewAllCta }) => {
  const isExternalLink = viewAllCta?.url && (viewAllCta.url.startsWith('http://') || viewAllCta.url.startsWith('https://'));
  
  return (
    <section id="releases" className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-title text-3xl md:text-4xl">Releases</h2>
          {viewAllCta && viewAllCta.isActive && (
            <a 
              href={viewAllCta.url} 
              className="text-sm text-brand-muted hover:text-brand-accent transition"
              target={isExternalLink ? '_blank' : undefined}
              rel={isExternalLink ? 'noopener noreferrer' : undefined}
            >
              {viewAllCta.label}
            </a>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <ReleaseCard
              key={release.id}
              title={release.title}
              type={release.type}
              year={release.year}
              cover={release.cover}
              links={release.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Releases;


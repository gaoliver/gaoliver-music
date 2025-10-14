import React from 'react';
import ReleaseCard from '../../molecules/ReleaseCard';

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
  };
  featured?: boolean;
}

interface ReleasesProps {
  releases: Release[];
}

const Releases: React.FC<ReleasesProps> = ({ releases }) => {
  // Filter out featured release for the main grid
  const gridReleases = releases.filter((release) => !release.featured);

  return (
    <section id="releases" className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-title text-3xl md:text-4xl">Releases</h2>
          <a href="#" className="text-sm text-brand-muted hover:text-brand-accent transition">
            Ver tudo
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridReleases.map((release) => (
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


import React from 'react';
import Button from '../../atoms/Button';

interface ReleaseCardProps {
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
  newReleaseLabel?: string;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({
  title,
  type,
  year,
  cover,
  links,
  featured = false,
  newReleaseLabel = 'New Release',
}) => {
  if (featured) {
    return (
      <article className="rounded-2xl border border-white/10 bg-brand-bgAlt p-6 shadow-soft">
        <div
          className="aspect-square rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${cover})` }}
        />
        <div id="listen" className="pt-5">
          <h3 className="font-title text-2xl">
            {newReleaseLabel} — <span className="text-brand-accent">{title}</span>
          </h3>
          <p className="text-sm text-brand-muted">
            {type} — {year}
          </p>
          <div className="flex gap-3 pt-3">
            {links.spotify && (
              <Button variant="secondary" size="sm" as="a" href={links.spotify}>
                Spotify
              </Button>
            )}
            {links.appleMusic && (
              <Button variant="secondary" size="sm" as="a" href={links.appleMusic}>
                Apple Music
              </Button>
            )}
            {links.youtube && (
              <Button variant="secondary" size="sm" as="a" href={links.youtube}>
                YouTube
              </Button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-xl overflow-hidden border border-white/10 bg-brand-bgAlt shadow-soft">
      <div
        className="aspect-square bg-cover bg-center transition-transform group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-brand-muted">
          {type} • {year}
        </p>
        <div className="flex gap-3 pt-3">
          {links.spotify && (
            <Button variant="secondary" size="sm" as="a" href={links.spotify}>
              Spotify
            </Button>
          )}
          {links.youtube && (
            <Button variant="secondary" size="sm" as="a" href={links.youtube}>
              YouTube
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReleaseCard;


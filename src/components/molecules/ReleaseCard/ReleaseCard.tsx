import React from 'react';
import Button from '../../atoms/Button';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

interface ReleaseCardProps {
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
          <div className="flex flex-wrap gap-2 pt-3">
            {links.spotify && (
              <Button 
                variant="secondary" 
                size="sm" 
                as="a" 
                href={links.spotify}
                className="!px-4 !py-2.5 hover:bg-[#1DB954] hover:border-[#1DB954] transition-colors"
                aria-label="Listen on Spotify"
              >
                <FaSpotify size={20} />
              </Button>
            )}
            {links.appleMusic && (
              <Button 
                variant="secondary" 
                size="sm" 
                as="a" 
                href={links.appleMusic}
                className="!px-4 !py-2.5 hover:bg-white hover:text-black hover:border-white transition-colors"
                aria-label="Listen on Apple Music"
              >
                <FaApple size={20} />
              </Button>
            )}
            {links.youtube && (
              <Button 
                variant="secondary" 
                size="sm" 
                as="a" 
                href={links.youtube}
                className="!px-4 !py-2.5 hover:bg-[#FF0000] hover:border-[#FF0000] transition-colors"
                aria-label="Watch on YouTube"
              >
                <FaYoutube size={20} />
              </Button>
            )}
            {links.other && (
              <Button 
                variant="secondary" 
                size="sm" 
                as="a" 
                href={links.other}
                className="!px-4 !py-2.5 hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-colors"
                aria-label="More streaming options"
              >
                <HiDotsHorizontal size={22} />
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
        <div className="flex flex-wrap gap-2 pt-3">
          {links.spotify && (
            <Button 
              variant="secondary" 
              size="sm" 
              as="a" 
              href={links.spotify}
              className="!px-4 !py-2.5 hover:bg-[#1DB954] hover:border-[#1DB954] transition-colors"
              aria-label="Listen on Spotify"
            >
              <FaSpotify size={20} />
            </Button>
          )}
          {links.appleMusic && (
            <Button 
              variant="secondary" 
              size="sm" 
              as="a" 
              href={links.appleMusic}
              className="!px-4 !py-2.5 hover:bg-white hover:text-black hover:border-white transition-colors"
              aria-label="Listen on Apple Music"
            >
              <FaApple size={20} />
            </Button>
          )}
          {links.youtube && (
            <Button 
              variant="secondary" 
              size="sm" 
              as="a" 
              href={links.youtube}
              className="!px-4 !py-2.5 hover:bg-[#FF0000] hover:border-[#FF0000] transition-colors"
              aria-label="Watch on YouTube"
            >
              <FaYoutube size={20} />
            </Button>
          )}
          {links.other && (
            <Button 
              variant="secondary" 
              size="sm" 
              as="a" 
              href={links.other}
              className="!px-4 !py-2.5 hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-colors"
              aria-label="More streaming options"
            >
              <HiDotsHorizontal size={22} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReleaseCard;


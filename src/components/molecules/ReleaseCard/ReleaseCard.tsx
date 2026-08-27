import React from 'react';
import Button from '../../atoms/Button';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';

export interface ReleaseCardProps {
  title: string;
  type: string;
  year: string;
  cover: string;
  videoId?: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    other?: string;
  };
  featured?: boolean;
  newReleaseLabel?: string;
  detailUrl?: string;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({
  title,
  type,
  year,
  cover,
  videoId,
  links,
  featured = false,
  newReleaseLabel = 'New Release',
  detailUrl,
}) => {
  if (featured) {
    return (
      <article className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="aspect-square rounded-xl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
        <div
          className="aspect-square rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${cover})` }}
        />
        )}
        <div id="listen" className="pt-5">
          <h3 className="font-title text-2xl">
            {newReleaseLabel} — <span className="text-brand-accent">{detailUrl ? <Link to={detailUrl}>{title}</Link> : title}</span>
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
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
      <div
        className="aspect-square bg-cover bg-center transition-transform group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {detailUrl ? <Link to={detailUrl} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent">{title}</Link> : title}
        </h3>
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

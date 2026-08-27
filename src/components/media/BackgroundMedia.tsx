import { useEffect, useState } from 'react';

export interface BackgroundMediaProps {
  image: string;
  imageSources?: Array<{
    srcSet: string;
    media?: string;
    type?: string;
  }>;
  imageAlt?: string;
  video?: string;
  videoSources?: Array<{
    src: string;
    media?: string;
    type?: string;
  }>;
  poster?: string;
  overlay?: string;
  className?: string;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia(REDUCED_MOTION_QUERY).matches
  ));

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

/** Decorative, non-interactive media for the site shell. */
export default function BackgroundMedia({
  image,
  imageSources = [],
  imageAlt = '',
  video,
  videoSources = [],
  poster,
  overlay,
  className = '',
}: BackgroundMediaProps) {
  const reducedMotion = useReducedMotion();
  const [videoAvailable, setVideoAvailable] = useState(Boolean(video));
  const shouldRenderVideo = Boolean(video && !reducedMotion && videoAvailable);

  return (
    <div className={`background-media ${className}`.trim()} aria-hidden="true">
      <picture>
        {imageSources.map((source) => (
          <source
            key={`${source.media ?? 'default'}-${source.srcSet}`}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
          />
        ))}
        <img
          className="background-media__image"
          src={poster || image}
          alt={imageAlt}
          draggable={false}
        />
      </picture>
      {shouldRenderVideo && (
        <video
          className="background-media__video"
          poster={poster || image}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoAvailable(false)}
        >
          {videoSources.map((source) => (
            <source
              key={`${source.media ?? 'default'}-${source.src}`}
              src={source.src}
              media={source.media}
              type={source.type}
            />
          ))}
          <source src={video} />
        </video>
      )}
      <div
        className="background-media__overlay"
        style={overlay ? { background: overlay } : undefined}
      />
    </div>
  );
}

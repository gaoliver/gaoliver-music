import React from 'react';
import Logo from '../../atoms/Logo';
import Button from '../../atoms/Button';
import ReleaseCard from '../../molecules/ReleaseCard';
import type { CTA } from '../../../types/cta';

interface Release {
  title: string;
  type: string;
  year: string;
  cover: string;
  newReleaseLabel?: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    other?: string;
  };
}

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaPrimary: CTA;
  ctaSecondary: CTA;
  featuredRelease: Release;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaPrimary,
  ctaSecondary,
  featuredRelease,
}) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      {/* Radial Vignette Overlay - Complete black at all edges, larger transparent center */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_15%,_rgba(18,18,18,0.8)_40%,_rgba(18,18,18,1)_75%)]" />
      {/* Top and Bottom Black Gradient */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,_rgba(18,18,18,1)_0%,_transparent_20%,_transparent_80%,_rgba(18,18,18,1)_100%)]" />
      {/* Accent Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_rgba(228,91,102,0.12)_0%,_transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Logo size="lg" className="md:w-80" />
            <h1 className="font-title text-4xl md:text-5xl tracking-wide">{title}</h1>
            <p className="text-brand-muted max-w-xl">{subtitle}</p>
            <div className="flex flex-wrap items-center gap-3">
              {ctaPrimary.isActive && (
                <Button variant="primary" as="a" href={ctaPrimary.url}>
                  {ctaPrimary.label}
                </Button>
              )}
              {ctaSecondary.isActive && (
                <Button variant="secondary" as="a" href={ctaSecondary.url}>
                  {ctaSecondary.label}
                </Button>
              )}
            </div>
          </div>
          <div>
            <ReleaseCard
              title={featuredRelease.title}
              type={featuredRelease.type}
              year={featuredRelease.year}
              cover={featuredRelease.cover}
              links={featuredRelease.links}
              featured={true}
              newReleaseLabel={featuredRelease.newReleaseLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


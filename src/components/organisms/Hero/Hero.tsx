import React from 'react';
import Logo from '../../atoms/Logo';
import Button from '../../atoms/Button';
import SocialLinks from '../../molecules/SocialLinks';
import ReleaseCard from '../../molecules/ReleaseCard';

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
  };
}

interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  socialLinks: SocialLink[];
  featuredRelease: Release;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  socialLinks,
  featuredRelease,
}) => {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(228,91,102,0.10)_0%,_transparent_55%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Logo size="lg" className="md:w-80" />
            <h1 className="font-title text-4xl md:text-5xl tracking-wide">{title}</h1>
            <p className="text-brand-muted max-w-xl">{subtitle}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" as="a" href="#listen">
                {ctaPrimary}
              </Button>
              <Button variant="secondary" as="a" href="#releases">
                {ctaSecondary}
              </Button>
            </div>
            <SocialLinks links={socialLinks} withDividers={true} />
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


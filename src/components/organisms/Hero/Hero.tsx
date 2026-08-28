import React from "react";
import Logo from "../../atoms/Logo";
import Button from "../../atoms/Button";
import ReleaseCard from "../../molecules/ReleaseCard";
import type { CTA } from "../../../types/cta";
import type { ReleaseCardProps } from "../../molecules/ReleaseCard/ReleaseCard";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: CTA;
  ctaSecondary: CTA;
  featuredRelease?: ReleaseCardProps & { id: string };
}

/**
 * Content-only hero. The homepage backdrop (image or video) is owned by the
 * site shell, so this component paints no background of its own.
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  featuredRelease,
}) => {
  return (
    <section
      id="home"
      className="relative flex flex-1 items-center overflow-hidden py-4"
    >
      <div className="container md:max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 md:gap-40 gap-10 items-center">
          <div className="space-y-6 text-center">
            <Logo size="lg" className="md:w-80 mx-auto translate-x-[-10px]" />
            <h1 className="font-title text-4xl md:text-5xl tracking-wide">
              {title}
            </h1>
            <p className="text-brand-muted max-w-xl">{subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
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
          {/* Capped so the hero still fits one screen alongside the shell. */}
          <div className="mx-auto w-full max-w-[26rem]">
            {featuredRelease ? (
              <ReleaseCard
                title={featuredRelease.title}
                type={featuredRelease.type}
                year={featuredRelease.year}
                cover={featuredRelease.cover}
                videoId={featuredRelease.videoId}
                links={featuredRelease.links}
                featured={true}
                newReleaseLabel={featuredRelease.newReleaseLabel}
                detailUrl={`/releases/${featuredRelease.id}`}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

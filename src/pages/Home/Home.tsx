import React from 'react';
import { Link } from 'react-router';
import Hero from '../../components/organisms/Hero';
import Releases from '../../components/organisms/Releases';
import { PageContentSurface, PageSection } from '../../components/design-system';
import MainLayout from '../../templates/MainLayout';
import { aboutContent, contactContent, homeContent, releaseCatalog } from '../../data';
import { SITE_URL } from '../../lib/seo';

const Home: React.FC = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const featuredRelease = releaseCatalog.releases.find((release) => release.featured);

  const musicGroupStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'G.A. Oliver',
    url: SITE_URL,
  };

  return (
    <MainLayout onNavClick={handleNavClick}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupStructuredData) }}
      />
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        backgroundImage={homeContent.hero.backgroundImage}
        ctaPrimary={homeContent.hero.ctaPrimary}
        ctaSecondary={homeContent.hero.ctaSecondary}
        featuredRelease={featuredRelease}
      />
      <PageContentSurface aria-label="G.A. Oliver highlights">
        <PageSection title={aboutContent.title}>
          <div className="max-w-3xl">
            <p className="mb-6 text-[var(--shell-muted-light)]">{homeContent.about.summary}</p>
            <Link to="/about" className="inline-flex rounded-md bg-brand-accent px-5 py-3 font-semibold text-black">
              {homeContent.about.cta.label}
            </Link>
          </div>
        </PageSection>
        <Releases
          releases={releaseCatalog.releases}
          viewAllCta={homeContent.releases.cta}
          title={homeContent.releases.sectionTitle}
        />
        <PageSection title={contactContent.title}>
          <div className="max-w-3xl">
            <p className="mb-6 text-[var(--shell-muted-light)]">{contactContent.description}</p>
            <Link to="/contact" className="inline-flex rounded-md bg-brand-accent px-5 py-3 font-semibold text-black">
              Send a message
            </Link>
          </div>
        </PageSection>
      </PageContentSurface>
    </MainLayout>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router';
import Hero from '../../components/organisms/Hero';
import Releases from '../../components/organisms/Releases';
import Divider from '../../components/atoms/Divider';
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
      <Divider />
      <section id="about" className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="mb-4 font-title text-3xl md:text-4xl">{aboutContent.title}</h2>
          <p className="mb-6 text-brand-muted">{homeContent.about.summary}</p>
          <Link to="/about" className="inline-flex rounded-md bg-brand-accent px-5 py-3 font-semibold text-black">
            {homeContent.about.cta.label}
          </Link>
        </div>
      </section>
      <Divider />
      <Releases 
        releases={releaseCatalog.releases}
        viewAllCta={homeContent.releases.cta}
      />
      <Divider />
      <section id="contact" className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="mb-4 font-title text-3xl md:text-4xl">{contactContent.title}</h2>
          <p className="mb-6 text-brand-muted">{contactContent.description}</p>
          <Link to="/contact" className="inline-flex rounded-md bg-brand-accent px-5 py-3 font-semibold text-black">
            Send a message
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

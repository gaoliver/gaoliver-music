import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/organisms/Hero';
import About from '../../components/organisms/About';
import Releases from '../../components/organisms/Releases';
import Divider from '../../components/atoms/Divider';
import MainLayout from '../../templates/MainLayout';
import { aboutContent, contactContent, homeContent, releaseCatalog } from '../../data';

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

  return (
    <MainLayout onNavClick={handleNavClick}>
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        backgroundImage={homeContent.hero.backgroundImage}
        ctaPrimary={homeContent.hero.ctaPrimary}
        ctaSecondary={homeContent.hero.ctaSecondary}
        featuredRelease={featuredRelease}
      />
      <Divider />
      <About
        title={aboutContent.title}
        description={aboutContent.description}
        details={aboutContent.details}
        image={aboutContent.image}
        backgroundImage={aboutContent.backgroundImage}
        lightContent={aboutContent.lightContent}
      />
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

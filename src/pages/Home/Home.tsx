import React from 'react';
import Hero from '../../components/organisms/Hero';
import About from '../../components/organisms/About';
import Releases from '../../components/organisms/Releases';
import Contact from '../../components/organisms/Contact';
import Divider from '../../components/atoms/Divider';
import MainLayout from '../../templates/MainLayout';
import siteData from '../../data/siteData.json';

const Home: React.FC = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const featuredRelease = siteData.releases.find((release) => release.featured);

  return (
    <MainLayout onNavClick={handleNavClick}>
      <Hero
        title={siteData.hero.title}
        subtitle={siteData.hero.subtitle}
        ctaPrimary={siteData.hero.ctaPrimary}
        ctaSecondary={siteData.hero.ctaSecondary}
        socialLinks={siteData.socialLinks}
        featuredRelease={featuredRelease!}
      />
      <Divider />
      <About
        title={siteData.about.title}
        description={siteData.about.description}
        details={siteData.about.details}
        image={siteData.about.image}
      />
      <Divider />
      <Releases releases={siteData.releases} />
      <Divider />
      <Contact
        title={siteData.contact.title}
        fields={siteData.contact.fields}
        submitText={siteData.contact.submitText}
      />
    </MainLayout>
  );
};

export default Home;


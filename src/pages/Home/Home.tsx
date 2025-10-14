import React from 'react';
import Hero from '../../components/organisms/Hero';
import About from '../../components/organisms/About';
import Releases from '../../components/organisms/Releases';
import Contact from '../../components/organisms/Contact';
import Divider from '../../components/atoms/Divider';
import MainLayout from '../../templates/MainLayout';
import siteData from '../../data/site.json';
import homeData from '../../data/home.json';
import aboutData from '../../data/about.json';
import releasesData from '../../data/releases.json';
import contactData from '../../data/contact.json';

const Home: React.FC = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const featuredRelease = releasesData.releases.find((release) => release.featured);

  return (
    <MainLayout onNavClick={handleNavClick}>
      <Hero
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        ctaPrimary={homeData.hero.ctaPrimary}
        ctaSecondary={homeData.hero.ctaSecondary}
        featuredRelease={featuredRelease!}
      />
      <Divider />
      <About
        title={aboutData.title}
        description={aboutData.description}
        details={aboutData.details}
        image={aboutData.image}
      />
      <Divider />
      <Releases 
        releases={releasesData.releases}
        viewAllCta={homeData.releases.cta}
      />
      <Divider />
      <Contact
        title={contactData.title}
        fields={contactData.form.fields}
        submitText={contactData.form.submitText}
      />
    </MainLayout>
  );
};

export default Home;


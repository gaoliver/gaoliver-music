import React from 'react';
import Hero from '../../components/organisms/Hero';
import MainLayout from '../../templates/MainLayout';
import { homeContent, albumCatalog } from '../../data';
import { albumVideoId } from '../../lib/discography';
import { SITE_URL } from '../../lib/seo';

const musicGroupStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'G.A. Oliver',
  url: SITE_URL,
};

/**
 * Like the reference site, the homepage is a single cinematic canvas: the
 * shell backdrop plus the hero. Everything else lives on its own route.
 */
const Home: React.FC = () => {
  const featuredAlbum = albumCatalog.albums.find((album) => album.featured);
  const featuredRelease = featuredAlbum ? { ...featuredAlbum, videoId: albumVideoId(featuredAlbum) } : undefined;

  return (
    <MainLayout background={homeContent.background}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupStructuredData) }}
      />
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        ctaPrimary={homeContent.hero.ctaPrimary}
        ctaSecondary={homeContent.hero.ctaSecondary}
        featuredRelease={featuredRelease}
      />
    </MainLayout>
  );
};

export default Home;

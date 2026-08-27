import type { MetaDescriptor } from 'react-router';
import type { ReleaseContent } from '../types/content';

export const SITE_URL = 'https://gaoliver-music.com';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.webp`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function releaseDescription(release: ReleaseContent): string {
  return `${release.title} is a ${release.year} ${release.type.toLowerCase()} by G.A. Oliver. Listen on the available streaming platforms.`;
}

export function releaseMeta(release: ReleaseContent): MetaDescriptor[] {
  const canonicalUrl = `${SITE_URL}/releases/${release.id}`;
  const description = releaseDescription(release);
  const image = absoluteUrl(release.cover);
  return [
    { title: `${release.title} | G.A. Oliver` },
    { name: 'description', content: description },
    { property: 'og:type', content: release.type.toLowerCase() === 'single' ? 'music.song' : 'music.album' },
    { property: 'og:title', content: release.title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: release.title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
}

export function pageMeta(
  title: string,
  description: string,
  path: string,
  image?: string,
): MetaDescriptor[] {
  const canonicalUrl = `${SITE_URL}${path}`;
  const socialImage = image ? absoluteUrl(image) : DEFAULT_SOCIAL_IMAGE;
  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: socialImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: socialImage },
  ];
}

export function releaseStructuredData(release: ReleaseContent) {
  const isSingle = release.type.toLowerCase() === 'single';
  return {
    '@context': 'https://schema.org',
    '@type': isSingle ? 'MusicRecording' : 'MusicAlbum',
    name: release.title,
    datePublished: release.year,
    image: absoluteUrl(release.cover),
    url: `${SITE_URL}/releases/${release.id}`,
    byArtist: {
      '@type': 'MusicGroup',
      name: 'G.A. Oliver',
      url: SITE_URL,
    },
    sameAs: Object.values(release.links).filter(Boolean),
  };
}

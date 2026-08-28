import type { MetaDescriptor } from "react-router";
import type { AlbumContent } from "../types/content";

export const SITE_URL = "https://gaoliver-music.com";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.webp`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function albumDescription(album: AlbumContent): string {
  return `${album.title} is a ${album.year} ${album.type.toLowerCase()} by G.A. Oliver. Listen on the available streaming platforms.`;
}

export function albumMeta(album: AlbumContent): MetaDescriptor[] {
  const canonicalUrl = `${SITE_URL}/releases/${album.id}`;
  const description = albumDescription(album);
  const image = absoluteUrl(album.cover);
  return [
    { title: `${album.title} | G.A. Oliver` },
    { name: "description", content: description },
    {
      property: "og:type",
      content:
        album.type.toLowerCase() === "single" ? "music.song" : "music.album",
    },
    { property: "og:title", content: album.title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: album.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
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
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: socialImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: socialImage },
  ];
}

export function albumStructuredData(album: AlbumContent) {
  const isSingle = album.type.toLowerCase() === "single";
  return {
    "@context": "https://schema.org",
    "@type": isSingle ? "MusicRecording" : "MusicAlbum",
    name: album.title,
    datePublished: album.year,
    image: absoluteUrl(album.cover),
    url: `${SITE_URL}/releases/${album.id}`,
    byArtist: {
      "@type": "MusicGroup",
      name: "G.A. Oliver",
      url: SITE_URL,
    },
    sameAs: Object.values(album.links).filter(Boolean),
    ...(isSingle
      ? {}
      : {
          track: album.songs?.map((song) => ({
            "@type": "MusicRecording",
            name: song.title,
          })),
        }),
  };
}

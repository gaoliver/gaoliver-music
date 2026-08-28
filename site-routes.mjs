import albumsData from "./src/data/albums.json" with { type: "json" };

export const STATIC_PUBLIC_PATHS = [
  "/",
  "/shows",
  "/about",
  "/about/story",
  "/about/timeline",
  "/releases",
  "/videos",
  "/lyrics",
  "/contact",
];
export const RELEASE_PATHS = albumsData.albums.map(
  (album) => `/releases/${album.id}`,
);
const songs = albumsData.albums.flatMap((album) => album.songs ?? []);
export const LYRICS_PATHS = songs
  ?.filter((song) => Array.isArray(song.lyrics) && song.lyrics.length > 0)
  .map((song) => `/lyrics/${song.id}`);

export const PRERENDER_PATHS = [
  ...STATIC_PUBLIC_PATHS,
  ...RELEASE_PATHS,
  ...LYRICS_PATHS,
  "/404",
];

/**
 * Placeholder lyrics are kept out of the sitemap so draft copy is not
 * submitted for indexing. Drop `lyricsDraft` once real lyrics land.
 */
const INDEXABLE_LYRICS_PATHS = songs
  .filter(
    (song) =>
      Array.isArray(song.lyrics) && song.lyrics.length > 0 && !song.lyricsDraft,
  )
  .map((song) => `/lyrics/${song.id}`);

export const SITEMAP_PATHS = [
  ...STATIC_PUBLIC_PATHS,
  ...RELEASE_PATHS,
  ...INDEXABLE_LYRICS_PATHS,
];

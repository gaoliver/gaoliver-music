import releasesData from './src/data/releases.json' with { type: 'json' };

export const STATIC_PUBLIC_PATHS = [
  '/',
  '/shows',
  '/about',
  '/about/story',
  '/about/timeline',
  '/releases',
  '/videos',
  '/lyrics',
  '/contact',
];
export const RELEASE_PATHS = releasesData.releases.map((release) => `/releases/${release.id}`);
export const LYRICS_PATHS = releasesData.releases
  .filter((release) => Array.isArray(release.lyrics) && release.lyrics.length > 0)
  .map((release) => `/lyrics/${release.id}`);

export const PRERENDER_PATHS = [...STATIC_PUBLIC_PATHS, ...RELEASE_PATHS, ...LYRICS_PATHS, '/404'];

/**
 * Placeholder lyrics are kept out of the sitemap so draft copy is not
 * submitted for indexing. Drop `lyricsDraft` once real lyrics land.
 */
const INDEXABLE_LYRICS_PATHS = releasesData.releases
  .filter((release) => Array.isArray(release.lyrics) && release.lyrics.length > 0 && !release.lyricsDraft)
  .map((release) => `/lyrics/${release.id}`);

export const SITEMAP_PATHS = [...STATIC_PUBLIC_PATHS, ...RELEASE_PATHS, ...INDEXABLE_LYRICS_PATHS];

import releasesData from './src/data/releases.json' with { type: 'json' };

export const STATIC_PUBLIC_PATHS = ['/', '/about', '/releases', '/contact'];
export const RELEASE_PATHS = releasesData.releases.map((release) => `/releases/${release.id}`);
export const PRERENDER_PATHS = [...STATIC_PUBLIC_PATHS, ...RELEASE_PATHS, '/404'];
export const SITEMAP_PATHS = [...STATIC_PUBLIC_PATHS, ...RELEASE_PATHS];

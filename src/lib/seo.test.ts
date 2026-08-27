import { describe, expect, it } from 'vitest';
import { releaseMeta, releaseStructuredData } from './seo';

const release = {
  id: 'long-title',
  title: 'A very long release title that remains readable and descriptive',
  type: 'Single',
  year: '2026',
  cover: '/images/cover.webp',
  links: {},
};

describe('release SEO', () => {
  it('derives metadata and structured data from the same release record', () => {
    expect(releaseMeta(release)).toContainEqual({ title: `${release.title} | G.A. Oliver` });
    expect(releaseStructuredData(release)).toMatchObject({
      '@type': 'MusicRecording',
      name: release.title,
      datePublished: release.year,
    });
  });
});

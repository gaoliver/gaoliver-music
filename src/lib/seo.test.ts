import { describe, expect, it } from 'vitest';
import { albumMeta, albumStructuredData } from './seo';

const singleAlbum = {
  id: 'long-title',
  title: 'A very long release title that remains readable and descriptive',
  type: 'Single',
  year: '2026',
  cover: '/images/cover.webp',
  links: {},
  songs: [{ id: 'long-title', title: 'A very long release title that remains readable and descriptive', composer: 'G.A. Oliver' }],
};

const epAlbum = {
  ...singleAlbum,
  id: 'ep-title',
  type: 'EP',
  songs: [
    { id: 'track-one', title: 'Track One', composer: 'G.A. Oliver' },
    { id: 'track-two', title: 'Track Two', composer: 'G.A. Oliver' },
  ],
};

describe('album SEO', () => {
  it('derives metadata and structured data from the same album record', () => {
    expect(albumMeta(singleAlbum)).toContainEqual({ title: `${singleAlbum.title} | G.A. Oliver` });
    expect(albumStructuredData(singleAlbum)).toMatchObject({
      '@type': 'MusicRecording',
      name: singleAlbum.title,
      datePublished: singleAlbum.year,
    });
  });

  it('lists tracks in structured data for multi-song releases', () => {
    expect(albumStructuredData(epAlbum)).toMatchObject({
      '@type': 'MusicAlbum',
      track: [{ '@type': 'MusicRecording', name: 'Track One' }, { '@type': 'MusicRecording', name: 'Track Two' }],
    });
  });
});

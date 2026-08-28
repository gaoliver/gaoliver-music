import { describe, expect, it } from 'vitest';
import { validateAlbumCatalog, validateSiteContent } from './content';

const baseSong = { id: 'song-one', title: 'Title', composer: 'G.A. Oliver' };
const baseAlbum = { id: 'same-id', title: 'Title', type: 'Single', year: '2026', cover: '/cover.webp', links: {}, songs: [baseSong] };

describe('content validation', () => {
  it('names the invalid JSON path in validation errors', () => {
    expect(() => validateSiteContent({ navigation: [] })).toThrow('src/data/site.json.meta');
  });

  it('rejects duplicate album identifiers', () => {
    expect(() => validateAlbumCatalog({ title: 'Discography', albums: [baseAlbum, { ...baseAlbum, songs: [{ ...baseSong, id: 'song-two' }] }] }))
      .toThrow('duplicate album id "same-id"');
  });

  it('rejects duplicate song identifiers across albums', () => {
    expect(() => validateAlbumCatalog({
      title: 'Discography',
      albums: [baseAlbum, { ...baseAlbum, id: 'other-album' }],
    })).toThrow('duplicate song id "song-one"');
  });

  it('rejects an album with no songs', () => {
    expect(() => validateAlbumCatalog({ title: 'Discography', albums: [{ ...baseAlbum, songs: [] }] }))
      .toThrow('.songs: expected a non-empty array');
  });
});

import { describe, expect, it } from 'vitest';
import { validateReleaseCatalog, validateSiteContent } from './content';

describe('content validation', () => {
  it('names the invalid JSON path in validation errors', () => {
    expect(() => validateSiteContent({ navigation: [] })).toThrow('src/data/site.json.meta');
  });

  it('rejects duplicate release identifiers', () => {
    const release = {
      id: 'same-id',
      title: 'Title',
      type: 'Single',
      year: '2026',
      cover: '/cover.webp',
      links: {},
    };
    expect(() => validateReleaseCatalog({ title: 'Releases', releases: [release, release] }))
      .toThrow('duplicate release id "same-id"');
  });
});

import { describe, expect, it } from 'vitest';
import {
  aboutContent,
  albumCatalog,
  contactContent,
  homeContent,
  siteContent,
  timelineContent,
} from './content';
import { PRERENDER_PATHS } from '../../site-routes.mjs';

/**
 * Every JSON document runs through a runtime validator at import time, so
 * simply importing the barrel proves the shipped content is well formed.
 * Without this, a validation failure only surfaced during prerendering.
 */
describe('site content', () => {
  it('validates every content document at import time', () => {
    expect(siteContent.navigation.length).toBeGreaterThan(0);
    expect(siteContent.backgroundImage).toBeTruthy();
    // background.image is intentionally optional here: leaving it unset (or
    // blank) means the homepage falls back to the site's shared backdrop,
    // resolved by MainLayout - see MainLayout.test.tsx.
    expect(homeContent.background.image === undefined || homeContent.background.image.length > 0).toBe(true);
    expect(aboutContent.summary).toBeTruthy();
    expect(contactContent.form.endpoint).toBeTruthy();
    expect(albumCatalog.albums.length).toBeGreaterThan(0);
    expect(timelineContent.entries.length).toBeGreaterThan(0);
  });

  it('points every navigation target at a prerendered route', () => {
    const targets = siteContent.navigation.flatMap((item) => [
      item.href,
      ...(item.submenu?.items.map((subItem) => subItem.href) ?? []),
    ]);

    targets.forEach((href) => {
      expect(PRERENDER_PATHS, `navigation target ${href} is not prerendered`).toContain(href);
    });
  });
});

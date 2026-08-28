import { expect, test } from '@playwright/test';
import releasesData from '../../src/data/releases.json' with { type: 'json' };

const routes = [
  { path: '/', heading: 'New Release' },
  { path: '/about', heading: 'About' },
  { path: '/releases', heading: 'Releases' },
  { path: '/contact', heading: 'Contact' },
];

for (const route of routes) {
  test(`${route.path} supports direct navigation and refresh`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
  });
}

for (const release of releasesData.releases) {
  test(`/releases/${release.id} is pre-rendered with release metadata`, async ({ page }) => {
    await page.goto(`/releases/${release.id}`);
    await expect(page.getByRole('heading', { level: 1, name: release.title })).toBeVisible();
    await expect(page).toHaveTitle(`${release.title} | G.A. Oliver`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://gaoliver-music.com/releases/${release.id}`,
    );
  });
}

test('an invalid release slug has a safe empty state', async ({ page }) => {
  await page.goto('/releases/not-a-release');
  await expect(page.getByRole('heading', { level: 1, name: 'Release not found' })).toBeVisible();
});

test('contact form lives on the contact page only', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form')).toHaveCount(0);
  await page.goto('/contact');
  await expect(page.locator('form')).toBeVisible();
});

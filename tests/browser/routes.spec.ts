import { expect, test } from '@playwright/test';

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

test('contact form lives on the contact page only', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form')).toHaveCount(0);
  await page.goto('/contact');
  await expect(page.locator('form')).toBeVisible();
});

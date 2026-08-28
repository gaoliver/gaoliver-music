import { test, expect } from '@playwright/test';

test('homepage preserves the protected hero and release layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'New Release' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Releases' })).toBeVisible();
  await expect(page.locator('#home')).toHaveScreenshot('protected-hero.png', {
    animations: 'disabled',
    mask: [page.locator('header')],
  });
  await expect(page.locator('#releases')).toHaveScreenshot('protected-releases.png', {
    animations: 'disabled',
  });
  expect(errors).toEqual([]);
});

test('mobile navigation fills the viewport and closes with Escape', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation is hidden on desktop');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();

  const dialog = page.locator('#site-mobile-menu');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('role', 'dialog');
  await expect(dialog).toHaveCSS('background-color', 'rgb(173, 14, 16)');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

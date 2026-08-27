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
  });
  await expect(page.locator('#releases')).toHaveScreenshot('protected-releases.png', {
    animations: 'disabled',
  });
  expect(errors).toEqual([]);
});

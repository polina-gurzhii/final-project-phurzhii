import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption('name,asc');
  await page.locator('[data-test="sort"]').selectOption('name,desc');
});
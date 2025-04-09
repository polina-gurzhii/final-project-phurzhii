import { test, expect } from '@playwright/test';

test('Verify user can view product details', async ({ page }) => {
  await page.goto(process.env.WEB_URL);
  await page.getByRole('heading', {name: 'Combination Pliers'}).click();

  await expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect (page.locator('[data-test="unit-price"]')).toContainText('14.15');
  const addToCartButtonLocator = page.locator('button[data-test="add-to-cart"]');
  await expect(addToCartButtonLocator).toBeVisible();
  const addToFavouritessButtonLocator = page.locator('button[data-test="add-to-favorites"]');
  await expect(addToFavouritessButtonLocator).toBeVisible();
});
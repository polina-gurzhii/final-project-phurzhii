import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText(['My account']);
  await expect(page.getByText('Jane Doe')).toBeVisible();
});

test('Verify user can view product details', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="product-01JQS85TMHWS2S3BKVGMESQ1QK"]').click();

  await expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect (page.locator('[data-test="unit-price"]')).toContainText('14.15');
  const addToCartButtonLocator = page.locator('button[data-test="add-to-cart"]');
  await expect(addToCartButtonLocator).toBeVisible();
  const addToFavouritessButtonLocator = page.locator('button[data-test="add-to-favorites"]');
  await expect(addToFavouritessButtonLocator).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('/');
});

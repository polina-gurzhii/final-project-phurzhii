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
  await page.getByRole('heading', {name: 'Combination Pliers'}).click();

  await expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect (page.locator('[data-test="unit-price"]')).toContainText('14.15');
  const addToCartButtonLocator = page.locator('button[data-test="add-to-cart"]');
  await expect(addToCartButtonLocator).toBeVisible();
  const addToFavouritessButtonLocator = page.locator('button[data-test="add-to-favorites"]');
  await expect(addToFavouritessButtonLocator).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('heading', {name: 'Slip Joint Pliers'}).click();
  await expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
  await expect (page.locator('[data-test="unit-price"]')).toContainText('9.17');

  await page.locator('[data-test="add-to-cart"]').click();
  const cartAlert = page.getByRole('alert');
  await expect (cartAlert).toBeVisible();
  await expect(cartAlert).toHaveText('Product added to shopping cart.');
  await expect(cartAlert).toBeHidden({ timeout: 8_000 });
  await expect (page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  

  await page.locator('[data-test="nav-cart"]').click();
  await expect(page).toHaveURL('/checkout');
  await expect (page.locator('[data-test="product-title"]')).toHaveCount(1);
  await expect (page.locator('[data-test="product-title"]')).toHaveText('Slip Joint Pliers');
  await expect (page.locator('[data-test="proceed-1"]')).toBeVisible();
  
});


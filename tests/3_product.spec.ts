import { test, expect } from '@playwright/test';

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto(process.env.WEB_URL);
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
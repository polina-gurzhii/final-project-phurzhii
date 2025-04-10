import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.navigate();
  await homePage.navigateToProduct('Combination Pliers');
  await productPage.verifyProductDetails('14.15');
});


import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.navigate();
  await homePage.navigateToProduct('Combination Pliers');
  await productPage.verifyProductDetails('14.15');
});


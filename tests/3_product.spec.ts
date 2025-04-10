import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.navigate();
  await homePage.navigateToProduct('Slip Joint Pliers');
  await productPage.verifyProductDetails('9.17');
  await productPage.addToCart();
  await productPage.verifyCartAlert();
  await productPage.verifyCartQuantity('1');
  await productPage.header.navigateToCart();
  await productPage.verifyCheckoutPage();
});
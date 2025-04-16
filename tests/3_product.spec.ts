import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { HeaderFragment } from '../fragments/HeaderFragment';


test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new HeaderFragment(page);

  await homePage.navigate();
  await homePage.navigateToProduct('Slip Joint Pliers');
  await productPage.verifyProductDetails('9.17');
  await productPage.addToCart();
  await productPage.verifyCartAlert();
  await homePage.header.expectCartVisible();
  await productPage.verifyCartQuantity('1');
  await productPage.header.navigateToCart();
  await productPage.verifyCheckoutPage();
});
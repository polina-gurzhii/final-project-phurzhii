import { test } from '../fixtures';

test('Verify user can add product to cart', async ({ homePage, productPage }) => {
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
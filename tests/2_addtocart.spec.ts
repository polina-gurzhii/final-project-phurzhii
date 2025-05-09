
import { test } from '../fixtures';

test('Verify user can view product details', async ({ homePage, productPage }) => {
  await homePage.navigate();
  await homePage.navigateToProduct('Combination Pliers');
  await productPage.verifyProductDetails('14.15');
});

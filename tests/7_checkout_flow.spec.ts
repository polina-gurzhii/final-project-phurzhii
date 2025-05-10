import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';

test('Verify successful checkout with logged in user', async ({ loggedInPage, productPage, cartPage, checkoutPage }) => {
  
  const firstProductNameHomePage = (await loggedInPage.getAllProductNames())[0];
  await loggedInPage.navigateToProduct(' Combination Pliers ');

  await expect(productPage.page).toHaveURL(/product/);

  const actualProductName = await productPage.productName.innerText();
  const actualProductPriceText = await productPage.unitPrice.innerText();
  const actualProductPrice = actualProductPriceText ? actualProductPriceText.replace('$', '') : '';

  await productPage.verifyProductDetails(actualProductPrice);
  await productPage.addToCart();
  await productPage.verifyCartAlert();
  await productPage.verifyCartQuantity('1');

  await loggedInPage.header.navigateToCart();
  await cartPage.verifyProductDetails(actualProductName, actualProductPrice);
  await cartPage.verifyTotalPrice(actualProductPrice);

  await cartPage.proceedToCheckout();

  const loginPageOnCheckout = new LoginPage(checkoutPage.page); 

  await loginPageOnCheckout.login();

  await checkoutPage.expectUserIsLoggedIn();
 
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expiryMonth = (currentMonth + 3) % 12 === 0 ? 12 : (currentMonth + 3) % 12;
  const expiryYear = currentYear + Math.floor((currentMonth + 3 - 1) / 12);
  const formattedExpiry = `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear)}`;


  await checkoutPage.fillBillingAddress(
    'Test street 98',
    'Vienna',
    'Some State', 
    'Austria',
    '1010',      
  );
  
  await checkoutPage.selectCreditCardPayment(
    '1111-1111-1111-1111',
    formattedExpiry,
    '111',
    'Any Name',
  );

  await checkoutPage.verifyPaymentSuccess();
});
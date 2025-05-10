import { test, expect } from '../fixtures';

test('Verify successful checkout with logged in user', async ({ loggedInPage, productPage, cartPage, checkoutPage }) => {
  
  const firstProductNameHomePage = (await loggedInPage.getAllProductNames())[0];
  console.log(firstProductNameHomePage);
  await loggedInPage.navigateToProduct(firstProductNameHomePage);

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

  // 4. Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
  await expect(checkoutPage.page).toHaveURL(new RegExp(`${process.env.WEB_URL}/checkout`));
 

  // 5. Ввести відсутні поля на сторінці Billing Address
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expiryMonth = (currentMonth + 3) % 12 === 0 ? 12 : (currentMonth + 3) % 12;
  const expiryYear = currentYear + Math.floor((currentMonth + 3 - 1) / 12);
  const formattedExpiry = `${String(expiryMonth).padStart(2, '0')}/${String(String(expiryYear).slice(-2))}`;

  await checkoutPage.fillBillingAddress(
    'Test street 98',
    'Vienna',
    'Some State', 
    'Austria',
    '1010',      
  );

  // 6. На наступній сторінці вибрати: Credit Card -> Card number: 1111-1111-1111-1111 -> Expiration Date: +3 місяці до дати запуску тесту -> CVV: 111 -> Card Holder Name: any name -> Confirm
  await checkoutPage.selectCreditCardPayment(
    '1111-1111-1111-1111',
    formattedExpiry,
    '111',
    'Any Name',
  );

  // 7. Перевірити, що платіж був успішним.
  await checkoutPage.verifyPaymentSuccess();
});
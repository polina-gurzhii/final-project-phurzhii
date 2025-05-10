import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postCodeInput: Locator;
  readonly proceedToCheckoutButton: Locator;


  readonly paymentMethodDropdown: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmPaymentButton: Locator;
  readonly paymentSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.streetInput = page.locator('[data-test="street"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countryInput = page.locator('[data-test="country"]');
    this.postCodeInput = page.locator('[data-test="postal_code"]');
    this.proceedToCheckoutButton = page.locator('[data-test="proceed-3"]');

    this.paymentMethodDropdown = page.locator('[data-test="payment-method"]');
    this.cardNumberInput = page.locator('[data-test="credit_card_number"]');
    this.expirationDateInput = page.locator('[data-test="expiration_date"]');
    this.cvvInput = page.locator('[data-test="cvv"]');
    this.cardHolderNameInput = page.locator('[data-test="card_holder_name"]');
    this.confirmPaymentButton = page.locator('[data-test="finish"]');
    this.paymentSuccessMessage = page.getByText('Payment was successful');
  }

  async fillBillingAddress(street: string, city: string, state: string, country: string, postCode: string): Promise<void> {
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countryInput.fill(country);
    await this.postCodeInput.fill(postCode);
    await this.proceedToCheckoutButton.click();
  }

  async selectCreditCardPayment(cardNumber: string, expirationDate: string, cvv: string, cardHolderName: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption('Credit Card'); 
    await this.cardNumberInput.fill(cardNumber);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);
    await this.cardHolderNameInput.fill(cardHolderName);
    await this.confirmPaymentButton.click();
  }

  async verifyPaymentSuccess(): Promise<void> {
    await expect(this.paymentSuccessMessage).toBeVisible();
  }
}
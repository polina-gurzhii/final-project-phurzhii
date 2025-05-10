import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly quantity: Locator;
  readonly totalPrice: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-title"]');
    this.unitPrice = page.locator('[data-test="product-price"]');
    this.quantity = page.locator('[data-test="product-quantity"]');
    this.totalPrice = page.locator('[data-test="line-price"]');
    this.proceedToCheckoutButton = page.locator('[data-test="proceed-1"]');
  }

  async verifyProductDetails(name: string, price: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
    await expect(this.unitPrice).toContainText(price);
  }

  async verifyTotalPrice(expectedTotalPrice: string): Promise<void> {
    await expect(this.totalPrice).toContainText(expectedTotalPrice);
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
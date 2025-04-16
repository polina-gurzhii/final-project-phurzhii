import { Page, Locator, expect } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';



export class ProductPage {
   page: Page;
   productName: Locator;
   unitPrice: Locator;
   addToCartButton: Locator;
   addToFavoritesButton: Locator;
   cartAlert: Locator;
   cartQuantity: Locator;
   productTitle: Locator;
   proceedButton: Locator;
   header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
    this.addToCartButton = page.locator('button[data-test="add-to-cart"]');
    this.addToFavoritesButton = page.locator('button[data-test="add-to-favorites"]');
    this.cartAlert = page.getByRole('alert');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.productTitle = page.locator('[data-test="product-title"]');
    this.proceedButton = page.locator('[data-test="proceed-1"]');
    this.header = new HeaderFragment(page);
  }

  async verifyProductDetails(price: string): Promise<void> {
    await expect(this.page.url()).toContain('/product');
    await expect(this.unitPrice).toContainText(price);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async verifyCartAlert(): Promise<void> {
    await expect(this.cartAlert).toBeVisible();
    await expect(this.cartAlert).toHaveText('Product added to shopping cart.');
    await expect(this.cartAlert).toBeHidden({ timeout: 8_000 });
  }

  async verifyCartQuantity(quantity: string): Promise<void> {
    await expect(this.cartQuantity).toHaveText(quantity);
  }

  async verifyCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout');
    await expect(this.productTitle).toHaveCount(1);
    await expect(this.productTitle).toHaveText('Slip Joint Pliers');
    await expect(this.proceedButton).toBeVisible();
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productName.allTextContents();
  }

  async waitForProductNames(): Promise<void> {
    await this.productName.waitFor();
  }
}
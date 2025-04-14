import { Page, Locator, expect } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="nav-cart"]');
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartVisible(): Promise<void> {
    await expect(this.cartLink).toBeVisible();
  }
}
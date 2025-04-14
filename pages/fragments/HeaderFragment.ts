import { Page, Locator } from '@playwright/test';

export class HeaderF {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="nav-cart"]');
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
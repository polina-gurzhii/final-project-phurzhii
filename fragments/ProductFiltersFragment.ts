import { Page, Locator } from '@playwright/test';
export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class ProductsFiltersFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  //async selectSortOption(optionText: string): Promise<void> {
    //await this.sortDropdown.selectOption({ label: optionText });
  //}

  async selectSortOption(option: SortOption): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?sort=')
        && response.status() === 200
        && response.request().method() === 'GET',
    );
    await this.sortDropdown.selectOption({ label: option });
    await responsePromise;
  }
  
  async filterByCategory(label: string): Promise<void> 
  {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?between=price,1,100&page=1')
      && response.status() === 200
      && response.request().method() === 'GET',
    );
    await this.page.getByRole('checkbox', { name: label }).check();
    await responsePromise;
  }

  async navigate(): Promise<void> {
    await Promise.all([
      this.page.goto(process.env.WEB_URL),
      this.page.waitForResponse(response => response.url().includes(process.env.WEB_URL) && response.status() === 200),
    ]);
  }

  async getProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }
}

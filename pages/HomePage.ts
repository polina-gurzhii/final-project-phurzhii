import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';
import { ProductsFiltersFragment } from '../fragments/ProductFiltersFragment';

export class HomePage {
   page: Page;
   header: HeaderFragment;
   filters: ProductsFiltersFragment;
   productName: Locator;
   productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.filters = new ProductsFiltersFragment(page);
    this.productName = page.locator('[data-test="product-name"]');
    this.productCards = page.locator('[data-test^="product-"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.WEB_URL);
  }

  /*async navigateToProduct(productName: string): Promise<void> {
    await this.page.getByRole('heading', { name: productName }).click();
  }*/

    async navigateToProduct(productName: string): Promise<void> {
      await this.page.locator('.card-body').locator('[data-test="product-name"]', { hasText: productName }).click(); // Замініть data-test="product-name" на фактичний атрибут
    }

  async getAllProductNames(): Promise<string[]> {
    return this.productName.allTextContents();
  }

}
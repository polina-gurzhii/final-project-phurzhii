import { Page, Locator, expect } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';
import { ProductsFiltersFragment } from '../fragments/ProductFiltersFragment';

export class HomePage {
   page: Page;
   header: HeaderFragment;
   filters: ProductsFiltersFragment;
   productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.filters = new ProductsFiltersFragment(page);
    this.productName = page.locator('[data-test="product-name"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.WEB_URL);
  }

  async navigateToProduct(productName: string): Promise<void> {
    await this.page.getByRole('heading', { name: productName }).click();
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productName.allTextContents();
  }
}
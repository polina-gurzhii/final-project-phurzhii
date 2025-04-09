import { Page, Locator, expect } from '@playwright/test';
import { HeaderF } from './header.fragment';
import { ProductsFiltersFragment } from './products.filters.fragment';

export class HomePage {
   page: Page;
   header: HeaderF;
   filters: ProductsFiltersFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderF(page);
    this.filters = new ProductsFiltersFragment(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.WEB_URL);
  }

  async navigateToProduct(productName: string): Promise<void> {
    await this.page.getByRole('heading', { name: productName }).click();
  }
}
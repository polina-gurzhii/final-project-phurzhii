import { Page, Locator } from '@playwright/test';

export class ProductsFiltersFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="sort"]');
  }

  async selectSortOption(optionText: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: optionText });
  }
  
  async filterByCategory(label: string): Promise<void> 
  {
    const checkbox = this.page.locator('label').filter({ hasText: label });
    await checkbox.click();
  }
}

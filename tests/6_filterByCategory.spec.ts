import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment } from '../pages/fragments/ProductFiltersFragment';

enum ProductCategory {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}
test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    const filters = new ProductsFiltersFragment(page);
    await homePage.navigate();
  
    await filters.filterByCategory(ProductCategory.PowerTools);
  
    await page.waitForSelector('[data-test="product-name"]');
    await page.waitForTimeout(1000);
  
    const productNames = await page.locator('[data-test="product-name"]').allTextContents();
 
    expect(productNames.some(name => name.toLowerCase().includes('sander'))).toBe(true);
  });
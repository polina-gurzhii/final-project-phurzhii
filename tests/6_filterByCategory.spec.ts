import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductsFiltersFragment } from '../pages/products.filters.fragment';

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
  
    const productNames = await page.locator('[data-test="product-name"]').allTextContents();
 
    const allProductsContainSander = productNames.every(name => name.includes('Sander'));
  
    expect(allProductsContainSander).toBe(true);
  });
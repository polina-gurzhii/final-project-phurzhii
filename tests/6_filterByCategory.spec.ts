import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment } from '../fragments/ProductFiltersFragment';


enum ProductCategory {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}
test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.filters.filterByCategory (ProductCategory.PowerTools);

  const productNames = await homePage.getAllProductNames();
  
  expect(productNames.some(name => name.toLowerCase().includes('sander')),
    `Search result: ${productNames}`
  ).toBe(true);
});
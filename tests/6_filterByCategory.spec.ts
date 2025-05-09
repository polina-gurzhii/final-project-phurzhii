import { test, expect } from '../fixtures';

enum ProductCategory {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}
test('Verify user can filter products by category', async ({ homePage }) => {
  await homePage.navigate();
  await homePage.filters.filterByCategory(ProductCategory.PowerTools);

  const productNames = await homePage.getAllProductNames();

  expect(productNames.some(name => name.toLowerCase().includes('sander')),
    //`Search result: ${productNames}`
  ).toBe(true);
});
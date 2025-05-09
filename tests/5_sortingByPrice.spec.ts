import { test, expect } from '../fixtures'; 

test.beforeEach(async ({ homePage }) => { 
  await homePage.navigate();
});

test('Sort by price ascending', async ({ homePage }) => {
  await homePage.filters.selectSortOption('Price (Low - High)');

  const productPrices = await homePage.filters.getProductPrices();

  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice >= previousPrice;
  });

  expect(isSorted).toBe(true);
});

test('Sort by price descending', async ({ homePage }) => {
  await homePage.filters.selectSortOption('Price (High - Low)');

  const productPrices = await homePage.filters.getProductPrices();

  const isSorted = productPrices.every((price, index, array) => {
    if (index === 0) return true;

    const currentPrice = price;
    const previousPrice = array[index - 1];

    return currentPrice <= previousPrice;
  });

  expect(isSorted).toBe(true);
});
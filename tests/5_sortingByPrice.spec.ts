import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';



test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
});


test('Sort by price ascending', async ({ page }) => {
    const homePage = new HomePage(page);
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

    test('Sort by price descending', async ({ page }) => {
        const homePage = new HomePage(page); 
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
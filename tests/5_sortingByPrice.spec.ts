import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment } from '../pages/fragments/ProductFiltersFragment';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
});


test('Sort by price ascending', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);

    await filters.selectSortOption('Price (Low - High)');
    await page.waitForTimeout(1000);


const productPrices = await page.locator('[data-test="product-price"]').allTextContents();
    const isSorted = productPrices.every((price, index, array) => {
        if (index === 0) return true;
    
        const currentPrice = price;
        const previousPrice = array[index - 1];
    
        return currentPrice >= previousPrice;
      });
    
      expect(isSorted).toBe(true);
    });

    test('Sort by price descending', async ({ page }) => {
        const filters = new ProductsFiltersFragment(page);
    
        await filters.selectSortOption('Price (High - Low)');
        await page.waitForTimeout(1000);
    
    
    const productPrices = await page.locator('[data-test="product-price"]').allTextContents();
        const isSorted = productPrices.every((price, index, array) => {
            if (index === 0) return true;
        
            const currentPrice = price;
            const previousPrice = array[index - 1];
        
            return currentPrice <= previousPrice;
          });
        
          expect(isSorted).toBe(true);
        });
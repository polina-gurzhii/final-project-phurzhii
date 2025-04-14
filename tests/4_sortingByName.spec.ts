import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment } from '../fragments/ProductFiltersFragment';



test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Sort by name ascending', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
  
    await filters.selectSortOption('Name (A - Z)');
    await page.waitForTimeout(1000);
  
    const productNames = await page.locator('[data-test="product-name"]').allTextContents();
  
    const isSorted = productNames.every((name, index) => {
      if (index === 0) return true;
  
      const previousName = productNames[index - 1];
      return name >= previousName;
    });
  
    expect(isSorted).toBe(true);
  });

  test('Sort by name descending', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
  
    await filters.selectSortOption('Name (Z - A)');
    await page.waitForTimeout(1000);
  
    const productNames = await page.locator('[data-test="product-name"]').allTextContents();
  
    const isSorted = productNames.every((name, index) => {
      if (index === 0) return true;
  
      const previousName = productNames[index - 1];
      return name <= previousName;
    });
  
    expect(isSorted).toBe(true);
  });
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsFiltersFragment, SortOption } from '../fragments/ProductFiltersFragment';
import { ProductPage } from '../pages/ProductPage';



test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Sort by name ascending', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    const productsList = new ProductPage(page);
  
    await filters.selectSortOption('Name (A - Z)');

  const productNames = await productsList.getAllProductNames();
  
    const isSorted = productNames.every((name, index) => {
      if (index === 0) return true;
  
      const previousName = productNames[index - 1];
      return name >= previousName;
    });
  
    expect(isSorted).toBe(true);
  });

  test('Sort by name descending', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    const productsList = new ProductPage(page);
  
    await filters.selectSortOption('Name (Z - A)');
    
    const productNames = await productsList.getAllProductNames();
  
    const isSorted = productNames.every((name, index) => {
      if (index === 0) return true;
  
      const previousName = productNames[index - 1];
      return name <= previousName;
    });
  
    expect(isSorted).toBe(true);
  });
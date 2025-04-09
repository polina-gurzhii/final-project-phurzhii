import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });
  
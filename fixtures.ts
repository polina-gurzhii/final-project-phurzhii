// fixtures.ts
import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from '@playwright/test';
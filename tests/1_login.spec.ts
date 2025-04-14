import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage (page);
  await page.goto(process.env.WEB_URL + '/auth/login');
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL((process.env.WEB_URL + '/account'));
  await loginPage.verifyPageTitle('My account');
  await expect(page.getByText(process.env.USER_NAME)).toBeVisible();
});



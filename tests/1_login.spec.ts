import { test, expect } from '../fixtures'; 

test('Verify login with valid credentials', async ({ page, loginPage }) => {
await page.goto(process.env.WEB_URL + '/auth/login');
await loginPage.login();
await expect(page).toHaveURL((process.env.WEB_URL + '/account'));
await loginPage.verifyPageTitle('My account');
await expect(page.getByText(process.env.USER_NAME)).toBeVisible();
});
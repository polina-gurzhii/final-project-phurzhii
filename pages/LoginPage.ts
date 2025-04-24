import { Locator, Page, expect } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';


export class LoginPage {
    page: Page;
    emailLocator: Locator;
    password: Locator;
    submitButton: Locator;
    header: HeaderFragment;
    pageTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailLocator = this.page.locator('[data-test="email"]');
        this.password = this.page.locator('[data-test="password"]');
        this.submitButton = this.page.locator('[data-test="login-submit"]');
        this.header = new HeaderFragment (page);
        this.pageTitle = page.locator('[data-test="page-title"]');
    }
async login(/*emailLocator: string, password: string*/): Promise<void> {
    await this.emailLocator.fill(process.env.USER_EMAIL!);
    await this.password.fill(process.env.USER_PASSWORD!);
    await this.submitButton.click();
}
async verifyPageTitle(expectedText: string) {
    await expect(this.pageTitle).toContainText([expectedText]);
  }
};
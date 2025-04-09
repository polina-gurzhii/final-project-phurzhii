import { Locator, Page } from '@playwright/test';
import { HeaderF } from './header.fragment';

export class LoginPage {
    page: Page;
    emailLocator: Locator;
    password: Locator;
    submitButton: Locator;
    header: HeaderF;

    constructor(page: Page){
        this.page = page;
        this.emailLocator = this.page.locator('[data-test="email"]');
        this.password = this.page.locator('[data-test="password"]');
        this.submitButton = this.page.locator('[data-test="login-submit"]');
        this.header = new HeaderF(page);
    }
async login(emailLocator: string, password: string): Promise<void> {
    await this.emailLocator.fill(process.env.USER_EMAIL);
    await this.password.fill(process.env.USER_PASSWORD!);
    await this.submitButton.click();
}
};
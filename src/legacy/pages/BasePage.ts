import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    readonly acceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptButton = page.locator('button:has-text("Consent")');
    }

    abstract goTo(): Promise<void>;

    async acceptCookiesIfVisible() {
        if (await this.acceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.acceptButton.click();
        }
    }
}

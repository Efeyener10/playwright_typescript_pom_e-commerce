import { expect, type Locator, type Page } from '@playwright/test';

/**
 * The top navigation bar exists on every page, so it is a component that page
 * objects own, not a page of its own. Data (like the username) is passed to
 * methods, never to the constructor.
 */
export class Header {
  readonly root: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    this.root = page.locator('#header');
    this.homeLink = this.root.getByRole('link', { name: 'Home' });
    this.productsLink = this.root.getByRole('link', { name: 'Products' });
    this.cartLink = this.root.getByRole('link', { name: 'Cart' });
    this.signupLoginLink = this.root.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = this.root.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = this.root.getByRole('link', { name: 'Delete Account' });
    this.contactUsLink = this.root.getByRole('link', { name: 'Contact us' });
    this.loggedInAs = this.root.getByRole('listitem').filter({ hasText: 'Logged in as' });
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.loggedInAs).toHaveText(`Logged in as ${name}`);
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.signupLoginLink).toBeVisible();
    await expect(this.loggedInAs).toBeHidden();
  }
}

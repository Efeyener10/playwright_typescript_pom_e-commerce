import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * The "Account Created!" and "Account Deleted!" confirmation pages share one
 * layout (heading + Continue), so one page object covers both.
 */
export class AccountStatusPage extends BasePage {
  protected readonly path = '/account_created';

  readonly createdHeading: Locator;
  readonly deletedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createdHeading = page.getByTestId('account-created');
    this.deletedHeading = page.getByTestId('account-deleted');
    this.continueButton = page.getByTestId('continue-button');
  }

  async expectCreated(): Promise<void> {
    await expect(this.page).toHaveURL('/account_created');
    await expect(this.createdHeading).toHaveText('Account Created!');
  }

  async expectDeleted(): Promise<void> {
    await expect(this.page).toHaveURL('/delete_account');
    await expect(this.deletedHeading).toHaveText('Account Deleted!');
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}

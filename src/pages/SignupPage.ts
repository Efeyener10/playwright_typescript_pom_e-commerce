import { expect, type Locator, type Page } from '@playwright/test';
import type { User } from '@data/types';
import { BasePage } from './BasePage';

/**
 * `/signup`: the "Enter Account Information" form shown after the first
 * signup step on `/login`. Name and email arrive pre-filled from that step.
 */
export class SignupPage extends BasePage {
  protected readonly path = '/signup';

  readonly heading: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly birthDay: Locator;
  readonly birthMonth: Locator;
  readonly birthYear: Locator;
  readonly newsletter: Locator;
  readonly specialOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.name = page.getByTestId('name');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.birthDay = page.getByTestId('days');
    this.birthMonth = page.getByTestId('months');
    this.birthYear = page.getByTestId('years');
    this.newsletter = page.getByLabel('Sign up for our newsletter!');
    this.specialOffers = page.getByLabel('Receive special offers from our partners!');
    this.firstName = page.getByTestId('first_name');
    this.lastName = page.getByTestId('last_name');
    this.company = page.getByTestId('company');
    this.address1 = page.getByTestId('address');
    this.address2 = page.getByTestId('address2');
    this.country = page.getByTestId('country');
    this.state = page.getByTestId('state');
    this.city = page.getByTestId('city');
    this.zipcode = page.getByTestId('zipcode');
    this.mobileNumber = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByTestId('create-account');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  /** Checks the values carried over from the first signup step. */
  async expectPrefilled(user: Pick<User, 'name' | 'email'>): Promise<void> {
    await expect(this.name).toHaveValue(user.name);
    await expect(this.email).toHaveValue(user.email);
    await expect(this.email).toBeDisabled();
  }

  async fillAccountInfo(user: User): Promise<void> {
    await this.page.getByLabel(`${user.title}.`, { exact: true }).check();
    await this.password.fill(user.password);
    await this.birthDay.selectOption(user.birthDay);
    await this.birthMonth.selectOption(user.birthMonth);
    await this.birthYear.selectOption(user.birthYear);
  }

  async setSubscriptions(options: { newsletter: boolean; specialOffers: boolean }): Promise<void> {
    await this.newsletter.setChecked(options.newsletter);
    await this.specialOffers.setChecked(options.specialOffers);
  }

  async fillAddress(user: User): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    await this.address2.fill(user.address2);
    await this.country.selectOption(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
  }

  /** Submitting is its own step, so a test can also check the form before submit. */
  async submit(): Promise<void> {
    await this.createAccountButton.click();
  }
}

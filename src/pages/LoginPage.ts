import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** The subset of the browser's ValidityState that the tests check. */
export interface FieldValidity {
  valid: boolean;
  valueMissing: boolean;
  typeMismatch: boolean;
}

/** `/login` holds two forms: "Login to your account" and "New User Signup!". */
export class LoginPage extends BasePage {
  protected readonly path = '/login';

  readonly loginHeading: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  readonly signupHeading: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupError: Locator;

  constructor(page: Page) {
    super(page);
    // `getByTestId` reads `data-qa` because of `testIdAttribute` in the config.
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmail = page.getByTestId('login-email');
    this.loginPassword = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.loginError = page.getByText('Your email or password is incorrect!');

    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.getByTestId('signup-name');
    this.signupEmail = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
    this.signupError = page.getByText('Email Address already exist!');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.signupHeading).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  /**
   * Reads the browser's built-in validation state of the login email field.
   * Checking these flags instead of the message text keeps the test
   * independent of the browser's language.
   */
  async loginEmailValidity(): Promise<FieldValidity> {
    return this.loginEmail.evaluate((input: HTMLInputElement) => ({
      valid: input.validity.valid,
      valueMissing: input.validity.valueMissing,
      typeMismatch: input.validity.typeMismatch,
    }));
  }
}

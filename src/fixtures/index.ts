import { test as base, expect } from '@playwright/test';
import { AutomationExerciseApi } from '@api/AutomationExerciseApi';
import { buildUser } from '@data/userFactory';
import type { User } from '@data/types';
import { AccountStatusPage } from '@pages/AccountStatusPage';
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';

/**
 * Third-party ad, tracking and consent scripts. Google "vignette" ads cover the
 * page and steal clicks, so tests block them at the network level. This also
 * makes runs faster and identical on every machine.
 */
const BLOCKED_HOSTS =
  /googlesyndication|doubleclick|googleadservices|google-analytics|googletagmanager|fundingchoicesmessages|adservice\.google|adtrafficquality/;

type Fixtures = {
  api: AutomationExerciseApi;
  /** A fresh account created through the API before the test and deleted after it. */
  registeredUser: User;
  /**
   * Call with a user a test creates itself (e.g. through the UI signup form).
   * The fixture deletes it via the API after the test, pass or fail.
   */
  cleanupUser: (user: User) => void;
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountStatusPage: AccountStatusPage;
};

export const test = base.extend<Fixtures>({
  // Override the built-in `context` fixture: every page in the test gets ad blocking.
  context: async ({ context }, use) => {
    await context.route(BLOCKED_HOSTS, (route) => route.abort());
    await use(context);
  },

  // Safety net: if a consent dialog ever appears, dismiss it whenever it blocks an action.
  page: async ({ page }, use) => {
    await page.addLocatorHandler(page.getByRole('button', { name: 'Consent' }), async (button) => {
      await button.click();
    });
    await use(page);
  },

  api: async ({ request }, use) => {
    await use(new AutomationExerciseApi(request));
  },

  registeredUser: async ({ api }, use) => {
    const user = buildUser();
    await api.registerUser(user);
    await use(user);
    // Teardown runs even when the test fails. A test may delete the account
    // itself (e.g. the "delete account" flow), so "not found" is fine here.
    const body = await api.deleteAccount(user.email, user.password);
    expect([200, 404]).toContain(body.responseCode);
  },

  cleanupUser: async ({ api }, use) => {
    const users: User[] = [];
    await use((user) => users.push(user));
    for (const user of users) {
      const body = await api.deleteAccount(user.email, user.password);
      expect([200, 404]).toContain(body.responseCode);
    }
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountStatusPage: async ({ page }, use) => {
    await use(new AccountStatusPage(page));
  },
});

export { expect };

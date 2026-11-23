import { test as base, expect } from '@playwright/test';
import { AutomationExerciseApi } from '@api/AutomationExerciseApi';
import { buildUser } from '@data/userFactory';
import type { User } from '@data/types';
import { HomePage } from '@pages/HomePage';

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
  homePage: HomePage;
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

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };

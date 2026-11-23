import { test, expect } from '@fixtures';
import { buildUser } from '@data/userFactory';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.expectLoaded();
  });

  // Test Case 2: Login User with correct email and password
  test('registered user can log in', async ({ loginPage, registeredUser, page }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await expect(page).toHaveURL('/');
    await loginPage.header.expectLoggedInAs(registeredUser.name);
  });

  // Test Case 4: Logout User
  test('logged in user can log out', async ({ loginPage, registeredUser, page }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);
    await loginPage.header.expectLoggedInAs(registeredUser.name);

    await loginPage.header.logoutLink.click();

    await expect(page).toHaveURL('/login');
    await loginPage.header.expectLoggedOut();
  });

  // Test Case 3: Login User with incorrect email and password
  test('wrong password shows an error', async ({ loginPage, registeredUser }) => {
    await loginPage.login(registeredUser.email, 'definitely-not-the-password');

    await expect(loginPage.loginError).toBeVisible();
    await loginPage.header.expectLoggedOut();
  });

  test('unregistered email shows an error', async ({ loginPage }) => {
    const stranger = buildUser(); // never sent to the API, so it does not exist

    await loginPage.login(stranger.email, stranger.password);

    await expect(loginPage.loginError).toBeVisible();
  });

  // The browser blocks these submits itself. Assert on the validity flags, not
  // on the message text: the text depends on the browser's language.
  test('email without "@" is rejected by browser validation', async ({ loginPage, page }) => {
    await loginPage.login('invalid-email-format', 'any-password');

    expect(await loginPage.loginEmailValidity()).toMatchObject({ valid: false, typeMismatch: true });
    await expect(page).toHaveURL('/login');
  });

  test('empty fields are rejected by browser validation', async ({ loginPage, page }) => {
    await loginPage.login('', '');

    expect(await loginPage.loginEmailValidity()).toMatchObject({ valid: false, valueMissing: true });
    await expect(page).toHaveURL('/login');
  });
});

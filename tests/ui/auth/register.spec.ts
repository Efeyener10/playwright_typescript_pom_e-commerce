import { test, expect } from '@fixtures';
import { buildUser } from '@data/userFactory';

test.describe('Register', () => {
  // Test Case 1: Register User
  test('new user can sign up, is logged in, and can delete the account', async ({
    homePage,
    loginPage,
    signupPage,
    accountStatusPage,
    cleanupUser,
  }) => {
    const user = buildUser({ title: 'Mrs', country: 'India' });
    cleanupUser(user); // safety net if the test fails before the UI delete

    await homePage.goTo();
    await homePage.expectLoaded();
    await homePage.header.signupLoginLink.click();
    await expect(loginPage.signupHeading).toBeVisible();

    await loginPage.startSignup(user.name, user.email);
    await signupPage.expectLoaded();
    await signupPage.expectPrefilled(user);
    await signupPage.fillAccountInfo(user);
    await signupPage.setSubscriptions({ newsletter: true, specialOffers: true });
    await signupPage.fillAddress(user);
    await signupPage.submit();

    await accountStatusPage.expectCreated();
    await accountStatusPage.continue();
    await homePage.header.expectLoggedInAs(user.name);

    await homePage.header.deleteAccountLink.click();
    await accountStatusPage.expectDeleted();
    await accountStatusPage.continue();
    await homePage.header.expectLoggedOut();
  });

  // Test Case 5: Register User with existing email
  test('signup with an already registered email shows an error', async ({ loginPage, registeredUser, page }) => {
    await loginPage.goTo();
    await loginPage.startSignup('Someone Else', registeredUser.email);

    await expect(loginPage.signupError).toBeVisible();
    await expect(page).toHaveURL('/signup');
  });
});

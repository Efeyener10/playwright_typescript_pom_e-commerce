import { test, expect } from '@fixtures';

test.describe('Home page', () => {
  test('loads with header navigation', async ({ homePage }) => {
    await homePage.goTo();
    await homePage.expectLoaded();
    await expect(homePage.header.productsLink).toBeVisible();
    await homePage.header.expectLoggedOut();
  });

  test('header navigates to products', async ({ homePage, page }) => {
    await homePage.goTo();
    await homePage.header.productsLink.click();
    await expect(page).toHaveURL('/products');
  });
});

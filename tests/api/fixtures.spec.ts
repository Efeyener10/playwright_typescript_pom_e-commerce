import { test, expect } from '@fixtures';

// Proves the `registeredUser` fixture: the account exists during the test.
// The fixture deletes it afterwards, even if the test fails.
test('registeredUser fixture creates a real account', async ({ api, registeredUser }) => {
  const body = await api.verifyLogin(registeredUser.email, registeredUser.password);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

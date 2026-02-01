import {test, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

const validEmail = 'sefayif947@roratu.com';
const validPassword = 'Fener.1907';
const invalidPassword = 'WrongPassword123';
const unregisteredEmail = 'unregistered@example.com';
const invalidEmailFormat = 'invalid-email-format';


test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.acceptCookiesIfVisible();
    });

// Succesfull login test
    test.only('Succesfull login test', async ({page}) => {
        await loginPage.login(validEmail, validPassword);
        await expect(page).toHaveURL('https://automationexercise.com/');
    })

// Failed login test with incorrect password
    test('Failed login test with incorrect password', async ({page}) => {
        await loginPage.login(validEmail, invalidPassword);
        await expect(loginPage.loginErrorMessage).toBeVisible();
    })

// Failed login test with unregistered email
    test('Failed login test with unregistered email', async ({page}) => {
        await loginPage.login(unregisteredEmail, validPassword);
        await expect(loginPage.loginErrorMessage).toBeVisible();
    })

// Failed login test with invalid email format
    test('Failed login test with invalid email format', async ({page}) => {
        await loginPage.login(invalidEmailFormat, validPassword);
        const actualMessage = await loginPage.getEmailValidationMessage();
        const expectedMessage = 'Lütfen e-posta adresine bir "@" işareti ekleyin. "invalid-email-format" adresinde "@" eksik.'
        await test.step('verify that the browser warning message is correct',async() => {
            expect(actualMessage.trim()).toEqual(expectedMessage.trim());
        });
    })
// Failed login test with empty fields
    test('Failed login test with empty fields', async ({page}) => {
        await loginPage.login('', '');
        const actualMessage = await loginPage.getEmailValidationMessage();
        const expectedMessage = 'Lütfen bu alanı doldurun.'
        await test.step('verify that the browser warning message is correct',async() => {
            expect(actualMessage.trim()).toEqual(expectedMessage.trim());
        });
    });
});

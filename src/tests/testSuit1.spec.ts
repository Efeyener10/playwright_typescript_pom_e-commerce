import {test, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { SignUpPage }  from '../Pages/SignUpPage';
import { HomePage } from '../Pages/HomePage';

const signUpName = 'Efe';
const signUpEmail = 'xosiset472@noihse.com';

test.describe('TestSuit1', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let signUpPage: SignUpPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.acceptCookiesIfVisible();
    });

    test('Preparation for Signing Up', async ({page}) => {
        loginPage = new LoginPage(page);
        signUpPage = new SignUpPage(page);
        await expect(page).toHaveURL('https://automationexercise.com/');
        await homePage.loginButton.click();
        await loginPage.verifySignUpHeader();
        await loginPage.startSignup(signUpName, signUpEmail);
})

})



//Navigate to url 'http://automationexercise.com'
// Verify that home page is visible successfully
//Click on 'Signup / Login' button
//Verify 'New User Signup!' is visible
//Enter name and email address
// Click 'Signup' button
// Verify that 'ENTER ACCOUNT INFORMATION' is visible
// Fill details: Title, Name, Email, Password, Date of birth
// Select checkbox 'Sign up for our newsletter!'
// Select checkbox 'Receive special offers from our partners!'
// Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
// Click 'Create Account button'
// Verify that 'ACCOUNT CREATED!' is visible
// Click 'Continue' button
// Verify that 'Logged in as username' is visible
// Click 'Delete Account' button
// Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly signUpNameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly newUserSignUp: Locator;
    readonly loginAccount: Locator;
    
constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('p[style="color: red;"]');
    this.signUpNameInput = page.locator('input[data-qa="signup-name"]');
    this.signUpEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signUpButton = page.locator('button[data-qa="signup-button"]');
    this.newUserSignUp = page.locator('.signup-form h2');
    this.loginAccount = page.locator('.login-form h2');
}

async goTo() {
    await this.page.goto('https://automationexercise.com/login');
 }

 async fillLoginEmail(email: string) {
    await this.loginEmailInput.fill(email);
 }

 async fillLoginPassword(password: string) {
    await this.loginPasswordInput.fill(password);
 }

 async clickLoginButton() {
    await this.loginButton.click();
 }

 async login(email: string, password: string) {
    await this.fillLoginEmail(email);
    await this.fillLoginPassword(password);
    await this.clickLoginButton();
 }

 async getEmailValidationMessage(): Promise<string> {
        const message = await this.page.evaluate(() => {
            const emailField = document.querySelector('input[data-qa="login-email"]') as HTMLInputElement;
            return emailField ? emailField.validationMessage : '';
        });
        return message;
    }

async verifyLoginHeaderVisible()  {
    await expect(this.loginAccount).toBeVisible();
}

async verifyLoginHeaderText() {
    await expect(this.loginAccount).toHaveText('Login to your account');
}

async verifyLoginHeader()  {
    await this.verifyLoginHeaderVisible();
    await this.verifyLoginHeaderText();
}

async verifySignUpHeaderVisible() {
    await expect(this.newUserSignUp).toBeVisible();
}

async verifySignUpHeaderText() {
    await expect(this.newUserSignUp).toHaveText('New User Signup!');
}

async verifySignUpHeader() {
    await this.verifySignUpHeaderVisible();
    await this.verifySignUpHeaderText();
}

 async fillSignUpName(name: string) {
    await this.signUpNameInput.fill(name);
 }

 async fillSignUpEmail(email: string) {
    await this.signUpEmailInput.fill(email);
 }

 async clickSignUpButton() {
    await this.signUpButton.click();
 }

 async startSignup(name: string, email: string) {
    await this.fillSignUpName(name);
    await this.fillSignUpEmail(email);
    await this.clickSignUpButton();
 }
}
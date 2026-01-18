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

 async login(email:string, password:string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
 }

 async getEmailValidationMessage(): Promise<string> {
        const message = await this.page.evaluate(() => {
            const emailField = document.querySelector('input[data-qa="login-email"]') as HTMLInputElement;
            return emailField ? emailField.validationMessage : '';
        });
        return message;
    }

async verifyLoginHeader()  {
    await expect(this.loginAccount).toBeVisible();
    await expect(this.loginAccount).toHaveText('Login to your account');
}

async verifySignUpHeader() {
    await expect(this.newUserSignUp).toBeVisible();
    await expect(this.newUserSignUp).toHaveText('New User Signup!');
}

 async startSignup(name:string, email:string) {
    await this.signUpNameInput.fill(name);
    await this.signUpEmailInput.fill(email);
    await this.signUpButton.click();
 }
}
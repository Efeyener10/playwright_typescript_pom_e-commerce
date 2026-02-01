import {Locator, Page, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  readonly homeButton: Locator;
  readonly productsButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly loggedInAsButton: Locator;
  readonly continueButtonForDeletion: Locator;
  readonly accountDeletedNotification: Locator;

  constructor(page:Page, username:string) {
    super(page);
    this.homeButton = page.locator('a:has-text(" Home")');
    this.productsButton = page.locator('a:has-text(" Products")');
    this.cartButton = page.locator('a:has-text(" Cart")');
    this.loginButton = page.locator('a:has-text(" Signup / Login")');
    this.logoutButton = page.locator('a:has-text(" Logout")');
    this.deleteAccountButton = page.locator('a:has-text(" Delete Account")');
    this.loggedInAsButton = page.locator(`//a[.//b[text()='${username}']]`);
    this.continueButtonForDeletion =  page.locator('a:has-text("Continue")');
    this.accountDeletedNotification = page.locator('h2:has-text("Account Deleted!")');
  }

  async goTo(){
        await this.page.goto('https://automationexercise.com/');
    }

  async verifyLoggedInAs(username:string){
    await expect(this.loggedInAsButton).toBeVisible();
    await expect(this.loggedInAsButton).toContainText(username);
  }

  async deleteAccountProcess(){
    await this.deleteAccountButton.click();
    await expect(this.accountDeletedNotification).toBeVisible();
    await expect(this.accountDeletedNotification).toHaveText('Account Deleted!');
    await this.continueButtonForDeletion.click();

  }



}
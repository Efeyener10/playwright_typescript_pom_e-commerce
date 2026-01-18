import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  readonly homeButton: Locator;
  readonly productsButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;


  constructor(page:Page) {
    super(page);
    this.homeButton = page.locator('a:has-text(" Home")');
    this.productsButton = page.locator('a:has-text(" Products")');
    this.cartButton = page.locator('a:has-text(" Cart")');
    this.loginButton = page.locator('a:has-text(" Signup / Login")');
    this.logoutButton = page.locator('a:has-text(" Logout")');
    this.deleteAccountButton = page.locator('a:has-text(" Delete Account")');
    
  }

  async goTo(){
        await this.page.goto('https://automationexercise.com/');
    }



}
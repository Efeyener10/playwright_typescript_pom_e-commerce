import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
    readonly signUpPasswordInput: Locator;
    readonly signUpFirstNameInput: Locator;
    readonly signUpLastNameInput: Locator;
    readonly signUpAddressInput: Locator;
    readonly signUpCountryDropdown: Locator;
    readonly signUpStateInput: Locator;
    readonly signUpCityInput: Locator;
    readonly signUpZipCodeInput: Locator;
    readonly signUpMobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly newsletterCheckBox: Locator;
    readonly specialOffersCheckBox: Locator;
    readonly accountCreatedNotification: Locator;
    readonly continueButton: Locator;
    readonly titleMr: Locator;
    readonly titleMrs: Locator;
    readonly enterAccountInfo: Locator;

    constructor(page: Page) {
        super(page);
        this.signUpPasswordInput = page.locator('input[data-qa="password"]');
        this.signUpFirstNameInput = page.locator('input[data-qa="first_name"]');
        this.signUpLastNameInput = page.locator('input[data-qa="last_name"]');
        this.signUpAddressInput = page.locator('input[data-qa="address"]');
        this.signUpCountryDropdown = page.locator('select[data-qa="country"]');
        this.signUpStateInput = page.locator('input[data-qa="state"]');
        this.signUpCityInput = page.locator('input[data-qa="city"]');
        this.signUpZipCodeInput = page.locator('input[data-qa="zipcode"]');
        this.signUpMobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
        this.newsletterCheckBox = page.locator('input[id="newsletter"]');
        this.specialOffersCheckBox = page.locator('input[id="optin"]');
        this.accountCreatedNotification = page.locator('h2:has-text("Account Created!")');
        this.continueButton = page.locator('a:has-text("Continue")');
        this.titleMr = page.locator('input#id_gender1');
        this.titleMrs = page.locator('input#id_gender2');
        this.enterAccountInfo = page.locator('b:has-text("Enter Account Information")');
    }   

    async goTo(){
        await this.page.goto('https://automationexercise.com/signup');
    }

    async selectCountry(countryValue: string){
        await this.signUpCountryDropdown.selectOption(countryValue);
    }

    async selectTitle(title: 'Mr'| 'Mrs'){
        if (title === 'Mr') {
            await this.titleMr.click();
        } else {
            await this.titleMrs.click();
        }
    }

    async selectNewsletterCheckBox(){
        await this.newsletterCheckBox.setChecked(true);
    }

    async selectSpecialOffersCheckBox() {
        await this.specialOffersCheckBox.setChecked(true);
    }

    async fillSignUpFormFields(password: string, country: string, first_name: string, last_name: string, address: string, state: string, city: string, zipcode: string, mobile_number:string){
        await expect(this.enterAccountInfo).toBeVisible();
        await expect(this.enterAccountInfo).toContainText("Enter Account Information");
        await this.signUpPasswordInput.fill(password);
        await this.signUpFirstNameInput.fill(first_name);
        await this.signUpLastNameInput.fill(last_name);
        await this.signUpAddressInput.fill(address);
        await this.signUpStateInput.fill(state);
        await this.signUpCityInput.fill(city);
        await this.signUpZipCodeInput.fill(zipcode);
        await this.signUpMobileNumberInput.fill(mobile_number)
        await this.selectCountry(country);
        await this.createAccountButton.click();

    }

    async verifyAccountCreation(){
        await expect(this.accountCreatedNotification).toBeVisible();
        await expect(this.accountCreatedNotification).toContainText("Account Created!");
        await this.continueButton.click();

    }

}

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
    readonly titleMrCheckBox: Locator;
    readonly titleMrsCheckBox: Locator;

    constructor(page: Page) {
        super(page);
        this.signUpPasswordInput = page.locator('input[data-qa="password"');
        this.signUpFirstNameInput = page.locator('input[data-qa="first_name"');
        this.signUpLastNameInput = page.locator('input[data-qa="last_name"');
        this.signUpAddressInput = page.locator('input[data-qa="address"');
        this.signUpCountryDropdown = page.locator('select[data-qa="country"');
        this.signUpStateInput = page.locator('input[data-qa="state"');
        this.signUpCityInput = page.locator('input[data-qa="city"');
        this.signUpZipCodeInput = page.locator('input[data-qa="zipcode"');
        this.signUpMobileNumberInput = page.locator('input[data-qa="mobile_number"');
        this.createAccountButton = page.locator('button[data-qa="create-account"');
        this.newsletterCheckBox = page.locator('input[id="newsletter"]');
        this.specialOffersCheckBox = page.locator('input[id="optin"]');
        this.accountCreatedNotification =  page.locator('input[data-qa="account-created"');
        this.continueButton =  page.locator('input[data-qa="continue-button"');
        this.titleMrCheckBox = page.locator('label:has-text("Mr.") input[data-qa="title"]');
        this.titleMrsCheckBox = page.locator('label:has-text("Mrs.") input[data-qa="title"]');
    }   

    async goTo(){
        await this.page.goto('https://automationexercise.com/signup');
    }

    async selectCountry(countryValue: string){
        await this.signUpCountryDropdown.selectOption(countryValue);
    }

    async selectTitle(gender: string){
        if (gender.toLowerCase() === 'mr') {
            await this.titleMrCheckBox.click();
        } else {
            await this.titleMrsCheckBox.click();
        }
    }

    async selectNewsletterCheckBox(){
        await this.newsletterCheckBox.setChecked(true);
    }

    async selectSpecialOffersCheckBox() {
        await this.specialOffersCheckBox.setChecked(true);
    }

    async fillRequiredFields(gender: string, password: string, country: string, first_name: string, last_name: string, address: string, state: string, city: string, zipcode: string, mobile_number:string){
        await this.selectTitle(gender);
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

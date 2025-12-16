import { Locator, Page } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
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
   
    constructor(page: Page) {
        this.page = page;
        this.signUpPasswordInput = page.locator('input[data-qa="password"');
        this.signUpFirstNameInput = page.locator('input[data-qa="first_name"');
        this.signUpLastNameInput = page.locator('input[data-qa="last_name"');
        this.signUpAddressInput = page.locator('input[data-qa="address"');
        this.signUpCountryDropdown = page.locator('select[data-qa="country"');
        this.signUpStateInput = page.locator('input[data-qa="state"');
        this.signUpCityInput = page.locator('input[data-qa="city"');
        this.signUpZipCodeInput = page.locator('input[data-qa="zipcode"');
        this.signUpMobileNumberInput = page.locator('input[data-qa="mobile_number"');
        this.createAccountButton = page.locator('button[data-qa="create-account"')
        
       
    }

    async goTo(){
        await this.page.goto('https://automationexercise.com/signup');
    }

    async selectCountry(countryValue: string){
        await this.signUpCountryDropdown.selectOption(countryValue);
    }

    async fillRequiredFields(password: string, country: string, first_name: string, last_name: string, address: string, state: string, city: string, zipcode: string, mobile_number:string){
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

}

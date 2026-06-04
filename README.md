# Playwright TypeScript E-Commerce Test Automation Framework

A test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern to automate and validate core user flows on [AutomationExercise.com](https://automationexercise.com).

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript | Type-safe test development |
| Page Object Model | Maintainable test architecture |
| Node.js | Runtime environment |

---

## 📁 Project Structure

```
├── src/
│   ├── Pages/
│   │   ├── BasePage.ts         # Abstract base class (cookie handling, shared setup)
│   │   ├── HomePage.ts         # Home page actions & verifications
│   │   ├── LoginPage.ts        # Login & signup form interactions
│   │   ├── SignUpPage.ts       # Full registration form
│   │   ├── ProductsPage.ts     # (in progress)
│   │   └── ShoppingCartPage.ts # (in progress)
│   ├── tests/
│   │   ├── login.spec.ts       # Login test scenarios
│   │   ├── testSuit1.spec.ts   # End-to-end registration flow
│   │   └── testSuit2.spec.ts   # Additional test scenarios
│   └── utils/
│       └── testData.ts         # Centralized test data
├── playwright.config.ts
└── package.json
```

---

## ✅ Test Scenarios

### Login Tests (`login.spec.ts`)
- ✅ Successful login with valid credentials
- ✅ Failed login with incorrect password
- ✅ Failed login with unregistered email
- ✅ Failed login with invalid email format (browser validation)
- ✅ Failed login with empty fields (browser validation)

### Registration Flow (`testSuit1.spec.ts`)
- ✅ Complete end-to-end sign-up flow
- ✅ Form field validation (title, personal info, address, country)
- ✅ Account creation confirmation
- ✅ Post-registration login verification
- ✅ Account deletion flow

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/Efeyener10/playwright_typescript_pom_e-commerce.git
cd playwright_typescript_pom_e-commerce
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test src/tests/login.spec.ts

# Run with UI mode
npx playwright test --ui

# Run with headed browser
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

---

## 🏗️ Architecture: Page Object Model

Each page is represented by a class that encapsulates all locators and interactions for that page. Tests remain clean and readable — they only call high-level methods.

```typescript
// Example: BasePage provides shared functionality
export abstract class BasePage {
    constructor(page: Page) { ... }
    abstract goTo(): Promise<void>;
    async acceptCookiesIfVisible() { ... }
}

// Example: Clean test using page objects
test('Successful login', async ({ page }) => {
    await loginPage.goTo();
    await loginPage.acceptCookiesIfVisible();
    await loginPage.login(validEmail, validPassword);
    await expect(page).toHaveURL('https://automationexercise.com/');
});
```

---

## 📌 Notes

- Test data is centralized in `src/utils/testData.ts`
- `ProductsPage.ts` and `ShoppingCartPage.ts` are planned for upcoming sprints
- Browser validation messages are currently in Turkish locale — locale-independent assertions planned

---
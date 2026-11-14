# Mentoria Playwright Web

**English** | [Português](README.pt-BR.md)

End-to-end test automation project using **Playwright** with **JavaScript**, structured with the **Page Object Model (POM)** pattern.

> *Mentoria* means "mentorship": this project was built during a mentoring program. Test names, Gherkin scenarios and reports are written in Portuguese.

---

## Technologies

- [Playwright](https://playwright.dev/) — test automation framework
- JavaScript (ES Modules)
- GitHub Actions — CI/CD

---

## Project Structure

```
mentoria-playwright-web/
├── .github/
│   └── workflows/
│       ├── push.yml          # Pipeline run on every push
│       └── pullrequest.yml   # Pipeline run on Pull Requests
├── fixtures/
│   ├── login.json            # Login data for the tests
│   └── users.json            # User and checkout data
├── support/
│   └── pages/
│       ├── LoginPage.js      # Login page Page Object
│       ├── RegisterPage.js   # Sign-up page Page Object
│       └── CheckoutPage.js   # Checkout page Page Object
├── tests/
│   ├── e2e/
│   │   ├── login.spec.js     # Login tests (6 scenarios)
│   │   ├── register.spec.js  # Sign-up tests (7 scenarios)
│   │   └── checkout.spec.js  # Checkout tests (6 scenarios)
│   ├── features/             # Gherkin scenarios (BDD)
│   └── reports/              # Execution reports
├── playwright.config.js      # Playwright configuration
└── package.json
```

---

## Prerequisites

- Node.js 18 or later
- npm

---

## Installation

```bash
# Clone the repository
git clone https://github.com/ricardho/mentoria-playwright-web.git
cd mentoria-playwright-web

# Install dependencies
npm install

# Install the Playwright browsers
npx playwright install
```

---

## Running the Tests

```bash
# Run all tests (Chromium, Firefox and WebKit)
npm test

# Run on Chromium only
npm run test:chromium

# Run on Firefox only
npm run test:firefox

# Run on WebKit (Safari) only
npm run test:webkit

# Open the HTML report after a run
npm run report
```

---

## Page Object Model

The Page Objects centralize the selectors and actions of each page, making the tests more readable and easier to maintain.

```javascript
// Usage example in a test
import { LoginPage } from '../../support/pages/LoginPage.js';

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login com sucesso', async ({ page }) => {
  await loginPage.logar('usuario@teste.com.br', 'Senha@2024');
  await loginPage.validarLoginSucesso();
});
```

---

## Test Scenarios

### Login (`tests/e2e/login.spec.js`)
- Check the elements present on the login page
- Successful login with a valid e-mail and password
- Login attempt with empty fields
- Login with an invalid e-mail
- Login with an invalid password
- Redirect to the sign-up page

### Sign-up (`tests/e2e/register.spec.js`)
- Check the elements of the sign-up page
- Successful sign-up with valid data
- Sign-up without filling in the Name field
- Sign-up without filling in the E-mail field
- Sign-up with an invalid e-mail format
- Sign-up with a password that is too short
- Sign-up without filling in the password

### Checkout (`tests/e2e/checkout.spec.js`)
- Check the full structure of the checkout page
- Filling in the form with valid data
- Order summary shows products and amounts
- Payment options are visible
- Placing an order without a payment method
- Navigation from the cart to checkout

---

## CI/CD — GitHub Actions

The project has two pipelines configured:

| File | Trigger | Description |
|---|---|---|
| `push.yml` | Every `git push` | Runs all tests automatically |
| `pullrequest.yml` | Pull Request to `master` | Validates the tests before merging |

After each run, the HTML report is saved as a GitHub Actions artifact for **3 days**.

---

## Application Under Test

[https://automationpratice.com.br](https://automationpratice.com.br)

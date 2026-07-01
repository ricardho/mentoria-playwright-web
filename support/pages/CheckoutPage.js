import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.billingHeading = page.getByRole('heading', { name: 'Billings Information' });
    this.ordersHeading = page.getByRole('heading', { name: 'Your Orders' });
    this.paymentHeading = page.getByRole('heading', { name: 'Payment' });
    this.firstNameInput = page.locator('#fname');
    this.lastNameInput = page.locator('#lname');
    this.companyInput = page.locator('#cname');
    this.emailInput = page.locator('#email');
    this.countrySelect = page.locator('#country');
    this.citySelect = page.locator('#city');
    this.zipInput = page.locator('#zip');
    this.addressInput = page.locator('#faddress');
    this.messagesInput = page.locator('#messages');
    this.saveAddressCheckbox = page.locator('#materialUnchecked');
    this.btnSave = page.getByRole('button', { name: 'Save' });
    this.btnPlaceOrder = page.getByRole('button', { name: 'Place Order' });
    this.bankTransferRadio = page.getByRole('radio', { name: 'Direct Bank Transfer' });
    this.mobileBankingRadio = page.getByRole('radio', { name: 'Mobile Banking' });
    this.paypalRadio = page.getByRole('radio', { name: 'Paypal' });
    this.errorLabel = page.locator('.errorLabel');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
  }

  async goto() {
    await this.page.goto('/checkout-one');
  }

  async gotoCart() {
    await this.page.goto('/cart');
  }

  async preencherFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async preencherLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async preencherCompanyName(company) {
    await this.companyInput.fill(company);
  }

  async preencherEmail(email) {
    await this.emailInput.fill(email);
  }

  async selecionarCountry(index) {
    await this.countrySelect.selectOption({ index });
  }

  async selecionarCity(index) {
    await this.citySelect.selectOption({ index });
  }

  async preencherZip(zip) {
    await this.zipInput.fill(zip);
  }

  async preencherAddress(address) {
    await this.addressInput.fill(address);
  }

  async clicarSave() {
    await this.btnSave.click();
  }

  async clicarPlaceOrder() {
    await this.btnPlaceOrder.click();
  }

  async validarMensagemErro(mensagem) {
    await expect(this.errorLabel).toBeVisible();
    await expect(this.errorLabel).toContainText(mensagem);
  }
}

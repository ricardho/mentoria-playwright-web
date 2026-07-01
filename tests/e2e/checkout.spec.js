import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../support/pages/CheckoutPage.js';

test.describe('Fluxo de Checkout', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
  });

  test('Verificar estrutura completa da página de checkout', async () => {
    await expect(checkoutPage.billingHeading).toBeVisible();
    await expect(checkoutPage.ordersHeading).toBeVisible();
    await expect(checkoutPage.paymentHeading).toBeVisible();
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.emailInput).toBeVisible();
    await expect(checkoutPage.countrySelect).toBeVisible();
    await expect(checkoutPage.citySelect).toBeVisible();
    await expect(checkoutPage.zipInput).toBeVisible();
    await expect(checkoutPage.addressInput).toBeVisible();
  });

  test('Preenchimento do formulário de cobrança com dados válidos', async ({ page }) => {
    await checkoutPage.preencherFirstName('João');
    await checkoutPage.preencherLastName('Silva');
    await checkoutPage.preencherCompanyName('Empresa Teste LTDA');
    await checkoutPage.preencherEmail('joao@teste.com');
    await checkoutPage.selecionarCountry(1);
    await checkoutPage.selecionarCity(1);
    await checkoutPage.preencherZip('01310-100');
    await checkoutPage.preencherAddress('Rua das Flores, 123, São Paulo');
    await checkoutPage.clicarSave();
    await expect(page).toHaveURL(/\/checkout-one/);
  });

  test('Resumo do pedido exibe produtos e valores corretamente', async ({ page }) => {
    await expect(page.locator('.order_table table thead')).toContainText('Product');
    await expect(page.locator('.order_table table thead')).toContainText('Total');
    await expect(page.locator('.order_table table tfoot')).toContainText('SubTotal');
    await expect(page.locator('.order_table table tfoot')).toContainText('Free Shipping');
    await expect(page.locator('.order_table table tfoot')).toContainText('Total');
  });

  test('Opções de pagamento estão visíveis na página de checkout', async () => {
    await expect(checkoutPage.bankTransferRadio).toBeVisible();
    await expect(checkoutPage.mobileBankingRadio).toBeVisible();
    await expect(checkoutPage.paypalRadio).toBeVisible();
  });

  test('Tentativa de finalizar pedido sem selecionar método de pagamento exibe erro', async ({ page }) => {
    await checkoutPage.clicarPlaceOrder();
    await checkoutPage.validarMensagemErro('Preencha os dados de pagamento!');
    await expect(page).toHaveURL(/\/checkout-one/);
  });

  test('Navegação do carrinho para o checkout via "Proceed to Checkout"', async ({ page }) => {
    await checkoutPage.gotoCart();
    await expect(checkoutPage.proceedToCheckoutLink).toBeVisible();
    await checkoutPage.proceedToCheckoutLink.click();
    await expect(page).toHaveURL(/\/checkout-one/);
    await expect(checkoutPage.billingHeading).toBeVisible();
  });
});

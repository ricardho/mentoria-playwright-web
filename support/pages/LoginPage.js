import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.emailInput = page.locator('#user');
    this.passwordInput = page.locator('#password');
    this.rememberCheckbox = page.getByRole('checkbox', { name: 'Lembrar de mim' });
    this.btnLogin = page.locator('#btnLogin');
    this.createAccountLink = page.getByRole('link', { name: 'Ainda não tem conta?' });
    this.successTitle = page.locator('.swal2-title');
    this.successMessage = page.locator('.swal2-html-container');
    this.confirmBtn = page.getByRole('button', { name: 'OK' });
    this.errorLabel = page.locator('.invalid_input');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async preencherEmail(email) {
    await this.emailInput.fill(email);
  }

  async preencherSenha(senha) {
    await this.passwordInput.fill(senha);
  }

  async clicarLogin() {
    await this.btnLogin.click();
  }

  async logar(email, senha) {
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarLogin();
  }

  async validarLoginSucesso() {
    await expect(this.successTitle).toHaveText('Login realizado');
  }

  async validarMensagemErro(mensagem) {
    await expect(this.errorLabel).toBeVisible();
    await expect(this.errorLabel).toContainText(mensagem);
  }
}

import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Cadastro de usuário' });
    this.nomeInput = page.locator('#user');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.btnRegister = page.locator('#btnRegister');
    this.successTitle = page.locator('.swal2-title');
    this.successMessage = page.locator('.swal2-html-container');
    this.confirmBtn = page.getByRole('button', { name: 'OK' });
    this.errorLabel = page.locator('.errorLabel');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async preencherNome(nome) {
    await this.nomeInput.fill(nome);
  }

  async preencherEmail(email) {
    await this.emailInput.fill(email);
  }

  async preencherSenha(senha) {
    await this.passwordInput.fill(senha);
  }

  async cadastrar() {
    await this.btnRegister.click();
  }

  async cadastrarUsuario(nome, email, senha) {
    await this.preencherNome(nome);
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.cadastrar();
  }

  async validarCadastroSucesso() {
    await expect(this.successTitle).toHaveText('Cadastro realizado!');
  }

  async validarMensagemErro(mensagem) {
    await expect(this.errorLabel).toBeVisible();
    await expect(this.errorLabel).toContainText(mensagem);
  }
}

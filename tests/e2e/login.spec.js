import { test, expect } from '@playwright/test';
import { LoginPage } from '../../support/pages/LoginPage.js';

const loginData = {
  email: 'usuario@teste.com.br',
  senha: 'Senha@2024'
};

test.describe('Fluxo de Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
  });

  test('Verificar elementos presentes na página de login', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberCheckbox).toBeVisible();
    await expect(loginPage.btnLogin).toBeVisible();
  });

  test('Login com sucesso usando e-mail e senha válidos', async ({ page }) => {
    await loginPage.logar(loginData.email, loginData.senha);
    await loginPage.validarLoginSucesso();
    await loginPage.confirmBtn.click();
    await expect(page).toHaveURL(/\/my-account/);
  });

  test('Tentativa de login com campos vazios não redireciona', async ({ page }) => {
    await loginPage.clicarLogin();
    await expect(page).toHaveURL(/\/login/);
  });

  test('Login com e-mail inválido exibe mensagem de erro', async () => {
    await loginPage.preencherEmail('email-invalido');
    await loginPage.preencherSenha(loginData.senha);
    await loginPage.clicarLogin();
    await loginPage.validarMensagemErro('E-mail inválido.');
  });

  test('Login com senha inválida exibe mensagem de erro', async () => {
    await loginPage.preencherEmail(loginData.email);
    await loginPage.preencherSenha('1');
    await loginPage.clicarLogin();
    await loginPage.validarMensagemErro('Senha inválida.');
  });

  test('Link "Ainda não tem conta" redireciona para página de cadastro', async ({ page }) => {
    await loginPage.createAccountLink.click();
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole('heading', { name: 'Cadastro de usuário' })).toBeVisible();
  });
});

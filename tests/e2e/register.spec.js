import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../support/pages/RegisterPage.js';

test.describe('Fluxo de Cadastro de Usuários', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await expect(registerPage.heading).toBeVisible();
  });

  test('Verificar elementos presentes na página de cadastro', async () => {
    await expect(registerPage.nomeInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.btnRegister).toBeVisible();
  });

  test('Cadastro com sucesso usando dados válidos', async ({ page }) => {
    const email = `usuario${Date.now()}@teste.com.br`;
    await registerPage.cadastrarUsuario('João Silva', email, 'Senha@2024');
    await registerPage.validarCadastroSucesso();
    await expect(registerPage.successMessage).toContainText('Bem-vindo João Silva');
    await registerPage.confirmBtn.click();
    await expect(page).toHaveURL(/\/my-account/);
  });

  test('Tentativa de cadastro sem preencher o campo Nome exibe erro', async ({ page }) => {
    await registerPage.preencherEmail('teste@exemplo.com');
    await registerPage.preencherSenha('Senha@2024');
    await registerPage.cadastrar();
    await registerPage.validarMensagemErro('O campo nome deve ser prenchido');
    await expect(page).toHaveURL(/\/register/);
  });

  test('Tentativa de cadastro sem preencher o campo E-mail exibe erro', async ({ page }) => {
    await registerPage.preencherNome('Ana Teste');
    await registerPage.preencherSenha('Senha@2024');
    await registerPage.cadastrar();
    await registerPage.validarMensagemErro('O campo e-mail deve ser prenchido corretamente');
    await expect(page).toHaveURL(/\/register/);
  });

  test('Tentativa de cadastro com e-mail em formato inválido exibe erro', async ({ page }) => {
    await registerPage.preencherNome('Pedro Teste');
    await registerPage.preencherEmail('email-invalido');
    await registerPage.preencherSenha('Senha@2024');
    await registerPage.cadastrar();
    await registerPage.validarMensagemErro('O campo e-mail deve ser prenchido corretamente');
    await expect(page).toHaveURL(/\/register/);
  });

  test('Tentativa de cadastro com senha muito curta exibe erro', async ({ page }) => {
    await registerPage.preencherNome('Ana Teste');
    await registerPage.preencherEmail('ana@exemplo.com');
    await registerPage.preencherSenha('123');
    await registerPage.cadastrar();
    await registerPage.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos');
    await expect(page).toHaveURL(/\/register/);
  });

  test('Tentativa de cadastro sem preencher a senha exibe erro', async ({ page }) => {
    await registerPage.preencherNome('Carlos Teste');
    await registerPage.preencherEmail('carlos@exemplo.com');
    await registerPage.cadastrar();
    await registerPage.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos');
    await expect(page).toHaveURL(/\/register/);
  });
});

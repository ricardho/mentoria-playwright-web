# Mentoria Playwright Web

[English](README.md) | **Português**

Projeto de automação de testes end-to-end utilizando **Playwright** com **JavaScript**, estruturado no padrão **Page Object Model (POM)**.

---

## Tecnologias

- [Playwright](https://playwright.dev/) — framework de automação de testes
- JavaScript (ES Modules)
- GitHub Actions — CI/CD

---

## Estrutura do Projeto

```
mentoria-playwright-web/
├── .github/
│   └── workflows/
│       ├── push.yml          # Pipeline executada em todo push
│       └── pullrequest.yml   # Pipeline executada em Pull Requests
├── fixtures/
│   ├── login.json            # Dados de login para os testes
│   └── users.json            # Dados de usuários e checkout
├── support/
│   └── pages/
│       ├── LoginPage.js      # Page Object da página de Login
│       ├── RegisterPage.js   # Page Object da página de Cadastro
│       └── CheckoutPage.js   # Page Object da página de Checkout
├── tests/
│   ├── e2e/
│   │   ├── login.spec.js     # Testes de Login (6 cenários)
│   │   ├── register.spec.js  # Testes de Cadastro (7 cenários)
│   │   └── checkout.spec.js  # Testes de Checkout (6 cenários)
│   ├── features/             # Cenários em Gherkin (BDD)
│   └── reports/              # Relatórios de execução
├── playwright.config.js      # Configuração do Playwright
└── package.json
```

---

## Pré-requisitos

- Node.js 18 ou superior
- npm

---

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/ricardho/mentoria-playwright-web.git
cd mentoria-playwright-web

# Instalar dependências
npm install

# Instalar os navegadores do Playwright
npx playwright install
```

---

## Como Executar os Testes

```bash
# Executar todos os testes (Chromium, Firefox e WebKit)
npm test

# Executar somente no Chromium
npm run test:chromium

# Executar somente no Firefox
npm run test:firefox

# Executar somente no WebKit (Safari)
npm run test:webkit

# Abrir o relatório HTML após execução
npm run report
```

---

## Page Object Model

Os Page Objects centralizam os seletores e ações de cada página, deixando os testes mais legíveis e fáceis de manter.

```javascript
// Exemplo de uso em um teste
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

## Cenários de Teste

### Login (`tests/e2e/login.spec.js`)
- Verificar elementos presentes na página de login
- Login com sucesso usando e-mail e senha válidos
- Tentativa de login com campos vazios
- Login com e-mail inválido
- Login com senha inválida
- Redirecionamento para página de cadastro

### Cadastro (`tests/e2e/register.spec.js`)
- Verificar elementos da página de cadastro
- Cadastro com sucesso com dados válidos
- Cadastro sem preencher o campo Nome
- Cadastro sem preencher o campo E-mail
- Cadastro com e-mail em formato inválido
- Cadastro com senha muito curta
- Cadastro sem preencher a senha

### Checkout (`tests/e2e/checkout.spec.js`)
- Verificar estrutura completa da página de checkout
- Preenchimento do formulário com dados válidos
- Resumo do pedido exibe produtos e valores
- Opções de pagamento visíveis
- Finalizar pedido sem método de pagamento
- Navegação do carrinho para o checkout

---

## CI/CD — GitHub Actions

O projeto possui duas pipelines configuradas:

| Arquivo | Gatilho | Descrição |
|---|---|---|
| `push.yml` | Todo `git push` | Executa todos os testes automaticamente |
| `pullrequest.yml` | Pull Request para `master` | Valida os testes antes do merge |

Após cada execução, o relatório HTML é salvo como artefato no GitHub Actions por **3 dias**.

---

## Aplicação Testada

[https://automationpratice.com.br](https://automationpratice.com.br)

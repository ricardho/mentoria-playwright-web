# Test Report: Criar fluxo de login

**URL tested:** https://automationpratice.com.br/login  
**Date:** 2026-06-11  
**Status:** PASSED ✅

---

## Gherkin Scenarios

```gherkin
Feature: Criar fluxo de login

  Scenario: Login com sucesso usando e-mail e senha preenchidos
    Given que o usuário está na página de login
    When preenche o campo E-mail com "usuario@teste.com.br"
    And preenche o campo Senha com "Senha@2024"
    And clica no botão "login"
    Then deve exibir o modal de sucesso "Login realizado"
    And o modal deve conter a mensagem "Olá, usuario@teste.com.br"
    And após confirmar o modal deve ser redirecionado para a página "Minha Conta"

  Scenario: Tentativa de login com campos vazios não redireciona
    Given que o usuário está na página de login
    When deixa os campos E-mail e Senha em branco
    And clica no botão "login"
    Then deve permanecer na página de login

  Scenario: Acesso à página de cadastro a partir do link na tela de login
    Given que o usuário está na página de login
    When clica no link "Ainda não tem conta?"
    Then deve ser redirecionado para a página de cadastro
    And deve exibir o heading "Cadastro de usuário"

  Scenario: Verificar elementos presentes na página de login
    Given que o usuário está na página de login
    Then deve exibir o heading "Login"
    And deve exibir o campo E-mail
    And deve exibir o campo Senha
    And deve exibir o checkbox "Lembrar de mim"
    And deve exibir o botão "login"
```

---

## Manual Exploration Findings

**Elementos encontrados na página `/login`:**
- `h3`: "Login"
- `input#user` (type="text") — campo E-mail (sem label `for` associado)
- `input#password` (type="password") — campo Senha (`minlength="8"`)
- `input#materialUnchecked` (checkbox) — "Lembrar de mim" (com label `for` correto)
- `button#btnLogin` (type="submit") — botão "login"
- Link `a#createAccount` — "Ainda não tem conta?" → `/register`

**Ações testadas:**
- Preenchimento e submissão com email + senha válidos
- Submissão com campos em branco
- Clique no link de cadastro a partir da tela de login
- Verificação visual de todos os elementos da página

**Estados observados:**
- **Sucesso**: SweetAlert2 exibe "Login realizado" com "Olá, [email]"; após clicar OK redireciona para `/my-account`
- **Campos vazios**: Nenhuma mensagem de erro exibida pela aplicação; URL permanece em `/login` sem redirecionamento
- **Navegação para cadastro**: Link redireciona corretamente para `/register` com formulário de cadastro visível

**Comportamento notável (limitação do ambiente de prática):**
- A aplicação **não valida credenciais** — qualquer combinação de email + senha resulta em login bem-sucedido
- Não há verificação de email cadastrado, senha correta ou formato de email
- Os testes foram desenhados para cobrir o comportamento real observado da aplicação

---

## Automated Tests

| Test | Status | Notes |
|------|--------|-------|
| Login com sucesso usando e-mail e senha preenchidos | PASSED ✅ | Modal SweetAlert2 exibido; redirecionamento para /my-account confirmado |
| Tentativa de login com campos vazios não redireciona | PASSED ✅ | URL permanece em /login sem redirect |
| Acesso à página de cadastro a partir do link na tela de login | PASSED ✅ | Link "Ainda não tem conta?" navega corretamente para /register |
| Verificar elementos presentes na página de login | PASSED ✅ | Todos os elementos (heading, campos, checkbox, botão) estão visíveis |

**Total: 4/4 passed — duração: ~5.5s**

---

## Failures & Fixes Applied

Nenhuma falha. Todos os testes passaram na primeira execução.

---

## Conclusion

Os 4 cenários do fluxo de login foram cobertos com sucesso. A página `/login` carrega corretamente seus elementos, o fluxo de sucesso exibe o modal SweetAlert2 e redireciona para `/my-account`, campos vazios não causam redirecionamento indevido, e a navegação para a página de cadastro funciona corretamente.

**Recomendações:**
- A aplicação não implementa autenticação real (site de prática) — qualquer email/senha loga com sucesso; isso é intencional para fins de aprendizado
- O campo `input#user` usa `type="text"` em vez de `type="email"`, perdendo validação nativa de formato de email
- A label "E-mail" não está associada ao input via atributo `for`, o que prejudica acessibilidade
- Não há feedback visual de erro para submissão com campos vazios — apenas a não execução do redirect

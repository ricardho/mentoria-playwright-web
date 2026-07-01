# Test Report: Fluxo de cadastro de usuários

**URL tested:** https://automationpratice.com.br/register  
**Date:** 2026-06-11  
**Status:** PASSED ✅

---

## Gherkin Scenarios

```gherkin
Feature: Fluxo de cadastro de usuários

  Scenario: Cadastro com sucesso usando dados válidos
    Given que o usuário está na página de cadastro
    When preenche o campo Nome com "João Silva"
    And preenche o campo E-mail com um endereço único e válido
    And preenche o campo Senha com "Senha@2024"
    And clica no botão "Cadastrar"
    Then deve exibir o modal de sucesso "Cadastro realizado!"
    And o modal deve conter a mensagem "Bem-vindo João Silva"
    And após confirmar o modal deve ser redirecionado para a página "Minha Conta"

  Scenario: Tentativa de cadastro com o campo Nome vazio
    Given que o usuário está na página de cadastro
    When deixa o campo Nome em branco
    And preenche o campo E-mail com um endereço válido
    And preenche o campo Senha com "Senha@2024"
    And clica no botão "Cadastrar"
    Then deve exibir a mensagem de erro "O campo nome deve ser prenchido"
    And deve permanecer na página de cadastro

  Scenario: Tentativa de cadastro com senha muito curta
    Given que o usuário está na página de cadastro
    When preenche o campo Nome com "Ana Teste"
    And preenche o campo E-mail com um endereço válido
    And preenche o campo Senha com "123"
    And clica no botão "Cadastrar"
    Then deve exibir a mensagem de erro "O campo senha deve ter pelo menos 6 dígitos"
    And deve permanecer na página de cadastro

  Scenario: Tentativa de cadastro com e-mail em formato inválido
    Given que o usuário está na página de cadastro
    When preenche o campo Nome com "Pedro Teste"
    And preenche o campo E-mail com "email-invalido"
    And preenche o campo Senha com "Senha@2024"
    And clica no botão "Cadastrar"
    Then deve exibir a mensagem de erro "O campo e-mail deve ser prenchido corretamente"
    And deve permanecer na página de cadastro
```

---

## Manual Exploration Findings

**Elementos encontrados na página `/register`:**
- Heading `h3`: "Cadastro de usuário"
- `input#user` (type="text") — campo Nome, obrigatório
- `input#email` (type="email") — campo E-mail, obrigatório
- `input#password` (type="password") — campo Senha, obrigatório, minlength declarado
- `button#btnRegister` — botão "Cadastrar"

**Ações testadas:**
- Preenchimento e submissão do formulário com dados válidos
- Submissão com campo Nome vazio
- Submissão com senha de menos de 6 dígitos
- Submissão com e-mail em formato inválido (sem @)

**Estados observados:**
- **Sucesso**: SweetAlert2 modal exibe "Cadastro realizado!" com "Bem-vindo [Nome]"; após clicar OK o usuário é redirecionado para `/my-account`
- **Nome vazio**: Exibe `.errorLabel` com texto "O campo nome deve ser prenchido" (nota: typo intencional na aplicação — "prenchido" em vez de "preenchido")
- **Senha curta**: Exibe `.errorLabel` com "O campo senha deve ter pelo menos 6 dígitos" (o atributo HTML `minlength="8"` está incorreto em relação à validação JavaScript)
- **E-mail inválido**: Validação nativa do browser + `.errorLabel` com "O campo e-mail deve ser prenchido corretamente"

**Bug identificado:** O sistema permite cadastro com e-mail já existente (sem retornar erro de duplicidade).

---

## Automated Tests

| Test | Status | Notes |
|------|--------|-------|
| Cadastro com sucesso usando dados válidos | PASSED ✅ | Modal SweetAlert2 exibido; redirecionamento para /my-account confirmado |
| Tentativa de cadastro com o campo Nome vazio | PASSED ✅ | Mensagem errorLabel exibida corretamente |
| Tentativa de cadastro com senha muito curta | PASSED ✅ | Validação de 6 dígitos aplicada via JavaScript |
| Tentativa de cadastro com e-mail em formato inválido | PASSED ✅ | Validação nativa do browser + mensagem da aplicação |

**Total: 4/4 passed — duração: ~6.8s**

---

## Failures & Fixes Applied

Nenhuma falha. Todos os testes passaram na primeira execução.

---

## Conclusion

Os 4 cenários do fluxo de cadastro foram cobertos com sucesso. O formulário em `/register` funciona corretamente para o caminho feliz (redirecionamento com modal de sucesso) e para os principais casos de erro (nome vazio, senha curta, e-mail inválido).

**Recomendações:**
- Corrigir o typo "prenchido" → "preenchido" nas mensagens de erro da aplicação
- O atributo `minlength="8"` no campo senha está inconsistente com a validação JavaScript que aceita 6 dígitos — alinhar os dois
- Implementar validação de e-mail duplicado (cadastro com mesmo e-mail não retorna erro)

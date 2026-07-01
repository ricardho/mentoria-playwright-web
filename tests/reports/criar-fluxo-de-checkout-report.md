# Test Report: Criar Fluxo de Checkout

**URL tested:** https://automationpratice.com.br/checkout-one  
**Date:** 2026-06-12  
**Status:** PASSED ✅

---

## Gherkin Scenarios

```gherkin
Feature: Criar Fluxo de Checkout

  Scenario: Verificar estrutura completa da página de checkout
    Given que o usuário está na página de checkout
    Then deve exibir a seção "Billings Information"
    And deve exibir a seção "Your Orders"
    And deve exibir a seção "Payment"
    And deve exibir os campos do formulário de cobrança

  Scenario: Preenchimento do formulário de cobrança com dados válidos
    Given que o usuário está na página de checkout
    When preenche o campo First name com "João"
    And preenche o campo Last name com "Silva"
    And preenche o campo Company Name com "Empresa Teste LTDA"
    And preenche o campo Email Addresse com "joao@teste.com"
    And seleciona o país e a cidade
    And preenche o campo Zip Code com "01310-100"
    And preenche o campo Full Address com "Rua das Flores, 123, São Paulo"
    And clica no botão "Save"
    Then deve permanecer na página de checkout

  Scenario: Resumo do pedido exibe produtos e valores corretamente
    Given que o usuário está na página de checkout
    Then deve exibir a tabela de pedidos com cabeçalhos "Product" e "Total"
    And deve exibir a linha de "SubTotal" com um valor
    And deve exibir "Free Shipping" para o frete
    And deve exibir o "Total" final do pedido

  Scenario: Tentativa de finalizar pedido sem selecionar método de pagamento exibe erro
    Given que o usuário está na página de checkout
    When clica no botão "Place Order" sem selecionar método de pagamento
    Then deve exibir a mensagem de erro "Preencha os dados de pagamento!"
    And deve permanecer na página de checkout

  Scenario: Navegação do carrinho para o checkout via "Proceed to Checkout"
    Given que o usuário está na página do carrinho
    When clica no link "Proceed to Checkout"
    Then deve ser redirecionado para a página de checkout
    And deve exibir o heading "Billings Information"
```

---

## Manual Exploration Findings

**Estrutura da página `/checkout-one`:**
- Seção **Billings Information** (`h3`) com formulário em `<form method="post">`:
  - `input#fname` — First name
  - `input#lname` — Last name
  - `input#cname` — Company Name
  - `input#email` — Email Addresse (label com typo intencional)
  - `select#country` — Country (opções: usa, Afghanistan…)
  - `select#city` — State/City
  - `input#zip` — Zip Code
  - `input#faddress` — Full Address
  - `textarea#messages` — Additional Notes
  - `input#materialUnchecked` (checkbox) — Save In Address Book
  - Botão `Save`
- Seção **Your Orders** (`h3`) com tabela resumo do pedido:
  - Cabeçalhos: Product / Total
  - Rodapé: SubTotal / Shipping (Free Shipping) / Total
- Seção **Payment** (`h3`) com acordeão Bootstrap:
  - Radio `#html` — Direct Bank Transfer (selecionado por padrão no DOM)
  - Radio `#javascript` — Mobile Banking
  - Radio `#css` — Paypal
  - Botão `Place Order`
- Página `/cart` com link "Proceed to Checkout" → `/checkout-one`

**Comportamento observado:**
- Todos os campos do formulário de cobrança aceitam digitação corretamente
- O botão **Save** não produz resposta visual — permanece na mesma URL
- O botão **Place Order** sempre exibe `.errorLabel` com "Preencha os dados de pagamento!" ao ser clicado — independentemente do radio button selecionado no DOM
- A navegação Cart → Checkout funciona via link "Proceed to Checkout"

**Bug/Limitação identificado:**
- O acordeão de pagamento usa React state interno para rastrear a seleção. Interações DOM (clique nos radios, labels ou accordion headers) não atualizam o estado React, tornando o fluxo completo de "Place Order" não executável via automação headless padrão.
- O seletor `getByLabel('Direct Bank Transfer')` gerava ambiguidade (resolvia o radio E o div com `aria-labelledby`) — corrigido com `getByRole('radio', { name: '...' })`.

---

## Automated Tests

| Test | Status | Notes |
|------|--------|-------|
| Verificar estrutura completa da página de checkout | PASSED ✅ | Todos os 3 headings e 7 campos de input verificados |
| Preenchimento do formulário de cobrança com dados válidos | PASSED ✅ | Campos preenchidos e validados com `toHaveValue` |
| Resumo do pedido exibe produtos e valores corretamente | PASSED ✅ | Tabela com SubTotal, Free Shipping e Total confirmados |
| Tentativa de finalizar pedido sem selecionar método de pagamento exibe erro | PASSED ✅ | errorLabel "Preencha os dados de pagamento!" verificado |
| Navegação do carrinho para o checkout via "Proceed to Checkout" | PASSED ✅ | Redirect para /checkout-one confirmado |

**Total: 5/5 passed — duração: ~7.0s**

---

## Failures & Fixes Applied

**Falha 1 (corrigida na tentativa 1):**
- **Teste:** "Tentativa de finalizar pedido sem selecionar método de pagamento exibe erro"
- **Erro:** `strict mode violation: getByLabel('Direct Bank Transfer') resolved to 2 elements` — o radio `#html` e o div `#collapseOne` (que tem `aria-labelledby="headingOne"`)
- **Correção:** Substituído `page.getByLabel('Direct Bank Transfer')` por `page.getByRole('radio', { name: 'Direct Bank Transfer' })`, que resolve unicamente o elemento radio
- **Resultado:** Teste passou na re-execução

---

## Conclusion

Os 5 cenários do fluxo de checkout foram cobertos com sucesso, exercitando as partes funcionais e verificáveis da página. A estrutura do formulário de cobrança, preenchimento de campos, resumo do pedido e navegação do carrinho foram todos validados.

**Recomendações:**
- O fluxo completo de "Place Order" (preenchimento + pagamento + confirmação de pedido) não pôde ser automatizado: o componente React do acordeão de pagamento não atualiza seu estado interno via eventos DOM padrão — isso é um bug de implementação que impede a conclusão do checkout em testes automatizados headless
- O botão "Save" da seção de cobrança não fornece feedback visual ao usuário após o clique — adicionar um toast ou mensagem de confirmação melhoraria a UX
- Label com typo: "Email Addresse" (deveria ser "Email Address")
- Os selects de Country e City poderiam ter opções mais representativas (atualmente só "usa" e nomes genéricos)

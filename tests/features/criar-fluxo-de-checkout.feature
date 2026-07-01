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

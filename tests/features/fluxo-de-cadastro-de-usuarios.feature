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

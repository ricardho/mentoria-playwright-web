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

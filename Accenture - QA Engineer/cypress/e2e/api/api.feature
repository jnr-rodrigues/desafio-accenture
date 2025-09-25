# language: pt
Funcionalidade: Fluxo de API da Livraria

  Cenário: Alugar livros e verificar detalhes do usuário
    Dado que eu tenho um usuário autenticado e uma lista de livros disponíveis
    Quando eu alugo dois livros para este usuário
    Então a operação de aluguel é bem-sucedida
    Quando eu consulto os detalhes do usuário
    Então os detalhes do usuário incluem os dois livros alugados
    E a autorização do usuário é válida
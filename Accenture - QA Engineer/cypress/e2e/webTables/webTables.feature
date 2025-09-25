# language: pt
Funcionalidade: Gerenciamento da Tabela Web

  Cenário: Criar, editar e deletar um registro
    Dado que eu estou na página de Web Tables
    Quando eu crio um registro único
    Quando eu edito esse registro com novos dados
    Então as informações do registro são atualizadas
    Quando eu deleto o registro único
    Então o registro único não é mais exibido na tabela

  Cenário: Bônus - Criar 12 registros dinâmicos e deletar todos
    Dado que eu estou na página de Web Tables
    Quando eu crio 12 registros dinâmicos
    Quando eu deleto todos os 12 registros criados
    Então os registros dinâmicos não são mais exibidos na tabela
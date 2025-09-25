# language: pt
Funcionalidade: Janelas do Navegador

  Cenário: Abrir nova janela e validar conteúdo
    Dado que eu estou na página de Browser Windows
    Quando eu clico no botão para abrir uma nova janela
    Então uma nova página é aberta com o texto "This is a sample page"
    E eu consigo voltar para a página anterior
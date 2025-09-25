# language: pt
Funcionalidade: Barra de Progresso

  Cenário: Interagir com a barra de progresso
    Dado que eu estou na página de Progress Bar
    Quando eu inicio a barra e a pauso
    Então o valor da barra deve ser menor ou igual a 30
    Quando eu reinicio a barra e espero ela completar
    Então o valor real da barra deve ser 100
    Quando eu clico no botão de resetar e o valor real da barra volta a ser 0
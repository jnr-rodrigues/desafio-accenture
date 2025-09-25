# Projeto de Automação de Testes E2E e API com Cypress e BDD

Este projeto contém uma suíte de testes automatizados para a aplicação de demonstração [DemoQA](https://demoqa.com/). O objetivo é validar diversas funcionalidades da plataforma, demonstrando o uso de boas práticas de automação com Cypress e a metodologia BDD (Behavior-Driven Development) com Cucumber.

---

## Tecnologias utilizadas:

- **[Cypress](https://www.cypress.io/):** Framework principal para a automação de testes End-to-End.
- **[Cucumber](https://cucumber.io/):** Ferramenta para implementação de BDD, utilizando a sintaxe Gherkin.
- **[Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor):** Biblioteca para integrar o Cucumber ao Cypress.
- **[Node.js](https://nodejs.org/):** Ambiente de execução para o projeto.
- **JavaScript:** Linguagem de programação para a escrita dos testes e comandos.

---

## Funcionalidades testadas:

A suíte de testes cobre as seguintes áreas da aplicação:

- **API (Bookstore):**
  - Criação de usuário e geração de token.
  - Aluguel de livros para um usuário.
  - Consulta de detalhes do usuário com os livros alugados.
  - Validação de autorização.
  - Limpeza automática do usuário criado ao final do teste.
- **Front - Formulários:**
  - Preenchimento completo de um formulário de prática complexo.
  - Validação dos dados submetidos em um modal de confirmação.
- **Front - Interações com Janelas:**
  - Manipulação de novas janelas do navegador.
  - Validação de conteúdo em uma nova página e retorno à página original.
- **Front - Tabelas Web:**
  - Criação, edição e deleção de um registro.
  - Criação em massa de 12 registros dinâmicos.
  - Exclusão em massa de todos os registros criados.
- **Front - Progress Bar:**
  - Interação com a barra de progresso (iniciar, pausar, resetar).
  - Validações baseadas em tempo e no estado real do componente.
- **Front - Drag and Drop:**
  - Reordenação de uma lista de elementos para a ordem decrescente.

---

## Estrutura do projeto:

O projeto segue a estrutura padrão do Cypress com a adição da metodologia BDD:

```
/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── api.feature       # Especificação BDD para os testes de API
│   │   │   └── api.js            # Implementação (steps) dos testes de API
│   │   ├── browserWindows/
│   │   ├── forms/
│   │   ├── progressBar/
│   │   ├── sortable/
│   │   └── webTables/
│   ├── fixtures/
│   │   └── upload-file.txt       # Arquivo de exemplo para testes de upload
│   └── support/
│       └── e2e.js                # Arquivo para comandos customizados e configurações globais
├── cypress.config.js             # Arquivo principal de configuração do Cypress
├── cypress.env.json.example      # Exemplo de arquivo para variáveis de ambiente
└── package.json                  # Dependências e scripts do projeto
```

---

## Configuração do ambiente:

Siga os passos abaixo para executar o projeto localmente.

### **Pré-requisitos:**

- **Node.js** (versão 16 ou superior)
- **NPM** ou **Yarn**

### **Passos para instalação:**

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/jnr-rodrigues/desafio-accenture.git](https://github.com/jnr-rodrigues/desafio-accenture.git)
    cd desafio-accenture
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `cypress.env.json` na raiz do projeto, seguindo o modelo do `cypress.env.json.example`. Este arquivo é necessário para os testes de API.

    _Conteúdo do `cypress.env.json`:_

    ```json
    {
      "USERNAME": "usuario",
      "PASSWORD": "senha@123"
    }
    ```

    _(Nota: As credenciais podem ser qualquer valor, pois a API de demonstração cria o usuário em tempo de execução.)_

---

## Como executar os testes:

- **Modo Interativo (Com interface gráfica):**
  Ideal para desenvolver e depurar os testes.
  ```bash
  npm start
  ```
  _ou_
  ```bash
  npx cypress open
  ```

---

## Detalhes técnicos e padrões adotados:

- **BDD com Cucumber:** A estrutura dos testes foi migrada de um formato padrão do Cypress para BDD. Os arquivos `.feature` servem como "documentação viva", descrevendo o comportamento esperado em linguagem natural (Gherkin), enquanto os arquivos `.js` contêm a implementação técnica, tornando os testes mais claros e fáceis de manter.

- **Comandos customizados (`support/e2e.js`):**

  - Comandos de API (`apiLogin`, `apiDeleteUser`, `apiGetBooks`) foram criados para abstrair a complexidade das requisições e permitir um setup e teardown de testes mais rápido e estável.
  - Comandos de Front reutilizáveis, como `simulateDragAndDrop`, foram mantidos para ações genéricas.
  - Lógicas específicas de cada página foram movidas para dentro dos seus respectivos arquivos de `steps`, evitando a sobrecarga do arquivo de suporte.

- **Gerenciamento de dados:**

  - Os testes utilizam **geração de dados dinâmicos** para garantir que cada execução seja independente e não dependa de dados fixos.
  - Dados sensíveis (credenciais de API) são gerenciados de forma segura através do arquivo `cypress.env.json`, que é ignorado pelo Git.

- **Tratamento de scripts de terceiros:** Foi implementada uma estratégia com `cy.intercept()` no hook global `beforeEach` para bloquear requisições de anúncios e scripts de analytics. Isso torna os testes mais rápidos, estáveis e menos suscetíveis a erros de redes externas.

- **Estratégias de sincronização:** Para lidar com a instabilidade da aplicação de demonstração (que usa React), foram aplicadas técnicas avançadas de sincronização:
  - **Validação dentro de loops:** No teste `webTables`, uma asserção (`.should('contain', ...)` ) foi adicionada dentro do loop de criação para forçar o Cypress a esperar a UI ser atualizada antes de prosseguir para a próxima iteração.
  - **Validação de Atributos:** No teste `progressBar`, as validações finais foram alteradas para verificar o atributo `aria-valuenow` em vez do texto visível, pois o atributo representa o estado real do componente, sendo mais confiável que a renderização do texto, que pode sofrer atrasos.

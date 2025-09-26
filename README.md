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

- **API:**
  - Criação de usuário e geração de token.
  - Aluguel de livros para um usuário.
  - Consulta de detalhes do usuário com os livros alugados.
  - Validação de autorização.
  - Limpeza automática do usuário criado ao final do teste.
- **Front - Forms:**
  - Preenchimento completo de um formulário de prática complexo.
  - Validação dos dados submetidos em um modal de confirmação.
- **Front - Browser Windows:**
  - Manipulação de novas janelas do navegador.
  - Validação de conteúdo em uma nova página e retorno à página original.
- **Front - Web Tables:**
  - Criação, edição e deleção de um registro.
  - Criação em massa de 12 registros dinâmicos.
  - Exclusão em massa de todos os registros criados.
- **Front - Progress Bar:**
  - Interação com a barra de progresso (iniciar, pausar, resetar).
  - Validações baseadas em tempo e no estado real do componente.
- **Front - Sortable:**
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
    Crie um arquivo chamado `cypress.env.json` na raiz do projeto, seguindo o modelo abaixo. Este arquivo é necessário para os testes de API.

    _Conteúdo do `cypress.env.json`:_

    ```json
    {
      "USERNAME": "usuario",
      "PASSWORD": "senha@123"
    }
    ```

    _(Nota: As credenciais podem ser qualquer valor, pois a API de demonstração cria o usuário.)_

---

## Detalhes técnicos e padrões adotados:

- **BDD com Cucumber:** A estrutura dos testes está no formato padrão do Cypress para BDD. Os arquivos `.feature` servem como "documentação viva", descrevendo o comportamento esperado em linguagem natural (Gherkin), enquanto os arquivos `.js` contêm a implementação técnica, tornando os testes mais claros e fáceis de manter.
- Dados sensíveis são gerenciados de forma segura através do arquivo `cypress.env.json`.

- **Comandos customizados (`support/e2e.js`):**
  - Comandos de API (`apiLogin`, `apiDeleteUser`, `apiGetBooks`) foram criados para abstrair a complexidade das requisições e permitir um setup e teardown de testes mais rápido e estável.
  - Comandos de Front reutilizáveis, como pro exemplo o `simulateDragAndDrop`, são para ações genéricas.
  - Lógicas específicas de cada página foram movidas para dentro dos seus respectivos arquivos de `steps`, evitando a sobrecarga do arquivo de suporte.

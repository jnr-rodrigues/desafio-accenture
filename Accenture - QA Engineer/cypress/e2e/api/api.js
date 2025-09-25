const { Given, When, Then, After } = require("@badeball/cypress-cucumber-preprocessor");

let userId, token, isbn1, isbn2;
const username = Cypress.env('USERNAME');
const password = Cypress.env('PASSWORD');

Given('que eu tenho um usuário autenticado e uma lista de livros disponíveis', () => {
    cy.apiLogin(username, password).then((authData) => {
        userId = authData.userId;
        token = authData.token;
        return cy.apiGetBooks();
    }).then((books) => {
        isbn1 = books[0].isbn;
        isbn2 = books[1].isbn;
    });
});

When('eu alugo dois livros para este usuário', () => {
    cy.request({
        method: 'POST',
        url: '/BookStore/v1/Books',
        headers: { 'Authorization': `Bearer ${token}` },
        body: {
            userId: userId,
            collectionOfIsbns: [{ isbn: isbn1 }, { isbn: isbn2 }]
        }
    }).as('aluguelResponse');
});

Then('a operação de aluguel é bem-sucedida', () => {
    cy.get('@aluguelResponse').then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.books[0].isbn).to.eql(isbn1);
        expect(response.body.books[1].isbn).to.eql(isbn2);
    });
});

When('eu consulto os detalhes do usuário', () => {
    cy.request({
        method: 'GET',
        url: `/Account/v1/User/${userId}`,
        headers: { 'Authorization': `Bearer ${token}` }
    }).as('detalhesResponse');
});

Then('os detalhes do usuário incluem os dois livros alugados', () => {
    cy.get('@detalhesResponse').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eql(username);
        expect(response.body.books.length).to.eql(2);
    });
});

Then('a autorização do usuário é válida', () => {
    cy.request({
        method: 'POST',
        url: '/Account/v1/Authorized',
        body: {
            userName: username,
            password: password
        }
    }).its('status').should('eq', 200);
});

After(() => {
    if (userId && token) {
        cy.apiDeleteUser(userId, token);
    }
});
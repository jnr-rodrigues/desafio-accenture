const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('que eu estou na página de Browser Windows', () => {
    cy.visit('/browser-windows');
});

When('eu clico no botão para abrir uma nova janela', () => {
    cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
            win.location.href = url;
        });
    });
    cy.get('#windowButton').click();
});

Then('uma nova página é aberta com o texto {string}', (mensagem) => {
    cy.contains(mensagem).should('be.visible');
});

Then('eu consigo voltar para a página anterior', () => {
    cy.go('back');
    cy.contains('Browser Windows').should('be.visible');
});
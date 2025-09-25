const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('que eu estou na página de Sortable', () => {
    cy.visit('/sortable');
});

When('eu reordeno a lista para a ordem crescente', () => {
    cy.contains('.vertical-list-container > div', 'One').simulateDragAndDrop('.vertical-list-container > :nth-child(1)');
    cy.contains('.vertical-list-container > div', 'Two').simulateDragAndDrop('.vertical-list-container > :nth-child(2)');
    cy.contains('.vertical-list-container > div', 'Three').simulateDragAndDrop('.vertical-list-container > :nth-child(3)');
    cy.contains('.vertical-list-container > div', 'Four').simulateDragAndDrop('.vertical-list-container > :nth-child(4)');
    cy.contains('.vertical-list-container > div', 'Five').simulateDragAndDrop('.vertical-list-container > :nth-child(5)');
});

Then('os itens da lista devem estar em ordem crescente', () => {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    cy.get('.vertical-list-container > div').each(($el, index) => {
        cy.wrap($el).should('have.text', expectedOrder[index]);
    });
});
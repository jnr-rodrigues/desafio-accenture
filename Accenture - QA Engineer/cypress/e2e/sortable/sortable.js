const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('que eu estou na página de Sortable', () => {
    cy.visit('/sortable');
});

When('eu reordeno a lista para a ordem decrescente', () => {
    cy.get('.vertical-list-container > :nth-child(6)').simulateDragAndDrop('.vertical-list-container > :nth-child(1)');
    cy.get('.vertical-list-container > :nth-child(6)').simulateDragAndDrop('.vertical-list-container > :nth-child(2)');
    cy.get('.vertical-list-container > :nth-child(6)').simulateDragAndDrop('.vertical-list-container > :nth-child(3)');
    cy.get('.vertical-list-container > :nth-child(6)').simulateDragAndDrop('.vertical-list-container > :nth-child(4)');
    cy.get('.vertical-list-container > :nth-child(6)').simulateDragAndDrop('.vertical-list-container > :nth-child(5)');
});

Then('os itens da lista devem estar em ordem decrescente', () => {
    const expectedOrder = ['Six', 'Five', 'Four', 'Three', 'Two', 'One'];
    cy.get('.vertical-list-container > div').each(($el, index) => {
        cy.wrap($el).should('have.text', expectedOrder[index]);
    });
});
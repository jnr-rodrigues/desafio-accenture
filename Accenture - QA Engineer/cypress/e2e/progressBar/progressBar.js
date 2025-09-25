const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('que eu estou na página de Progress Bar', () => {
    cy.visit('/progress-bar');
});

When('eu inicio a barra e a pauso', () => {
    cy.get('#startStopButton').click();
    cy.wait(1500);
    cy.get('#startStopButton').click();
});

Then('o valor da barra deve ser menor ou igual a {int}', (value) => {
    cy.get('#progressBar .progress-bar').invoke('attr', 'aria-valuenow').then(parseInt).should('be.lte', value);
});

When('eu reinicio a barra e espero ela completar', () => {
    cy.get('#startStopButton').click();
});

Then('o valor real da barra deve ser {int}', (value) => {
    cy.get('#progressBar .progress-bar', { timeout: 30000 })
      .should('have.attr', 'aria-valuenow', value);
});

Then('eu clico no botão de resetar e o valor real da barra volta a ser {int}', () => {
    cy.get('#resetButton').should('be.visible').and('be.enabled').click();
});
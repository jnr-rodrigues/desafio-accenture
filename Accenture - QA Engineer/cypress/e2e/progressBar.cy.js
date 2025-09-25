Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Desafio Front - Progress Bar', () => {

    const selectors = {
        widgetsOption: 'Widgets',
        progressBarSubmenu: 'Progress Bar',
        startButton: '#startStopButton',
        progressBar: '#progressBar .progress-bar',
        resetButton: '#resetButton',
        adContainer: '#fixedban',
    };

    beforeEach(() => {
        cy.viewport(1200, 800);
        cy.visit('https://demoqa.com/');
        cy.get(selectors.adContainer).then(($ad) => {
            if ($ad.is(':visible')) {
                $ad.remove();
            }
        });
        cy.contains(selectors.widgetsOption).click();
        cy.contains(selectors.progressBarSubmenu).click();
    });

    it('Parar a barra de progresso antes de 25% e resetar em 100%', () => {
        cy.get(selectors.startButton).click();
        cy.wait(1000);
        cy.get(selectors.startButton).click();

        cy.get(selectors.progressBar, { timeout: 5000 }).then(($progressBar) => {
            const value = $progressBar.attr('aria-valuenow');
            const numericValue = parseInt(value);

            expect(numericValue).to.be.lte(25);
        });

        cy.get(selectors.startButton).should('contain', 'Start').click();

        cy.get(selectors.progressBar, { timeout: 30000 })
            .should('contain.text', '100%');

        cy.get(selectors.resetButton)
            .should('be.visible')
            .and('be.enabled')
            .click();

        cy.get(selectors.progressBar)
            .should('contain.text', '0%');
    });
});
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Desafio Front - Browser Windows', () => {

    const selectors = {
        alertsFramesWindowsOption: 'Alerts, Frame & Windows',
        browserWindowsSubmenu: 'Browser Windows',
        newWindowButton: '#windowButton',
        adContainer: '#fixedban',
    };

    beforeEach(() => {
        cy.visit('https://demoqa.com/');
        cy.get(selectors.adContainer).then(($ad) => {
            if ($ad.is(':visible')) {
                $ad.remove();
            }
        });
        cy.contains(selectors.alertsFramesWindowsOption).click();
        cy.contains(selectors.browserWindowsSubmenu).click();
    });

    it('Abrir a nova janela, validar a mensagem e retornar à página inicial', () => {
        cy.abrirValidarNovaJanela(selectors.newWindowButton, 'This is a sample page');
    });
});
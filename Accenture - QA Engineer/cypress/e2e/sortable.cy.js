Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Desafio UI - Sortable (Drag and Drop)', () => {

    const selectors = {
        interactionsOption: 'Interactions',
        sortableSubmenu: 'Sortable',
        listItems: '.vertical-list-container > div',
        // Seletores de POSIÇÃO INICIAL
        itemOne: '.vertical-list-container > :nth-child(1)',
        itemTwo: '.vertical-list-container > :nth-child(2)',
        itemThree: '.vertical-list-container > :nth-child(3)',
        itemFour: '.vertical-list-container > :nth-child(4)',
        itemFive: '.vertical-list-container > :nth-child(5)',
        itemSix: '.vertical-list-container > :nth-child(6)',
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
        cy.contains(selectors.interactionsOption).click();
        cy.contains(selectors.sortableSubmenu).click();
    });

    it('Deve reordenar a lista para a ordem decrescente (Six a One)', () => {
        cy.get(selectors.itemSix).simulateDragAndDrop(selectors.itemOne);
        cy.get(selectors.itemSix).simulateDragAndDrop(selectors.itemTwo);
        cy.get(selectors.itemSix).simulateDragAndDrop(selectors.itemThree);
        cy.get(selectors.itemSix).simulateDragAndDrop(selectors.itemFour);
        cy.get(selectors.itemSix).simulateDragAndDrop(selectors.itemFive);
        const expectedOrder = ['Six', 'Five', 'Four', 'Three', 'Two', 'One'];

        cy.get(selectors.listItems).each(($el, index) => {
            cy.wrap($el).should('have.text', expectedOrder[index]);
        });
    });
});
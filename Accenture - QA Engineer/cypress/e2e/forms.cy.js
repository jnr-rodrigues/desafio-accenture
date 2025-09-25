Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Desafio Front - Forms', () => {

    const userData = {
        firstName: `Junior`,
        lastName: `Rodrigues`,
        email: `junior.pyssc@outlook.com`,
        mobile: `1234567890`,
        currentAddress: `R. Exemplo, 12A - Bairro, Gurgaon - NCR, 12345-678`,
        state: `NCR`,
        city: `Gurgaon`,
        hobby: 'Sports',
    };

    const selectors = {
        formsOption: 'Forms',
        practiceFormSubmenu: 'Practice Form',
        firstName: '#firstName',
        lastName: '#lastName',
        email: '#userEmail',
        mobile: '#userNumber',
        genderMaleLabel: 'label[for="gender-radio-1"]',
        genderMaleInput: '#gender-radio-1',
        hobbiesSportsLabel: 'label[for="hobbies-checkbox-1"]',
        hobbiesSportsInput: '#hobbies-checkbox-1',
        dateOfBirth: '#dateOfBirthInput',
        monthSelect: '.react-datepicker__month-select',
        yearSelect: '.react-datepicker__year-select',
        daySelect: '.react-datepicker__day--012',
        subjects: '#subjectsInput',
        subjectsInputContainer: '.subjects-auto-complete__value-container',
        uploadPictureLabel: 'label[for="uploadPicture"]',
        uploadPictureInput: '#uploadPicture',
        currentAddress: '#currentAddress',
        stateDropdown: '#state',
        cityDropdown: '#city',
        stateCityOptions: '.css-1n7g13x > div',
        submitButton: '#submit',
        modalHeader: '.modal-header',
        modalBodyRows: 'tbody > tr',
        closeModalButton: '#closeLargeModal',
        adContainer: '#fixedban',
    };

    beforeEach(() => {
        cy.visit('https://demoqa.com/');
        cy.get(selectors.adContainer).then(($ad) => {
            if ($ad.is(':visible')) {
                $ad.remove();
            }
        });
        cy.contains(selectors.formsOption).click();
        cy.contains(selectors.practiceFormSubmenu).click();
    });

    it('Preencher formulário e validar o recibo', () => {
        cy.preencherCamposIniciais(selectors, userData);
        cy.selecionarOpcoes(selectors);
        cy.preencherDataAssuntosUpload(selectors);
        cy.preencherEnderecoCompleto(selectors, userData);

        cy.get(selectors.submitButton).scrollIntoView().click();
        cy.get(selectors.modalHeader).should('contain', 'Thanks for submitting the form');

        cy.get(selectors.modalBodyRows).eq(0).should('contain', `${userData.firstName} ${userData.lastName}`);
        cy.get(selectors.modalBodyRows).eq(1).should('contain', userData.email);
        cy.get(selectors.modalBodyRows).eq(2).should('contain', 'Male');
        cy.get(selectors.modalBodyRows).eq(3).should('contain', userData.mobile);
        cy.get(selectors.modalBodyRows).eq(4).should('contain', '12 January,1990');
        cy.get(selectors.modalBodyRows).eq(5).should('contain', 'English, Computer Science');
        cy.get(selectors.modalBodyRows).eq(6).should('contain', userData.hobby);
        cy.get(selectors.modalBodyRows).eq(7).should('contain', 'upload-file.txt');
        cy.get(selectors.modalBodyRows).eq(8).should('contain', userData.currentAddress);
        cy.get(selectors.modalBodyRows).eq(9).should('contain', `${userData.state} ${userData.city}`);

        cy.get(selectors.closeModalButton).click();
        cy.get('.modal-content').should('not.exist');
    });
});
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

const userData = {
    firstName: `Junior`,
    lastName: `Rodrigues`,
    email: `junior.pyssc@outlook.com`,
    mobile: `1234567890`,
    currentAddress: `R. Exemplo, 12A - Bairro, Gurgaon - NCR, 12345-678`,
    state: `NCR`,
    city: `Gurgaon`,
};

Given('que eu estou na página de Practice Form', () => {
    cy.visit('/automation-practice-form');
});

When('eu preencho e envio o formulário com dados válidos', () => {
    cy.get('#firstName').type(userData.firstName);
    cy.get('#lastName').type(userData.lastName);
    cy.get('#userEmail').type(userData.email);
    cy.get('label[for="gender-radio-1"]').click();
    cy.get('#userNumber').type(userData.mobile);
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('0');
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__day--012').click();
    cy.get('.subjects-auto-complete__value-container').type("English{enter}Computer Science{enter}");
    cy.get('label[for="hobbies-checkbox-1"]').click();
    cy.get('#uploadPicture').selectFile('cypress/fixtures/upload-file.txt');
    cy.get('#currentAddress').type(userData.currentAddress);
    cy.get('#state').click().type(`${userData.state}{enter}`);
    cy.get('#city').click().type(`${userData.city}{enter}`);
    cy.get('#submit').click();
});

Then('um modal de confirmação deve aparecer com os dados submetidos', () => {
    cy.get('.modal-header').should('contain', 'Thanks for submitting the form');
    cy.get('tbody > tr').eq(0).should('contain', `${userData.firstName} ${userData.lastName}`);
    cy.get('tbody > tr').eq(1).should('contain', userData.email);
    cy.get('tbody > tr').eq(2).should('contain', 'Male');
    cy.get('tbody > tr').eq(3).should('contain', userData.mobile);
    cy.get('tbody > tr').eq(9).should('contain', `${userData.state} ${userData.city}`);
    cy.get('#closeLargeModal').click();
});
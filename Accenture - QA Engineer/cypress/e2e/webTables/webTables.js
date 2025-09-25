const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

const firstNames = ['Alice', 'Celso', 'Joao', 'Leticia', 'Amanda', 'Daniel', 'Emily', 'Renan', 'Carlos', 'Bianca'];
const lastNames = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Almeida', 'Costa', 'Fernandes'];
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support', 'Development', 'QA', 'Operations', 'Management'];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateNativeUserData(departmentOverride) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const age = Math.floor(Math.random() * (45 - 20) + 20).toString();
    const newSalary = Math.floor(parseInt(4000) * 1.5).toString();
    return {
        firstName, lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@accenture.com`,
        age, salary: "4000",
        department: departmentOverride || getRandomItem(departments),
        newSalary, newDepartment: 'Automation'
    };
}

let singleRecord;
let bonusRecords;
const totalRecordsToCreate = 12;

const selectors = {
    elementsOption: 'Elements',
    webTablesSubmenu: 'Web Tables',
    addButton: '#addNewRecordButton',
    submitButton: '#submit',
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#userEmail',
    ageInput: '#age',
    salaryInput: '#salary',
    departmentInput: '#department',
    rowsPerPageDropdown: 'select[aria-label="rows per page"]',
    validTableRows: '.rt-tbody .rt-tr-group:has(.rt-td:not(:empty))',
    tableContainer: '.rt-tbody',
    deleteIconId: (id) => `#delete-record-${id}`,
};

Given('que eu estou na página de Web Tables', () => {
    singleRecord = generateNativeUserData('QA');
    bonusRecords = [];
    for (let i = 1; i <= totalRecordsToCreate; i++) {
        bonusRecords.push(generateNativeUserData('Tester'));
    }

    cy.visit('/webtables');
    cy.get(selectors.rowsPerPageDropdown).select('20');
    cy.get(selectors.validTableRows).its('length').as('initialCount');
});

When('eu crio um registro único', () => {
    cy.criarRegistro(selectors, singleRecord);
});

When('eu edito esse registro com novos dados', () => {
    const rowIdForEditDelete = 4;
    cy.get(`#edit-record-${rowIdForEditDelete}`).should('be.visible').click();
    cy.get(selectors.salaryInput).clear().type(singleRecord.newSalary);
    cy.get(selectors.departmentInput).clear().type(singleRecord.newDepartment);
    cy.get(selectors.submitButton).click();
});

Then('as informações do registro são atualizadas', () => {
    const rowSelector = `.rt-tbody .rt-tr-group:contains(${singleRecord.firstName})`;
    cy.get(rowSelector)
        .should('contain', singleRecord.newSalary)
        .and('contain', singleRecord.newDepartment);
});

When('eu deleto o registro único', () => {
    const rowIdForEditDelete = 4;
    cy.get(selectors.deleteIconId(rowIdForEditDelete)).click();
});

Then('o registro único não é mais exibido na tabela', () => {
    cy.contains(selectors.tableContainer, singleRecord.firstName).should('not.exist');
});

When('eu crio 12 registros dinâmicos', () => {
    cy.wrap(bonusRecords).each((record) => {
        cy.criarRegistro(selectors, record);
    });
});

When('eu deleto todos os 12 registros criados', () => {
    for (let i = 0; i < totalRecordsToCreate; i++) {
        const recordIdToDelete = 4;
        cy.deleteBonusRecord(selectors, recordIdToDelete);
    }
});

Then('os registros dinâmicos não são mais exibidos na tabela', () => {
    cy.validarRemocaoEmMassa(bonusRecords);
});
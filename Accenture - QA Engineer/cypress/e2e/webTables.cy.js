Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Desafio Front - Web Tables', () => {

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
            firstName: firstName,
            lastName: lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@accenture.com`,
            age: age,
            salary: "4000",
            department: departmentOverride || getRandomItem(departments),
            newSalary: newSalary,
            newDepartment: 'Automation'
        };
    }

    const singleRecord = generateNativeUserData('QA');

    const totalRecordsToCreate = 12;
    const bonusRecords = [];
    for (let i = 1; i <= totalRecordsToCreate; i++) {
        bonusRecords.push(generateNativeUserData('Tester'));
    }

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
        adContainer: '#fixedban',
        tableContainer: '.rt-tbody',
        deleteIconId: (id) => `#delete-record-${id}`,
    };

    beforeEach(() => {
        cy.viewport(1400, 900);
        cy.visit('https://demoqa.com/');
        cy.get(selectors.adContainer).then(($ad) => {
            if ($ad.is(':visible')) {
                $ad.remove();
            }
        });
        cy.contains(selectors.elementsOption).click();
        cy.contains(selectors.webTablesSubmenu).click();
        cy.get(selectors.rowsPerPageDropdown).select('20');

        cy.get(selectors.validTableRows).should('have.length.at.least', 3).its('length').as('initialCount');
    });

    it('Criar, editar e deletar um registro', () => {
        const rowIdForEditDelete = 4;
        cy.criarRegistro(selectors, singleRecord);

        const rowSelector = `.rt-tbody .rt-tr-group:contains(${singleRecord.firstName})`;
        cy.get(rowSelector).should('exist');

        cy.get(`#edit-record-${rowIdForEditDelete}`)
            .should('be.visible')
            .click();

        cy.get(selectors.salaryInput).clear().type(singleRecord.newSalary);
        cy.get(selectors.departmentInput).clear().type(singleRecord.newDepartment);
        cy.get(selectors.submitButton).click();

        cy.get(rowSelector)
            .should('contain', singleRecord.newSalary)
            .and('contain', singleRecord.newDepartment);

        cy.get(selectors.deleteIconId(rowIdForEditDelete)).click();
        cy.contains(selectors.tableContainer, singleRecord.firstName).should('not.exist');
    });

    it('Bônus: Criar 12 registros dinâmicos e deletar todos', () => {

        cy.wrap(bonusRecords).each((record) => {
            cy.criarRegistro(selectors, record);
        });

        for (let i = 0; i < totalRecordsToCreate; i++) {
            const recordIdToDelete = 4;
            cy.deleteBonusRecord(selectors, recordIdToDelete);
        }

        cy.validarRemocaoEmMassa(bonusRecords);
    });
});

beforeEach(() => {
    cy.intercept('https://*.googlesyndication.com/**', { statusCode: 204 });
    cy.intercept('https://*.doubleclick.net/**', { statusCode: 204 });
    cy.intercept('https://*.stat-rock.com/**', { statusCode: 204 });
});

Cypress.Commands.add('apiLogin', (username, password) => {
    let userId, token;

    cy.request({
        method: 'POST',
        url: '/Account/v1/User',
        body: {
            userName: username,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        userId = response.body.userID;

        Cypress.log({
            name: 'Criar usuário',
            message: `Usuário ${username} foi criado com sucesso.`
        });

        return cy.request({
            method: 'POST',
            url: '/Account/v1/GenerateToken',
            body: {
                userName: username,
                password: password
            }
        });
    }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;

        Cypress.log({
            name: 'Gerar token',
            message: 'Token gerado com sucesso.'
        });

        return { userId, token };
    });
});

Cypress.Commands.add('apiDeleteUser', (userId, token) => {
    cy.request({
        method: 'DELETE',
        url: `/Account/v1/User/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        expect(response.status).to.eq(204);

        Cypress.log({
            name: 'Apagar usuário',
            message: `Usuário ${userId} foi apagado com sucesso.`
        });
    });
});

Cypress.Commands.add('apiGetBooks', () => {
    cy.request({
        method: 'GET',
        url: '/BookStore/v1/Books'
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.books).to.be.an('array').and.to.have.lengthOf.at.least(2);

        Cypress.log({
            name: 'Listar livros',
            message: 'Lista de livros obtida com sucesso.'
        });

        return response.body.books;
    });
});

Cypress.Commands.add('preencherCamposIniciais', (selectors, userData) => {
    cy.get(selectors.firstName).type(userData.firstName).should('have.value', userData.firstName);
    cy.get(selectors.lastName).type(userData.lastName).should('have.value', userData.lastName);
    cy.get(selectors.email).type(userData.email).should('have.value', userData.email);
    cy.get(selectors.mobile).type(userData.mobile).should('have.value', userData.mobile);
});

Cypress.Commands.add('selecionarOpcoes', (selectors) => {
    cy.get(selectors.genderMaleLabel).click();
    cy.get(selectors.genderMaleInput).should('be.checked');

    cy.get(selectors.hobbiesSportsLabel).click();
    cy.get(selectors.hobbiesSportsInput).should('be.checked');
});

Cypress.Commands.add('preencherDataAssuntosUpload', (selectors) => {
    cy.get(selectors.dateOfBirth).click();
    cy.get(selectors.yearSelect).should('be.visible').select('1990');
    cy.get(selectors.monthSelect).should('be.visible').select('0');
    cy.get(selectors.daySelect).should('be.visible').click();

    cy.get(selectors.subjectsInputContainer).click().type("English{enter}Computer Science{enter}");

    cy.get(selectors.uploadPictureLabel).scrollIntoView().click();
    cy.get(selectors.uploadPictureInput).selectFile('cypress/fixtures/upload-file.txt');
});

Cypress.Commands.add('preencherEnderecoCompleto', (selectors, userData) => {
    cy.get(selectors.currentAddress).scrollIntoView().type(userData.currentAddress);

    cy.get(selectors.stateDropdown).scrollIntoView().click();
    cy.get('#state input').type(`${userData.state}{enter}`);

    cy.get(selectors.cityDropdown).click();
    cy.get('#city input').type(`${userData.city}{enter}`);
});

Cypress.Commands.add('abrirValidarNovaJanela', (selectorDoBotao, mensagemEsperada) => {
    cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
            win.location.href = url;
        });
    });

    cy.get(selectorDoBotao)
        .should('be.visible')
        .click();

    cy.contains(mensagemEsperada).should('be.visible');
    cy.go('back');
    cy.contains('Browser Windows').should('be.visible');
});

Cypress.Commands.add('criarRegistro', (selectors, data) => {
    cy.get(selectors.addButton).click();

    cy.get(selectors.firstNameInput)
        .should('exist')
        .and('be.visible')
        .and('not.have.attr', 'disabled');

    cy.get(selectors.firstNameInput).type(data.firstName);
    cy.get(selectors.lastNameInput).type(data.lastName);
    cy.get(selectors.emailInput).type(data.email);
    cy.get(selectors.ageInput).type(data.age);
    cy.get(selectors.salaryInput).type(data.salary);
    cy.get(selectors.departmentInput).type(data.department);

    cy.get(selectors.submitButton).click();

    cy.get(selectors.firstNameInput).should('not.exist');
});

Cypress.Commands.add('validarRemocaoEmMassa', (dataArray) => {
    cy.wrap(dataArray).each((record) => {
        cy.contains('.rt-tbody', record.firstName).should('not.exist');
    });
});

Cypress.Commands.add('deleteBonusRecord', (selectors, initialId) => {
    let currentId = initialId;

    const attemptDelete = (id) => {
        const deleteSelector = selectors.deleteIconId(id);

        cy.get('body').then(($body) => {
            if ($body.find(deleteSelector).length) {
                cy.get(deleteSelector).should('be.visible').click();
            } else {
                currentId++;
                if (currentId <= 15) {
                    attemptDelete(currentId);
                }
            }
        });
    };

    attemptDelete(currentId);
});

Cypress.Commands.add('simulateDragAndDrop', { prevSubject: 'element' }, (subject, targetSelector) => {
    cy.get(targetSelector).then($target => {
        const coords = $target.get(0).getBoundingClientRect();
        const targetX = coords.left + (coords.width / 2);
        const targetY = coords.top + (coords.height / 2);

        cy.wrap(subject)
            .scrollIntoView()
            .trigger('mousedown', { which: 1, button: 0 });

        cy.get(targetSelector)
            .trigger('mousemove', { clientX: targetX, clientY: targetY, force: true });

        cy.get(targetSelector)
            .trigger('mouseup', { force: true });
    });
});
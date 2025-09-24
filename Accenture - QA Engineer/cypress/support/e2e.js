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
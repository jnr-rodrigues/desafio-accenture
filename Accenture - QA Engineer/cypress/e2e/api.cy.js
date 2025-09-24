describe('Desafio API - Accenture', () => {

    let userId, token, isbn1, isbn2;
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');

    before(() => {
        cy.apiLogin(username, password).then((authData) => {
            userId = authData.userId;
            token = authData.token;

            return cy.apiGetBooks();
        }).then((books) => {
            isbn1 = books[0].isbn;
            isbn2 = books[1].isbn;
        });
    });

    after(() => {
        if (userId && token) {
            cy.apiDeleteUser(userId, token);
        }
    });

    it('1. Deve alugar dois livros para o usuário', () => {
        cy.request({
            method: 'POST',
            url: '/BookStore/v1/Books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                userId: userId,
                collectionOfIsbns: [{ isbn: isbn1 }, { isbn: isbn2 }]
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.books[0].isbn).to.eql(isbn1);
            expect(response.body.books[1].isbn).to.eql(isbn2);

            Cypress.log({
                name: 'Alugar livros',
                message: 'Livros alugados com sucesso.'
            });
        });
    });

    it('2. Deve listar os detalhes do usuário com os livros alugados', () => {
        cy.request({
            method: 'GET',
            url: `/Account/v1/User/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.username).to.eql(username);
            expect(response.body.books.length).to.eql(2);
            expect(response.body.books[0].isbn).to.eql(isbn1);
            expect(response.body.books[1].isbn).to.eql(isbn2);

            Cypress.log({
                name: 'Detalhes do usuário',
                message: 'Detalhes do usuário verificados com sucesso.'
            });
        });
    });

    it('3. Deve validar a autorização do usuário', () => {
        cy.request({
            method: 'POST',
            url: '/Account/v1/Authorized',
            body: {
                userName: username,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            Cypress.log({
                name: 'Validar autorização',
                message: 'Autorização do usuário verificada com sucesso.'
            });
        });
    });
});
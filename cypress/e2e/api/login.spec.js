describe("Login functional test", () => {
  it("Should login successfully", () => {
    cy.api({
      method: "POST",
      url: Cypress.config("baseUrl") + "/login",
      body: {
        email: "fulano@qa.com",
        password: "teste",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Login realizado com sucesso");
      expect(response.body.authorization).to.match(
        /^Bearer [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
      );
    });
  });

  it("Should validate incorrect password", () => {
    cy.api({
      method: "POST",
      url: Cypress.config("baseUrl") + "/login",
      body: {
        email: "fulano@qa.com",
        password: "incorrectPassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Email e/ou senha inválidos");
    });
  });
});

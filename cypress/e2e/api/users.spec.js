import { faker } from "@faker-js/faker";

describe("Register functional test", () => {
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  it("Should registered a user", () => {
    cy.api({
      method: "POST",
      url: Cypress.config("baseUrl") + "/usuarios",
      body: {
        nome: name,
        email: email,
        password: password,
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  });

  it("Should list registered users", () => {
    const encodedName = name.replace(/ /g, "%20");
    const encodedEmail = email.replace(/@/g, "%40");

    cy.api({
      method: "GET",
      url:
        Cypress.config("baseUrl") +
        `/usuarios?nome=${encodedName}&email=${encodedEmail}&password=${password}&administrador=true`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("quantidade", 1);
      expect(response.body).to.have.property("usuarios").that.is.an("array");
      const expectedUser = {
        nome: name,
        email: email,
        password: password,
        administrador: "true",
      };

      expect(Cypress._.omit(response.body.usuarios[0], "_id")).to.deep.equal(expectedUser);
    });
  });

  it("Should search user by id", () => {
    cy.getUserId().then((data) => {
      cy.api({
        method: "GET",
        url: Cypress.config("baseUrl") + `/usuarios/${data._id}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          nome: data.nome,
          email: data.email,
          password: data.password,
          administrador: data.administrador,
          _id: data._id,
        });
      });
    });
  });
});

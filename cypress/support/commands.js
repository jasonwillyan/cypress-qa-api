Cypress.Commands.add("login", () => {
  cy.visit("https://front.serverest.dev/login");

  cy.get("[data-testid='email']").type("fulano@qa.com");
  cy.get("[data-testid='senha']").type("teste");
  cy.get("[data-testid='entrar']").click();
  cy.get("[data-testid='listarUsuarios']").click();
});

Cypress.Commands.add("getTableRowData", () => {
  cy.login();

  cy.get("#root td")
    .last()
    .parent()
    .as("tableRow")
    .then(() => {
      cy.get("@tableRow")
        .find("td")
        .then(($td) => {
          const rowData = {
            nome: $td.eq(0).text(),
            email: $td.eq(1).text(),
            senha: $td.eq(2).text(),
            administrador: $td.eq(3).text(),
          };

          return cy.wrap(rowData);
        });
    });
});

Cypress.Commands.add("getUserId", () => {
  cy.getTableRowData().then((data) => {
    const encodedName = data.nome.replace(/ /g, "%20");
    const encodedEmail = data.email.replace(/@/g, "%40");

    cy.api({
      method: "GET",
      url:
        Cypress.config("baseUrl") +
        `/usuarios?nome=${encodedName}&email=${encodedEmail}&password=${data.senha}&administrador=${data.administrador}`,
    }).then((response) => {
      
      return response.body.usuarios[0];
    });
  });
});

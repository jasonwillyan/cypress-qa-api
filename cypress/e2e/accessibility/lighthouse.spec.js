describe("Lighthouse Metrics Testing: Performance, SEO, Best Practices, and Accessibility", function () {
  it("Lighthouse Metrics Test", function () {
    cy.visit(Cypress.config().baseUrl);
 
    cy.lighthouse(
    {
      performance: 35,
      accessibility: 55,
      "best-practices": 40,
      seo: 45,
    },
    {
      formFactor: "desktop",
      screenEmulation: {
        mobile: false,
        disable: false,
        deviceScaleRatio: 1,
      },
    });
  });
});

describe("Contracts App", () => {
  beforeEach(() => {
    cy.visit("https://contracts-x.palaceresorts-dev.com");
  });

  it("Frontpage can be loaded", () => {
    cy.contains("Intelligence");
  });

  it("User can login", () => {
    // cy.get('input:first').type('rdzul');
    // cy.get('[name="username"]').first().type('rdzul');
    // cy.get('[name="username"]').first().type('rdzul');
    cy.get("input").first().type("rdzul");
    cy.get("input").last().type("Palace2022");
    cy.get("#login-button").click();
    cy.location("pathname", { timeout: 20000 }).should("equal", "/");
    cy.contains("Rodolfo Rafael Dzul Cetina");
  });
});

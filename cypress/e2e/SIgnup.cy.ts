describe("Signup", () => {
  it("Try to create account with different passwords", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Signup").click();
    cy.wait(500);

    cy.get("input").eq(0).type("Cypress");
    cy.get("input").eq(1).type("123");
    cy.get("input").eq(2).type("123");

    cy.get("form").submit();
    cy.wait(500);

    cy.get('[data-cy="feedback-message"]').should(($p) => {
      expect($p).to.contain("Please select our faction!");
    });
  });

  it("Create account", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Signup").click();
    cy.wait(500);

    cy.get("input").eq(0).type("Cypress");
    cy.get("input").eq(1).type("123");
    cy.get("input").eq(2).type("123");

    cy.get(`[data-cy = "dropdown"]`).should(`have.value`, ``);
    cy.get('[data-cy="dropdown"]').click();

    cy.get('[data-cy="dropdown-option-CORSAIRS"]').click();
    cy.get("form").submit();
    cy.wait(500);

    cy.location("pathname").should("eq", "/");
  });
});

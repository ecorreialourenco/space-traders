describe("Login", () => {
  it("Try to login with wrong credentials", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("cypress");
    cy.get("input").eq(1).type("123");
    cy.get('[data-cy="login-button"]').click();
    cy.wait(500);

    cy.get('[data-cy="feedback-message"]').should(($p) => {
      expect($p).to.contain("Username or password doesn't match");
    });
  });

  it("Login with correct credentials", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("ecorreia");
    cy.get("input").eq(1).type("123");
    cy.get("form").submit();
    cy.wait(500);

    cy.location("pathname").should("eq", "/");
  });
});

describe("Theme Change Tests", () => {
  beforeEach(() => {
    cy.visit("https://pomo-hero-dev.web.app/");
  });

  it("Tests clicking to toggle theme", () => {
    //checks if default theme is image
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").should("have.attr", "title", "Simple Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors2.css");

    //checks that clicking actually changes css to proper values
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Complex Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors.css");

    //checks that theme returns to original values when clicked again
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Simple Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors2.css");

  });

});

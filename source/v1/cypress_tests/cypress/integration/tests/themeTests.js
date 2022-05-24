describe("Theme Change Tests", () => {
  beforeEach(() => {
    cy.visit("https://powelldoro.web.app/");
  });

  it("Tests clicking to toggle theme", () => {
    cy.get(".close2").eq(1).trigger("click");
    //checks if default theme is image
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").should("have.attr", "title", "Dark Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-forest.css");

    //checks that clicking actually changes css to proper values
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Forest Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-dark.css");

    //checks that theme returns to original values when clicked again
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Dark Theme");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-forest.css");

  });

});

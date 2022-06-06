describe("Theme Change Tests", () => {
  beforeEach(() => {
    cy.visit("https://powelldoro.web.app/");
    cy.get('welcome-box > #welcome > .close2').click();
    cy.get("#sett-btn").trigger("click");
  });

  it("Tests clicking to toggle theme", () => {
    //checks if default theme is image
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").should("have.attr", "title", "Stars Theme (c)");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-stars.css");

    //checks that clicking actually changes css to proper values
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Forest Theme (c)");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-forest.css");

    //checks that theme returns to original values when clicked again
    cy.get("#theme-btn").should("not.be.hidden");
    cy.get("#theme-btn").click();
    cy.get("#theme-btn").should("have.attr", "title", "Stars Theme (c)");
    cy.get("link").its("1").should("have.attr", "href", "./css/colors-stars.css");

  });

});

describe("Instruction Box Tests", () => {
  beforeEach(() => {
    cy.visit("https://powelldoro.web.app/");
  });

  it("Tests clicking to open and close instructions", () => {

    // Welcome Box is Open
    cy.get('welcome-box > #welcome > .close2').click();


    //checks if shown when clicked
    cy.get("#info-btn-new").trigger("click");
    cy.get("instructions-box").should("not.be.hidden");

    //checks if hidden after closed
    cy.get("#close-inst").trigger("click");
    cy.get("instructions-box").should("be.hidden");

    //checks if shown when clicked
    cy.get("#info-btn-new").trigger("click");
    cy.get("instructions-box").should("not.be.hidden");

    //checks if hidden after closed
    cy.get("#close-inst").trigger("click");
    cy.get("instructions-box").should("be.hidden");

  });

});

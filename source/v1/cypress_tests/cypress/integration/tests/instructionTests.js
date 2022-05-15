describe("Instruction Box Tests", () => {
  beforeEach(() => {
    cy.visit("https://powelldoro.web.app/");
  });

  it("Tests clicking to open and close instructions", () => {

    cy.window().then((win) => {
      const n_prevDate = JSON.parse(win.localStorage.getItem("n_prevDate"));
      
      if (n_prevDate < 30) {
        //checks if hidden initially
        cy.get("instructions-box").should("be.hidden");
      } else {
        //checks if shown because it has been at least 30 days
        cy.get("instructions-box").should("be.instructions-section-open");
      }
    })


    //checks if shown when clicked
    cy.get("#info-btn-new").trigger("click");
    cy.get("instructions-box").should("not.be.hidden");

    //checks if hidden after closed
    cy.get(".close2").trigger("click");
    cy.get("instructions-box").should("be.hidden");

    //checks if shown when clicked
    cy.get("#info-btn-new").trigger("click");
    cy.get("instructions-box").should("not.be.hidden");

    //checks if hidden after closed
    cy.get(".close2").trigger("click");
    cy.get("instructions-box").should("be.hidden");

  });

});

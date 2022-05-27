describe("Error Notification Box Tests", () => {
    beforeEach(() => {
      cy.visit("https://powelldoro.web.app/");
    });
  
    it("Tests clicking to open and close notification", () => {
  
      cy.window().then((win) => {
        const b_showErrorNotification = JSON.parse(win.localStorage.getItem("safari-error-notification"));
        let b_isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

        if (b_isSafari && (b_showErrorNotification == null || b_showErrorNotification == false || 
                                b_showErrorNotification == "false")){
          //checks if shown when it's the first time 
          cy.get("notification-box").should("be.notification-section-open");
        } else {
          //checks if shown because it has been at least 30 days
          cy.get("notification-box").should("be.hidden");
        }
      })
  
  
      //checks if shown when clicked
      cy.get("#info-btn-new").trigger("click");
      cy.get("notification-box").should("not.be.hidden");
  
      //checks if hidden after closed
      cy.get(".close2").trigger("click");
      cy.get("notification-box").should("be.hidden");
  
      //checks if shown when clicked
      cy.get("#info-btn-new").trigger("click");
      cy.get("notification-box").should("not.be.hidden");
  
      //checks if hidden after closed
      cy.get(".close2").trigger("click");
      cy.get("notification-box").should("be.hidden");
  
    });
  
  });
  
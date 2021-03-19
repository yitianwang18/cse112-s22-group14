describe("Notification Tests", () => {
    beforeEach(() => {
        cy.visit("https://pomo-hero-dev.web.app/");
    });

    it("Tests alert when notifications are not supported", () => {
        //no notifs in browser, so it deletes notifs
        cy.visit("https://pomo-hero-dev.web.app/", {
            onBeforeLoad(window) {
                delete window.Notification;
            },
        });

        //adds task and starts session
        cy.on("window:alert", cy.stub().as("alerted"));
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks if alert shows up
        cy.get("@alerted")
            .should("have.been.calledOnce")
            .and("have.been.calledWith", "This browser does not support desktop notifications.");
    });

    it("Notifs not allowed, no new notifs created", () => {
        //checks if notifs exist and then asks for permission, which is denied
        cy.window().should("have.property", "Notification").should("be.a", "function");
        cy.stub(window.Notification, "permission", "denied");
        cy.stub(window.Notification, "requestPermission").resolves("denied").as("ask");
        cy.stub(window, "Notification").as("Notification");

        //adds task and starts session
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks that no notifs were created
        cy.get("@Notification").should("not.have.been.called");
        cy.get("#end-btn").trigger("click");
    });

    it("Test 1 cycle with asking permission", () => {
        cy.window().should("have.property", "Notification").should("be.a", "function");
        cy.visit("https://pomo-hero-dev.web.app/", {
            //before page loads stubs notifs to access them
            onBeforeLoad(window) {
                cy.stub(window.Notification, "permission", "unknown");
                cy.stub(window.Notification, "requestPermission").resolves("granted").as("ask");
                cy.stub(window, "Notification").as("Notification");
            },
        });

        //checks for debug mode and toggles if necessary
        cy.document().then((doc) => {
            cy.window().its("customElements").then(x => {
                if (!x.get("timer-element").DEBUG) {
                    doc.querySelector("timer-element").toggleDebug();
                }
            });
        });

        //ads task and starts session
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks if proper notif is sent at correct time interval for 1 cycle
        cy.get("@ask")
            .should("have.been.calledOnce")
            .and("have.been.calledBefore", cy.get("@Notification"));

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a long break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.get("#end-btn").trigger("click");
    });

    it("Test 1 cycle when permission is already granted", () => {
        cy.window().should("have.property", "Notification").should("be.a", "function");
        cy.visit("https://pomo-hero-dev.web.app/", {
            //before page loads stubs notifs to access them    
            onBeforeLoad(window) {
                cy.stub(window.Notification, "permission", "granted");
                cy.stub(window, "Notification").as("Notification");

            },
        });

        //checks for debug mode and toggles if necessary
        cy.document().then((doc) => {
            cy.window().its("customElements").then(x => {
                if (!x.get("timer-element").DEBUG) {
                    doc.querySelector("timer-element").toggleDebug();
                }
            });
        });

        //adds task and starts session
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks if proper notif is sent at correct time interval for 1 cycle
        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time for a long break!");
        cy.wait(3000);

        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.get("#end-btn").trigger("click");
    });

    it("Test 1 cycle with notifs not allowed", () => {
        cy.window().should("have.property", "Notification").should("be.a", "function");
        cy.visit("https://pomo-hero-dev.web.app/", {
            //before page loads stubs notifs to access them      
            onBeforeLoad(window) {
                cy.stub(window.Notification, "permission", "denied");
                cy.stub(window, "Notification").as("Notification");

            },
        });

        //checks for debug mode and toggles if necessary
        cy.document().then((doc) => {
            cy.window().its("customElements").then(x => {
                if (!x.get("timer-element").DEBUG) {
                    doc.querySelector("timer-element").toggleDebug();
                }
            });
        });

        //adds task and starts session
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks that no notifs are sent for 1 cycle
        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time for a short break!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time to start the next work session!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time for a long break!");
        cy.wait(3000);

        cy.get("@Notification").should("not.have.been.calledWithNew").and("not.have.been.calledWith", "Time to start the next work session!");
        cy.get("#end-btn").trigger("click");
    });

    it("Test notifs when resetting", () => {
        cy.window().should("have.property", "Notification").should("be.a", "function");
        cy.visit("https://pomo-hero-dev.web.app/", {
            //before page loads stubs notifs to access them 
            onBeforeLoad(window) {
                cy.stub(window.Notification, "permission", "granted");
                cy.stub(window, "Notification").as("Notification");

            },
        });

        //checks for debug mode and toggles if necessary
        cy.document().then((doc) => {
            cy.window().its("customElements").then(x => {
                if (!x.get("timer-element").DEBUG) {
                    doc.querySelector("timer-element").toggleDebug();
                }
            });
        });

        //adds task and starts session
        cy.get("#task-btn").trigger("click");
        cy.get("input").clear().type("t1");
        cy.get("#add-btn").trigger("click");
        cy.get("#close-task").trigger("click");
        cy.get("#start-btn").trigger("click");

        //checks if initial notif is sent
        cy.get("@Notification").should("have.been.calledWithNew").and("have.been.calledWith", "Time to start the next work session!");
        cy.wait(2000);
        cy.get("#reset-btn").trigger("click");
        cy.wait(1000);
        cy.get("#end-btn").trigger("click");
    });

});

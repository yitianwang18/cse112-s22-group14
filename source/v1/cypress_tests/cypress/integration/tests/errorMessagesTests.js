describe("Error Messages Tests", () => {
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.document().then((o_doc) => {
            if (!o_doc.querySelector("timer-element").B_DEBUG) {
                o_doc.querySelector("timer-element").toggleDebug();
            }
        });
    });

    // Testing Add error message
    it("Shows Add error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // First time opening tasklist with empty input
        cy.get("#task-btn").trigger("click");
        cy.get("#add-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Input cannot be empty");
            });

        // Non-empty input
        cy.get("#task-input").clear().type("abc");
        cy.get("#add-error").should("not.have.class", "color-error");

        // Empty input
        cy.get("#task-input").clear();
        cy.get("#add-error").should("have.class", "color-error");

        // Reopen tasklist and check error message
        cy.get("#close-task").trigger("click");
        cy.get("#task-btn").trigger("click");
        cy.get("#add-error").should("have.class", "color-error");
    });

    // Testing Edit error message
    it("Shows Edit error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input").clear().type("123");
        cy.get("#add-btn").trigger("click");

        cy.get("#edit-error").should("not.have.class", "color-error");

        // make input empty and check error
        cy.get("#all-tasks input").clear();
        cy.get("#edit-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Input cannot be empty");
            });

        // delete a task, make input empty of remaining task and check error
        cy.get("task-list #all-tasks task-item[taskid='1'] button").click();
        cy.get("#all-tasks input").clear();
        cy.get("#edit-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Input cannot be empty");
            });

        cy.get("#close-task").trigger("click");
    });

    // Testing Start error message
    it("Shows Start error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // Trigger start button
        cy.get("#start-error").should("not.have.class", "color-error");

        cy.clock();
        cy.get("#start-btn").trigger("click");
        cy.get("#start-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Cannot start session");
            });

        // Wait for 3 seconds, error message should have disappeared
        cy.tick(3000);
        cy.get("#start-error")
            .then(($o_el) => {
                expect($o_el).to.not.have.class("color-error");
                expect($o_el).to.not.contain("Cannot start session");
            });
    });

    // Testing Reset error message
    it("Shows Reset error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // Check reset error class
        cy.get("#reset-error").should("not.have.class", "color-error");

        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input").clear().type("123");
        cy.get("#add-btn").trigger("click");

        cy.get("#close-task").trigger("click");

        // Start session
        cy.clock();
        cy.get("#start-btn").trigger("click");

        // During short break, disable reset button
        cy.tick(5000);

        cy.get("#reset-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Cannot reset timer");
            });

        // After break ends
        cy.tick(3000);

        cy.get("#reset-error")
            .then(($o_el) => {
                expect($o_el).to.not.have.class("color-error");
                expect($o_el).to.not.contain("Cannot reset timer");
            });
    });

    // Testing End error message
    it("Shows End error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // Without starting session
        cy.get("#end-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Session not started");
            });

        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input").clear().type("123");
        cy.get("#add-btn").trigger("click");

        cy.get("#close-task").trigger("click");

        // Start session
        cy.get("#start-btn").trigger("click");

        cy.get("#end-error")
            .then(($o_el) => {
                expect($o_el).to.not.have.class("color-error");
                expect($o_el).to.not.contain("Session not started");
            });

        // After ending session
        cy.get("#end-btn").trigger("click");

        cy.get("#end-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Session not started");
            });
    });

    // Testing Check error message
    it("Shows Check error message", () => {
        cy.get(".close2").eq(1).trigger("click");
        // Check "check" error class
        cy.get("#check-error").should("not.be.visible");

        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input").clear().type("123");
        cy.get("#add-btn").trigger("click");

        cy.get("#close-task").trigger("click");

        // Start session
        cy.clock();
        cy.get("#start-btn").trigger("click");

        cy.get("#check-error")
            .then(($o_el) => {
                expect($o_el).to.not.have.class("color-error");
                expect($o_el).to.contain("Tasks cannot be checked off");
            });

        // During short break, disable check button
        cy.tick(5000);

        cy.get("#check-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Tasks cannot be checked off");
            });

        // After break ends
        cy.tick(3000);

        cy.get("#check-error")
            .then(($o_el) => {
                expect($o_el).to.not.have.class("color-error");
                expect($o_el).to.contain("Tasks cannot be checked off");
            });
    });
});
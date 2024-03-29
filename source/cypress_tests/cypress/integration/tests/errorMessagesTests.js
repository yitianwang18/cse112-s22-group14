describe("Error Messages Tests", () => {
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.get('welcome-box > #welcome > .close2').click();
        cy.document().then((o_doc) => {
            if (!o_doc.querySelector("timer-element").B_DEBUG) {
                o_doc.querySelector("timer-element").toggleDebug();
            }
        });
    });

    // Testing Add error message
    it("Shows Add error message", () => {

        // First time opening tasklist with empty input
        cy.get("#task-btn").trigger("click");
        cy.get("#add-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Input cannot be empty");
            });

        // Non-empty input
        cy.get("#task-input-top").clear().type("abc");
        cy.get("#add-error").should("not.have.class", "color-error");

        // Non-empty over 50 char input
        cy.get("#task-input-top").clear().type("this is not empty this is not empty this is not empty this is not empty this is not empty this is not empty ");
        cy.get("#add-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                //expect($o_el).to.contain("Input cannot be more than 50 chars long!");
            });

        // Empty input
        cy.get("#task-input-top").clear();
        cy.get("#add-error").should("have.class", "color-error");

        // Reopen tasklist and check error message
        cy.get("#close-task").trigger("click");
        cy.get("#task-btn").trigger("click");
        cy.get("#add-error").should("have.class", "color-error");
    });

    // Testing Edit error message
    it("Shows Edit error message", () => {

        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input-top").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input-top").clear().type("123");
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

        cy.get("#start-btn").trigger("click");
        cy.get("#add-error")
            .then(($o_el) => {
                expect($o_el).to.have.class("color-error");
                expect($o_el).to.contain("Can not start without tasks");
            });
        // cy.get("#add-error").should("have.class", "color-error");
        // cy.get("#add-error").should("contain", "Can not start without tasks");

        // Type, error message should have disappeared
        // cy.get("input[name=task]").type("abc");
        // cy.get("#add-btn").trigger("click");
        // cy.get("#add-error")
        //     .then(($o_el) => {
        //         expect($o_el).to.not.have.class("color-error");
        //         expect($o_el).to.not.contain("Can not start without tasks");
        //     });
    });

    // Testing Check error message
    it("Shows Check error message", () => {

        // Check "check" error class
        cy.get("#check-error").should("not.be.visible");

        // Add tasks
        cy.get("#task-btn").trigger("click");
        cy.get("#task-input-top").clear().type("abc");
        cy.get("#add-btn").trigger("click");
        cy.get("#task-input-top").clear().type("123");
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
describe("Test Tasks", () => {
    beforeEach(() => {
        cy.visit("https://pomo-hero-dev.web.app/");
    });

    it("Test add task + update task names", () => {
        // Testing add first task
        cy.get(".fa-tasks").trigger("click");
        cy.get("input[name=task]").clear().type("Do Homework");
        cy.get("input[type=text]").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
        cy.get("#add-btn").trigger("click");

        // add second task
        cy.get("input[placeholder]").type("Wash Dishes");
        cy.get("input[type='text']").then(function ($o_el) {
            expect($o_el).to.have.value("Wash Dishes");
        });
        cy.get("#add-btn").trigger("click");

        // Test that taskid is labelled correctly
        cy.get("task-item").then(function ($o_el) {
            expect($o_el).to.have.attr("taskid", 0);
        });
        cy.get("task-item").then(function ($o_el) {
            expect($o_el).to.have.attr("taskid", 0);
        });

        // Testing edit/update task 1 attribute name
        cy.get("task-item[taskid='0'] input").clear().type("Do Laundry");
        cy.get("task-item[taskid='0'] input").blur();
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Laundry");
        });

        // Testing edit/update task 2 attribute name
        cy.get("task-item[taskid='1'] input").clear().type("Wash car");
        cy.get("task-item[taskid='1'] input").blur();
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash car");
        });

    });

    it("Testin case: input task name is empty string or over character count", () => {
        // Testing add task
        cy.get(".fa-tasks").trigger("click");
        cy.get("input[type=text]").clear().type("Do Homework");
        // cy.get("#add-task").get("input").clear().type("Do Homework");
        cy.get("input[type='text']").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
        cy.get("#add-btn").trigger("click");

        // Testing edit task name with empty input
        cy.get("task-item[taskid='0'] input").clear();
        cy.get("task-item[taskid='0'] input").blur();
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });


        // Testing edit task name with string exceeding word count
        cy.get("task-item[taskid='0'] input").clear()
            .type("too long test character blah blahblah bblah blahblah blahlablah blablah blablah blablah blahhhhh");
        cy.get("task-item[taskid='0'] input").blur();
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
    });

    it("test that the task name is trimmed when spaced input given", () => {
        // Testing add task
        cy.get(".fa-tasks").trigger("click");
        cy.get("input[type=text]").clear().type("      Do Homework       ");
        cy.get("#add-btn").trigger("click");
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });


        // Testing edit task name with string exceeding word count
        cy.get("task-item[taskid='0'] input").clear()
            .type("                Do Laundry               ");
        cy.get("task-item[taskid='0'] input").blur();
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Laundry");
        });
    });

});

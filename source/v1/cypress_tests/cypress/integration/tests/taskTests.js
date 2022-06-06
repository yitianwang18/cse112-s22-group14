describe("Test Tasks", () => {
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.get('welcome-box > #welcome > .close2').click();
    });

    it("Test add task and update task", () => {
        // Testing add first task
        cy.get("#task-btn").trigger("click");
        cy.get("input[name=task]").clear().type("Do Homework");
        cy.get("input[type=text]").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
        cy.get("#add-btn").trigger("click");

        // add second task
        cy.get("input[placeholder]").type("Wash Dishes");
        cy.get("input[type=text]").then(function ($o_el) {
            expect($o_el).to.have.value("Wash Dishes");
        });
        cy.get("#add-btn").trigger("click");

        // Test that taskid is labelled correctly
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Homework");
        });
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash Dishes");
        });

        // Test that local storage stores correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Homework");
        });
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash Dishes");
        });
        
        // Testing edit/update task 1 attribute name
        cy.get("task-item[taskid='0'] input").clear().type("Do Laundry");
        cy.get("task-item[taskid='0'] input").blur();
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Laundry");
        });

        // Test that local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Laundry");
        });
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash Dishes");
        });

        // Testing edit/update task 2 attribute name
        cy.get("task-item[taskid='1'] input").clear().type("Wash car");
        cy.get("task-item[taskid='1'] input").blur();
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash car");
        });

        // Test that local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Do Laundry");
        });
        cy.get("task-item[taskid='1']").then(function ($o_el) {
            expect($o_el).to.have.attr("taskname", "Wash car");
        });
    });

    it("Test input task name is empty string or over character count", () => {
        // Testing add task
        cy.get("#task-btn").trigger("click");
        cy.get("input[type=text]").clear().type("Do Homework");
        cy.get("input[type=text]").then(function ($o_el) {
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
        //Test local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
    });

    it("Test if the task name is trimmed when spaced input given", () => {
        // Testing add task
        cy.get("#task-btn").trigger("click");
        cy.get("input[type=text]").clear().type("      Do Homework       ");
        cy.get("#add-btn").trigger("click");
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Homework");
        });
        //Test local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
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
        //Test local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("Do Laundry");
        });
    });
    it("Test add many tasks and edit part of them", () => {
        // Testing add task
        cy.get(".fa-tasks").trigger("click");
        cy.get("input[placeholder]").clear().type("task0");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task1");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task2");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task3");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task4");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task5");
        cy.get("#add-btn").trigger("click");
        cy.get("input[placeholder]").clear().type("task6");
        cy.get("#add-btn").trigger("click");
        cy.get("task-item[taskid='3'] input").type("task333333");
        cy.get("task-item[taskid='3'] input").blur();
        cy.get("task-item[taskid='5'] input").type("task555555");

        //Test local storage updates correctly
        cy.reload();
        cy.get(".fa-tasks").trigger("click");
        cy.get("task-item[taskid='0'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task0");
        });
        cy.get("task-item[taskid='1'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task1");
        });
        cy.get("task-item[taskid='2'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task2");
        });
        cy.get("task-item[taskid='3'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task3task333333");
        });
        cy.get("task-item[taskid='4'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task4");
        });
        cy.get("task-item[taskid='5'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task5");
        });
        cy.get("task-item[taskid='6'] input").then(function ($o_el) {
            expect($o_el).to.have.value("task6");
        });
    });
});

/// <reference types="Cypress" />
import { TimerContainer } from "../../../../js/timerContainer";
describe("Task List Tests", () => {
    beforeEach(() => {
        // have to change link to updated dev url to pass this test
        cy.visit("https://pomo-hero-dev.web.app/");
        cy.get(".close2").trigger("click");
        cy.document().then((o_doc) => {
            if (!o_doc.querySelector("timer-element").B_DEBUG) {
                o_doc.querySelector("timer-element").toggleDebug();
            }
            cy.spy(o_doc.querySelector("task-list"), "showTaskList");
            cy.spy(o_doc.querySelector("task-list"), "closeTaskList");
        });
    });

    it("Test showTaskList function being called correctly", () => {
        //TaskList Show button clicked
        cy.get("#task-btn").trigger("click");
        //showTaskList function called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("task-list").showTaskList).to.be.called;
        });
    });

    it("Test TaskList onShow functionality", () => {
        //Initially, TaskList is hidden
        cy.get("task-list").should("be.hidden");
        //TaskList Show button clicked
        cy.get("#task-btn").trigger("click");
        //Tasklist becomes visible
        cy.get("task-list").should("be.visible");
    });

    it("Test TaskList onClose functionality", () => {

        //TaskList is made visible 
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").should("be.visible");

        //TaskList Close button clicked
        cy.get("task-list").within(() => {
            cy.get(".close").trigger("click");
        });

        //Tasklist becomes hidden
        cy.get("task-list").should("be.hidden");

    });

    it("Test Tasklist addItem and deleteItem functionality", () => {
        // add one item
        cy.get("#task-btn").trigger("click");
        cy.get("task-list #add-task input").type("Task1");
        cy.get("task-list #add-task #add-btn").click();
        cy.get("task-list #add-task input").then(($el) => {
            expect($el).to.have.value("");
        });
        // verify presence
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(1);
            expect($el.children()[0]).to.have.attr("taskname", "Task1");
            expect($el.children()[0]).to.have.attr("taskid", 0);
        });

        // add another item
        cy.get("task-list #add-task input").type("Task2");
        cy.get("task-list #add-task #add-btn").click();

        // verify presence
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(2);
            expect($el.children()[0]).to.have.attr("taskname", "Task1");
            expect($el.children()[0]).to.have.attr("taskid", 0);
            expect($el.children()[1]).to.have.attr("taskname", "Task2");
            expect($el.children()[1]).to.have.attr("taskid", 1);
        });

        // delete the first item
        cy.get("task-list #all-tasks task-item[taskid='0'] button").click();
        // verify deletion
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(1);
            expect($el.children()[0]).to.have.attr("taskname", "Task2");
            expect($el.children()[0]).to.have.attr("taskid", 0);
        });

        // add new item
        cy.get("task-list #add-task input").type("Task3");
        cy.get("task-list #add-task #add-btn").click();
        // verify presence
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(2);
            expect($el.children()[0]).to.have.attr("taskname", "Task2");
            expect($el.children()[0]).to.have.attr("taskid", 0);
            expect($el.children()[1]).to.have.attr("taskname", "Task3");
            expect($el.children()[1]).to.have.attr("taskid", 1);
        });
    });

    it("Test TaskList functionality when Session Starts / Ends", () => {

        //TaskList made visible
        cy.get("task-list").should("be.hidden");
        cy.get("#task-btn").should("be.enabled");
        cy.get("#task-btn").trigger("click");

        //Task added in the TaskList
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });

        //Session started
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });

        //TaskList is hidden and disabled once session is started
        cy.get("task-list").should("be.hidden");
        cy.get("#task-btn").should("be.disabled");

        //Session ended
        cy.get("timer-element").within(() => {
            cy.get("#end-btn").trigger("click");
        });

        //TaskList stays hidden but is enabled once session ends
        cy.get("task-list").should("be.hidden");
        cy.get("#task-btn").should("be.enabled");

        //TaskList can be made visible once session ends
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").should("be.visible");
        cy.get("#task-btn").should("be.enabled");

        //TaskList closed
        cy.get("task-list").within(() => {
            cy.get("#close-task").trigger("click");
        });
    });

    it("Test Tasklist reordering functionality", () => {
        // add one item
        cy.get("#task-btn").trigger("click");

        // add Task1
        cy.get("task-list #add-task input").type("Task1");
        cy.get("task-list #add-task #add-btn").click();
        // add Task2
        cy.get("task-list #add-task input").type("Task2");
        cy.get("task-list #add-task #add-btn").click();
        // add Task3
        cy.get("task-list #add-task input").type("Task3");
        cy.get("task-list #add-task #add-btn").click();

        // verify presence
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(3);
            expect($el.children()[0]).to.have.attr("taskname", "Task1");
            expect($el.children()[0]).to.have.attr("taskid", 0);
            expect($el.children()[1]).to.have.attr("taskname", "Task2");
            expect($el.children()[1]).to.have.attr("taskid", 1);
            expect($el.children()[2]).to.have.attr("taskname", "Task3");
            expect($el.children()[2]).to.have.attr("taskid", 2);
        });

        // pick up Task1 and drop in between Task2 and Task3
        cy.get("task-item[taskid='0']").drag("task-item[taskid='2']", {
            target: { x: 0, y: 0 }, // applies to the drop target
            force: true, // applied to both the source and target element
        }).then((success) => {
            assert.isTrue(success);
        });

        // This is how you do it without the plugin, but very limited in sense 
        // that you can't specify an offset for where you drag to in dragover
        // cy.get("task-item[taskid='0']").trigger('dragstart');
        // cy.get("task-item[taskid='2']").trigger('dragover');
        // cy.get("task-item[taskid='2'").trigger('drop');
        cy.get("task-item[taskid='0']").trigger('dragend');



        // verify if task-list is reordered
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(3);
            expect($el.children()[0]).to.have.attr("taskname", "Task2");
            expect($el.children()[1]).to.have.attr("taskname", "Task1");
            expect($el.children()[2]).to.have.attr("taskname", "Task3");
        });

        cy.wait(1000);

        // pick up Task1 and drop after Task3
        cy.get("task-item[taskid='1']").drag("task-item[taskid='2']", {
            target: { x: 0, y: 100 }, // applies to the drop target
            force: true, // applied to both the source and target element
        }).then((success) => {
            assert.isTrue(success);
        });
        cy.get("task-item[taskid='1']").trigger('dragend');

        // verify if task-list is reordered
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(3);
            expect($el.children()[0]).to.have.attr("taskname", "Task2");
            expect($el.children()[1]).to.have.attr("taskname", "Task3");
            expect($el.children()[2]).to.have.attr("taskname", "Task1");
        });

        // verify localStorage was also updated
        cy.window().then(win => {
            const o_tasks = JSON.parse(win.localStorage.getItem("current_tasks"));
            expect(o_tasks[0]).to.eql("Task2");
            expect(o_tasks[1]).to.eql("Task3");
            expect(o_tasks[2]).to.eql("Task1");
        });
    });
});
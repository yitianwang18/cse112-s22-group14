/// <reference types="Cypress" />
describe('Task List Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    });

    it('Test TaskList onShow functionality', () => {
        cy.get('task-list').should('be.hidden');
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').should('be.visible');
    });

    it('Test TaskList onClose functionality', () => {

        cy.get('#task-btn').trigger('click');
        cy.get('task-list').should('be.visible');

        cy.get('task-list').within(() => {
            cy.get(".close").trigger('click');
        });
        cy.get('task-list').should('be.hidden');

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
            expect($el.children()[0]).to.have.attr("taskid", 1);
        });

        // add new item
        cy.get("task-list #add-task input").type("Task3");
        cy.get("task-list #add-task #add-btn").click();
        // verify presence
        cy.get("task-list #all-tasks").then(($el) => {
            expect($el.children()).to.have.length(2);
            expect($el.children()[0]).to.have.attr("taskname", "Task2");
            expect($el.children()[0]).to.have.attr("taskid", 1);
            expect($el.children()[1]).to.have.attr("taskname", "Task3");
            expect($el.children()[1]).to.have.attr("taskid", 2);
        });
    });
});
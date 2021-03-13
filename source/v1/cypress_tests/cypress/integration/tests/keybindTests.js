/// <reference types="Cypress" />

import { EventBus } from "../../../../js/eventBus.js";

describe('Keybind Integration Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
        cy.document().then((o_doc) => {
            cy.spy(o_doc.EventBus, "fireEvent");
            cy.spy(o_doc.querySelector("task-list"), "showTaskList");
        })
    });

    it('Testing t (tasklist opening)', () => {
        // opening normally
        cy.get("body").type("t");
        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("have.class", "sidenav-open");
            expect(o_doc.querySelector("task-list").showTaskList).to.be.called;
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
        });

        // opening when information box is out
        cy.get("body").type("{esc}");
        cy.get("#side-tasks").should("not.have.class", "sidenav-open");
        cy.get("#info-btn-new").click();
        cy.get("body").type("t");

        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("have.class", "sidenav-open");
            expect(o_doc.querySelector("task-list").showTaskList).to.have.callCount(2);
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
        });
    });




});

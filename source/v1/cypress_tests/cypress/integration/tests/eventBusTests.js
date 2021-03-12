import { EventBus } from "../../../../js/eventBus";
import TaskDisplay from "../../../../js/taskDisplay";

describe('Timer Container Tests', () => {
    // beforeEach(() => {
    //     cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    //     cy.document().then((doc) => {
    //         doc.querySelector('timer-element').toggleDebug();
    //     });
    // });

    // it('Test Start Button does not start session when no tasks have been added', () => {
    //     let o_task_disp;
    //     cy.document().then((doc) => {

    //         o_task_disp = doc.querySelector('task-display');

    //         const spy = cy.spy(o_task_disp, 'handleStartSession');
    //         //console.log(spy);

    //         // let o_event_bus = new EventBus();
    //         // o_event_bus.o_task_list = o_task_disp;
    //         // console.log(o_event_bus.o_task_list);
    //         // o_event_bus.handleStartSession();
    //         // cy.get('timer-element').within(() => {
    //         //     cy.get('#start-btn').trigger('click');
    //         // });

    //         let e = new EventBus();
    //         console.log(o_task_disp);
    //         e.o_task_list = doc.querySelector('task-list');
    //         e.o_task_display = o_task_disp;
    //         e.o_timer_container = doc.querySelector('timer-element');
    //         e.handleStartSession();

    //         expect(spy).to.be.called;
    //     });
    // });
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
        cy.document().then((o_doc) => {
            cy.spy(o_doc.EventBus, "fireEvent");
        })
    });
    it('Testing t (tasklist opening)', () => {
        cy.get('#task-btn').trigger('click');

        //Task added in the TaskList
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        // start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });
    });

    // beforeEach(() => {
    //     cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    //     cy.document().then((o_doc) => {
    //         cy.spy(o_doc.EventBus, "fireEvent");
    //         cy.spy(o_doc.querySelector("task-list"), "showTaskList");
    //     })
    // });
    // it('Testing t (tasklist opening)', () => {
    //     // opening
    //     cy.get("body").type("t");
    //     cy.document().then((doc) => {
    //         cy.get("#side-tasks").should("have.class", "sidenav-open");
    //         expect(doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
    //         expect(doc.querySelector("task-list").showTaskList).to.be.called;
    //     });
    //     cy.get("body").type("{esc}");
    //     cy.get("#info-btn-new").click();
    //     cy.get("body").type("t");
    //     cy.document().then((doc) => {
    //         cy.get("#side-tasks").should("have.class", "sidenav-open");
    //         expect(doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
    //     });
    // });

    // beforeEach(() => {
    //     cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    //     cy.document().then((o_doc) => {
    //         cy.spy(o_doc.EventBus, "fireEvent");
    //         cy.spy(o_doc.querySelector("task-list"), "showTaskList");
    //     })
    // });
    // it('Testing t (tasklist opening)', () => {
    //     // opening
    //     cy.get("body").type("t");
    //     cy.document().then((o_doc) => {
    //         cy.get("#side-tasks").should("have.class", "sidenav-open");
    //         expect(o_doc.querySelector("task-list").showTaskList).to.be.called;
    //         expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
            
    //     });
    //     cy.get("body").type("{esc}");
    //     cy.get("#info-btn-new").click();
    //     cy.get("body").type("t");
    //     cy.document().then((o_doc) => {
    //         cy.get("#side-tasks").should("have.class", "sidenav-open");
    //         expect(o_doc.querySelector("task-list").showTaskList).to.have.callCount(2);
    //         expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
    //     });
    // });


});
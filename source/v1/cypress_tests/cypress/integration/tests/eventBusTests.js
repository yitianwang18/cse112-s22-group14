import { EventBus } from "../../../../js/eventBus";
import TaskDisplay from "../../../../js/taskDisplay";

describe('Testing Event Bus', () => {
    
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
        cy.document().then((o_doc) => {
            o_doc.querySelector('timer-element').toggleDebug();
            cy.spy(o_doc.EventBus, "fireEvent");
            
        });
    });

    // it('Test all events are registered correctly', () => {
    //     // cy.document().then((o_doc) => {
    //     //     cy.spy(o_doc.EventBus, "registerEvent");
    //     //     expect(o_doc.EventBus.registerEvent).to.have.callCount(6);
    //     // });
    //     cy.spy()
    // });

    it('Test "Start Session" event is fired correctly', () => {
        //Task added in the TaskList
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        //'startSession' Event fired
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });
    });

    it('Test "End Session" event is fired correctly', () => {
        //Task added in the TaskList
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        // End session
        cy.get("timer-element").within(() => {
            cy.get('#end-btn').trigger('click');
        });
        //'endSession' Event fired
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("endSession");
        });
    });

    it('Test "next Task" event is fired correctly', () => {
        //Add 2 Tasks in the TaskList
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#task-input').clear().type('Second Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        // Check Current Task as completed
        cy.get('task-display').within(() => {
            cy.get("#check").trigger('click');
        });
        //'nextTask' Event fired
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
        });
    });

    // it('Test "fetch Task" event is fired correctly', () => {
    //     //Add 2 Tasks in the TaskList
    //     cy.get('#task-btn').trigger('click');
    //     cy.get('task-list').within(() => {
    //         cy.get('#task-input').clear().type('First Test Task');
    //         cy.get('#add-btn').trigger('click');
    //         cy.get('#task-input').clear().type('Second Test Task');
    //         cy.get('#add-btn').trigger('click');
    //         cy.get('#close-task').trigger('click');
    //     });
    //     // Start session
    //     cy.get("timer-element").within(() => {
    //         cy.get('#start-btn').trigger('click');
    //     });
    //     // Check Current Task as completed
    //     cy.get('task-display').within(() => {
    //         cy.get("#check").trigger('click');
    //     });
    //     //'fetchTask' Event fired
    //     cy.document().then((doc) => {
    //         expect(doc.EventBus.fireEvent).to.be.calledWithExactly("fetchTask");
    //     });
    // });

    it('Test "start Break" event is fired correctly', () => {
        //Add a Task in the TaskList
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        cy.clock();
        // Start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        // Wait for break
        cy.tick(3100);
        //'startBreak' Event fired
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("startBreak");
        });
    });

    it('Test "start Work" event is fired correctly', () => {
        //Add a Task in the TaskList
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');
            cy.get('#close-task').trigger('click');
        });
        cy.clock();
        // Start session
        cy.get("timer-element").within(() => {
            cy.get('#start-btn').trigger('click');
        });
        // Wait for break
        cy.tick(3100);
        // Wait for work
        cy.tick(3100);
        //'startBreak' Event fired
        cy.document().then((doc) => {
            expect(doc.EventBus.fireEvent).to.be.calledWithExactly("startWork");
        });
    });

    
    

    


});
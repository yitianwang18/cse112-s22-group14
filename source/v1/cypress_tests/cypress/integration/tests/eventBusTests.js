describe("Testing Event Bus", () => {

    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/source/v1/index.html");
        cy.document().then((o_doc) => {
            if (!o_doc.querySelector("timer-element").DEBUG) {
                o_doc.querySelector("timer-element").toggleDebug();
            }
            cy.spy(o_doc.EventBus, "fireEvent");
        });
    });

    it("Test 'Start Session' event is fired correctly", () => {
        //Task added in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        //"startSession" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });
    });

    it("Test 'End Session' event is fired correctly", () => {
        //Task added in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        // End session
        cy.get("timer-element").within(() => {
            cy.get("#end-btn").trigger("click");
        });
        //"endSession" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("endSession");
        });
    });

    it("Test 'next Task' event is fired correctly", () => {
        //Add 2 Tasks in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#task-input").clear().type("Second Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        // Start session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        // Check Current Task as completed
        cy.get("task-display").within(() => {
            cy.get("#check").trigger("click");
        });
        //"nextTask" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
        });
    });

    it("Test 'start Break' event is fired correctly", () => {
        //Add a Task in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.clock();
        // Start session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        // Wait for break
        cy.tick(3100);
        //"startBreak" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startBreak");
        });
    });

    it("Test 'start Work' event is fired correctly", () => {
        //Add a Task in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.clock();
        // Start session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        // Wait for break
        cy.tick(3100);
        // Wait for work
        cy.tick(3100);
        //"startWork" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startWork");
        });
    });

    it("Test 'close Windows' event is fired correctly", () => {
        //Press the Esc key
        cy.get("body").type("{esc}");
        //"closeWindows" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("closeWindows");
        });
    });

    it("Test 'space Keybind' event is fired correctly", () => {
        //Press the Space key
        cy.get("body").type(" ");
        //"closeWindows" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("spaceKeybind");
        });
    });

    it("Test 'show Tasks' event is fired correctly", () => {
        //Press the t key
        cy.get("body").type("t");
        //"showTasks" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("showTasks");
        });
        //Close TaskList
        cy.get("task-list").within(() => {
            cy.get("#close-task").trigger("click");
        });
        //Open TaskList
        cy.get("#task-btn").trigger("click");
        //"showTasks" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("showTasks");
        });
    });

    it("Test 'reset Pomo' event is fired correctly", () => {
        //Add a Task in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        //Start Session
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        //Press the r key
        cy.get("body").type("r");
        //"resetPomo" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("resetPomo");
        });
    });

    it("Test functionality when 'Start Session' event is fired", () => {
        //Fire "startSession" with empty tasklist
        cy.get("#start-btn").trigger("click");
        //"startSession" Event fired on empty TaskList
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });
        //error thrown
        cy.get("#start-error").then(($o_el) => {
            expect($o_el).to.have.class("color-error");
            expect($o_el).to.contain("Cannot start session");
        });

        //Fire "startSession" with non-empty tasklist
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#task-input").clear().type("Second Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        //"startSession" Event fired on non-empty tasklist
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });
        //Session started with no errors
        cy.get("timer-element").within(() => {
            cy.get("#work-message").should("contain", "Pomodoro - Start working!");
        });
        //TaskList is hidden and disabled once session is started
        cy.get("task-list").should("be.hidden");
        cy.get("#task-btn").should("be.disabled");
        //Navigation Toolbar is hidden
        cy.get("nav").should("be.hidden");
        //TaskDisplay shows the correct current and next tasks
        cy.get("task-display").within(() => {
            cy.get("#current").should("contain", "First Test Task");
            cy.get("#next").should("contain", "Second Test Task");
        });
    });

    it("Test functionality when 'End Session' event is fired", () => {
        //Fire "endSession" event
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        cy.get("timer-element").within(() => {
            cy.get("#end-btn").trigger("click");
        });
        //"endSession" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("endSession");
        });
        //Session ended
        cy.get("#work-message").should("contain", "Ready to focus?");
        //TaskList is hidden but enabled once session has ended
        cy.get("task-list").should("be.hidden");
        cy.get("#task-btn").should("be.enabled");
        //Navigation Toolbar is visible
        cy.get("nav").should("be.visible");
        //Task displays become hidden
        cy.get("task-display").should("be.hidden");
    });

    it("Test functionality when 'next Task' event is fired", () => {
        //Fire "nextTask" event
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#task-input").clear().type("Second Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        cy.get("task-display").within(() => {
            cy.get("#current").should("contain", "First Test Task");
            cy.get("#next").should("contain", "Second Test Task");
        });
        cy.get("task-display").within(() => {
            cy.get("#check").trigger("click");
        });
        //"nextTask" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
        });
        //Correct tasks shown in task display
        cy.get("task-display").within(() => {
            //Current task display -> second task & Next task Display -> None
            cy.get("#current").should("contain", "Second Test Task");
            cy.get("#next").should("be.hidden");
        });
        //Fire "nextTask" event again
        cy.get("task-display").within(() => {
            cy.get("#check").trigger("click");
        });
        //"nextTask" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
        });
        //Tasks completed: Session ended
        cy.get("#work-message").should("contain", "Ready to focus?");
        //Task displays become hidden
        cy.get("task-display").should("be.hidden");
    });

    it("Test functionality when 'start Break' event is fired", () => {
        //Fire "startBreak" Event
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.clock();
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        cy.tick(3100);
        //"startBreak" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startBreak");
        });
        // Button to check Current Task as complete disabled
        cy.get("task-display").within(() => {
            cy.get("#check").should("be.disabled");
        });
    });

    it("Test functionality when 'start Work' event is fired", () => {
        //Fire "startWork" Event
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.clock();
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        cy.tick(3100);
        cy.tick(3100);
        //"startWork" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startWork");
        });
        // Button to check Current Task as complete enabled
        cy.get("task-display").within(() => {
            cy.get("#check").should("be.enabled");
        });
    });

    it("Test functionality when 'close Windows' event is fired", () => {
        //Fire "closeWindows" Event on open tasklist
        cy.get("#task-btn").trigger("click");
        cy.get("body").type("{esc}");
        //"closeWindows" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("closeWindows");
        });
        //TaskList is closed
        cy.get("task-list").should("be.hidden");

        //Fire "closeWindows" Event on open instruction modal
        cy.get("#info-btn-new").trigger("click");
        cy.get("body").type("{esc}");
        //"closeWindows" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("closeWindows");
        });
        //Instruction modal is closed
        cy.get("instructions-box").within(() => {
            cy.get("#instructions-title").should("be.hidden");
            cy.get("#instructions-para").should("be.hidden");
            cy.get("#instructions-blocker").should("be.hidden");
        });
    });

    it("Test functionality when 'Space Keybind' event is fired", () => {
        //Fire the "Space Keybind" event when the session has not started
        cy.get("body").type(" ");
        //"Space Keybind" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("spaceKeybind");
        });
        // Start session event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("startSession");
        });

        //Fire the "Space Keybind" event when the session has started
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#task-input").clear().type("Second Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        cy.get("body").type(" ");
        //"Space Keybind" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("spaceKeybind");
        });
        // End session event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("endSession");
        });
    });

    it("Test functionality when 'Show Tasks' event is fired", () => {
        //Open TaskList
        cy.get("#task-btn").trigger("click");
        //"showTasks" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("showTasks");
        });
        //TaskList is shown
        cy.get("task-list").should("be.visible");
    });

    it("Test functionality when 'Reset Pomo' event is fired", () => {
        //Add a Task in the TaskList
        cy.get("#task-btn").trigger("click");
        cy.get("task-list").within(() => {
            cy.get("#task-input").clear().type("First Test Task");
            cy.get("#add-btn").trigger("click");
            cy.get("#close-task").trigger("click");
        });
        //Start Session
        cy.clock();
        cy.get("timer-element").within(() => {
            cy.get("#start-btn").trigger("click");
        });
        //Press the r key
        cy.get("body").type("r");
        //"resetPomo" Event fired
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("resetPomo");
        });
        //Correct Reset Functionality
        cy.get("timer-element").within(() => {
            //Work cycle: Timer displays 3000ms
            cy.get("#work-message").should("contain", "Pomodoro - Start working!");
            cy.get("timer-display").then(function ($o_el) {
                expect($o_el).to.have.attr("time", 3000);
            });
            cy.tick(2000);
            //Timer runs down to 1000ms after a 2000ms pause 
            cy.get("#work-message").should("contain", "Pomodoro - Start working!");
            cy.get("timer-display").then(function ($o_el) {
                expect($o_el).to.have.attr("time", 1000);
            });
            //Reset button clicked
            cy.get("#reset-btn").should("be.enabled");
            cy.get("#reset-btn").trigger("click");
            //Timer resets to 3000ms
            cy.get("#work-message").should("contain", "Pomodoro - Start working!");
            cy.get("timer-display").then(function ($o_el) {
                expect($o_el).to.have.attr("time", 3000);
            });
            cy.tick(3100);
            //Short Break after a 3100ms pause
            cy.get("#work-message").should("contain", "Short Break - Good job!");
            cy.get("timer-display").then(function ($o_el) {
                expect($o_el).to.have.attr("time", 3000);
            });
            //Reset button disables during break
            cy.get("#reset-btn").should("be.disabled");
        });
    });
});
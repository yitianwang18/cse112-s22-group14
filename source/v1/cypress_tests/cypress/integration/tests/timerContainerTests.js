describe("Timer Container Tests", () => {
  beforeEach(() => {
    cy.visit("https://powelldoro.web.app/");
    cy.get('welcome-box > #welcome > .close2').click();
    cy.document().then((o_doc) => {
      if (!o_doc.querySelector("timer-element").B_DEBUG) {
        o_doc.querySelector("timer-element").toggleDebug();
      }
      //cy.spy(o_doc.querySelector("timer-element"), "resetPomo");
      cy.spy(o_doc.querySelector("timer-element"), "beginSession");
      cy.spy(o_doc.querySelector("timer-element"), "endSession");
      cy.spy(o_doc.querySelector("timer-element"), "progressState");
    });
  });

  it("Test beginSession function is being called correctly", () => {
    
    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    //Click Start session button
    cy.get("timer-element").within(() => {
      cy.get("#start-btn").trigger("click");
    });

    //beginSession function called
    cy.document().then((o_doc) => {
      expect(o_doc.querySelector("timer-element").beginSession).to.be.called;
    });

  });


  it("Test endSession function is being called correctly", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    //Click End Session button during Work cycle
    cy.get("timer-element").within(() => {
      cy.get("#start-btn").trigger("click");
      cy.get("#end-btn").trigger("click");
    });

    //Click End Session button during break
    cy.get("timer-element").within(() => {
      cy.clock()
      cy.get("#start-btn").trigger("click");
      cy.tick(3100);
      cy.get("#end-btn").trigger("click");
    });

    // endSession called twice
    cy.document().then((o_doc) => {
      expect(o_doc.querySelector("timer-element").endSession).to.have.callCount(2);
    });

  });

  it("Test progressState function is being called correctly", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    cy.get("timer-element").within(() => {

      cy.clock();

      //Session started
      cy.get("#start-btn").trigger("click");

      //Work: progressState called once by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(1);
      });

      cy.tick(3100);

      //Short Break: progressState called twice by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(2);
      });

      cy.tick(3100);

      //Work: progressState called thrice by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(3);
      });

      cy.tick(3100);

      //Short Break: progressState called four times by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(4);
      });

      cy.tick(3100);

      //Work: progressState called five times by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(5);
      });

      cy.tick(3100);

      //Short Break: progressState called six times by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(6);
      });

      cy.tick(3100);

      //Work: progressState called seven times by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(7);
      });

      cy.tick(3100);

      //Long Break: progressState called eight times by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(8);
      });

      cy.tick(3100);

      //Work: progressState called ninetimes by now
      cy.document().then((o_doc) => {
        expect(o_doc.querySelector("timer-element").progressState).to.have.callCount(9);
      });

    });
  });

  it("Test Start Button does not start session when no tasks have been added", () => {

    //Session doesnot start when start button is clicked
    cy.get("timer-element").within(() => {
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("#start-btn").trigger("click");
      cy.get("#work-message").should("contain", "Ready to focus?");
    });

    //A task is added
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    //Session starts when start button is clicked
    cy.get("timer-element").within(() => {
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("#start-btn").trigger("click");
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
    });
  });

  it("Test Start Button functionality", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    cy.get("timer-element").within(() => {
      cy.clock();

      //Session not started
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", -1);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

      //Start button clicked
      cy.get("#start-btn").trigger("click");

      //Session started
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

      //Start button is not clickable if session is already started
      cy.get("#start-btn").should("be.hidden");

    });
  });

  it("Test End Button functionality", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    cy.get("timer-element").within(() => {
      cy.clock();

      //Session started
      cy.get("#start-btn").trigger("click");
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
      });

      //End button clicked during work cycle
      cy.get("#end-btn").trigger("click");

      //Session ended
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", -1);
      });

      //Session started
      cy.get("#start-btn").trigger("click");
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

      //End button clicked during break
      cy.get("#end-btn").trigger("click");

      //Session Ended
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", -1);
      });
    });
  });

  it("Test Timer Countdown", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    cy.get("timer-element").within(() => {
      cy.clock();

      //Session started
      cy.get("#start-btn").trigger("click");

      //Timer displays 3000ms (Work cycle duration)
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
      });

      cy.tick(1000);

      //Timer runs down to 2000ms after a 1000ms pause
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 2000);
      });

      cy.tick(1000);

      //Timer runs down to 1000ms after a 1000ms pause
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 1000);
      });

      cy.tick(1000);

      //Timer runs down to 0ms after a 1000ms pause
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
      });
    });


  });

  it("Test TimerContainer for the whole Pomodoro Life Cycle", () => {

    //Task added so that session could be started for testing
    cy.get("#task-btn").trigger("click");
    cy.get("task-list").within(() => {
      cy.get("#task-input-top").clear().type("First Test Task");
      cy.get("#add-btn").trigger("click");
      cy.get("#close-task").trigger("click");
    });

    cy.get("timer-element").within(() => {

      cy.clock();

      //Initially, Session not started
      cy.get("#work-message").should("contain", "Ready to focus?");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", -1);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

      //Start button clicked; Session started
      cy.get("#start-btn").trigger("click");

      //Session enters Work cycle; Timer displays 3000ms (Work cycle duration); 0 pomos completed
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short break duration); 1 pomos completed
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 1);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 1);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 1 pomos completed
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 1);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 1);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short Break duration); 2 pomos completed
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 2);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 2);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 2 pomos completed
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 2);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 2);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short Break duration); 3 pomos completed
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 3);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Short Break - Good job!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 3);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 3 pomos completed
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 3);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 3);
      });

      cy.tick(100);

      //Session enters Long Break cycle; Timer displays 3000ms (Long Break duration); 4 pomos completed
      cy.get("#work-message").should("contain", "Long Break - Relax");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 4);
      });

      cy.tick(3000);

      //Session still in Long Break Cycle after 3000ms; Timer displays 0ms
      cy.get("#work-message").should("contain", "Long Break - Relax");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 0);
        expect($o_el).to.have.attr("pomos-comp", 4);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); pomos completed reset to 0 after the whole Pomodoro cycle ends
      cy.get("#work-message").should("contain", "Pomodoro - Start working!");
      cy.get("timer-display").then(function ($o_el) {
        expect($o_el).to.have.attr("time", 3000);
        expect($o_el).to.have.attr("pomos-comp", 0);
      });

    });
  });
});
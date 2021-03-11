import { TimerContainer } from "../../../../js/timerContainer.js";
describe('Timer Container Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    cy.document().then((doc) => {
      doc.querySelector('timer-element').toggleDebug();
    });
  });
  
  it('Test Start Button does not start session when no tasks have been added', () => {

    //Session doesnot start when start button is clicked
    cy.get('timer-element').within(() => {
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('#start-btn').trigger('click');
      cy.get('#work-message').should('contain', 'Ready to focus?');
    });
  
    //A task is added
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    //Session starts when start button is clicked
    cy.get('timer-element').within(() => {
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('#start-btn').trigger('click');
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
    });
  });

  it('Test Start Button / Reset Button Toggle', () => {

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      
      //Initially start button is visible and reset button is not
      cy.get('#start-btn').should('be.visible');
      cy.get('#reset-btn').should('be.hidden');

      //Session started
      cy.get('#start-btn').trigger('click');

      //Reset button is visible and start button is not
      cy.get('#start-btn').should('be.hidden');
      cy.get('#reset-btn').should('be.visible');

      //Session reset
      cy.get('#reset-btn').trigger('click');

      //Reset button is still visible and start button is not
      cy.get('#start-btn').should('be.hidden');
      cy.get('#reset-btn').should('be.visible');

      //Session ended
      cy.get('#end-btn').trigger('click');

      //Start button is visible and reset button is not
      cy.get('#start-btn').should('be.visible');
      cy.get('#reset-btn').should('be.hidden');

    });
  });

  it('Test Start Button functionality', () => {

    

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      cy.clock();

      //Session not started
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
        expect($el).to.have.attr('pomos-comp', 0);
      });
      
      //Start button clicked
      cy.get('#start-btn').trigger('click');

      //Session started
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      //Start button is not clickable if session is already started
      cy.get('#start-btn').should('be.hidden');

    });
  });

  it('Test Reset Button functionality', () => {

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      cy.clock();

      //Session started
      cy.get('#start-btn').trigger('click');

      //Work cycle: Timer displays 3000ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(2000);

      //Timer runs down to 100000ms after a 1400000ms pause 
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 1000);
      });

      //Reset button clicked
      cy.get('#reset-btn').should('be.enabled');
      cy.get('#reset-btn').trigger('click');

      //Timer resets to 3000ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(3100);

      //Short Break after a 3100ms pause
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      //Reset button disables during break
      cy.get('#reset-btn').should('be.disabled');

      cy.tick(3100);

      //Work cycle after a 3100ms pause
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      //Reset button re-enabled for work cycle
      cy.get('#reset-btn').should('be.enabled');

    });
  });

  it('Test End Button functionality', () => {

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      cy.clock();

      //Session started
      cy.get('#start-btn').trigger('click');
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      //End button clicked during work cycle
      cy.get('#end-btn').trigger('click');

      //Session ended
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
      });

      //Session started
      cy.get('#start-btn').trigger('click');
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(3100);

      //Short Break after a 3100ms pause
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      //End button clicked during break
      cy.get('#end-btn').trigger('click');

      //Session Ended
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
      });
    });
  });

  it('Test Timer Countdown', () => {

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      cy.clock();

      //Session started
      cy.get('#start-btn').trigger('click');

      //Timer displays 3000ms (Work cycle duration)
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(1000);

      //Timer runs down to 2000ms after a 1000ms pause
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 2000);
      });

      cy.tick(1000);

      //Timer runs down to 1000ms after a 1000ms pause
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 1000);
      });

      cy.tick(1000);

      //Timer runs down to 0ms after a 1000ms pause
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
      });
    });


  });

  it('Test TimerContainer for the whole Pomodoro Life Cycle', () => {

    //Task added so that session could be started for testing
    cy.get('#task-btn').trigger('click');
    cy.get('task-list').within(() => {
      cy.get('#task-input').clear().type('First Test Task');
      cy.get('#add-btn').trigger('click');
      cy.get('#close-task').trigger('click');
    });

    cy.get('timer-element').within(() => {
      
      cy.clock();

      //Initially, Session not started
      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      //Start button clicked; Session started
      cy.get('#start-btn').trigger('click');
      
      //Session enters Work cycle; Timer displays 3000ms (Work cycle duration); 0 pomos completed
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });
      
      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short break duration); 1 pomos completed
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 1 pomos completed
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short Break duration); 2 pomos completed
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 2 pomos completed
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(100);

      //Session enters Short Break cycle; Timer displays 3000ms (Short Break duration); 3 pomos completed
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(3000);

      //Session still in Short Break Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); 3 pomos completed
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(3000);

      //Session still in Work Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(100);

      //Session enters Long Break cycle; Timer displays 3000ms (Long Break duration); 4 pomos completed
      cy.get('#work-message').should('contain', 'Long Break - Relax');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 4);
      });

      cy.tick(3000);

      //Session still in Long Break Cycle after 3000ms; Timer displays 0ms
      cy.get('#work-message').should('contain', 'Long Break - Relax');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 4);
      });

      cy.tick(100);

      //Session enters Work cycle; Timer displays 3000ms (Work duration); pomos completed reset to 0 after the whole Pomodoro cycle ends
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });
    
    });
  });
});
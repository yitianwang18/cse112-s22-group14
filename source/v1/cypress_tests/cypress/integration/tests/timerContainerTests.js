describe('Timer Container Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source/v1/index.html');
  });

  it('Test Start Button / Reset Button Toggle', () => {
    cy.get('timer-element').within(() => {

      cy.get('#start-btn').should('be.visible');
      cy.get('#reset-btn').should('be.hidden');

      cy.get('#start-btn').trigger('click');

      cy.get('#start-btn').should('be.hidden');
      cy.get('#reset-btn').should('be.visible');

      cy.get('#reset-btn').trigger('click');

      cy.get('#start-btn').should('be.hidden');
      cy.get('#reset-btn').should('be.visible');

      cy.get('#end-btn').trigger('click');

      cy.get('#start-btn').should('be.visible');
      cy.get('#reset-btn').should('be.hidden');

    });
  });

  it('Test Start Button functionality', () => {
    cy.get('timer-element').within(() => {
      cy.clock();

      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      cy.get('#start-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      cy.get('#start-btn').should('be.hidden');

    });
  });

  it('Test Reset Button functionality', () => {
    cy.get('timer-element').within(() => {
      cy.clock();

      cy.get('#start-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(2000);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 1000);
      });

      cy.get('#reset-btn').should('be.enabled');
      cy.get('#reset-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(3100);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.get('#reset-btn').should('be.disabled');

      cy.tick(3100);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.get('#reset-btn').should('be.enabled');

    });
  });

  it('Test End Button functionality', () => {
    cy.get('timer-element').within(() => {
      cy.clock();

      cy.get('#start-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.get('#end-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
      });

      cy.get('#start-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(3100);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.get('#end-btn').trigger('click');

      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
      });

    });
  });

  it('Test Timer Countdown', () => {
    cy.get('timer-element').within(() => {
      cy.clock();
      cy.get('#start-btn').trigger('click');

      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
      });

      cy.tick(1000);

      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 2000);
      });

      cy.tick(1000);

      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 1000);
      });

      cy.tick(1000);

      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
      });
    });


  });

  it('Test User Life Cycle', () => {
    cy.get('timer-element').within(() => {
      
      cy.clock();

      cy.get('#work-message').should('contain', 'Ready to focus?');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', -1);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      cy.get('#start-btn').trigger('click');
      
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });
      
      cy.tick(3000);
      
      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 0);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 1);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 2);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Short Break - Good job!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 3);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Long Break - Relax and unwind');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 4);
      });

      cy.tick(3000);

      cy.get('#work-message').should('contain', 'Long Break - Relax and unwind');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 0);
        expect($el).to.have.attr('pomos-comp', 4);
      });

      cy.tick(100);

      cy.get('#work-message').should('contain', 'Pomodoro - Start working!');
      cy.get('timer-display').then(function ($el) {
        expect($el).to.have.attr('time', 3000);
        expect($el).to.have.attr('pomos-comp', 0);
      });
    
    });
  });

  

});
describe('Timer Container Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    });

    it('Test Timer Display Functionality when Session Starts and Ends', () => {
        //cy.get('#task-btn').trigger('click');

        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Second Test Task');
            cy.get('#add-btn').trigger('click');
        });

        cy.get('timer-element').within(() => {
            cy.get("#start-btn").trigger('click');
        });

        cy.get('task-display').within(() => {
            cy.get("#current").should('contain', 'First Test Task');
            cy.get("#next").should('contain', 'Second Test Task');
        });

        cy.get('timer-element').within(() => {
            cy.get("#end-btn").trigger('click');
        });

        cy.get('task-display').should('be.hidden');

    });

    it('Test Timer Display Functionality when Check button is pressed', () => {
        //cy.get('#task-btn').trigger('click');

        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Second Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Third Test Task');
            cy.get('#add-btn').trigger('click');
        });

        cy.get('timer-element').within(() => {
            cy.get("#start-btn").trigger('click');
        });

        cy.get('task-display').within(() => {
            cy.get("#current").should('contain', 'First Test Task');
            cy.get("#next").should('contain', 'Second Test Task');

            cy.get("#check").trigger('click');

            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');

        });
    });

    it('Test Check button is disabled during Break', () => {
        cy.clock()

        //cy.get('#task-btn').trigger('click');

        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Second Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Third Test Task');
            cy.get('#add-btn').trigger('click');
        });

        cy.get('timer-element').within(() => {
            cy.get("#start-btn").trigger('click');
        });

        cy.get('task-display').within(() => {
            cy.get("#current").should('contain', 'First Test Task');
            cy.get("#next").should('contain', 'Second Test Task');

            cy.get("#check").trigger('click');
            
            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');

            cy.tick(3100);
            
            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');
            
            cy.get("#check").should('be.disabled');

            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');
            
            cy.tick(3100);
            
            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');

            cy.get("#check").trigger('click');

            cy.get("#current").should('contain', 'Third Test Task');
            cy.get("#next").should('be.hidden');

        });
    });

    it('Test Timer Display Functionality on Task Completion', () => {
        cy.clock()

        //cy.get('#task-btn').trigger('click');

        cy.get('task-list').within(() => {
            cy.get('#task-input').clear().type('First Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Second Test Task');
            cy.get('#add-btn').trigger('click');

            cy.get('#task-input').clear().type('Third Test Task');
            cy.get('#add-btn').trigger('click');
        });

        cy.get('timer-element').within(() => {
            cy.get("#start-btn").trigger('click');
        });

        cy.get('task-display').within(() => {
            cy.get("#current").should('contain', 'First Test Task');
            cy.get("#next").should('contain', 'Second Test Task');

            cy.get("#check").trigger('click');

            cy.get("#current").should('contain', 'Second Test Task');
            cy.get("#next").should('contain', 'Third Test Task');

            cy.get("#check").trigger('click');
            
            cy.get("#current").should('contain', 'Third Test Task');
            cy.get("#next").should('be.hidden');

            cy.get("#check").trigger('click');

            cy.get("#current").should('be.hidden');
            cy.get("#next").should('be.hidden');

        });

        cy.get('timer-element').within(() => {
            cy.get('#work-message').should('contain', 'Ready to focus?');
        });
    });
});
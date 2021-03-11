describe('Notification Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html');
    });

    it('Tests alert when notifications are not supported', () => {                 
        cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html', {
          onBeforeLoad (window) {
            delete window.Notification;
          },
        });
      
        cy.on('window:alert', cy.stub().as('alerted'));
        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');
        cy.get('@alerted')
          .should('have.been.calledOnce')
          .and('have.been.calledWith', 'This browser does not support desktop notifications.');
    });

    it('Notifs not allowed, no new notifs created', () => {
        cy.window().should('have.property', 'Notification').should('be.a', 'function');
        cy.stub(window.Notification, 'permission', 'denied');
        cy.stub(window.Notification, 'requestPermission').resolves('denied').as('ask');
        cy.stub(window, 'Notification').as('Notification');
          
      
        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');
        cy.get('@Notification').should('not.have.been.called');
        cy.get('#end-btn').trigger('click');
    });
    
    it('Test 1 cycle with asking permission', () => {
        cy.window().should('have.property', 'Notification').should('be.a', 'function');
        cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html', { 
            onBeforeLoad (window) {
                cy.stub(window.Notification, 'permission', 'unknown')
                cy.stub(window.Notification, 'requestPermission').resolves('granted').as('ask')
                cy.stub(window, 'Notification').as('Notification')
            },
        });
        
        cy.document().then((doc) => { 
            cy.window().its('customElements').then(x => {              
                if(!x.get('timer-element').DEBUG){
                    doc.querySelector('timer-element').toggleDebug();
                }            
            });   
        });

        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');

        cy.get('@ask')
            .should('have.been.calledOnce')
            .and('have.been.calledBefore', cy.get('@Notification'));
          
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
            cy.wait(3000);
    
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a long break!');
            cy.wait(3000);
            
            cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
            cy.get('#end-btn').trigger('click');
    });
    
    it('Test 1 cycle when permission is already granted', () => {
        cy.window().should('have.property', 'Notification').should('be.a', 'function');
        cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html', {
            onBeforeLoad (window) {
                cy.stub(window.Notification, 'permission', 'granted');
                cy.stub(window, 'Notification').as('Notification');
        
            },
        });
        
        cy.document().then((doc) => { 
            cy.window().its('customElements').then(x => {              
                if(!x.get('timer-element').DEBUG){
                    doc.querySelector('timer-element').toggleDebug();
                }            
            });   
        });

        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time for a long break!');
        cy.wait(3000);
        
        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.get('#end-btn').trigger('click');
    });

    it('Test 1 cycle with notifs not allowed', () => {
        cy.window().should('have.property', 'Notification').should('be.a', 'function');
        cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html', {
            onBeforeLoad (window) {
                cy.stub(window.Notification, 'permission', 'denied');
                cy.stub(window, 'Notification').as('Notification');
        
            },
        });
        
        cy.document().then((doc) => { 
            cy.window().its('customElements').then(x => {              
                if(!x.get('timer-element').DEBUG){
                    doc.querySelector('timer-element').toggleDebug();
                }            
            });   
        });

        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time for a short break!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time to start the next work session!');
        cy.wait(3000);

        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time for a long break!');
        cy.wait(3000);
        
        cy.get('@Notification').should('not.have.been.calledWithNew').and('not.have.been.calledWith', 'Time to start the next work session!');
        cy.get('#end-btn').trigger('click');
    });

    it('Test notifs when resetting', () => {
        cy.window().should('have.property', 'Notification').should('be.a', 'function');
        cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html', {
            onBeforeLoad (window) {
                cy.stub(window.Notification, 'permission', 'granted');
                cy.stub(window, 'Notification').as('Notification');
        
            },
        });
        
        cy.document().then((doc) => { 
            cy.window().its('customElements').then(x => {              
                if(!x.get('timer-element').DEBUG){
                    doc.querySelector('timer-element').toggleDebug();
                }            
            });   
        });

        cy.get('input').clear().type('t1');
        cy.get('#add-btn').trigger('click');
        cy.get('#start-btn').trigger('click');

        cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWith', 'Time to start the next work session!');
        cy.wait(2000);
        cy.get('#reset-btn').trigger('click');

        cy.wait(1000);
        cy.get('#end-btn').trigger('click');
    });

});
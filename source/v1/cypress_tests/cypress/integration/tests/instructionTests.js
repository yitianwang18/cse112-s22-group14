describe('Instruction Box Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/cse110-w21-group30/source/v1/index.html');
    });

    it('Tests clicking to open and close instructions', () => {    
        //checks if hidden initially
        cy.get('instructions-box').should('be.hidden');
        
        //checks if shown when clicked
        cy.get('#info-btn-new').trigger('click');
        cy.get('instructions-box').should('not.be.hidden');    
        
        //checks if hidden after closed
        cy.get('.close2').trigger('click');      
        cy.get('instructions-box').should('be.hidden');

        //checks if shown when clicked
        cy.get('#info-btn-new').trigger('click');
        cy.get('instructions-box').should('not.be.hidden');  

        //checks if hidden after closed
        cy.get('.close2').trigger('click');      
        cy.get('instructions-box').should('be.hidden');

    });

});

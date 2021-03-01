describe('Task List Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/v1/index.html');
    });

    it('Test TaskList onShow functionality', () => {
        cy.get('task-list').should('be.hidden');
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').should('be.visible');
    });

    it('Test TaskList onClose functionality', () => {
        
        cy.get('#task-btn').trigger('click');
        cy.get('task-list').should('be.visible');

        cy.get('task-list').within(() => {
            cy.get(".close").trigger('click');
        });
        cy.get('task-list').should('be.hidden');

    });
});
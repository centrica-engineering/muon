describe('muon-inputter component', () => {

    beforeEach(() => {
      const baseUrl = 'http://localhost:8000/iframe.html?id=muon-inputter--standard&viewMode=story';
      cy.visit(baseUrl);
    });
  
  
    it('Should find and enter the input in inputter', () => {
      cy.clearInput()
      cy.enterValue('Cypress test{enter}')
      cy.get('muon-inputter').invoke('attr','value').should('eq','Cypress test')
      cy.get('muon-inputter').find('label').should('have.text','A label')
      cy.get('muon-inputter').shadow().find('div[class=" input-holder is-dirty "]').should('be.visible');
    });
  
    it('Should validate the validation message', () => {
      cy.get('muon-inputter').invoke('attr','validation').should('eq','["isRequired","minLength(6)"]')
      cy.validateMessage('chop{enter}','Length must be at least 6 characters.');
      cy.validateMessage('{enter}','This field is required.');
      
    });
  
  });
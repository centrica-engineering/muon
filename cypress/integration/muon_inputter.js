describe('muon-inputter component', () => {

    beforeEach(() => {
      const baseUrl = 'http://localhost:8000/iframe.html?id=muon-inputter--standard&viewMode=story';
      cy.visit(baseUrl);
    });
  
  
    it('Should find and enter the input in inputter', () => {
      cy.clearInput()
      cy.enterValue('Random text')
      cy.get('muon-inputter').find('input').should('have.value','Random text')
      cy.get('muon-inputter').find('label').should('have.text','A label')
      cy.get('muon-inputter').shadow().find('div[class=" input-holder is-dirty "]').should('be.visible');
    });
  
    it('Should validate the validation message', () => {
      cy.get('muon-inputter').invoke('attr','validation').should('eq','["isRequired","minLength(6)"]')
      cy.clearInput()
      cy.enterValue('chop{enter}')
      cy.validateMessage('Length must be at least 6 characters.');
      cy.clearInput()
      cy.enterValue('{enter}')
      cy.validateMessage('This field is required.');
      
    });
  
  });
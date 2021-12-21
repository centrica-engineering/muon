describe('muon-inputter component', () => {

    beforeEach(() => {
      const baseUrl = 'http://localhost:8000/iframe.html?id=muon-inputter--standard&viewMode=story';
      cy.visit(baseUrl);
    });
  
  
    it('Should find and enter the input in inputter', () => {
      cy.get('muon-inputter').find('input').clear()
      cy.get('muon-inputter').find('input').type('Random text')
      cy.get('muon-inputter').find('input').should('have.value','Random text')
      cy.get('muon-inputter').find('label').should('have.text','A label')
      cy.get('muon-inputter').shadow().find('div[class=" input-holder is-dirty "]').should('be.visible');
    });
  
    it('Should validate the validation message', () => {
      cy.get('muon-inputter').invoke('attr','validation').should('eq','["isRequired","minLength(6)"]')
      cy.get('muon-inputter').find('input').type('chop')
    //   cy.get('muon-inputter').shadow().find('div[class=" input-holder is-dirty "]').find('div[class="validation"]').should('have.text','Length must be at least 6 characters.');
    });
  
  });
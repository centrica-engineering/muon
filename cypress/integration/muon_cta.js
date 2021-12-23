
describe('muon-cta component', () => {
  
    it('Should validate standard CTA', () => {
      cy.launchComponent('muon-cta','standard')
      cy.get('muon-cta').invoke('attr','role').should('eq','button')
      cy.validateCTAShadow('cta standard','arrow-right')
    });

    it('Should validate disabled CTA', () => {
      cy.launchComponent('muon-cta','disabled')
      cy.get('muon-cta').invoke('attr','disabled').should('exist')
      cy.validateCTAShadow('cta standard disabled','arrow-right')
    });

    it('Should validate loading CTA', () => {
      cy.launchComponent('muon-cta','loading')
      cy.get('muon-cta').invoke('attr','role').should('eq','button')
      cy.validateCTAShadow('cta standard loading','spinner')
    });

    it('Should validate hidden CTA', () => {
      cy.launchComponent('muon-cta','hidden')
      cy.get('muon-cta').should('have.css', 'display', 'none')
      cy.get('muon-cta').invoke('attr','hidden').should('exist')
      cy.get('muon-cta').shadow().find('div').find('cta-icon').should('not.be.visible')
      cy.get('muon-cta').shadow().find('div').invoke('attr','class').should('eq',' cta standard ');
      cy.get('muon-cta').shadow().find('div').find('span[class="label-holder"]').should('not.be.visible')
      cy.get('muon-cta').shadow().find('div').find('cta-icon').invoke('attr','name').should('eq','arrow-right');
    });

    it('Should validate loading CTA', () => {
      cy.launchComponent('muon-cta','loading')
      cy.get('muon-cta').invoke('attr','role').should('eq','button')
      cy.validateCTAShadow('cta standard loading','spinner')
    });

    it('Should validate loading CTA', () => {
      cy.launchComponent('muon-cta','loading')
      cy.get('muon-cta').invoke('attr','role').should('eq','button')
      cy.validateCTAShadow('cta standard loading','spinner')
    });
  
  });
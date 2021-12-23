
describe('muon-icon component', () => {

  beforeEach(() => {
    cy.launchComponent('muon-icon','standard')
  });

  it('Should find icon with svg', () => {
    cy.get('muon-icon')
      .shadow()
      .find('svg')
      .should('be.visible');
  });

});



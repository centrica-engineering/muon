// http://localhost:8000/iframe.html?id=muon-icon--standard&viewMode=story


describe('muon-icon component', () => {

  beforeEach(() => {
    const baseUrl = 'http://localhost:8000/iframe.html?id=muon-icon--standard&viewMode=story';
    cy.visit(baseUrl);
  });


  it('Should find icon with svg', () => {
    cy.get('muon-icon')
      .shadow()
      .find('svg')
      .should('be.visible');
  });

});



// http://localhost:8000/iframe.html?id=muon-icon--standard&viewMode=story


describe('My First Test', () => {

  beforeEach(() => {
    const baseUrl = 'http://localhost:8000/iframe.html?id=muon-icon--standard&viewMode=story';
    cy.visit(baseUrl);
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Should find icon with svg', () => {
    cy.get('muon-icon')
      .shadow()
      .find('svg')
      .should('be.visible');
    cy.compareSnapshot('initial default icon', 0.05);
  });

});

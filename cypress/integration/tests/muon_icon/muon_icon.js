import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Launch the {string} component {string} type in the browser', (component,type) => {
    cy.launchComponent(component,type)
})

Then('Validate the svg element', () => {
    cy.get('muon-icon')
      .shadow()
      .find('svg')
      .should('be.visible');
})
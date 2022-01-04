
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Launch the {string} component {string} type in the browser', (component,type) => {
    cy.launchComponent(component,type)
})

When('User enter the input', () => {
    cy.clearInput()
    cy.enterValue('Cypress test{enter}')
})

Then('Validate the elements and validation message', () => {
    cy.get('muon-inputter').invoke('attr','value').should('eq','Cypress test')
    cy.get('muon-inputter').find('label').should('have.text','A label')
    cy.get('muon-inputter').shadow().find('div[class=" input-holder is-dirty "]').should('be.visible');
    cy.get('muon-inputter').invoke('attr','validation').should('eq','["isRequired","minLength(6)"]')
    cy.validateMessage('chop{enter}','Length must be at least 6 characters.');
    cy.validateMessage('{enter}','This field is required.');
})


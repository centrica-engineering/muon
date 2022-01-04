import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Launch the component in the browser', () => {
    cy.launchComponent('muon-cta','standard')
    // cy.visit('https://opensource-demo.orangehrmlive.com/')
})

Then('Validate the elements and attributes in the component', () => {
    cy.get('muon-cta').invoke('attr','role').should('eq','button')
    cy.validateCTAShadow('cta standard','arrow-right')
})
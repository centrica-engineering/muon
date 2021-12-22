// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

Cypress.Commands.add('clearInput', () => {
    cy.get('muon-inputter').find('input').clear()
})

Cypress.Commands.add('enterValue',(value) => {
    cy.get('muon-inputter').find('input').type(value)
})

Cypress.Commands.add('validateMessage',(value,validationMessage) => {
    cy.clearInput()
    cy.enterValue(value)
    cy.get('muon-inputter').shadow().find('div[class="validation"]').contains(validationMessage);
})
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

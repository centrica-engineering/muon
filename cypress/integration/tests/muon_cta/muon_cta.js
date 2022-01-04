import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Launch the {string} component {string} type in the browser', (component,type) => {
    cy.launchComponent(component,type)
})

Then('Validate the elements and attributes in the standard component', () => {
    cy.get('muon-cta').invoke('attr','role').should('eq','button')
    cy.validateCTAShadow('cta standard','arrow-right')
})

Then('Validate the elements and attributes in the disabled component', () => {
    cy.get('muon-cta').invoke('attr','disabled').should('exist')
    cy.validateCTAShadow('cta standard disabled','arrow-right')
})

Then('Validate the elements and attributes in the loading component', () => {
    cy.get('muon-cta').invoke('attr','role').should('eq','button')
    cy.validateCTAShadow('cta standard loading','spinner')
})

Then('Validate the elements and attributes in the hidden component', () => {
    cy.get('muon-cta').should('have.css', 'display', 'none')
    cy.get('muon-cta').invoke('attr','hidden').should('exist')
    cy.get('muon-cta').shadow().find('div').find('cta-icon').should('not.be.visible')
    cy.get('muon-cta').shadow().find('div').invoke('attr','class').should('eq',' cta standard ');
    cy.get('muon-cta').shadow().find('div').find('span[class="label-holder"]').should('not.be.visible')
    cy.get('muon-cta').shadow().find('div').find('cta-icon').invoke('attr','name').should('eq','arrow-right');
})
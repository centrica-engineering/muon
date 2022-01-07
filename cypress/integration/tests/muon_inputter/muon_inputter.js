
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

When('User selects the {string} and validate the value attriute', (type) => {

    if(type==="radio"){
        cy.get('muon-inputter').find('input[value="electricity"]').click()
        cy.get('muon-inputter').invoke('attr','value').should('eq','electricity')

        cy.get('muon-inputter').find('input[value="gas"]').click()
        cy.get('muon-inputter').invoke('attr','value').should('eq','gas')
    }else{
        cy.get('muon-inputter').find('input[value="electricity"]').click()
        cy.get('muon-inputter').invoke('attr','value').should('eq','electricity')

        cy.get('muon-inputter').find('input[value="gas"]').click()
        cy.get('muon-inputter').invoke('attr','value').should('eq','gas,electricity')

        cy.get('muon-inputter').find('input[value="gas"]').click()
        cy.get('muon-inputter').find('input[value="electricity"]').click()
        cy.get('muon-inputter').invoke('attr','value').should('eq','')
    }

})

When('Validate the elements and attriutes in the inputter', () => {
    cy.get('muon-inputter').find('input[value="electricity"]').invoke('attr','type').should('eq','radio')
    cy.get('muon-inputter').find('input[value="gas"]').invoke('attr','type').should('eq','radio')
})


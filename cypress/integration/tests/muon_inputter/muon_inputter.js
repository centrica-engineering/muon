/* eslint-disable no-undef */

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('User enter the input', () => {
  cy.clearInput();
  cy.enterValue('Cypress test{enter}');
});

Then('Validate the elements and validation message', () => {
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'Cypress test');
  cy.get('muon-inputter').find('label').should('have.text', 'A label');
  cy.get('muon-inputter').shadow().find('div[class=" slotted-content "]').should('be.visible');
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired","minLength(6)"]');
  cy.validateMessage('chop{enter}', 'Length must be at least 6 characters.');
  cy.validateMessage('{enter}', 'This field is required.');
});

When('User clicks the {string} and validate the value attriute', (type) => {

  if (type === 'radio') {
    cy.get('muon-inputter').find('input[value="electricity"]').click();
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'electricity');

    cy.get('muon-inputter').find('input[value="gas"]').click();
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'gas');

  } else {

    //check only one checkbox
    cy.get('muon-inputter').find('input[value="electricity"]').click();
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'electricity');

    // check the next check box
    cy.get('muon-inputter').find('input[value="gas"]').click();
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'gas,electricity');

    //Uncheck both the checkbox and validate the message
    cy.get('muon-inputter').find('input[value="gas"]').click();
    cy.get('muon-inputter').find('input[value="electricity"]').click();
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');
    cy.get('muon-inputter').shadow().find('div[class="validation"]').contains('This field is required.');
  }

});

Then('Validate the elements and attriutes in the {string} inputter', (type) => {
  cy.get('muon-inputter').find('input[value="electricity"]').invoke('attr', 'type').should('eq', type);
  cy.get('muon-inputter').find('input[value="gas"]').invoke('attr', 'type').should('eq', type);
});

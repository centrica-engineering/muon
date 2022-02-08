/* eslint-disable no-undef */

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('User enter the input', () => {
  cy.clearInput();
  cy.enterValue('Cypress test{enter}');
});

Then('Validate the elements and validation message', () => {
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'Cypress test');
  cy.get('muon-inputter').invoke('attr', 'helper').should('eq', 'Useful information to help populate this field.');
  cy.get('muon-inputter').find('label').should('have.text', 'Text');
  cy.get('muon-inputter').find('input').invoke('attr', 'placeholder').should('eq', 'e.g. Placeholder');
  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('div[class="helper"]').should('have.text', 'Useful information to help populate this field.');
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');
  cy.clearInput();
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

Then('Validate the attributes in {string} {string} type', (component, type) => {

  if (type === 'email') {
    cy.validateAttribute('email', 'Email', '["isRequired","isEmail"]', 'e.g. my@email.com');
  } else {
    cy.validateAttribute('tel', 'Tel', '["isRequired"]', 'e.g. 07770888444');
  }

});

And('Validate the helper and tip details', () => {
  cy.validateHelper();
});

And('Enter the email in the inputter and validate the message', () => {
  cy.enterAndValidateMessage('test@', `Your email does not look right. Please enter a part following '@'. 'test@' is incomplete..`);
  cy.enterAndValidateMessage('test123@g', `Your email does not look right.`);
  cy.enterAndValidateMessage('test1@t.', `Your email does not look right. '.' is used at a wrong position in 't.'..`);
  cy.enterAndValidateMessage('test', `Your email does not look right. Please include an '@' in the email address. 'test' is missing an '@'..`);
  cy.enterAndValidateMessage('test@g.com');
  cy.enterAndValidateMessage('mbappe123@bk.in');
});

And('Enter the telephone number in the inputter and validate the message', () => {
  cy.enterAndValidateMessage('07404537288');
  cy.validateMessage('{enter}', 'This field is required.');
});


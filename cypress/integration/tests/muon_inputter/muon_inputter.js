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
  cy.enterValue('{enter}');
  cy.validateMessage('This field is required.');
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
  } else if (type === 'tel') {
    cy.validateAttribute('tel', 'Tel', '["isRequired"]', 'e.g. 07770888444');
  } else {
    cy.validateAttribute('text', 'Disabled', '["isRequired"]', 'e.g. Placeholder');
    cy.get('muon-inputter').find('input').invoke('attr', 'disabled').should('exist');
    cy.get('muon-inputter').find('input').invoke('css', 'color').should('eq', 'rgb(176, 176, 176)');
  }

  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('div[class="wrapper"]').should('exist');
  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('slot[name="label"]').should('exist');

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
  cy.clearInput();
  cy.enterValue('{enter}');
  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in {string} type', (type) => {

  let text;

  if (type === 'search') {
    text = 'Search';
    cy.get('muon-inputter').shadow().find('div[class=" inputter search "]').find('div[class="wrapper"]').find('inputter-icon').invoke('attr', 'name').should('eq', type);
  } else {
    text = 'Password';
    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('div[class="wrapper"]').should('exist');
  }

  cy.get('muon-inputter').invoke('attr', 'inputtype').should('eq', type);
  cy.get('muon-inputter').invoke('attr', 'label').should('eq', text);
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', text);
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', type);

});

And('Enter the input in {string} and validate the value', () => {
  cy.enterValue('muon-test{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'muon-test');
  cy.clearInput();
  cy.enterValue('{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

});

Then('Validate the attributes and elements in textarea type', () => {

  cy.get('muon-inputter').invoke('attr', 'label').should('eq', 'Textarea');
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');
  cy.get('muon-inputter').invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', 'Textarea');
  cy.get('muon-inputter').find('textarea').invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');

  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('div[class="wrapper"]').should('exist');
  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('slot[name="label"]').should('exist');
});

And('Enter the input in textarea and validate the value', () => {

  const input = 'Cypress is an automation framework to automate web pages and components.';

  cy.get('muon-inputter').find('textarea').type(input);
  cy.get('muon-inputter').find('label[slot="label"]').click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', input);
  cy.get('muon-inputter').find('textarea').clear();
  cy.get('muon-inputter').find('label[slot="label"]').click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.validateMessage('This field is required.');

});

Then('Validate the attributes and elements in number type', () => {

  cy.get('muon-inputter').invoke('attr', 'label').should('eq', 'Number');
  cy.get('muon-inputter').invoke('attr', 'inputtype').should('eq', 'number');
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', 'Number');
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'number');

  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('div[class="wrapper"]').should('exist');
  cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('slot[name="label"]').should('exist');
});

And('Enter the input in number and validate the value', () => {

  cy.enterValue('545657654{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '545657654');
  cy.clearInput();
  cy.enterValue('{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.enterValue('muonpack{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

});

Then('Validate the attributes and elements in select type', () => {

  cy.get('muon-inputter').invoke('attr', 'label').should('eq', 'Select');
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', 'Select');
  cy.get('muon-inputter').find('select').invoke('attr', 'name').should('eq', 'select');

  cy.get('muon-inputter').find('select').select('Please select').should('have.value', '');
  cy.get('muon-inputter').find('select').select('Value one').should('have.value', 'value-01');
  cy.get('muon-inputter').find('select').select('Value two').should('have.value', 'value-02');
  cy.get('muon-inputter').find('select').select('Value three').should('have.value', 'value-03');
  cy.get('muon-inputter').find('select').select('Value four').should('have.value', 'value-04');
});

And('Select the option and validate the value', () => {

  cy.get('muon-inputter').find('select').select('Value one');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'value-01');
  cy.get('muon-inputter').find('select').select('Value two');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'value-02');
  cy.get('muon-inputter').find('select').select('Value three');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'value-03');
  cy.get('muon-inputter').find('select').select('Value four');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'value-04');

  cy.get('muon-inputter').find('select').select('Please select');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');
  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in mask type', () => {

  cy.get('muon-inputter').invoke('attr', 'inputtype').should('eq', 'text');
  cy.get('muon-inputter').invoke('attr', 'label').should('eq', 'Mask');
  cy.get('muon-inputter').invoke('attr', 'mask').should('eq', '000000');
  cy.get('muon-inputter').find('input').invoke('attr', 'maxlength').should('eq', '6');
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', 'Mask');
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'text');

  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('div[class="wrapper"]').find('div[class="input-mask"]').invoke('attr', 'aria-hidden').should('eq', 'true');
  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('div[class="wrapper"]').find('div[class="input-mask"]').should('have.text', '000000');
  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('slot[name="label"]').should('exist');
});

And('Enter the input in the mask and validate the value', () => {

  cy.enterValue('test32{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'test32');
  cy.clearInput();
  cy.enterValue('messi10{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'messi1');
});

Then('Validate the elements in {string} type', (type) => {

  let text; let mask; let separator; let maxlength;

  if (type === 'separator') {
    text = 'Separator';
    mask = '  -  -  ';
    separator = '-';
    maxlength = '8';
  } else {
    text = 'Date Mask';
    mask = 'dd/mm/yyyy';
    separator = '/';
    maxlength = '10';
    cy.get('muon-inputter').invoke('attr', 'validation').should('eq', `["isRequired","minDate('01/01/2022')"]`);
  }

  cy.get('muon-inputter').invoke('attr', 'inputtype').should('eq', 'text');
  cy.get('muon-inputter').invoke('attr', 'label').should('eq', text);
  cy.get('muon-inputter').invoke('attr', 'mask').should('eq', mask);
  cy.get('muon-inputter').invoke('attr', 'separator').should('eq', separator);
  cy.get('muon-inputter').find('input').invoke('attr', 'maxlength').should('eq', maxlength);
  cy.get('muon-inputter').find('label[slot="label"]').should('have.text', text);
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'text');

  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('div[class="wrapper"]').find('div[class="input-mask"]').invoke('attr', 'aria-hidden').should('eq', 'true');
  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('div[class="wrapper"]').find('div[class="input-mask"]').should('have.text', mask);
  cy.get('muon-inputter').shadow().find('div[class=" inputter has-mask "]').find('slot[name="label"]').should('exist');
});

And('Enter the input in the separator and validate the value', () => {

  cy.enterValue('test32{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'te-st-32');
  cy.clearInput();
  cy.enterValue('30031{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '30-03-1');
  cy.clearInput();
  cy.enterValue('3003145{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '30-03-14');

});

And('Enter the input in the date-mask and validate the value and message', () => {

  cy.enterValue('05012022{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '05/01/2022');
  cy.clearInput();
  cy.enterValue('01012022{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '01/01/2022');
  cy.clearInput();
  cy.enterValue('31122021{enter}');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '31/12/2021');
  cy.get('muon-inputter').shadow().find('div[class="validation"]').find('div[class="message"]').contains('Date must be on or after 01/01/2022.');

  cy.clearInput();
  cy.enterValue('{enter}');
  cy.validateMessage('This field is required.');
});

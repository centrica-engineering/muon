/* eslint-disable no-undef */

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {inputElement} from '../../../support/web_elements';

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
  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.helperSelector).should('have.text', 'Useful information to help populate this field.');
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
    cy.get('muon-inputter').shadow().find(inputElement.validationSelector).contains('This field is required.');
  }

});

Then('Validate the elements and attriutes in the {string} inputter', (type) => {
  cy.get('muon-inputter').find('input[value="electricity"]').invoke('attr', 'type').should('eq', type);
  cy.get('muon-inputter').find('input[value="gas"]').invoke('attr', 'type').should('eq', type);
});

Then('Validate the attributes in inputter {string} type', (type) => {

  if (type === 'email') {
    cy.validateAttribute('email', 'Enter email ID', '["isRequired","isEmail"]');
  } else if (type === 'tel') {
    cy.validateAttribute('tel','Enter telephone No', '["isRequired"]');
  } else {
    cy.validateAttribute('text', 'Disabled Text', '["isRequired"]');
    cy.get('muon-inputter').find('input').invoke('attr', 'disabled').should('exist');
    cy.get('muon-inputter').find('input').invoke('css', 'color').should('eq', 'rgb(176, 176, 176)');
  }

  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');

});

And('Validate the helper and tip details', () => {
  cy.validateHelper('inputter');
});

And('Enter the email in the inputter and validate the message', () => {

  if (Cypress.isBrowser('firefox')) {
    cy.enterAndValidateMessage('test@', `Your email does not look right. Please enter an email address..`);
    cy.enterAndValidateMessage('test1@t.', `Your email does not look right. Please enter an email address..`);
    cy.enterAndValidateMessage('test', `Your email does not look right. Please enter an email address..`);
  } else {
    cy.enterAndValidateMessage('test@', `Your email does not look right. Please enter a part following '@'. 'test@' is incomplete..`);
    cy.enterAndValidateMessage('test1@t.', `Your email does not look right. '.' is used at a wrong position in 't.'..`);
    cy.enterAndValidateMessage('test', `Your email does not look right. Please include an '@' in the email address. 'test' is missing an '@'..`);
  }

  cy.enterAndValidateMessage('test123@g', `Your email does not look right.`);
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
    cy.get('muon-inputter').shadow().find(inputElement.searchSelector).find(inputElement.inputWrapper).find('inputter-icon').invoke('attr', 'name').should('eq', type);
  } else {
    text = 'Password';
    cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
  }

  cy.get('muon-inputter').find(inputElement.label).should('have.text', text);
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

  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');
  cy.get('muon-inputter').invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');
  cy.get('muon-inputter').find(inputElement.label).should('have.text', 'Textarea');
  cy.get('muon-inputter').find('textarea').invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');

  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find('slot[name="label"]').should('exist');
});

And('Enter the input in textarea and validate the value', () => {

  const input = 'Cypress is an automation framework to automate web pages and components.';

  cy.get('muon-inputter').find('textarea').type(input);
  cy.get('muon-inputter').find(inputElement.label).click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', input);
  cy.get('muon-inputter').find('textarea').clear();
  cy.get('muon-inputter').find(inputElement.label).click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.validateMessage('This field is required.');

});

Then('Validate the attributes and elements in number type', () => {

  cy.get('muon-inputter').find(inputElement.label).should('have.text', 'Number');
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'number');

  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
  cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.labelSlot).should('exist');
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

  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');
  cy.get('muon-inputter').find(inputElement.label).should('have.text', 'Select');
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

  cy.get('muon-inputter').invoke('attr', 'mask').should('eq', '000000');
  cy.get('muon-inputter').find('input').invoke('attr', 'maxlength').should('eq', '6');
  cy.get('muon-inputter').find(inputElement.label).should('have.text', 'Mask');
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'text');

  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).invoke('attr', 'aria-hidden').should('eq', 'true');
  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).should('have.text', '000000');
  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.labelSlot).should('exist');
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

  cy.get('muon-inputter').invoke('attr', 'mask').should('eq', mask);
  cy.get('muon-inputter').invoke('attr', 'separator').should('eq', separator);
  cy.get('muon-inputter').find('input').invoke('attr', 'maxlength').should('eq', maxlength);
  cy.get('muon-inputter').find(inputElement.label).should('have.text', text);
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'text');

  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).invoke('attr', 'aria-hidden').should('eq', 'true');
  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).should('have.text', mask);
  cy.get('muon-inputter').shadow().find(inputElement.maskSelector).find(inputElement.labelSlot).should('exist');
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
  cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains('Date must be on or after 01/01/2022.');

  cy.clearInput();
  cy.enterValue('{enter}');
  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in date type', () => {

  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', `["isRequired","minDate('01/01/2022')"]`);
  cy.get('muon-inputter').find(inputElement.label).should('have.text', 'Date');
  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'date');

  cy.get('muon-inputter').shadow().find(inputElement.dateSelector).find(inputElement.inputWrapper).should('exist');
  cy.get('muon-inputter').shadow().find(inputElement.dateSelector).find(inputElement.labelSlot).should('exist');
  cy.get('muon-inputter').shadow().find(inputElement.dateSelector).find(inputElement.inputWrapper).find('inputter-icon').invoke('attr', 'name').should('eq', 'calendar');
});

And('Enter the input in the date and validate the value and message', () => {

  // date within range
  cy.enterValue('2022-02-01');
  cy.get('muon-inputter').find(inputElement.label).click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '2022-02-01');

  // date out of range
  cy.enterValue('2021-12-01');
  cy.get('muon-inputter').find(inputElement.label).click();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '2021-12-01');
  cy.validateMessage('Date must be on or after 01/01/2022.');

});

Then('Validate the attributes and elements in radio type', () => {

  const heading = 'Which choice would you prefer?';

  cy.get('muon-inputter').invoke('attr', 'heading').should('eq', heading);
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');

  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'radio');
  cy.get('muon-inputter').find('input[id="radio-01"]').should('be.checked');
  cy.get('muon-inputter').find('input[id="radio-04"]').should('be.disabled');
  cy.get('muon-inputter').find('input[id="radio-04"]').invoke('attr', 'disabled').should('exist');

  // validating all radio inputs and its text
  for (let i = 0; i < 4; i++) {
    const text = ['Choice A', 'Choice B', 'Option C', 'Choice D'];
    const value = ['a', 'b', 'c', 'd'];

    cy.get('muon-inputter').find(`input[id="radio-0${i + 1}"]`).should('exist');
    cy.get('muon-inputter').find(`label[for="radio-0${i + 1}"]`).should('have.text', text[i]);
    cy.get('muon-inputter').find(`input[id="radio-0${i + 1}"]`).invoke('attr', 'value').should('eq', value[i]);
  }

  // shadow dom elements
  cy.get('muon-inputter').shadow().find(inputElement.radioSelector).find(inputElement.headingSpan).should('have.text', heading);
  cy.get('muon-inputter').shadow().find(inputElement.radioSelector).find(inputElement.inputWrapper).should('exist');

  cy.validateHelper('inputter radio');

});

And('Select the radio options and validate the value', () => {

  const value = ['a', 'b', 'c'];

  for (let i = 3; i > 1; i--) {
    cy.get('muon-inputter').find(`label[for="radio-0${i}"]`).click();
    cy.get('muon-inputter').find(`input[id="radio-0${i}"]`).should('be.checked');
    cy.get('muon-inputter').invoke('attr', 'value').should('eq', value[i - 1]);
  }
});

Then('Validate the attributes and elements in checkbox type', () => {

  const heading = 'What options do you like?';

  cy.get('muon-inputter').invoke('attr', 'heading').should('eq', heading);
  cy.get('muon-inputter').invoke('attr', 'validation').should('eq', '["isRequired"]');

  cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', 'checkbox');
  cy.get('muon-inputter').find('input[id="check-01"]').should('be.checked');
  cy.get('muon-inputter').find('input[id="check-04"]').should('be.disabled');
  cy.get('muon-inputter').find('input[id="check-04"]').invoke('attr', 'disabled').should('exist');

  // validating all radio inputs and its text
  for (let i = 0; i < 4; i++) {
    const text = ['Option A', 'Option B', 'Option C', 'Option D'];
    const value = ['a', 'b', 'c', 'd'];

    cy.get('muon-inputter').find(`input[id="check-0${i + 1}"]`).should('exist');
    cy.get('muon-inputter').find(`label[for="check-0${i + 1}"]`).should('have.text', text[i]);
    cy.get('muon-inputter').find(`input[id="check-0${i + 1}"]`).invoke('attr', 'value').should('eq', value[i]);
  }

  // shadow dom elements
  cy.get('muon-inputter').shadow().find(inputElement.checkboxSelector).find(inputElement.headingSpan).should('have.text', heading);
  cy.get('muon-inputter').shadow().find(inputElement.checkboxSelector).find(inputElement.inputWrapper).should('exist');

  cy.validateHelper('inputter checkbox');
});

And('Select the checkbox and validate the value', () => {

  cy.get('muon-inputter').find('[type="checkbox"]').check(['b', 'c'], { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'a,b,c');

  cy.get('muon-inputter').find('[type="checkbox"]').uncheck(['a', 'b'], { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'c');

  cy.get('muon-inputter').find('[type="checkbox"]').uncheck('c', { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.validateMessage('This field is required.');
});

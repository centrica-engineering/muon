/* eslint-disable no-undef */

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {inputElement} from '../../../support/web_elements';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
  cy.wait(3000)
});

When('User enter the input', () => {
  cy.clearInput();
  cy.enterValue('Cypress test');
});

Then('Validate the elements and validation message', () => {
  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'value').should('eq', 'Cypress test');
    cy.wrap(inputter).invoke('attr', 'helper').should('eq', 'Useful information to help populate this field.');
    cy.wrap(inputter).find('label').should('have.text', 'Text');
    cy.wrap(inputter).find('input').invoke('attr', 'placeholder').should('eq', 'e.g. Placeholder');
    cy.wrap(inputter).shadow().find(inputElement.inputSelector).find(inputElement.helperSelector).should('have.text', 'Useful information to help populate this field.');
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', '["isRequired"]');
  })
  cy.clearInput();
  cy.validateMessage('This field is required.');
});

When('User clicks the {string} and validate the value attriute', (type) => {

  if (type === 'radio') {

    cy.get('muon-inputter').then((inputter)=>{
      cy.wrap(inputter).find('input[value="electricity"]').click();
      cy.wrap(inputter).invoke('attr', 'value').should('eq', 'electricity');

      cy.wrap(inputter).find('input[value="gas"]').click();
      cy.wrap(inputter).invoke('attr', 'value').should('eq', 'gas');
    })

  } else {

   
    cy.get('muon-inputter').then((inputter)=>{

       //check only one checkbox
      cy.wrap(inputter).find('input[value="electricity"]').click();
      cy.wrap(inputter).invoke('attr', 'value').should('eq', 'electricity');

      // check the next check box
      cy.wrap(inputter).find('input[value="gas"]').click();
      cy.wrap(inputter).invoke('attr', 'value').should('eq', 'gas,electricity');

      //Uncheck both the checkbox and validate the message
      cy.wrap(inputter).find('input[value="gas"]').click();
      cy.wrap(inputter).find('input[value="electricity"]').click();
      cy.wrap(inputter).invoke('attr', 'value').should('eq', '');
      cy.wrap(inputter).shadow().find(inputElement.validationSelector).contains('This field is required.');

    })

    

    
  }

});

Then('Validate the elements and attriutes in the {string} inputter', (type) => {
  cy.get('muon-inputter').find('input[value="electricity"]').invoke('attr', 'type').should('eq', type);
  cy.get('muon-inputter').find('input[value="gas"]').invoke('attr', 'type').should('eq', type);
});

Then('Validate the attributes in inputter {string} type', (type) => {

  if (type === 'email') {
    cy.validateAttribute('email', 'Enter email ID', '["isRequired","isEmail"]', 'inputter');
    cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
  } else if (type === 'tel') {
    cy.validateAttribute('tel','Enter telephone No', '["isRequired"]', 'inputter');
    cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
  } else {
    cy.validateAttribute('text', 'Disabled Text', '["isRequired"]', 'inputter has-disabled');

    cy.get('muon-inputter').then((inputter)=>{
      cy.wrap(inputter).find('input').invoke('attr', 'disabled').should('exist');
      cy.wrap(inputter).find('input').invoke('css', 'color').should('eq', 'rgb(176, 176, 176)');
      cy.wrap(inputter).shadow().find(inputElement.disabledInputSelector).find(inputElement.inputWrapper).should('exist');
    })
    
    
  }

});

And('Validate the helper and tip details', () => {
  cy.validateHelper('How can we help you?', 'inputter');
});

And('Enter the email in the inputter and validate the message', () => {

  if (Cypress.isBrowser('firefox')) {
    cy.enterAndValidateMessage('test@', `Your email does not look right. Please enter an email address..`, true);
    cy.enterAndValidateMessage('test1@t.', `Your email does not look right. Please enter an email address..`, true);
    cy.enterAndValidateMessage('test', `Your email does not look right. Please enter an email address..`, true);
  } else {
    cy.enterAndValidateMessage('test@', `Your email does not look right. Please enter a part following '@'. 'test@' is incomplete..`,true);
    cy.enterAndValidateMessage('test1@t.', `Your email does not look right. '.' is used at a wrong position in 't.'..`, true);
    cy.enterAndValidateMessage('test', `Your email does not look right. Please include an '@' in the email address. 'test' is missing an '@'..`, true);
  }

  cy.enterAndValidateMessage('test123@g', `Your email does not look right.`, true);
  cy.enterAndValidateMessage('test@g.com', false, true);
  cy.enterAndValidateMessage('mbappe123@bk.in', false, true);
});

And('Enter the telephone number in the inputter and validate the message', () => {
  cy.enterAndValidateMessage('07404537288', false, true);
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
  cy.enterValue('muon-test');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'muon-test');
  cy.clearInput();
  cy.get('muon-inputter').invoke('attr', 'value').should('be.empty');

});

Then('Validate the attributes and elements in textarea type', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', '["isRequired"]');
    cy.wrap(inputter).invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');
    cy.wrap(inputter).find(inputElement.label).should('have.text', 'Textarea');
    cy.wrap(inputter).find('textarea').invoke('attr', 'placeholder').should('eq', 'e.g. Provide information');

    cy.wrap(inputter).shadow().find(inputElement.inputSelector).then((inputSelec)=>{
      cy.wrap(inputSelec).find(inputElement.inputWrapper).should('exist');
      cy.wrap(inputSelec).find('slot[name="label"]').should('exist');
    })
    
  })
  
  
});

And('Enter the input in textarea and validate the value', () => {

  const input = 'Cypress is an automation framework to automate web pages and components.';

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).find('textarea').type(input);
    cy.wrap(inputter).invoke('attr', 'value').should('eq', input);
    cy.wrap(inputter).find('textarea').clear();
    cy.wrap(inputter).invoke('attr', 'value').should('eq', '');
  })

  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in number type', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).find(inputElement.label).should('have.text', 'Number');
    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'number');

    cy.wrap(inputter).shadow().find(inputElement.inputSelector).then((inputSelect)=>{
      cy.wrap(inputSelect).find(inputElement.inputWrapper).should('exist');
      cy.wrap(inputSelect).find(inputElement.labelSlot).should('exist');
    })
  })
  
});

And('Enter the input in number and validate the value', () => {

  cy.enterValue('545657654');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '545657654');
  cy.clearInput();
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.enterValue('muonpack');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

});

Then('Validate the attributes and elements in select type', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', '["isRequired"]');
    cy.wrap(inputter).find(inputElement.label).should('have.text', 'Select');
    cy.wrap(inputter).find('select').then((select)=>{
      cy.wrap(select).invoke('attr', 'name').should('eq', 'select');
      cy.wrap(select).select('Please select').should('have.value', '');
      cy.wrap(select).select('Value one').should('have.value', 'value-01');
      cy.wrap(select).select('Value two').should('have.value', 'value-02');
      cy.wrap(select).select('Value three').should('have.value', 'value-03');
      cy.wrap(select).select('Value four').should('have.value', 'value-04');
    })
  })
  
});

And('Select the option and validate the value', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).find('select').select('Value one');
    cy.wrap(inputter).invoke('attr', 'value').should('eq', 'value-01');
    cy.wrap(inputter).find('select').select('Value two');
    cy.wrap(inputter).invoke('attr', 'value').should('eq', 'value-02');
    cy.wrap(inputter).find('select').select('Value three');
    cy.wrap(inputter).invoke('attr', 'value').should('eq', 'value-03');
    cy.wrap(inputter).find('select').select('Value four');
    cy.wrap(inputter).invoke('attr', 'value').should('eq', 'value-04');
    cy.wrap(inputter).find('select').select('Please select');
    cy.wrap(inputter).invoke('attr', 'value').should('eq', '');
  })
  
  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in mask type', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'mask').should('eq', '000000');
    cy.wrap(inputter).find('input').invoke('attr', 'maxlength').should('eq', '6');
    cy.wrap(inputter).find(inputElement.label).should('have.text', 'Mask');
    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'text');

    cy.wrap(inputter).shadow().find(inputElement.maskSelector).then((mask)=>{
      cy.wrap(mask).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).invoke('attr', 'aria-hidden').should('eq', 'true');
      cy.wrap(mask).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).should('have.text', '000000');
      cy.wrap(mask).find(inputElement.labelSlot).should('exist');
    })
  })

  
});

And('Enter the input in the mask and validate the value', () => {

  cy.enterValue('test32');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'test32');
  cy.clearInput();
  cy.enterValue('messi10');
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

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'separator').should('eq', separator);
    cy.wrap(inputter).invoke('attr', 'mask').should('eq', mask);
    cy.wrap(inputter).find('input').invoke('attr', 'maxlength').should('eq', maxlength);
    cy.wrap(inputter).find(inputElement.label).should('have.text', text);
    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'text');

    cy.wrap(inputter).shadow().find(inputElement.maskSelector).then((maskShadow)=>{
      cy.wrap(maskShadow).find(inputElement.inputWrapper).find(inputElement.inputMaskSelector).then((maskSelector)=>{
        cy.wrap(maskSelector).invoke('attr', 'aria-hidden').should('eq', 'true');
        cy.wrap(maskSelector).should('have.text', mask);
      })
     cy.wrap(maskShadow).find(inputElement.labelSlot).should('exist');
    });
  })
})

And('Enter the input in the separator and validate the value', () => {

  cy.enterValue('test32');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'te-st-32');
  cy.clearInput();
  cy.enterValue('30031');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '30-03-1');
  cy.clearInput();
  cy.enterValue('3003145');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '30-03-14');

});

And('Enter the input in the date-mask and validate the value and message', () => {

  cy.enterValue('05012022');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '05/01/2022');
  cy.clearInput();
  cy.enterValue('01012022');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '01/01/2022');
  cy.clearInput();
  cy.enterValue('31122021');
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '31/12/2021');
  cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains('Date must be on or after 01/01/2022.');

  cy.clearInput();
  cy.validateMessage('This field is required.');
});

Then('Validate the attributes and elements in date type', () => {

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', `["isRequired","minDate('01/01/2022')"]`);
    cy.wrap(inputter).find(inputElement.label).should('have.text', 'Date');
    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'date');

    cy.wrap(inputter).shadow().find(inputElement.dateSelector).then((date)=>{
      cy.wrap(date).find(inputElement.inputWrapper).should('exist');
      cy.wrap(date).find(inputElement.labelSlot).should('exist');
      cy.wrap(date).find(inputElement.inputWrapper).find('inputter-icon').invoke('attr', 'name').should('eq', 'calendar');
   })

  })
  
});

And('Enter the input in the date and validate the value and message', () => {

  // date within range
  cy.validateDate('2022-02-01');

  // date out of range
  cy.validateDate('2021-12-01');
  cy.validateMessage('Date must be on or after 01/01/2022.');

});

Then('Validate the attributes and elements in radio type', () => {

  const heading = 'Which choice would you prefer?';

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'heading').should('eq', heading);
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', '["isRequired"]');

    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'radio');
    cy.wrap(inputter).find('input[id="radio-01"]').should('be.checked');
    cy.wrap(inputter).find('input[id="radio-04"]').should('be.disabled');
    cy.wrap(inputter).find('input[id="radio-04"]').invoke('attr', 'disabled').should('exist');

  })
  
  
  // validating all radio inputs and its text
  for (let i = 0; i < 4; i++) {
    const text = ['Choice A', 'Choice B', 'Option C', 'Choice D'];
    const value = ['a', 'b', 'c', 'd'];

    cy.get('muon-inputter').then((inputter)=>{
      cy.wrap(inputter).find(`input[id="radio-0${i + 1}"]`).should('exist');
      cy.wrap(inputter).find(`label[for="radio-0${i + 1}"]`).should('have.text', text[i]);
      cy.wrap(inputter).find(`input[id="radio-0${i + 1}"]`).invoke('attr', 'value').should('eq', value[i]);

      // shadow dom elements
      cy.get('muon-inputter').shadow().find(inputElement.radioSelector).then((radio)=>{
        cy.wrap(radio).find(inputElement.headingSpan).should('have.text', heading);
        cy.wrap(radio).find(inputElement.inputWrapper).should('exist');
      })
    })
  }
  cy.validateHelper('How can we help you?', 'inputter radio has-disabled');

});

And('Select the radio options and validate the value', () => {

  const value = ['a', 'b', 'c'];

  for (let i = 3; i > 1; i--) {
    cy.get('muon-inputter').then((inputter)=>{
      cy.wrap(inputter).find(`label[for="radio-0${i}"]`).click();
      cy.wrap(inputter).find(`input[id="radio-0${i}"]`).should('be.checked');
      cy.wrap(inputter).invoke('attr', 'value').should('eq', value[i - 1]);
    })
  }
});

Then('Validate the attributes and elements in checkbox type', () => {

  const heading = 'What options do you like?';

  cy.get('muon-inputter').then((inputter)=>{
    cy.wrap(inputter).invoke('attr', 'heading').should('eq', heading);
    cy.wrap(inputter).invoke('attr', 'validation').should('eq', '["isRequired"]');

    cy.wrap(inputter).find('input').invoke('attr', 'type').should('eq', 'checkbox');
    cy.wrap(inputter).find('input[id="check-01"]').should('be.checked');
    cy.wrap(inputter).find('input[id="check-04"]').should('be.disabled');
    cy.wrap(inputter).find('input[id="check-04"]').invoke('attr', 'disabled').should('exist');

  })

  // validating all radio inputs and its text
  for (let i = 0; i < 4; i++) {
    const text = ['Option A', 'Option B', 'Option C', 'Option D'];
    const value = ['a', 'b', 'c', 'd'];

    cy.get('muon-inputter').then((inputter)=>{
      cy.wrap(inputter).find(`input[id="check-0${i + 1}"]`).should('exist');
      cy.wrap(inputter).find(`label[for="check-0${i + 1}"]`).should('have.text', text[i]);
      cy.wrap(inputter).find(`input[id="check-0${i + 1}"]`).invoke('attr', 'value').should('eq', value[i]);


      // shadow dom elements
      cy.wrap(inputter).shadow().find(inputElement.checkboxSelector).then((checkbox)=>{
      cy.wrap(checkbox).find(inputElement.headingSpan).should('have.text', heading);
      cy.wrap(checkbox).find(inputElement.inputWrapper).should('exist');
      })
    })
  }

  cy.validateHelper('How can we help you?', 'inputter checkbox has-disabled');

});

And('Select the checkbox and validate the value', () => {

  cy.get('muon-inputter').as('inputter')
  
  cy.get('@inputter').find('[type="checkbox"]').as('checkbox')
  cy.get('@inputter').invoke('attr', 'value').as('attValue')

  cy.get('@checkbox').check(['b', 'c'], { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'a,b,c');

  cy.get('@checkbox').uncheck(['a', 'b'], { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', 'c');

  cy.get('@checkbox').uncheck('c', { force: true });
  cy.get('muon-inputter').invoke('attr', 'value').should('eq', '');

  cy.validateMessage('This field is required.');
});
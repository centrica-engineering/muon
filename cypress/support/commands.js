/* eslint-disable comma-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */

import '@testing-library/cypress/add-commands';
import {inputElement} from '../web_elements';

Cypress.Commands.add('launchComponent',(componentName,type) => {
    const baseUrl = `http://localhost:8000/iframe.html?id=${componentName}--${type}&viewMode=story`;
    cy.visit(baseUrl);
});

Cypress.Commands.add('clearInput', () => {
    cy.get('muon-inputter').find('input').clear();
});

Cypress.Commands.add('enterValue',(value) => {
    cy.get('muon-inputter').find('input').type(value);
});

Cypress.Commands.add('validateMessage',(validationMessage) => {
    cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains(validationMessage);
    cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.iconSelector).invoke('attr','name').should('eq','exclamation-circle');
});

Cypress.Commands.add('validateCTAShadow',(shadowParentElement,shadowclass,ctaIcon) => {
    cy.get('muon-cta').shadow().find(shadowParentElement).invoke('attr','class').should('eq',` ${shadowclass} `);
    cy.get('muon-cta').shadow().find(shadowParentElement).find(inputElement.labelholder).should('be.visible');
    cy.get('muon-cta').shadow().find(shadowParentElement).find('cta-icon').should('be.visible');
    cy.get('muon-cta').shadow().find(shadowParentElement).find('cta-icon').invoke('attr','name').should('eq',`${ctaIcon}`);
});

Cypress.Commands.add('loadingShadowSpan',() => {
    const attributes = { role: 'alert','aria-live': 'assertive',class: 'sr-only' };
    for (const [key, value] of Object.entries(attributes)) {
        cy.get('a').get('muon-cta').shadow().find('span').invoke('attr',`${key}`).should('eq',`${value}`);
      }
});


Cypress.Commands.add('enterAndValidateMessage',(input, message, clear) => {

    cy.clearInput();
   
    cy.get('muon-inputter').find('input').type(`${input}`);
    cy.get('muon-inputter').invoke('attr','value').should('eq', input);
    cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
    cy.document().then((doc)=>{
        const inputValue = doc.querySelector('muon-inputter').shadowRoot.querySelector(inputElement.inputWrapper).querySelector('slot').assignedNodes()[0].parentNode.value;
        assert.equal(input,inputValue,'Input value is not as expected')
    });

    // validation message code
    if (!message) {
        cy.get('muon-inputter').shadow().find('div[class="validation"]').should('not.exist');
    } else {    
        cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains(message);
        cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find('inputter-icon').invoke('attr', 'name').should('eq', 'exclamation-circle');
    }

    if (clear){

        cy.clearInput();

        //check isRequired validation is present and validate the message after clearing the input
        cy.document().then((doc)=>{
            const validation = doc.querySelector('muon-inputter').hasAttribute('validation');
            if (validation === true) {
                let value = doc.querySelector('muon-inputter').getAttribute('validation');
                if (value.includes('isRequired')) {
                    cy.validateMessage('This field is required');
                }
            }
        });
    }
});

Cypress.Commands.add('validateHelper',(helper, className) => {

    const tip = 'Basic information'

    // helper validation
    cy.get('muon-inputter').invoke('attr', 'helper').should('eq', helper);
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find(inputElement.headingSlot).should('have.text', helper);

    // tip details validation
    cy.document().then((doc)=>{
        doc.querySelector('muon-inputter').querySelector('div[slot="tip-details"]').textContent=tip;
        cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find('slot[name="tip-details"]').should('exist');
        const tipText = doc.querySelector('muon-inputter').shadowRoot.querySelector('inputter-detail').querySelector('slot').assignedNodes()[0].textContent
        assert.equal(tip,tipText,'Tip detail is not set as expected')
    })

    // validate open attribute
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').then((detail)=>{
        cy.wrap(detail).find(inputElement.headingSlot).click();
        cy.wrap(detail).invoke('attr', 'open').should('exist');
        cy.wrap(detail).find(inputElement.headingSlot).click();
        cy.wrap(detail).invoke('attr', 'open').should('not.exist');
    })
});

Cypress.Commands.add('validateAttribute',(type,label,validation,className) => {

    cy.get('muon-inputter').invoke('attr', 'validation').should('eq', validation);
    cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', type);

    cy.document().then((doc)=>{
        doc.querySelector('muon-inputter').querySelector('label[slot="label"]').textContent=label;
        cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('slot[name="label"]').should('exist');
        const labelText = doc.querySelector('muon-inputter').shadowRoot.querySelector('slot').assignedNodes()[0].textContent;
        assert.equal(label,labelText,'Tip detail is not set as expected');
    })
});

Cypress.Commands.add('checkRadioInput',(heading,input) => {
    cy.get('muon-inputter').invoke('attr', 'heading').should('eq', heading);
    cy.get('muon-inputter').invoke('attr', 'value').should('be.empty');
    cy.get('muon-inputter').find('input[type="radio"]').check(input,{force: true});
    cy.get('muon-inputter').invoke('attr', 'value').should('eq',input);
});

Cypress.Commands.add('selectCheckbox',(heading,input) => {
    cy.get('muon-inputter').invoke('attr', 'heading').should('eq', heading);
    cy.get('muon-inputter').invoke('attr', 'value').should('be.empty');
    cy.get('muon-inputter').find('input[type="checkbox"]').check(input,{force: true});
    cy.get('muon-inputter').invoke('attr', 'value').should('eq',input.toString());
});

Cypress.Commands.add('validateDate',(input) => {
    cy.get('muon-inputter').find('[type="date"]').type(input);
    cy.get('muon-inputter').contains('label', 'Date').click();
    cy.contains('label', 'Date').parent().should('have.attr', 'value', input);
});
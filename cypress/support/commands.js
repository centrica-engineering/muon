/* eslint-disable comma-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

import {inputElement} from './web_elements';

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

Cypress.Commands.add('launchComponent',(componentName,type) => {
    const baseUrl = `http://localhost:8000/iframe.html?id=${componentName}--${type}&viewMode=story`;
    cy.visit(baseUrl);
});

Cypress.Commands.add('loadingShadowSpan',() => {
    const attributes = { role: 'alert','aria-live': 'assertive',class: 'sr-only' };
    for (const [key, value] of Object.entries(attributes)) {
        cy.get('a').get('muon-cta').shadow().find('span').invoke('attr',`${key}`).should('eq',`${value}`);
      }
});

Cypress.Commands.add('enterAndValidateMessage',(input, message) => {

    cy.get('muon-inputter').find('input').type(`${input}{enter}`);
    cy.get('muon-inputter').invoke('attr','value').should('eq', input);
    cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find(inputElement.inputWrapper).should('exist');
    cy.document().then((doc)=>{
        const inputValue = doc.querySelector('muon-inputter').shadowRoot.querySelector(inputElement.inputWrapper).querySelector('slot').assignedNodes()[0].parentNode.value;
        assert.equal(input,inputValue,'Input value is not as expected')
    })

    // validation message code
    if (!message) {
        cy.get('muon-inputter').shadow().find('div[class="validation"]').should('not.exist');
    } else {
        cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains(message);
        cy.get('muon-inputter').shadow().find(inputElement.validationSelector).find('inputter-icon').invoke('attr', 'name').should('eq', 'exclamation-circle');
    }
    cy.clearInput();
    cy.enterValue('{enter}');
    cy.validateMessage('This field is required.');
});

Cypress.Commands.add('validateHelper',(className) => {

    const helper = 'How can we help you?';
    const tip = 'Basic information'

    // helper validation
    cy.get('muon-inputter').invoke('attr', 'helper').should('eq', helper);
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find('div[slot="heading"]').should('have.text', helper);

    // tip details validation
    cy.document().then((doc)=>{
        doc.querySelector('muon-inputter').querySelector('div[slot="tip-details"]').textContent=tip;
        cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find('slot[name="tip-details"]').should('exist');
        const tipText = doc.querySelector('muon-inputter').shadowRoot.querySelector('inputter-detail').querySelector('slot').assignedNodes()[0].textContent
        assert.equal(tip,tipText,'Tip detail is not set as expected')
    })

    // validate open attribute
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find('div[slot="heading"]').click();
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').invoke('attr', 'open').should('exist');

    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find('div[slot="heading"]').click();
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').invoke('attr', 'open').should('not.exist');
});

Cypress.Commands.add('validateAttribute',(type,label,validation) => {

    cy.get('muon-inputter').invoke('attr', 'validation').should('eq', validation);
    cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', type);

    cy.document().then((doc)=>{
        doc.querySelector('muon-inputter').querySelector('label[slot="label"]').textContent=label;
        cy.get('muon-inputter').shadow().find(inputElement.inputSelector).find('slot[name="label"]').should('exist');
        const labelText = doc.querySelector('muon-inputter').shadowRoot.querySelector('slot').assignedNodes()[0].textContent;
        assert.equal(label,labelText,'Tip detail is not set as expected');
    })
});

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

/* eslint-disable comma-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

import inputElement from './web_elements';

Cypress.Commands.add('clearInput', () => {
    cy.get('muon-inputter').find('input').clear();
});

Cypress.Commands.add('enterValue',(value) => {
    cy.get('muon-inputter').find('input').type(value);
});

Cypress.Commands.add('validateMessage',(validationMessage) => {
    cy.get('muon-inputter').shadow().find(inputElement.validationClass).find(inputElement.messageClass).contains(validationMessage);
    cy.get('muon-inputter').shadow().find(inputElement.validationClass).find(inputElement.iconClass).invoke('attr','name').should('eq','exclamation-circle');
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

Cypress.Commands.add('checkPreviousNext',() => {
    cy.get('a.ember-view').first().find('muon-cta').should('have.text','Previous').and('have.attr','icon','arrow-left');
    cy.get('a.ember-view').first().next().find('muon-cta').should('have.text','Next').click();
});

Cypress.Commands.add('checkRadioInput',(heading,input) => {
    cy.get('muon-inputter').invoke('attr', 'heading').should('eq', heading);
    cy.get('muon-inputter').invoke('attr', 'value').should('be.empty');
    cy.get('muon-inputter').find('input[type="radio"]').check(input,{force: true});
    cy.get('muon-inputter').invoke('attr', 'value').should('eq',input);
});




Cypress.Commands.add('enterAndValidateMessage',(input, message) => {

    cy.get('muon-inputter').find('input').type(`${input}{enter}`);
    cy.get('muon-inputter').invoke('attr','value').should('eq', input);
    cy.get('muon-inputter').shadow().find(inputElement.inputClass).find(inputElement.inputWrapper).should('exist');
    cy.document().then((doc)=>{
        const inputValue = doc.querySelector('muon-inputter').shadowRoot.querySelector(inputElement.inputWrapper).querySelector('slot').assignedNodes()[0].parentNode.value;
        assert.equal(input,inputValue,'Input value is not as expected')
    })

    // validation message code
    if (message === undefined) {
        cy.get('muon-inputter').shadow().find('div[class="validation"]').should('not.exist');
    } else {
        cy.get('muon-inputter').shadow().find(inputElement.validationClass).find(inputElement.messageClass).contains(message);
        cy.get('muon-inputter').shadow().find(inputElement.validationClass).find('inputter-icon').invoke('attr', 'name').should('eq', 'exclamation-circle');
    }
    cy.clearInput();
    cy.enterValue('{enter}');

    //check isRequired validation is present and validate the message after clearing the input
    cy.document().then((doc)=>{
        const validation = doc.querySelector('muon-inputter').hasAttribute('validation');
        if (validation === true) {
            let value = doc.querySelector('muon-inputter').getAttribute('validation');
            if (value.includes('isRequired')) {
                cy.validateMessage('This field is required');
            }
        }
    })
    
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
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find(inputElement.headingSlot).click();
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').invoke('attr', 'open').should('exist');

    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').find(inputElement.headingSlot).click();
    cy.get('muon-inputter').shadow().find(`div[class=" ${className} "]`).find('inputter-detail').invoke('attr', 'open').should('not.exist');
});

Cypress.Commands.add('validateAttribute',(type,label,validation,placeholder) => {

    cy.get('muon-inputter').invoke('attr', 'validation').should('eq', validation);
    cy.get('muon-inputter').invoke('attr', 'placeholder').should('eq', placeholder);

    cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', type);
    cy.get('muon-inputter').find('input').invoke('attr', 'placeholder').should('eq', placeholder);

    cy.document().then((doc)=>{
        doc.querySelector('muon-inputter').querySelector('label[slot="label"]').textContent=label;
        cy.get('muon-inputter').shadow().find(inputElement.inputClass).find('slot[name="label"]').should('exist');
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

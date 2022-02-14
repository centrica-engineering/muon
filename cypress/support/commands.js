/* eslint-disable comma-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

Cypress.Commands.add('clearInput', () => {
    cy.get('muon-inputter').find('input').clear();
});

Cypress.Commands.add('enterValue',(value) => {
    cy.get('muon-inputter').find('input').type(value);
});

Cypress.Commands.add('validateMessage',(validationMessage) => {
    cy.get('muon-inputter').shadow().find('div[class="validation"]').find('inputter-icon[class="icon"]').invoke('attr','name').should('eq','exclamation-circle');
    cy.get('muon-inputter').shadow().find('div[class="validation"]').find('div[class="message"]').contains(validationMessage);
});

Cypress.Commands.add('validateCTAShadow',(shadowParentElement,shadowclass,ctaIcon) => {
    cy.get('muon-cta').shadow().find(shadowParentElement).invoke('attr','class').should('eq',` ${shadowclass} `);
    cy.get('muon-cta').shadow().find(shadowParentElement).find('span[class="label-holder"]').should('be.visible');
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

    if (message === undefined) {
        cy.get('muon-inputter').shadow().find('div[class="validation"]').should('not.exist');

    } else {
        cy.get('muon-inputter').shadow().find('div[class="validation"]').find('div[class="message"]').contains(message);
        cy.get('muon-inputter').shadow().find('div[class="validation"]').find('inputter-icon').invoke('attr', 'name').should('eq', 'exclamation-circle');
    }

    cy.clearInput();
    cy.enterValue('{enter}');
    cy.validateMessage('This field is required.');
});

Cypress.Commands.add('validateHelper',() => {

    cy.get('muon-inputter').invoke('attr', 'helper').should('eq', 'How can we help you?');
    cy.get('muon-inputter').invoke('attr', 'tip').should('eq', 'By providing clarification on why this information is necessary.');

    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('inputter-detail').find('div[slot="heading"]').should('have.text', 'How can we help you?');
    cy.get('muon-inputter').find('div[slot="tip-details"]').should('have.text', 'By providing clarification on why this information is necessary.');
    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('inputter-detail').find('div[slot="heading"]').click();
    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('inputter-detail').invoke('attr', 'open').should('exist');

    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('inputter-detail').find('div[slot="heading"]').click();
    cy.get('muon-inputter').shadow().find('div[class=" inputter "]').find('inputter-detail').invoke('attr', 'open').should('not.exist');
});

Cypress.Commands.add('validateAttribute',(type,label,validation,placeholder) => {

    cy.get('muon-inputter').invoke('attr', 'inputtype').should('eq', type);
    cy.get('muon-inputter').invoke('attr', 'label').should('eq', label);
    cy.get('muon-inputter').invoke('attr', 'validation').should('eq', validation);
    cy.get('muon-inputter').invoke('attr', 'placeholder').should('eq', placeholder);

    cy.get('muon-inputter').find('input').invoke('attr', 'type').should('eq', type);
    cy.get('muon-inputter').find('input').invoke('attr', 'placeholder').should('eq', placeholder);
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

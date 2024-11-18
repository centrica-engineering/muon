/* eslint-disable no-undef */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
  cy.wait(3000)
});

Then('Validate the svg element', () => {
  cy.get('muon-icon')
    .shadow()
    .find('svg')
    .should('be.visible');
});

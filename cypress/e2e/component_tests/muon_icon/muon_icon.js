/* eslint-disable no-undef */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';


Then('Validate the svg element', () => {
  cy.get('muon-icon')
    .shadow()
    .find('svg')
    .should('be.visible');
});

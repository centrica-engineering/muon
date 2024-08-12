/* eslint-disable no-undef */
import { Then } from '@badeball/cypress-cucumber-preprocessor';


Then('Validate the svg element', () => {
  cy.get('muon-icon')
    .shadow()
    .find('svg')
    .should('be.visible');
});

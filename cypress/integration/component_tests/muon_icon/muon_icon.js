/* eslint-disable no-undef */
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('Validate the svg element', () => {
  cy.get('muon-icon')
    .shadow()
    .find('svg')
    .should('be.visible');
});

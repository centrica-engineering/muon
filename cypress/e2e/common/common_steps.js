import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

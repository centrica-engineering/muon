/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('User clicks to expand the detail', () => {
  cy.get('muon-detail').find('div[slot="heading"]').click();
});

Then('Validate the attributes and elements in the {string} {string} component', (type, component) => {

  if (type === 'with-icon') {
    cy.get(component).invoke('attr', 'icon').should('eq', 'dot-circle');
    cy.get(component).shadow().find('details').invoke('attr', 'class').should('eq', ' details toggle-end has-icon ');
    cy.get(component).shadow().find('details').find('summary.heading').find('detail-icon.icon').invoke('attr', 'name').should('eq', 'dot-circle');
  } else {
    cy.get(component).shadow().find('details').invoke('attr', 'class').should('eq', ' details toggle-end ');
  }

  cy.get(component).invoke('attr', 'open').should('exist');
  cy.get(component).shadow().find('details').invoke('attr', 'open').should('exist');
  cy.get(component).shadow().find('details').find('summary.heading').find('detail-icon.toggle').invoke('attr', 'name').should('eq', 'chevron-circle-up');

  //Click the expander to close the content
  cy.get('muon-detail').find('div[slot="heading"]').click();
  cy.get(component).invoke('attr', 'open').should('not.exist');
  cy.get(component).shadow().find('details').invoke('attr', 'open').should('not.exist');
  cy.get(component).shadow().find('details').find('summary.heading').find('detail-icon.toggle').invoke('attr', 'name').should('eq', 'chevron-circle-down');

  cy.get(component).children().invoke('attr', 'slot').should('eq', 'heading');

});

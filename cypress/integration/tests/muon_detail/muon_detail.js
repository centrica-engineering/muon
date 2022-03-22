/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('User clicks to expand the detail', () => {
  cy.get('muon-detail').find('div[slot="heading"]').click();
});

Then('Validate the attributes and elements in the {string} detail component', (type) => {

  if (type === 'with-icon') {
    cy.get('muon-detail').invoke('attr', 'icon').should('eq', 'dot-circle');
    cy.get('muon-detail').shadow().find('details').invoke('attr', 'class').should('eq', ' details toggle-end has-icon ');
    cy.get('muon-detail').shadow().find('details').find('summary.heading').find('detail-icon.icon').invoke('attr', 'name').should('eq', 'dot-circle');
  } else {
    cy.get('muon-detail').shadow().find('details').invoke('attr', 'class').should('eq', ' details toggle-end ');
  }

  //validate the component when open
  cy.get('muon-detail').invoke('attr', 'open').should('exist');
  cy.get('muon-detail').shadow().find('details').invoke('attr', 'open').should('exist');
  cy.get('muon-detail').shadow().find('details').find('summary.heading').find('detail-icon.toggle').invoke('attr', 'name').should('eq', 'chevron-circle-up');

  //Heading and paragraph validation
  cy.fixture('data').then((detail)=>{
    cy.get('muon-detail').find('div[slot="heading"]').should('have.text', detail.detail_heading);
    cy.get('muon-detail').invoke('text').should('contains', detail.detail_content);
  });
  

  //Click the expander to close the content
  cy.get('muon-detail').find('div[slot="heading"]').click();
  cy.get('muon-detail').invoke('attr', 'open').should('not.exist');
  cy.get('muon-detail').shadow().find('details').invoke('attr', 'open').should('not.exist');
  cy.get('muon-detail').shadow().find('details').find('summary.heading').find('detail-icon.toggle').invoke('attr', 'name').should('eq', 'chevron-circle-down');

  cy.get('muon-detail').children().invoke('attr', 'slot').should('eq', 'heading');

});

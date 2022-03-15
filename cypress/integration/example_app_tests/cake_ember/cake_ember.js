/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import inputElement from '../../../support/web_elements';

Given('Launch the ember cake website', () => {
  cy.visit('http://localhost:4200/');
});

When('the user views the welcome page and clicks on make your cake', () => {
    cy.title().should('eq','Ember App');
    cy.get('main').find('h1').should('have.text','Cake Config v 1.0')
    cy.get('a').find('muon-cta').should('have.text','Make your Cake!').click();
});

And('select the shape of the cake as {string}', (shape) => {
  cy.title().should('eq','Choose a shape | Configurator');
  cy.get('form').find('muon-inputter').invoke('attr', 'heading').should('eq', 'What shaped cake do you want?');
  cy.get('form').find('muon-inputter').invoke('attr', 'value').should('be.empty');
  cy.get('form').find('muon-inputter').find('input[type="radio"]').check(shape,{force: true});
  cy.get('form').find('muon-inputter').invoke('attr', 'value').should('eq',shape);
  cy.get('form').find('muon-cta').should('have.text','Next').click(); 
});

And('enter the tiers count', () => {
  cy.title().should('eq','Pick number of tiers | Configurator');
  cy.get('muon-inputter').find(inputElement.label).should('have.text','Tiers')
  cy.validateHelper('How many tiers would you like?', 'inputter');
  cy.get('muon-inputter').find('input').invoke('attr','type').should('eq','number');
  cy.enterAndValidateMessage('4','Value must be less than or equal to 3..');
  cy.enterAndValidateMessage('3','Value must be less than or equal to 3..');

  cy.checkPreviousNext();
});

And('select the flavour sponge as {string}', (flavour) => {
  cy.title().should('eq','PickSponge | Configurator');
  cy.checkRadioInput('What flavour sponge?',flavour)
  cy.checkPreviousNext();
});

And('select the icing colour as {string}', (colour) => {
  cy.title().should('eq','Pick your cake colour | Configurator');
  cy.checkRadioInput('What colour icing?',colour)
  cy.checkPreviousNext();
});

And('select the filling as {string}', (filling) => {
  cy.title().should('eq','PickFilling | Configurator');
  cy.checkRadioInput('What colour icing?',colour)
  cy.checkPreviousNext();
}); 
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

And('select the filling from the list', (s) => {
  cy.title().should('eq','PickFilling | Configurator');
  cy.selectCheckbox('What fillings?',['Buttercream','Strawberry jam','Cream cheese','Lemon mascarpone']);
  cy.checkPreviousNext();
});

And('select the occasion as {string}', (occasion) => {
  cy.title().should('eq','PickOccasion | Configurator');
  cy.get('muon-inputter').find('input').invoke('attr','placeholder').should('eq', 'e.g. Graduation');

  if (occasion === 'undefined'){
    cy.get('muon-inputter').find('select').select('Select your occasion');
    cy.get('muon-inputter').first().find('label').should('have.text', 'Select an option').click();
    cy.get('muon-inputter').invoke('attr','value').should('be.empty');
    cy.validateMessage('This field is required');
  } else if (occasion === 'Other'){
    cy.get('select').select('Other (please specify)');
    cy.get('muon-inputter').invoke('attr','value').should('eq', 'Other (please specify)');
    cy.get('muon-inputter').get('[type="text"]').type('Graduation Party{enter}');
    cy.get('muon-inputter').first().next().invoke('attr','value').should('eq', 'Graduation Party');
  } else {
    cy.get('select').select(occasion);
    cy.get('muon-inputter').invoke('attr','value').should('eq', occasion);
  }
  
  cy.checkPreviousNext();
});

And('select the decoration from the list', () => {
  cy.title().should('eq','PickAddon | Configurator');
  cy.selectCheckbox('Which decorations?',['Candles', 'Ribbon', 'Flowers', 'Writing']);
  cy.checkPreviousNext();
});

And('enter the personal and delivery details', () => {

  // delivery date out of range
  cy.dateValidation('2021-12-01');
  cy.validateMessage('Date must be on or after 01/01/2022.');

  // delivery date within range
  cy.dateValidation('2022-03-01');





  
});
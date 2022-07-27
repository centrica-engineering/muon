/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {inputElement} from '../../../support/web_elements';

Given('Launch the ember cake website', () => {
  cy.visit('http://localhost:4200/');
});

When('the user views the welcome page and clicks on make your cake', () => {
    cy.title().should('eq','Ember App');
    cy.get('main').find('h1').should('have.text','Cake Config v 1.0')
    cy.percySnapshot('Home page')
    cy.get('a').find('muon-cta').should('have.text','Make your Cake!').click();
});

And('select the shape of the cake as {string}', (shape) => {
  cy.title().should('eq','Choose a shape | Configurator');
  cy.get('form').find('muon-inputter').invoke('attr', 'heading').should('eq', 'What shaped cake do you want?');
  cy.get('form').find('muon-inputter').invoke('attr', 'value').should('be.empty');
  cy.get('form').find('muon-inputter').find('input[type="radio"]').check(shape,{force: true});
  cy.get('form').find('muon-inputter').invoke('attr', 'value').should('eq',shape);
  cy.percySnapshot('Shape selection of cake')
  cy.get('form').find('muon-cta').should('have.text','Next').click(); 
});

And('enter the tiers count', () => {
  cy.title().should('eq','Pick number of tiers | Configurator');
  cy.get('muon-inputter').find(inputElement.label).should('have.text','Tiers')
  cy.validateHelper('How many tiers would you like?', 'inputter');
  cy.get('muon-inputter').find('input').invoke('attr','type').should('eq','number');

  if(Cypress.isBrowser('firefox')) {
    cy.enterAndValidateMessage('4','Please select a value that is no more than 3..', true);
  } else {
    cy.enterAndValidateMessage('4','Value must be less than or equal to 3..', true);
  }

  cy.enterAndValidateMessage('3',false);
  cy.percySnapshot('Tiers count')
  cy.clickCTA('Next');
});

And('select the flavour sponge as {string}', (flavour) => {
  cy.title().should('eq','PickSponge | Configurator');
  cy.checkRadioInput('What flavour sponge?',flavour)
  cy.percySnapshot('Cake flavour')
  cy.clickCTA('Next');
});
 
And('select the icing colour as {string}', (colour) => {
  cy.title().should('eq','Pick your cake colour | Configurator');
  cy.checkRadioInput('What colour icing?',colour)
  cy.percySnapshot('Cake icing colour')
  cy.clickCTA('Next');
});

And('select the filling from the list', (s) => {
  cy.title().should('eq','PickFilling | Configurator'); 
  cy.selectCheckbox('What fillings?',['Buttercream','Strawberry jam','Cream cheese','Lemon mascarpone']);
  cy.percySnapshot('Cake fillings')
  cy.clickCTA('Next');
});

And('select the occasion as {string}', (occasion) => {
  cy.title().should('eq','PickOccasion | Configurator');
  cy.get('muon-inputter').find('input').invoke('attr','placeholder').should('eq', 'e.g. Graduation');

  if (!occasion){
    cy.get('muon-inputter').find('select').select('Select your occasion');
    cy.get('muon-inputter').first().find('label').should('have.text', 'Select an option').click();
    cy.get('muon-inputter').invoke('attr','value').should('be.empty');
    cy.validateMessage('This field is required');
  } else if (occasion === 'Other'){
    cy.get('select').select('Other (please specify)');
    cy.get('muon-inputter').invoke('attr','value').should('eq', 'Other (please specify)');
    cy.get('muon-inputter').get('[type="text"]').type('Graduation Party');
    cy.get('muon-inputter').first().next().invoke('attr','value').should('eq', 'Graduation Party');
  } else {
    cy.get('select').select(occasion);
    cy.get('muon-inputter').invoke('attr','value').should('eq', occasion);
  }
  
  cy.clickCTA('Next');
});

And('select the decoration from the list', () => {
  cy.title().should('eq','PickAddon | Configurator');
  cy.selectCheckbox('Which decorations?',['Candles', 'Ribbon', 'Flowers', 'Writing']);
  cy.percySnapshot('Cake decoration')
  cy.clickCTA('Next');
});

And('enter the personal and delivery details', () => {

  // delivery date out of range
  cy.validateDate('2021-12-01');
  cy.validateMessage('Date must be on or after 01/01/2022.');

  // delivery date within range
  cy.validateDate('2022-03-01');

  //allergies or intolerances
  cy.get('muon-inputter').find('textarea').type('No allergies, so you can use any ingredients');
  cy.get('muon-inputter').find('textarea').prev().should('have.text', 'Provide further information').click();
  cy.contains('label', 'Provide further information').parent().should('have.attr', 'value', 'No allergies, so you can use any ingredients');

  //number of slices
  cy.get('input[type="number"]').parent().shadow().find(inputElement.inputSelector).find('inputter-detail').find(inputElement.headingSlot).click();
  cy.get('input[type="number"]').parent().shadow().find(inputElement.inputSelector).find('inputter-detail').invoke('attr', 'open').should('exist');
  const rnd = Math.floor((Math.random() * 20) + 1);
  cy.get('muon-inputter').find('input[type="number"]').type(`${rnd}`);

  let message = (Cypress.isBrowser('firefox')) ? 'Please select a value that is no more than 16.. ' 
                                               : 'Value must be less than or equal to 16..'
                                               
  if(rnd > 16){
    cy.get('input[type="number"]').parent().shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains(message);
  } else{
    cy.get('input[type="number"]').parent().shadow().find('div[class="validation"]').should('not.exist');
  }
  cy.get('input[type="number"]').parent().should('have.attr', 'value', rnd);

  //persional details
  cy.personalDetails('Mr', 'Jeorge', 'Lantham', 'name@test.com', '07489437832');

  //delivery address
  cy.deliveryAddress('101', 'Hobbit road', 'Titans', 'TQ10 2SD');

  cy.percySnapshot('Personal details and delivery address')
  cy.clickCTA('Checkout');
  
});

Then('validate {string} {string} {string} details in the comfirmation page', (shape, icing, occasion) => {

    cy.findByText('Shape').next().should('have.text',shape);
    cy.findByText('Tiers').next().should('have.text','3');
    cy.findByText('Icing').next().should('have.text',icing);

    let event;

    if(!occasion){
      event = '';
    } else if(occasion === 'Other'){
      event = 'Graduation Party';
    }else{
      event = occasion;
    }
    cy.findByText('Occasion').next().should('have.text',event);

    cy.findByText('Decoration').next().should('have.text','Candles');
    cy.findByText('Candles').next().should('have.text','Ribbon');
    cy.findByText('Ribbon').next().should('have.text','Flowers');
    cy.findByText('Flowers').next().should('have.text','Writing');

    cy.findByText('Allergies or intolerances').next().should('have.text', 'No allergies, so you can use any ingredients');

    cy.findByText('Date due').next().should('have.text','2022-03-01');
    cy.findByText('Ordered by').next().should('have.text','Mr Jeorge Lantham');
    cy.findByText('Email').next().should('have.text','name@test.com');
    cy.findByText('Phone').next().should('have.text','0748-943-7832');

    cy.findByText('Address').next().contains('TQ10 2SD');

    cy.clickCTA('Buy Now');
    cy.percySnapshot('Confirmation page')

    cy.clickCTA('Reconfigure', true);
    cy.title().should('eq','Choose a shape | Configurator');
}); 

And('click CTA and navigate to previous page', () => {
  cy.clickCTA('Previous',true);
  cy.title().should('eq','Choose a shape | Configurator');
});
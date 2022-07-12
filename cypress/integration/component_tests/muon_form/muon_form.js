/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {formElement} from '../../../support/web_elements';

Given('Launch the muon-form component standard type in the browser', () => {
  cy.launchComponent('muon-form', 'standard');
});

When('User enters values in all fields', () => {
  cy.get('form').invoke('attr','novalidate').should('eq','true')  
  cy.enterFormValue({useremail: 'nuke@mail.com',userid: '6thgh',username: 'test nuke',checkinput: ['a','b']})
});

When('User enter the value only in first field and press enter', () => {

  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find(formElement.username).find('input[type="text"]').type('brand{enter}')
    cy.wrap(form).find(formElement.username).invoke('attr','value').should('eq','brand')
  })
});


Then('User clicks on submit and validate the {string} form', (validation) => {
  

  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find(formElement.labelUserID).find('muon-cta').invoke('attr','tabindex').should('eq','0')
    cy.wrap(form).find(formElement.labelUserID).find('muon-cta[type="submit"]').click()

    if(validation==='valid'){
      cy.wrap(form).find(formElement.username).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.labelUserID).find('label').find(formElement.inputterCheckbox).shadow().find('div.validation').should('not.exist')
    }else{
      cy.wrap(form).find(formElement.username).find('input').should('have.css', 'outline-color', 'rgb(178, 139, 255)')
      cy.wrap(form).find(formElement.labelUserID).find('label').find(formElement.inputterCheckbox).find(formElement.inputCheckbox).uncheck();
      cy.wrap(form).find(formElement.username).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.labelUserID).find('label').find(formElement.inputterCheckbox).shadow().find('div.validation')
      .find('div.message').should('contain','This field is required.')
    }
    
  })
  
});

Then('Validate that the remaining fields are highlighted with error message', () => {

  cy.get('muon-form').get('form').then((form)=>{
      cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.useremail).find('input').should('have.css', 'outline-color', 'rgb(178, 139, 255)')
  })
  
});

And('User resets the form', () => {
  
  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find(formElement.labelUserID).find('label').find('input[type="reset"]').click()

    cy.wrap(form).find(formElement.username).invoke('attr','value').should('eq','')
    cy.wrap(form).find(formElement.useremail).invoke('attr','value').should('eq','')
    cy.wrap(form).find(formElement.labelUserID).find('label').find(formElement.inputterCheckbox).invoke('attr','value').should('eq','b')

    cy.wrap(form).find(formElement.username).shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find(formElement.labelUserID).find('label').find(formElement.inputterCheckbox).shadow().find('div.validation').should('not.exist')
  })
  
});
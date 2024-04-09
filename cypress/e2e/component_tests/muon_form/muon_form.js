/* eslint-disable no-undef */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {formElement} from '../../../support/web_elements';

Given('Launch the muon-form component standard type in the browser', () => {
  cy.launchComponent('muon-form', 'standard');
});

When('User enters values in all fields', () => {
  cy.get('form').invoke('attr','novalidate').should('eq','true')  
  cy.enterFormValue({useremail: 'nuke@mail.com',userid: '6thgh',username: 'test nuke',checkinput: ['a','b'],title: 'Value two',DOB: '31101994'})
});

When('User enter the value only in first field and press enter', () => {

  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find(formElement.username).find('input[type="text"]').clear()
    cy.wrap(form).find(formElement.username).find('input[type="text"]').type('brand')
    cy.wrap(form).find(formElement.username).invoke('attr','value').should('eq','brand')
    cy.wrap(form).find(formElement.dob).find('input[type="text"]').type('02/02/2023')
    cy.wrap(form).find(formElement.useremail).find('input').type('test@123.com')
    cy.wrap(form).find('input[id="user-id"]').type('trip08{enter}')
  })
});


Then('User clicks on submit and validate the {string} form', (validation) => {
  

  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find('muon-cta[type="submit"]').click()

    if(validation==='valid'){
      cy.wrap(form).find(formElement.title).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.username).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.dob).shadow().find('div.validation').should('not.exist')
      cy.wrap(form).find(formElement.inputterCheckbox).shadow().find('div.validation').should('not.exist')
    }else{
      cy.wrap(form).find(formElement.useremail).find('input').should('have.css', 'outline-color', 'rgb(178, 139, 255)')
      cy.wrap(form).find(formElement.title).find('select').select('Please select')
      cy.wrap(form).find(formElement.username).find('input[type="text"]').clear();
      cy.wrap(form).find(formElement.dob).find('input[type="text"]').type('02/02/2023')
      cy.wrap(form).find(formElement.inputterCheckbox).find(formElement.inputCheckbox).uncheck();

      // validation message part
      cy.wrap(form).find(formElement.title).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.username).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').find('div.message').should('contain','This field is required.')
      cy.wrap(form).find(formElement.dob).shadow().find('div.validation').find('div.message').should('contain','Date must be on or before 31/12/2022.')
      cy.wrap(form).find(formElement.inputterCheckbox).shadow().find('div.validation')
      .find('div.message').should('contain','This field is required.')
    }
    
  })
  
});

Then('Validate that the remaining fields are highlighted with error message', () => {

  cy.get('muon-form').get('form').then((form)=>{
      cy.wrap(form).find(formElement.dob).shadow().find('div.validation').find('div.message').should('contain','Date must be on or before 31/12/2022.')
      cy.wrap(form).find(formElement.dob).find('input').should('have.css', 'outline-color', 'rgb(178, 139, 255)')
  })
  
});

Then('User resets the form', () => {
  
  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find('input[type="reset"]').click()

    cy.wrap(form).find(formElement.username).invoke('attr','value').should('eq','text')
    cy.wrap(form).find(formElement.useremail).invoke('attr','value').should('eq','')
    cy.wrap(form).find(formElement.inputterCheckbox).invoke('attr','value').should('eq','b')

    cy.wrap(form).find(formElement.username).shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find(formElement.useremail).shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find(formElement.inputterCheckbox).shadow().find('div.validation').should('not.exist')
  })
  
});
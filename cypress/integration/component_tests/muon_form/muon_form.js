/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the muon-form component standard type in the browser', () => {
  cy.launchComponent('muon-form', 'standard');
});

When('enter values in all fields', () => {
  cy.get('form').invoke('attr','novalidate').should('eq','true')  
  cy.enterFormValue({useremail: 'nuke@mail.com',userid: '6thgh',username: 'test nuke',checkinput: ['a','b']})
});




Then('click on submit and validate the form', () => {
  

  cy.get('muon-form').get('form').then((form)=>{
    cy.wrap(form).find('label[for="user-id"]').find('muon-cta').invoke('attr','tabindex').should('eq','0')
    cy.wrap(form).find('label[for="user-id"]').find('muon-cta[type="submit"]').click()

    cy.wrap(form).find('muon-inputter[name="username"]').shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find('muon-inputter[name="useremail"]').shadow().find('div.validation').should('not.exist')
    cy.wrap(form).find('label[for="user-id"]').find('muon-inputter[name="checkboxes"]').shadow().find('div.validation').should('not.exist')
  })
  
});

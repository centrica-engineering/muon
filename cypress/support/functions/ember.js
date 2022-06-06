/* eslint-disable comma-spacing */
/* eslint-disable indent */

import {inputElement} from '../web_elements';

Cypress.Commands.add('clickCTA',(text, backOption) => {
    if(backOption){
      cy.get('a.ember-view').first().find('muon-cta').should('have.text',text).and('have.attr','icon','arrow-left');
    }
    cy.findByText(text).click();
});

Cypress.Commands.add('personalInputs',(label, value) => {
  cy.contains('label', label).parent().find('input').click();
  cy.contains('label', label).parent().click();    
  cy.contains('label', label).parent().shadow().find(inputElement.validationSelector).find(inputElement.messageSelector).contains('This field is required.');
  cy.contains('label', label).parent().find('input').type(`${value}`);
  if(label === 'Phone'){
     const firstNo = value.slice(0,4);
     const middleNo = value.slice(4,7);
     const lastNo = value.slice(7,11);

     var value = firstNo+"-"+middleNo+"-"+lastNo;
  } 
    
  cy.contains('label', label).parent().should('have.attr', 'value', value);
  cy.contains('label', label).parent().shadow().find('div[class="validation"]').should('not.exist');
});

Cypress.Commands.add('personalDetails',(title, firstName, surName, emailID, PhoneNo) => {
  cy.contains('label', 'Title').parent().find('input').type(title);
  cy.personalInputs('First name', firstName);
  cy.personalInputs('Surname', surName);

  cy.contains('label', 'Email').parent().find('input').type('name');
  cy.contains('label', 'Email').parent().shadow().find(inputElement.validationSelector)
    .find(inputElement.messageSelector).contains(`Your email does not look right. Please include an '@' in the email address. 'name' is missing an '@'..`);
  cy.contains('label', 'Email').parent().find('input').clear();
  cy.personalInputs('Email', emailID);
  

  cy.personalInputs('Phone', PhoneNo);

});

Cypress.Commands.add('deliveryAddress',(address1, address2, town, postcode) => {
  cy.personalInputs('Address 1', address1);
  cy.personalInputs('Address 2', address2);
  cy.personalInputs('Town/City', town);
  cy.personalInputs('Postcode', postcode);
});
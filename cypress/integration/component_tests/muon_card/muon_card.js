/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
  cy.wait(3000)
});

When('the user changes the content in the card', () => {
    
    cy.document().then((doc)=>{

       const cardComponent = doc.querySelector('muon-card');

       cardComponent.querySelector('[slot="header"]').innerText = "Heading of the card component";
       cardComponent.querySelector('p').innerText = "test the paragraph in card";
       cardComponent.querySelector('[slot="footer"]').innerText = "test the paragraph1 in card";
    })  
  
});

Then('Validate the shadow dom and elements in {string} type', (type) => {


  cy.document().then((doc)=>{

      cy.get('muon-card').shadow().find('.card').as('cardShadow')

      cy.get('@cardShadow').should('exist');
      cy.get('@cardShadow').find('.body').should('exist');

     const cardComponent = doc.querySelector('muon-card');

     const header = cardComponent.shadowRoot.querySelector('div[class="header"]').querySelector('slot[name="header"]').assignedNodes()[0].innerText;
     const paragraph = cardComponent.shadowRoot.querySelector('div[class="content"]').querySelector('slot').assignedNodes()[2].innerText;
     const footer = cardComponent.shadowRoot.querySelector('div[class="footer"]').querySelector('slot[name="footer"]').assignedNodes()[0].innerText;

     assert.equal("Heading of the card component", header,'Header is different in shadowroot slot');
     assert.equal("test the paragraph in card", paragraph,'Paragraph is different in shadowroot slot');
     assert.equal("test the paragraph1 in card", footer,'Footer is different in shadowroot slot'); 

     if (type.includes('image')){

        //alias
        cy.get('muon-card').shadow().find('.card').find('.media').as('cardMedia')
        cy.get('@cardMedia').find('card-image').as('cardImage')
        cy.get('@cardImage').find('div.image').find('img').as('tagImage')


        cy.get('@cardMedia').should('exist');
        cy.get('@cardImage').invoke('attr','src').should('eq','https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png');
        cy.get('@cardImage').invoke('attr','alt').should('be.empty');
        cy.get('@tagImage').invoke('attr','src').should('eq','https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png');
        cy.get('@tagImage').invoke('attr','class').should('eq','blur-out image-lazy');

     }  
  })
})

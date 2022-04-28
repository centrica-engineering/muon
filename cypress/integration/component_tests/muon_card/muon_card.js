/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('the user changes the content in the card', () => {
    
    cy.document().then((doc)=>{

       doc.querySelector('muon-card').querySelector('h2').innerText = "Heading of the card component";
       doc.querySelector('muon-card').querySelectorAll('p').item(0).innerText = "test the paragraph in card";
       doc.querySelector('muon-card').querySelector('div[slot="footer"]').innerText = "test the paragraph1 in card";
    })
  
});

Then('Validate the shadow dom and elements in {string} type', (type) => {

  cy.document().then((doc)=>{

     cy.get('muon-card').shadow().find('.card').should('exist');
     cy.get('muon-card').shadow().find('.card').find('.body').should('exist');

     const header = doc.querySelector('muon-card').shadowRoot.querySelector('div[class="header"]').querySelector('slot[name="header"]').assignedNodes()[0].innerText;
     const paragraph = doc.querySelector('muon-card').shadowRoot.querySelector('div[class="content"]').querySelector('slot').assignedNodes()[2].innerText;
     const footer = doc.querySelector('muon-card').shadowRoot.querySelector('div[class="footer"]').querySelector('slot[name="footer"]').assignedNodes()[0].innerText;

     assert.equal("Heading of the card component", header,'Header is different in shadowroot slot');
     assert.equal("test the paragraph in card", paragraph,'Paragraph is different in shadowroot slot');
     assert.equal("test the paragraph1 in card", footer,'Footer is different in shadowroot slot'); 

     if (type.includes('image')){
      cy.get('muon-card').shadow().find('.card').find('.media').should('exist');
      cy.get('muon-card').shadow().find('.card').find('.media').find('card-image').invoke('attr','src').should('eq','https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png');
      cy.get('muon-card').shadow().find('.card').find('.media').find('card-image').find('div.image').find('img').invoke('attr','src').should('eq','https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png');
      cy.get('muon-card').shadow().find('.card').find('.media').find('card-image').find('div.image').find('img').invoke('attr','class').should('eq','blur-out image-lazy');
      cy.get('muon-card').shadow().find('.card').find('.media').find('card-image').invoke('attr','alt').should('be.empty');
     }
  })

});

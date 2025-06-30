
import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import {cardElement} from '../../../support/web_elements';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('the user changes the content in the {string} card', (type) => {
    
    cy.document().then((doc)=>{
       const cardComponent = doc.querySelector('muon-card');

       cardComponent.querySelector('[slot="header"]').innerText = "Heading of the card component";
       cardComponent.querySelector('p').innerText = "test the paragraph in card";

       let footerSlot = cardComponent.querySelector('[slot="footer"]')
       let CTA = footerSlot.querySelector('muon-cta')

       if (type === 'standard-with-cta'){
         CTA.innerText = "Nucleus, the best"; 
         CTA.setAttribute('href','#!')
    
       } else {
         footerSlot.innerText = "Nucleus, the best";
       }

   
    })  
  
});

Then('Validate the shadow dom and elements in {string} type', (type) => {


  cy.document().then((doc)=>{

      cy.get('muon-card').shadow().find('.card').as('cardShadow')

      cy.get('@cardShadow').should('exist');
      cy.get('@cardShadow').find('.body').should('exist');

     const cardComponent = doc.querySelector('muon-card');

     const header = cardComponent.shadowRoot.querySelector(cardElement.header).querySelector('slot[name="header"]').assignedNodes()[0].innerText;
     const paragraph = cardComponent.shadowRoot.querySelector(cardElement.content).querySelector('slot').assignedNodes()[2].innerText;
     const footer = cardComponent.shadowRoot.querySelector(cardElement.footer).querySelector('slot[name="footer"]').assignedNodes()[0].innerText;

     assert.equal("Heading of the card component", header,'Header is different in shadowroot slot');
     assert.equal("test the paragraph in card", paragraph,'Paragraph is different in shadowroot slot');
     assert.equal("Nucleus, the best", footer,'Footer text is different in shadowroot slot'); 

     if (type.includes('image')){

        //alias
        cy.get('muon-card').shadow().find('.card').find('.media').as('cardMedia')
        cy.get('@cardMedia').find('card-image').as('cardImage')
        cy.get('@cardImage').find('div.image').find('img').as('tagImage')


        cy.get('@cardMedia').should('exist');
        cy.get('@cardImage').invoke('attr','src').should('eq','https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg');
        cy.get('@cardImage').invoke('attr','alt').should('be.empty');
        cy.get('@tagImage').invoke('attr','src').should('eq','https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg');
        cy.get('@tagImage').invoke('attr','class').should('eq','blur-out image-lazy');

     }
  })
})

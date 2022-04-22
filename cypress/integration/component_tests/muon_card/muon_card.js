/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {imageElement} from '../../../support/web_elements';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

When('the user changes the content in the card', () => {
    
    cy.get('muon-card').invoke('attr','header').should('eq','Can I manage my account online?')
    cy.get('muon-card').invoke('attr','content').should('eq',"<p>Yes, with an online account you can arrange a service visit, find out what's happening with your appointment, submit a meter reading and book an engineer.</p>")
    cy.get('muon-card').invoke('attr','footer').should('eq'," We've even got a free <a href='#!'>smartphone app</a>.")

    cy.document().then((doc)=>{
       doc.querySelector('muon-card').querySelectorAll('p').item(0).innerText = "test the paragraph in card";
       doc.querySelector('muon-card').querySelector('div[slot="footer"]').innerText = "test the paragraph2 in card";
       const check = doc.querySelector('muon-card').shadowRoot.querySelector('div[class="content"]').querySelector('slot').assignedNodes()[2].innerText;
       const check1 = doc.querySelector('muon-card').shadowRoot.querySelector('div[class="footer"]').querySelector('slot[name="footer"]').assignedNodes()[0].innerText;
       assert.equal("test the paragraph in card", check,'Paragraph is wrong');
       assert.equal("test the paragraph2 in card", check1,'Paragraph2 is wrong');
    })
  
});

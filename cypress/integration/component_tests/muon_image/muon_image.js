/* eslint-disable no-undef */
{/* <reference types="cypress" /> */}

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import {imageElement} from '../../../support/web_elements';

Given('Launch the {string} component {string} type in the browser', (component, type) => {
  cy.launchComponent(component, type);
});

Then('Validate the image src and elements in {string} type', (type) => {

  const placeholder = '(src).thumb.48.48.png';

  cy.get('muon-image').invoke('attr', 'placeholder').should('eq', placeholder);

  if (type === 'standard') {
    cy.get('muon-image').shadow().find(imageElement.imageSelector).find('img').as('image');

    cy.get('muon-image').invoke('attr', 'src').should('eq', 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png');
    cy.get('@image').invoke('attr', 'src').should('eq', 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png.thumb.48.48.png');
    cy.get('@image').invoke('attr', 'class').should('eq', 'image-lazy blur');

  } else {
    cy.get('muon-image').shadow().find(imageElement.backgroundImageSelector).find('div').as('backgroundImage')
    
    cy.get('muon-image').invoke('attr', 'src').should('eq', 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg');
    cy.get('muon-image').invoke('attr', 'background').should('exist');
    cy.get('@backgroundImage').should('have.css', 'background-image').and('include', 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg.thumb.48.48.png');
    cy.get('@backgroundImage').invoke('attr', 'class').should('eq', 'image-holder blur');
  }

});

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Launch the {string} component {string} type in the browser', (component,type) => {
    cy.launchComponent(component,type)
})

Then('Validate the elements and attributes in the {string} component', (type) => {

    switch(type){

        case "standard":
            cy.get('muon-cta').invoke('attr','role').should('eq','button')
            cy.validateCTAShadow('div','cta standard','arrow-right')
          break
        
        case "disabled":
            cy.get('muon-cta').invoke('attr','disabled').should('exist')
            cy.validateCTAShadow('div','cta standard disabled','arrow-right')
          break
        
        case "loading":
            cy.get('muon-cta').invoke('attr','role').should('eq','button')
            cy.validateCTAShadow('div','cta standard loading','spinner')
          break

        case "hidden":
            cy.get('muon-cta').should('have.css', 'display', 'none')
            cy.get('muon-cta').invoke('attr','hidden').should('exist')
            cy.get('muon-cta').shadow().find('div').find('cta-icon').should('not.be.visible')
            cy.get('muon-cta').shadow().find('div').invoke('attr','class').should('eq',' cta standard ');
            cy.get('muon-cta').shadow().find('div').find('span[class="label-holder"]').should('not.be.visible')
            cy.get('muon-cta').shadow().find('div').find('cta-icon').invoke('attr','name').should('eq','arrow-right');
          break
        
        case "standard-link":
            cy.get('muon-cta').shadow().find('a').invoke('attr','href').should('exist')
            cy.get('muon-cta').shadow().find('a').invoke('attr','tabindex').should('eq','0')
            cy.validateCTAShadow('a','cta standard','arrow-right')
          break
        
        case "disabled-link":
            cy.get('muon-cta').shadow().find('a').invoke('attr','href').should('exist')
            cy.get('muon-cta').shadow().find('a').invoke('attr','tabindex').should('eq','0')
            cy.validateCTAShadow('a','cta standard disabled','arrow-right')
          break
        
        case "loading-link":
            cy.get('muon-cta').shadow().find('a').invoke('attr','href').should('exist')
            cy.get('muon-cta').shadow().find('a').invoke('attr','tabindex').should('eq','0')
            cy.validateCTAShadow('a','cta standard loading','spinner')
          break

    }
    
})

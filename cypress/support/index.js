/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './functions/component';
import './functions/ember';
import '@shelex/cypress-allure-plugin';
import '@percy/cypress';

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

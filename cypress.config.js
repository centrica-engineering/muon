const { defineConfig } = require('cypress')
var cucumber = require('cypress-cucumber-preprocessor').default;
var allureWriter = require('@shelex/cypress-allure-plugin/writer');
// const setupNodeEvents = require('./cypress/plugins/index.js')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config){
      on('file:preprocessor', cucumber());
      allureWriter(on, config);
      return config;
    },
    includeShadowDom: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: ['cypress/e2e/component_tests/*.feature','cypress/e2e/example_app_tests/*.feature'],
  },
})
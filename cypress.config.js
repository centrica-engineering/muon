const { defineConfig } = require('cypress')
var cucumber = require('cypress-cucumber-preprocessor').default;
var allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config){
      on('file:preprocessor', cucumber());
      allureWriter(on, config);
      return config;
    },
    includeShadowDom: true,
    supportFile: 'cypress/support/index.js',
    specPattern: ['cypress/integration/component_tests/*.feature','cypress/integration/example_app_tests/*.feature'],
  },
})
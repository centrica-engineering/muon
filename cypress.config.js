const { defineConfig } = require('cypress');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)]
        })
      );
      allureCypress(on, {
        resultsDir: "./allure-results"
      });
      return config;
    },
    env: {
      tags: '@card or @cta or @detail or @form or @image or @icon or @inputter or @cake'
    },
    includeShadowDom: true,
    experimentalRunAllSpecs: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: ['cypress/e2e/component_tests/*.feature', 'cypress/e2e/example_app_tests/*.feature'],
  },
})

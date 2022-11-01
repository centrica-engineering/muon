const { defineConfig } = require('cypress')
var allureWriter = require('@shelex/cypress-allure-plugin/writer');
const createBundler  = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin  = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupNodeEvents(on, config) {
	await preprocessor.addCucumberPreprocessorPlugin(on, config);
	on("file:preprocessor",
	  createBundler({
		plugins: [createEsbuildPlugin.default(config)]
	  })
	);
  allureWriter(on, config);
	return config
}

module.exports = defineConfig({
  e2e: {
    includeShadowDom: true,
    supportFile: 'cypress/support/index.js',
    specPattern: ['cypress/integration/component_tests/*.feature','cypress/integration/example_app_tests/*.feature'],
    setupNodeEvents
  },
})
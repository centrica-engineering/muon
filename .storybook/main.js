// import json from '@rollup/plugin-json';
// import stories from '@muonic/muon/storybook/find-stories';
// import deepmerge from 'deepmerge';
const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');
const deepmerge = require('deepmerge');

/** @type {import('@web/storybook-framework-web-components').StorybookConfig} */
const findStories = stories(__dirname);

module.exports = {
  stories: [
    '../examples/stories/*.story.@(js|jsx|ts|tsx)',
    findStories
  ],
  framework: {
    name: '@web/storybook-framework-web-components'
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  docs: {
    autodocs: true
  },
  async rollupFinal(config) {
    const { rollupPlugins } = await import('@muonic/muon/scripts/rollup-plugins.mjs');

    const plugins = config.plugins.map((plugin) => {
      if (plugin.name !== 'babel') {
        return plugin;
      }
    }).filter(plugin => plugin);

    config.plugins = [
      json(),
      ...rollupPlugins,
      ...plugins
    ];

    return config;
  },
  async wdsFinal(config) {
    const serverConfig = await import('@muonic/muon/storybook/server.config.mjs');
    const StorybookConfig = serverConfig.default;

    return deepmerge(config, StorybookConfig);
  }
}

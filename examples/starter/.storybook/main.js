const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');
const deepmerge = require('deepmerge');

const findStories = [
    '../components/**/story.@(js|jsx|ts|tsx)',
    '../mnx-components/**/story.@(js|jsx|ts|tsx)',
    stories(__dirname)
  ];

module.exports = {
  stories: [...findStories],
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
};

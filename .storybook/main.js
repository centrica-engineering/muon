const json = require('@rollup/plugin-json');

module.exports = {
  stories: ['../packages/library/components/**/story.@(js|jsx|ts|tsx)', '../packages/library/storybook/tokens/*.@(js|jsx|ts|tsx)'],
  async rollupConfig(config) {
    const { rollupPlugins } = await import('@muons/library/scripts/rollup-plugins.mjs');

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
  }
};

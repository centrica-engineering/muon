const findStories = require('@muons/library/storybook/find-stories.js');

module.exports = {
  stories: async () => [...findStories()],
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
}

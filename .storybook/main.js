const stories = require('@muons/library/storybook/find-stories');

module.exports = {
  stories: async () => await stories(__dirname),
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

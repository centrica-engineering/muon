const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');

module.exports = {
  stories: async () => await stories(__dirname),
  async rollupConfig(config) {
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
  }
}

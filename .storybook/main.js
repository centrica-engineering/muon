const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');

const findStories = async () => {
  const muonStories = await stories(__dirname);
  return [
    ...muonStories,
    '../examples/starter-story/*.story.@(js|jsx|ts|tsx)'
  ]
}

module.exports = {
  stories: async () => await findStories(),
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

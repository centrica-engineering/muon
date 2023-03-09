const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');
const { mergeConfig } = require('vite');
const findStories = async () => {
  const muonStories = await stories(__dirname);

  return [
    ...muonStories,
    '../examples/stories/*.story.@(js|jsx|ts|tsx)'
  ]
}

module.exports = {
  stories: async () => await findStories(),
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  "framework": {
    name: "@storybook/web-components-vite",
    options: {}
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    const { rollupPlugins, aliasPath, postcssPlugins } = await import('@muonic/muon/scripts/rollup-plugins.mjs');

    const removeViteCSSPlugin = () => {
      return {
        name: 'remove-vite-css-plugin',
        apply: 'serve',
        configResolved(config) {
          const bannedPlugins = ['vite:css', 'vite:css-post'];
          config.plugins = config.plugins.filter((plugin) => !bannedPlugins.includes(plugin.name));
        }
      }
    }

    return mergeConfig(config,{
      resolve: {
        alias: aliasPath
      },
      plugins: [
        removeViteCSSPlugin(),
        ...rollupPlugins,
      ],
      css: {
        postcss: {
          plugins: postcssPlugins
        }
      }
    });
  }
}

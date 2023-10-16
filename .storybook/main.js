const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');
const { mergeConfig } = require('vite');
const Inspect = require('vite-plugin-inspect');
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
        // apply: 'serve',
        configResolved(config) {
          const bannedPlugins = ['vite:css', 'vite:css-post', 'vite:css-post-legacy', 'vite:css-pre']
          // config.plugins['vite:build-import-analysis'].enforce = 'post';

          config.plugins = config.plugins.map((plugin) => {
            if (plugin.name === 'vite:build-import-analysis') {
              return {
                ...plugin,
                enforce: 'post'
              }
            }
            return plugin;
          });

          config.plugins = config.plugins.filter((plugin) => !bannedPlugins.includes(plugin.name));
        }
      }
    }

    console.log('======================');
    console.log('======================');
    console.log('======================');
    console.log(JSON.stringify(config));
    console.log('======================');
    console.log('======================');
    console.log('======================');

    // config.plugins = [];

    return mergeConfig(config,{
      resolve: {
        alias: aliasPath
      },
      plugins: [
        ...rollupPlugins,
        Inspect({
          build: true,
          outputDir: '.vite-inspect'
        }),
        removeViteCSSPlugin(),
      ],
      css: {
        postcss: {
          plugins: postcssPlugins
        }
      }
    });
  }
}

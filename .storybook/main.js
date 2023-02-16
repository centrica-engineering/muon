const json = require('@rollup/plugin-json');
const stories = require('@muonic/muon/storybook/find-stories');

const findStories = async () => {
  const muonStories = await stories(__dirname);
  const s = muonStories.map((story) => {
    return {
      directory: story,
      titlePrefix: 'Example',
    };
  });

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
  async viteFinal(config, { configType }) {
    const { rollupPlugins, aliasPath } = await import('@muonic/muon/scripts/rollup-plugins.mjs');

    return {
      ...config,
      resolve: {
        alias: aliasPath
      },
      plugins: [
          // json(),
          ...config.plugins,
          ...rollupPlugins
      ]
    };
  }
}

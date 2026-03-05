import deepmerge from 'deepmerge';
import json from '@rollup/plugin-json';

export default {
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

    // eslint-disable-next-line consistent-return
    const plugins = config.plugins.map((plugin) => {
      if (plugin.name !== 'babel') {
        return plugin;
      }
    }).filter((plugin) => plugin);

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

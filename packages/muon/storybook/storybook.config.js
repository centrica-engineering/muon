/* @type {import('@storybook/web-components-vite').StorybookConfig} */
module.exports = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y'
  ],
  docs: {
    autodocs: true
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { vitePlugins } = await import('@muonic/muon/scripts/rollup-plugins.mjs');

    return mergeConfig(config, {
      plugins: vitePlugins
    });
  }
};

import jsonPlugin from '@rollup/plugin-json';
import commandLineArgs from 'command-line-args';
import { fromRollup } from '@web/dev-server-rollup';
import stories from '@muonic/muon/storybook/find-stories';

/** @type {import('@web/storybook-framework-web-components').StorybookConfig} */

const findStories = async () => {
  const muonStories = await stories(__dirname);
  return [
    ...muonStories,
    '../examples/stories/*.story.@(js|jsx|ts|tsx)'
  ]
}

const json = fromRollup(jsonPlugin);

module.exports = {
  stories: async () => await findStories(),
  framework: {
    name: '@web/storybook-framework-web-components'
  },
  async rollupFinal(config) {
    const { rollupPlugins } = await import('@muonic/muon/scripts/rollup-plugins.mjs');

    const plugins = config.plugins.map((plugin) => {
      if (plugin.name !== 'babel') {
        return plugin;
      }
    }).filter(plugin => plugin);

    config.plugins = [
      jsonPlugin(),
      ...rollupPlugins,
      ...plugins
    ];

    return config;
  },
  async wdsFinal(config) {
    // const StorybookConfig = await import('@muonic/muon/storybook/server.config.mjs');
    const  { serverPlugins } = await import('@muonic/muon/scripts/rollup-plugins.mjs');
    const plugins = config.plugins.map((plugin) => {
      if (plugin.name !== 'babel') {
        return plugin;
      }
    }).filter(plugin => plugin);

    const myServerDefinitions = [
      { name: 'no-open', type: Boolean },
      { name: 'no-watch', type: Boolean }
    ];
    
    const myConfig = commandLineArgs(myServerDefinitions, { partial: true });
    
    config.plugins = [
      json(),
      ...serverPlugins,
      ...plugins
    ];

    config.nodeResolve = true;
    config.mimeTypes = {
      '**/*.json': 'js',
      '**/css/*.css': 'text/css',
      '**/dist/*.css': 'text/css',
      'muon.min.css': 'text/css',
      '**/*.css': 'js'
    };

    config.open = !myConfig['no-open'];
    config.watch = !myConfig['no-watch'];

    return config;
  }
}

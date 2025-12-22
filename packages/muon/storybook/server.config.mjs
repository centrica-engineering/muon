import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import { serverPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';

const json = fromRollup(rollupJson);

/* @type {import('@web/storybook-framework-web-components').StorybookConfig} */
export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.json': 'js',
    '**/css/*.css': 'text/css',
    '**/dist/*.css': 'text/css',
    'muon.min.css': 'text/css',
    '**/*.css': 'js'
  },
  plugins: [
    json(),
    ...serverPlugins
  ]
};

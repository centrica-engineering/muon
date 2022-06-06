import { fromRollup } from '@web/dev-server-rollup';
import { storybookPlugin } from '@web/dev-server-storybook';
import rollupJson from '@rollup/plugin-json';
import { serverPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';

const json = fromRollup(rollupJson);

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.json': 'js',
    '**/*.css': 'js'
  },
  plugins: [
    json(),
    ...serverPlugins,
    storybookPlugin({ type: 'web-components' })
  ]
};

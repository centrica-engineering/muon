import { storybookPlugin } from '@web/dev-server-storybook';
import plugins from '@muons/library/scripts/rollup-plugins.mjs';

// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  open: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  plugins: [
    ...plugins,
    storybookPlugin({ type: 'web-components' })
  ]
};

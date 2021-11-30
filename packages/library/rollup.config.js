import merge from 'deepmerge';
import plugins from '@muon/library/scripts/rollup-plugins.mjs';

import { createBasicConfig } from '@open-wc/building-rollup';

const config = createBasicConfig();

const input = 'index.js';

export default merge(config, {
  ...config,
  input,
  treeshake: false,
  plugins: [
    ...plugins
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: 'dist/index.js',
    sourcemap: false,
    inlineDynamicImports: true
  },
});
 
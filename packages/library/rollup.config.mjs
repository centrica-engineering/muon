import merge from 'deepmerge';
import { rollupPlugins } from '@muons/library/scripts/rollup-plugins.mjs';

import { createBasicConfig } from '@open-wc/building-rollup';

const config = createBasicConfig();

const input = 'index.js';

export default merge(config, {
  ...config,
  input,
  treeshake: false,
  plugins: [
    ...rollupPlugins
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: 'dist/index.js',
    sourcemap: false,
    inlineDynamicImports: true
  }
});

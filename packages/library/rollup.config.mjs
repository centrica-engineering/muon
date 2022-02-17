import merge from 'deepmerge';
import { rollupPlugins } from '@muons/library/scripts/rollup-plugins.mjs';
import virtual from '@rollup/plugin-virtual';
import { createBasicConfig } from '@open-wc/building-rollup';
import { componentDefiner } from '@muons/library/scripts/utils/index.mjs';

const config = createBasicConfig();
const input = 'index.js';

export default merge(config, {
  ...config,
  input,
  entry: 'component-definitions.js',
  treeshake: false,
  plugins: [
    ...rollupPlugins,
    virtual({
      'component-definitions.js': componentDefiner()
    })
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: 'dist/index.js',
    sourcemap: false,
    inlineDynamicImports: true
  }
});

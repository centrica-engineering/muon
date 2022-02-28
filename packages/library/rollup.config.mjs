import merge from 'deepmerge';
import { rollupPlugins } from '@muons/library/scripts/rollup-plugins.mjs';
import virtual from '@rollup/plugin-virtual';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createBasicConfig } from '@open-wc/building-rollup';
import { componentDefiner } from '@muons/library/scripts/utils/index.mjs';

const config = createBasicConfig();
const input = 'index.js';

export default merge(config, {
  ...config,
  input,
  treeshake: false,
  plugins: [
    virtual({
      'component-definitions.js': componentDefiner()
    }),
    ...rollupPlugins,
    nodeResolve()
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: 'dist/index.js',
    sourcemap: false,
    inlineDynamicImports: true
  }
});

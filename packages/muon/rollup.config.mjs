import merge from 'deepmerge';
import { rollupPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';
import virtual from '@rollup/plugin-virtual';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createBasicConfig } from '@open-wc/building-rollup';
import { componentDefiner, getDestination } from '@muonic/muon/scripts/utils/index.mjs';
import path from 'path';

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
    file: path.join(getDestination(), 'index.js'),
    sourcemap: false,
    inlineDynamicImports: true
  }
});

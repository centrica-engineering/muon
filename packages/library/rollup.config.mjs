import merge from 'deepmerge';
import { rollupPlugins } from '@muons/library/scripts/rollup-plugins.mjs';
import virtual from '@rollup/plugin-virtual';
import { createBasicConfig } from '@open-wc/building-rollup';
import { componentDefiner } from '@muons/library/scripts/build/components/index.mjs';

const config = createBasicConfig();

// const input = 'index.js';
//const input = 'build/custom-elements.js';

export default merge(config, {
  ...config,
  input: 'index.js',
  treeshake: false,
  plugins: [
    ...rollupPlugins,
    virtual({
      'index.js': componentDefiner()
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

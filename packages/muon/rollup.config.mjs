import merge from 'deepmerge';
import virtual from '@rollup/plugin-virtual';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createBasicConfig } from '@open-wc/building-rollup';
import path from 'path';
import { componentDefiner, componentImportExport, getDestination } from '@muonic/muon/scripts/utils/index.mjs';
import { rollupPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';
import minifyHTMLPlugin from 'rollup-plugin-minify-html-literals';

const config = createBasicConfig();
const input = 'index.js';

export default merge(config, {
  ...config,
  input,
  treeshake: false,
  plugins: [
    minifyHTMLPlugin.default(),
    virtual({
      'component-definitions.js': componentDefiner(),
      'component-export.js': componentImportExport()
    }),
    ...rollupPlugins,
    nodeResolve()
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: path.join(getDestination(), 'index.js'),
    sourcemap: false,
    inlineDynamicImports: true,
    format: 'iife'
  }
});

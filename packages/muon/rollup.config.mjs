import virtual from '@rollup/plugin-virtual';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { componentDefiner, componentImportExport, getDestination } from '@muonic/muon/scripts/utils/index.mjs';
import { rollupPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';
import minifyHTMLPlugin from '@lit-labs/rollup-plugin-minify-html-literals';
import { defaultShouldMinify } from '@lit-labs/rollup-plugin-minify-html-literals/lib/minify-html-literals.js';

const input = 'index.js';

export default {
  input,
  treeshake: false,
  plugins: [
    minifyHTMLPlugin({
      options: {
        // The minifier cannot parse Lit dynamic element tags such as <${tag}>.
        shouldMinify: (template) => defaultShouldMinify(template) && !template.parts.some(({ text }) => /<\/?\s*$/.test(text))
      }
    }),
    virtual({
      'component-definitions.js': componentDefiner(),
      'component-export.js': componentImportExport()
    }),
    ...rollupPlugins,
    nodeResolve()
  ],
  output: {
    file: path.join(getDestination(), 'index.js'),
    sourcemap: false,
    inlineDynamicImports: true,
    format: 'iife'
  }
};

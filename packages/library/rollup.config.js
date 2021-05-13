import merge from 'deepmerge';
import stylesPlugin from 'rollup-plugin-styles';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import multi from '@rollup/plugin-multi-entry';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';

import { createBasicConfig } from '@open-wc/building-rollup';

const config = createBasicConfig();

const input = ['components/cta/mn-cta.js'];

export default merge(config, {
  ...config,
  input,
  treeshake: false,
  plugins: [
    multi(),
    stylesPlugin({
      plugins: [
        postcssImport(),
        postcssPreset({ stage: 0 }),
        autoprefixer({ grid: true, overrideBrowserslist: ['last 2 versions'] })
      ]
    }),
    injectProcessEnv({
      MUON_PREFIX: 'muon',
    })
  ],
  output: {
    ...config.output,
    dir: undefined,
    file: 'dist/build.min.js',
    sourcemap: false,
    inlineDynamicImports: true
  },
});
 
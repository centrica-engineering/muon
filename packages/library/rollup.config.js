import merge from 'deepmerge';
import stylesPlugin from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace';
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
    replace({
      'process.env.MUON_PREFIX': JSON.stringify('muon'),
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
 
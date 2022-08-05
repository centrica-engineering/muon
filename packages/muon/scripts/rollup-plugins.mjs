import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
import analyzerPlugin from './plugins/analyzer/index.mjs';
import * as variables from '../build/tokens/es6/muon-tokens.mjs';
import { getConfig } from './utils/index.mjs';

import path from 'path';

const config = getConfig(`muon.config.json`);

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const alias = fromRollup(aliasPlugin);
const analyzer = fromRollup(analyzerPlugin);

const additionalAlias = config?.alias?.map(({ find, replacement }) => {
  return {
    find,
    replacement: path.join(process.cwd(), replacement)
  };
}).filter((alias) => alias) ?? [];

const aliasConfig = {
  entries: [
    ...additionalAlias,
    { find: /^@muon\/components\/(.*)/, replacement: '@muonic/muon/components/$1' },
    { find: /^@muon\/mixins\/(.*)/, replacement: '@muonic/muon/mixins/$1' },
    { find: /^@muon\/directives\/(.*)/, replacement: '@muonic/muon/directives/$1' },
    { find: /^@muon\/utils\/(.*)/, replacement: '@muonic/muon/utils/$1' },
    { find: '@muon/tokens', replacement: '@muonic/muon/build/tokens/es6/muon-tokens' }
  ]
};

export const postcssPlugins = [
  postcssVariables({
    variables,
    unknown(node) {
      node.remove(); // removing unknown or unset tokens
    }
  }),
  postcssImport(),
  postcssPreset({
    stage: 0,
    features: {
      'logical-properties-and-values': false /* allowing start end values */
    }
  }),
  autoprefixer({ grid: true })
];

const styleConfig = {
  mode: 'emit',
  minimize: true,
  plugins: postcssPlugins
};

const replaceConfig = {
  preventAssignment: true,
  values: {
    'process.env.MUON_PREFIX': JSON.stringify(config?.components?.prefix) || JSON.stringify('muon')
  }
};

export const serverPlugins = [
  alias(aliasConfig),
  replace(replaceConfig),
  styles(styleConfig),
  litcss({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] }),
  analyzer()
];

export const rollupPlugins = [
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  stylesPlugin(styleConfig),
  litcssPlugin({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] }),
  analyzerPlugin()
];

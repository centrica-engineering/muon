import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
import aliasPlugin from '@rollup/plugin-alias';
import * as variables from '../build/tokens/es6/muon-tokens.mjs';
import { getConfig } from './utils/index.mjs';
import appRoot from 'app-root-path';

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const alias = fromRollup(aliasPlugin);

const config = getConfig(`${appRoot}/muon.config.json`);
const additionalAlias = config?.alias ?? [];

const aliasConfig = {
  entries: [
    { find: /^@muons\/components\/(.*)/, replacement: '@muons/library/components/$1' },
    { find: /^@muons\/mixins\/(.*)/, replacement: '@muons/library/mixins/$1' },
    { find: /^@muons\/directives\/(.*)/, replacement: '@muons/library/directives/$1' },
    { find: /^@muons\/utils\/(.*)/, replacement: '@muons/library/utils/$1' },
    { find: '@muons/tokens', replacement: '@muons/library/build/tokens/es6/muon-tokens' },
    ...additionalAlias
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
  litcss({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] })
];

export const rollupPlugins = [
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  stylesPlugin(styleConfig),
  litcssPlugin({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] })
];

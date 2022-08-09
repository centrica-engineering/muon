import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
// import executePlugin from 'rollup-plugin-shell';
// import * as variables from '../build/tokens/es6/muon-tokens.mjs';
import { getConfig, createTokens } from './utils/index.mjs';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const alias = fromRollup(aliasPlugin);

const config = getConfig(`muon.config.json`);
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

// const executeCmd = fromRollup(executePlugin);
// const styleDictCommand = "style-dictionary build";
// const executeConfig = { commands: [styleDictCommand], hook: 'buildStart', sync: true };

// const buildTokensPlugin = () => {
//   return {
//     name: 'generate-tokens-plugin',
//     buildStart() {
//       createTokens();
//     },
//     serverStart() {
//       console.log('generating tokens');
//       createTokens();
//     }
//   };
// };

// const buildTokens = fromRollup(buildTokensPlugin);
const tokenPath = path.join(__dirname, '../build/tokens/es6/muon-tokens.mjs');

const readTokens = async () => {
  let startProcess; let fileExist;
  while (!fileExist) {
    if (!startProcess) {
      startProcess = true;
      console.log('create tokens');
      await createTokens();
    }
    fileExist = fs.existsSync(tokenPath);
    console.log(fileExist);
  }
  startProcess = false;
  console.log('tokens available');

  const tokens = await import(tokenPath);
  return tokens;

};

export const postcssPlugins = [
  postcssVariables({
    variables() {
      return readTokens().then((tokens) => {
        return { ...tokens };
      });
    },
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
  // executeCmd(executeConfig),
  // buildTokens(),
  alias(aliasConfig),
  replace(replaceConfig),
  styles(styleConfig),
  litcss({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] })
];

export const rollupPlugins = [
  // buildTokensPlugin(),
  // executePlugin(executeConfig),
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  stylesPlugin(styleConfig),
  litcssPlugin({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] })
];

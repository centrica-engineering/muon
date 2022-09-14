import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
import { getConfig, createTokens, sourceFilesAnalyzer, getAliasPaths } from './utils/index.mjs';

import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getConfig();

const muonPlugin = () => {
  return {
    name: 'muon',
    async buildStart() {
      const destination = config?.destination || 'dist';
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }
      const cejson = await sourceFilesAnalyzer();

      fs.writeFileSync(path.join(destination, 'custom-elements.json'), cejson);
    }
  };
};

const tokenPath = path.join(__dirname, '..', 'build', 'tokens', 'es6', 'muon-tokens.mjs');
let designTokens = {};

const buildTokensPlugin = () => {
  return {
    name: 'generate-tokens-plugin',
    async buildStart() {
      await createTokens();
      designTokens = await import(tokenPath);
    }
  };
};

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const alias = fromRollup(aliasPlugin);
const muon = fromRollup(muonPlugin);
const buildTokens = fromRollup(buildTokensPlugin);

const aliasConfig = {
  entries: getAliasPaths('regex')
};

const postcssPlugins = [
  postcssVariables({
    variables() {
      return designTokens;
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

// @TODO: bring back when global css is used
// const createGlobalCSS = async (destination) => {
//   const globalCSSUrl = path.join(__filename, '..', '..', '..', 'css', 'global.css');
//   const globalCSSDest = path.join(destination, 'muon.min.css');
//   const globalCSS = fs.readFileSync(globalCSSUrl);
//   const processedCSS = await postcss(postcssPlugins).process(globalCSS, { from: globalCSSUrl, to: globalCSSDest });

//   fs.writeFileSync(globalCSSDest, processedCSS.css, 'utf8');
// };

const styleConfig = {
  mode: 'emit',
  minimize: true,
  plugins: postcssPlugins
};

const replaceConfig = {
  preventAssignment: true,
  values: {
    'process.env.MUON_PREFIX': JSON.stringify(config?.components?.prefix || 'muon')
  }
};

export const serverPlugins = [
  buildTokens(),
  alias(aliasConfig),
  replace(replaceConfig),
  styles(styleConfig),
  litcss({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] }),
  muon()
];

export const rollupPlugins = [
  buildTokensPlugin(),
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  stylesPlugin(styleConfig),
  litcssPlugin({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] }),
  muonPlugin()
];

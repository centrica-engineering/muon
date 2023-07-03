import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import postcssExtendRule from 'postcss-extend-rule';
import cssnanoPlugin from 'cssnano';
import litcssPlugin from 'rollup-plugin-lit-css';
import { cleanup, getConfig, getDestination, createTokens, sourceFilesAnalyzer, getAliasPaths } from './utils/index.mjs';

import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getConfig();

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
  postcssExtendRule(),
  autoprefixer({ grid: true }),
  cssnanoPlugin({
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true
        }
      }
    ]
  })
];

const createGlobalCSS = async () => {
  const globalCSSUrl = path.join(process.cwd(), 'css', 'global.css');

  if (fs.existsSync(globalCSSUrl)) {
    const globalCSS = fs.readFileSync(globalCSSUrl);
    const processedCSS = await postcss(postcssPlugins).process(globalCSS, { from: globalCSSUrl });
    return processedCSS.css;
  }

  return undefined;
};

const muonPlugin = () => {
  return {
    name: 'muon',
    async buildStart() {
      const destination = getDestination();
      cleanup(destination, true).then(async () => {
        const cejson = await sourceFilesAnalyzer();
        fs.writeFileSync(path.join(destination, 'custom-elements.json'), cejson);
      });
    },
    async transform(code, id) {
      if (id.includes(path.join('muon', 'index.js'))) {
        const globalCSS = await createGlobalCSS();

        if (!globalCSS) {
          return null;
        }

        if (!code?.includes('globalCSS')) {
          return {
            code: `
              const globalCSS = document.createElement('style');
              globalCSS.innerHTML = \`${globalCSS}\`;
              globalCSS.title = 'muon-global-css';
              document.head.appendChild(globalCSS);
              ${code}
            `,
            map: null
          };
        } else {
          return {
            code
          };
        }
      }

      return null;
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

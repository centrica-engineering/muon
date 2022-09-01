import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
import { getConfig, createTokens, findComponents, createComponentElementsJson } from './utils/index.mjs';

import { dirSync } from 'tmp';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getConfig(`muon.config.json`);

let tmp;
let tmpName;

const writeFileSyncRecursive = (filename, content = '') => {
  if (filename.startsWith('/node_modules')) {
    return;
  }

  try {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content);
  } catch (error) {
    console.log(tmpName, filename, error);
  }
};

const getTmpFilePath = (file) => {
  return path.join(tmpName, path.relative(process.cwd(), file));
};

const runElementJson = async () => {
  const files = (await findComponents()).map((file) => getTmpFilePath(file));
  await createComponentElementsJson(files);
};

const shouldSkip = (file) => {
  const filesToSkip = ['virtual:', 'test-runner', 'chai'];
  return filesToSkip.some((skip) => file.includes(skip)) || !file.endsWith('.js') || process.env?.npm_lifecycle_script?.includes('web-test-runner');
};

const createElementJsonFile = async () => {
  const destination = config?.destination || 'dist';
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  fs.writeFileSync(path.join(destination, 'custom-elements.json'), JSON.stringify({ tags: [] }));
};

let createElementJsonTimer;
const muonPlugin = () => {
  const starter = async () => {
    tmp = dirSync({ unsafeCleanup: true });
    tmpName = tmp.name;
    await createElementJsonFile();
  };

  return {
    name: 'muon',
    moduleParsed(obj) {
      if (!shouldSkip(obj.id)) {
        writeFileSyncRecursive(getTmpFilePath(obj.id), obj.code);
      }

      if (createElementJsonTimer) {
        clearTimeout(createElementJsonTimer);
      }
      createElementJsonTimer = setTimeout(runElementJson, 1000);
    },
    async buildStart() {
      await starter();
    },
    async buildEnd() {
      tmp.removeCallback();
    },
    async generateBundle(options, bundle) {
      let code = '';
      Object.keys(bundle).forEach((file) => {
        Object.keys(bundle[file].modules).forEach((module) => {
          code += `
          ${bundle[file].modules[module].code}
          `;
        });
      });

      writeFileSyncRecursive(getTmpFilePath('code.js'), code);
      createComponentElementsJson([getTmpFilePath('code.js')]);
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
    'process.env.MUON_PREFIX': JSON.stringify(config?.components?.prefix) || JSON.stringify('muon')
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

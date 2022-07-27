import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import litcssPlugin from 'rollup-plugin-lit-css';
import * as variables from '../build/tokens/es6/muon-tokens.mjs';
import { findComponents, getConfig, createComponentElementsJson } from './utils/index.mjs';

import { dirSync } from 'tmp';
import fs from 'fs';
import path from 'path';

const config = getConfig(`muon.config.json`);

const tmp = dirSync({ unsafeCleanup: true });
const tmpName = tmp.name;

const writeFileSyncRecursive = (filename, content = '') => {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content);
};

const getTmpFilePath = (tmpName, file) => path.join(tmpName, path.relative(process.cwd(), file));

const runElementJson = async () => {
  const files = (await findComponents()).map((file) => getTmpFilePath(tmpName, file));
  await createComponentElementsJson(files);
};

const shouldSkip = (file) => {
  return file.indexOf('node_modules') > 0 || file.indexOf('virtual:') > 0;
};

const createElementJsonFile = async () => {
  const destination = config?.destination || 'dist';
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  fs.writeFileSync(path.join(destination, 'custom-elements.json'), JSON.stringify({ tags: [] }));
};

let createElementJsonTimer;
const analyzer = () => {
  return {
    name: 'analyzer',
    async moduleParsed(obj) {
      if (shouldSkip(obj.id)) {
        return;
      }
      writeFileSyncRecursive(getTmpFilePath(tmpName, obj.id), obj.code);
      if (createElementJsonTimer) {
        clearTimeout(createElementJsonTimer);
      }
      createElementJsonTimer = setTimeout(runElementJson, 500);
    },
    async buildStart() {
      await createElementJsonFile();
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

      writeFileSyncRecursive(getTmpFilePath(tmpName, 'code.js'), code);
      createComponentElementsJson([getTmpFilePath(tmpName, 'code.js')]);
    }
  };
};

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const alias = fromRollup(aliasPlugin);
const an = fromRollup(analyzer);

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
  an(),
  {
    async serverStart() {
      await createElementJsonFile();
    },
    serverStop() {
      tmp.removeCallback();
    }
  }
];

export const rollupPlugins = [
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  stylesPlugin(styleConfig),
  litcssPlugin({ exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css'] }),
  analyzer()
];

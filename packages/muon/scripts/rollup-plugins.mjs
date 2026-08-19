import { fromRollup } from '@web/dev-server-rollup';
import replacePlugin from '@rollup/plugin-replace';
import aliasPlugin from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import postcssExtendRule from 'postcss-extend-rule';
import postcssModifySelectors from 'modify-selectors';
import cssnanoPlugin from 'cssnano';
import litcssPlugin from 'rollup-plugin-lit-css';
import cssPlugin from 'rollup-plugin-import-css';
import { cleanup, getConfig, getDestination, createTokens, sourceFilesAnalyzer, getAliasPaths, getPrefix } from './utils/index.mjs';

import path from 'path';
import fs from 'fs';
import { Buffer } from 'node:buffer';

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
  postcssModifySelectors({
    modify: [{
      match: (selector) => {
        return /(^|[^.])PREFIX-/.test(selector);
      },
      with: (selector) => {
        return selector.replace(/(^|[^.])PREFIX-/g, `$1${getPrefix()}-`);
      }
    }]
  }),
  postcssImport({
    resolve(id, basedir) {
      // @web/dev-server-rollup maps files outside the WDS root to virtual paths like:
      //   <rootDir>/__wds-outside-root__/<N>/<remainingPath>
      // postcss-import can't resolve relative imports from these non-existent directories.
      // Remap the basedir back to the real filesystem path.
      const outsideRootMatch = basedir.match(/__wds-outside-root__\/(\d+)\/(.*)/);
      if (outsideRootMatch && !id.startsWith('@muonic/muon')) {
        const depth = parseInt(outsideRootMatch[1], 10);
        const wdsRoot = basedir.substring(0, basedir.indexOf('/__wds-outside-root__'));
        const remainingPath = outsideRootMatch[2];
        const realBasedir = path.resolve(wdsRoot, ...Array(depth).fill('..'), remainingPath);
        return path.resolve(realBasedir, id);
      }
      // Non-absolute return lets the default resolver handle it
      return id;
    }
  }),
  postcssPreset({
    stage: 0,
    features: {
      'is-pseudo-class': false, /* allow :is() */
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

const postcssPlugin = () => {
  return {
    name: 'muon-postcss',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.css') || id.includes('?')) {
        return null;
      }

      const processedCSS = await postcss(postcssPlugins).process(code, { from: id });
      return {
        code: processedCSS.css,
        map: processedCSS.map?.toJSON() || null
      };
    }
  };
};

const viteCSSPrefix = '\0muon-css:';
const viteCSSPlugin = () => {
  return {
    name: 'muon-vite-css',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer || !source.endsWith('.css')) {
        return null;
      }

      const resolved = await this.resolve(source, importer, { skipSelf: true });
      const resolvedId = resolved?.id.split('?')[0];

      if (!resolvedId?.includes(`${path.sep}packages${path.sep}muon${path.sep}`)) {
        return null;
      }

      return `${viteCSSPrefix}${Buffer.from(resolvedId).toString('base64url')}`;
    },
    async load(id) {
      if (!id.startsWith(viteCSSPrefix)) {
        return null;
      }

      const file = Buffer.from(id.slice(viteCSSPrefix.length), 'base64url').toString();
      const source = fs.readFileSync(file, 'utf8');
      const processedCSS = await postcss(postcssPlugins).process(source, { from: file });
      const serializedCSS = JSON.stringify(processedCSS.css);

      if (file.endsWith('.slotted.css')) {
        return `export default ${serializedCSS};`;
      }

      return `import { unsafeCSS } from 'lit'; export default unsafeCSS(${serializedCSS});`;
    }
  };
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

const processStyles = fromRollup(postcssPlugin);
const replace = fromRollup(replacePlugin);
const litcss = fromRollup(litcssPlugin);
const css = fromRollup(cssPlugin);
const alias = fromRollup(aliasPlugin);
const muon = fromRollup(muonPlugin);
const buildTokens = fromRollup(buildTokensPlugin);

const aliasConfig = {
  entries: getAliasPaths('regex')
};

const replaceConfig = {
  preventAssignment: true,
  values: {
    'process.env.MUON_PREFIX': JSON.stringify(config?.components?.prefix || 'muon')
  }
};

const litCSSConfig = {
  include: '**/packages/muon/**/*.css',
  exclude: ['**/css/*.css', '**/dist/*.css', 'muon.min.css', '**/**/*.slotted.css']
};

export const serverPlugins = [
  buildTokens(),
  alias(aliasConfig),
  replace(replaceConfig),
  processStyles(),
  litcss(litCSSConfig),
  css({ include: '**/**/*.slotted.css' }),
  muon()
];

export const rollupPlugins = [
  buildTokensPlugin(),
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  postcssPlugin(),
  Object.assign(litcssPlugin({
    ...litCSSConfig,
    transform: (css) => {
      // TODO: find a way to not have to do this - find why css is being turned to a function and then a string
      const regex = /css`([\s\S]*?)`/;
      const match = css.match(regex);
      const cssString = match?.[1];

      return cssString || css;
    }
  }), { enforce: 'pre' }),
  Object.assign(cssPlugin({
    include: '**/**/*.slotted.css',
    transform: (css) => {
      // TODO: find a way to not have to do this - find why css is being turned to a function and then a string
      let styles = css.replaceAll('export default "', '').trim();

      if (styles.endsWith('";')) {
        styles = styles.slice(0, -2);
      }

      const needsUnescaping = /\\./.test(styles);

      if (needsUnescaping) {
        return JSON.parse(`"${styles}"`);
      }

      return styles;
    }
  }), { enforce: 'pre' }),
  muonPlugin()
];

export const vitePlugins = [
  buildTokensPlugin(),
  aliasPlugin(aliasConfig),
  replacePlugin(replaceConfig),
  viteCSSPlugin(),
  muonPlugin()
];

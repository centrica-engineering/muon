import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import { startDevServer } from '@web/dev-server';
import commandLineArgs from 'command-line-args';
import StorybookConfig from '../../storybook/server.config.mjs';
import { getConfig, createComponentElementsJson, createTokens } from '../utils/index.mjs';

import postcss from 'postcss';
import { postcssPlugins } from '../rollup-plugins.mjs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const globalCSSUrl = path.join(__filename, '..', '..', '..', 'css', 'global.css');

const myServerDefinitions = [
  { name: 'no-open', type: Boolean },
  { name: 'no-watch', type: Boolean },
];

const copyDir = async (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      fs.copyFileSync(srcPath, destPath);
  }
};

const createGlobalCSS = async (destination) => {
  const globalCSSDest = path.join(destination, 'muon.min.css');
  const globalCSS = await fs.readFileSync(globalCSSUrl);
  const processedCSS = await postcss(postcssPlugins).process(globalCSS, { from: globalCSSUrl, to: globalCSSDest });

  fs.writeFileSync(globalCSSDest, processedCSS.css, 'utf8');
};

const myConfig = commandLineArgs(myServerDefinitions, { partial: true });

const createStyleTokens = async (destination) => {
  await createGlobalCSS(destination);

  copyDir(path.join(__filename, '..', '..', '..', 'build'), destination);
};

const updateStyleTokens = async (destination) => {
  await createTokens();
  await createStyleTokens(destination);
};

const main = async () => {
  const config = await getConfig();
  const destination = config?.destination || 'dist';

  await createStyleTokens(destination);
  await createComponentElementsJson();

  chokidar.watch('components/**/*-component.js', { ignoreInitial: true }).on('all', async () => {
    await createComponentElementsJson();
  });

  /* Internal dev mode */
  chokidar.watch(globalCSSUrl, { ignoreInitial: true }).on('all', async () => {
    await createGlobalCSS(destination);
  });
  chokidar.watch(path.join(__filename, '..', '..', 'tokens'), { ignoreInitial: true }).on('all', () => updateStyleTokens(destination));
  chokidar.watch('tokens', { ignoreInitial: true }).on('all', () => updateStyleTokens(destination));

  await startDevServer({
    argv: myConfig._unknown,
    config: {
      ...StorybookConfig,
      open: !myConfig['no-open'],
      watch: !myConfig['no-watch'],
      mimeTypes: {
        // '**/muon.min.css': 'text/css', // @TODO: pass global style file name from config
        ...StorybookConfig.mimeTypes
      }
    }
  });
};

main();

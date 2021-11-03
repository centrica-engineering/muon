#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import glob from 'glob';
import chokidar from 'chokidar';
import { startDevServer } from '@web/dev-server';
import commandLineArgs from 'command-line-args';
import StorybookConfig from '../storybook/server.config.mjs';
import { getConfig } from './get-config.mjs';
import { createComponentElementsJson } from './custom-elements-json.mjs';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { createTokens } from './style-dictionary-create.mjs';

const globalCSSUrl = path.join(__filename, '..', '..', 'css', 'global.css');

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
  const processedCSS = await postcss([
    postcssImport(),
    postcssPreset({ stage: 0 }),
    autoprefixer({ grid: true, overrideBrowserslist: ['last 2 versions'] })
  ]).process(globalCSS, { from: globalCSSUrl, to: globalCSSDest });

  fs.writeFileSync(globalCSSDest, processedCSS.css);
};

const myConfig = commandLineArgs(myServerDefinitions, { partial: true });

const createStyleTokens = async (destination) => {
  await createTokens();
  await createGlobalCSS(destination);

  copyDir(path.join(__filename, '..', '..', 'build'), destination);
};

const cleanStart = (destination) => {
  fs.rmSync(destination, { force: true, recursive: true });
  fs.rmSync(path.join(__filename, '..', '..', 'build'), { force: true, recursive: true });

  fs.mkdirSync(destination);
  fs.mkdirSync(path.join(__filename, '..', '..', 'build'));
};

const main = async () => {
  const config = await getConfig();
  const destination = config?.destination || 'dist';

  cleanStart(destination);

  glob(path.join(__filename, '..', '..', 'components', '**', 'story.js'), async (er, files) => {
    for (const file of files) {
      const name = file.split('/')[file.split('/').length - 2]; // this probably only works for unix!!!
      fs.copyFileSync(file, path.join(destination, `${name}.story.js`));
    }
  });

  createStyleTokens(destination);

  await createComponentElementsJson();

  chokidar.watch('components/**/*-component.js', { ignoreInitial: true }).on('all', async (event, path) => {
    await createComponentElementsJson();
  });

  /* Internal dev mode */
  chokidar.watch(globalCSSUrl, { ignoreInitial: true }).on('all', async () => {
    await createGlobalCSS(destination);
  });
  chokidar.watch(path.join(__filename, '..', '..', 'tokens'), { ignoreInitial: true }).on('all', createStyleTokens);
  chokidar.watch('tokens', { ignoreInitial: true }).on('all', createStyleTokens);

  await startDevServer({
    argv: myConfig._unknown,
    config: {
      ...StorybookConfig,
      open: !myConfig['no-open'],
      watch: !myConfig['no-watch']
    }
  });
};

main();

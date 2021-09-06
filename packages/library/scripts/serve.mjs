#!/usr/bin/env node

/*

 @todo: Refactor. Currently just a POC

*/

import { execSync } from "child_process";
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import chokidar from 'chokidar';
import { startDevServer } from '@web/dev-server';
import deepmerge from 'deepmerge';
import commandLineArgs from 'command-line-args';
import StorybookConfig from '../storybook/server.config.mjs';
import StyleDictionary from 'style-dictionary';
import styleConfig from './style-dictionary.mjs';
import colorTransform from '../tokens/utils/transforms/color.js';
import _ from 'lodash';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalCSSUrl = path.join(__filename, '..', '..', 'css', 'global.css');

let config;

try {
  config = JSON.parse(fs.readFileSync('muon.config.json').toString());
}
catch (e) {
  console.error('Missing config, is this the right folder?', e);
  process.exit(1);
}

// Set the overriding tokens if there are any
if (config.tokens && config.tokens.dir) {
  styleConfig.source = config.tokens.dir;
}
const tokenUtils = path.join(__dirname, '..', 'tokens', 'utils');
const cssFontTemplate = _.template(fs.readFileSync(path.join(tokenUtils, 'templates', 'font-face.css.template')));

const styleDictionary = StyleDictionary.extend(styleConfig);

styleDictionary.registerFormat({
  name: 'css/fonts',
  formatter: cssFontTemplate
});

styleDictionary.registerTransform(colorTransform)


/*
- Set variables from config
*/

const destination = config.destination || 'dist'; // @TODO: check if it should be deleted (aka is the directory being created by another library)
const additionalComponents = config.components.dir;
const componentPrefix = config.components.prefix || 'muon';

const myServerDefinitions = [
  { name: 'no-open', type: Boolean },
  { name: 'no-watch', type: Boolean },
];

const copyDir = async (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      fs.copyFileSync(srcPath, destPath);
  }
};

const createGlobalCSS = async () => {
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

const analyse = async () => {
  const components = path.join(__filename, '..', '..', 'components', '**', '*-component.js');
  const outputFiles = path.join(destination, `{tagname}-custom-elements.json`);
  // sort out the folder name here...
  const mainComps = `npx web-component-analyzer "${components}" --outFiles ${outputFiles}`;
  const newComps = `npx web-component-analyzer "components" --outFiles ${outputFiles}`;

  execSync(mainComps);
  execSync(newComps);

  glob(path.join(destination, '*-custom-elements.json'), (er, files) => {
    const arr = [];
    for (const file of files) {
      const f = fs.readFileSync(file);
      arr.push(JSON.parse(f.toString()));
    }

    const all = deepmerge.all(arr);

    fs.writeFileSync(path.join(destination, 'custom-elements.json'), JSON.stringify(all));
  });
};

const createStyleTokens = async () => {
    await styleDictionary.buildAllPlatforms();
    await createGlobalCSS();

  copyDir(path.join(__filename, '..', '..', 'build'), destination);
};

const cleanStart = () => {
  fs.rmSync(destination, { force: true, recursive: true });
  fs.rmSync(path.join(__filename, '..', '..', 'build'), { force: true, recursive: true });

  fs.mkdirSync(destination);
  fs.mkdirSync(path.join(__filename, '..', '..', 'build'));
}

const main = async () => {
  cleanStart();

  glob(path.join(__filename, '..', '..', 'components', '**', 'story.js'), async (er, files) => {
    for (const file of files) {
      const name = file.split('/')[file.split('/').length - 2]; // this probably only works for unix!!!
      fs.copyFileSync(file, path.join(destination, `${name}.story.js`));
    }
  });

  createStyleTokens();

  await analyse();

  chokidar.watch('components/**/*-component.js', { ignoreInitial: true }).on('all', async (event, path) => {
    await analyse();
  });

  /* Internal dev mode */
  chokidar.watch(globalCSSUrl, { ignoreInitial: true }).on('all', async () => {
    await createGlobalCSS();
  });

  chokidar.watch(path.join(__filename, '..', '..', 'tokens'), { ignoreInitial: true }).on('all', createStyleTokens);

  chokidar.watch('tokens', { ignoreInitial: true }).on('all', createStyleTokens);

  await startDevServer({
    argv: myConfig._unknown,
    config: {
      ...StorybookConfig,
      open: !myConfig['no-open'],
      watch: !myConfig['no-watch'],
    }
  });
}

main();

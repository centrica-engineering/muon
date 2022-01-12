#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

import commandLineArgs from 'command-line-args';

import { createTokens } from './style-dictionary-create.mjs';
import { createComponentElementsJson } from './custom-elements-json.mjs';

import postcss from 'postcss';
import { postcssPlugins } from './rollup-plugins.mjs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const globalCSSUrl = path.join(__filename, '..', '..', 'css', 'global.css');

// @TODO: make reusable
const createGlobalCSS = async (destination) => {
  const globalCSSDest = path.join(destination, 'muon.min.css');
  const globalCSS = await fs.readFileSync(globalCSSUrl);
  const processedCSS = await postcss(postcssPlugins).process(globalCSS, { from: globalCSSUrl, to: globalCSSDest });

  fs.writeFileSync(globalCSSDest, processedCSS.css, 'utf8');
};

const args = commandLineArgs([
  {
    name: 'config-dir',
    alias: 'c',
    type: String,
    defaultValue: './.storybook'
  },
  {
    name: 'output-dir',
    alias: 'o',
    type: String,
    defaultValue: 'storybook-static'
  },
  {
    name: 'type',
    alias: 't',
    type: String,
    defaultValue: 'web-components'
  }
]);

const main = async () => {
  const configDir = path.resolve(args['config-dir']);
  const outputDir = path.resolve(args['output-dir']);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await createTokens();
  await createComponentElementsJson(outputDir);
  await createGlobalCSS(outputDir);

  execSync(`build-storybook --output-dir ${outputDir} --config-dir ${configDir}`);

  console.log('Storybook build completed');
};

main();

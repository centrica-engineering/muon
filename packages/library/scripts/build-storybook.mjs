#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

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

const main = async () => {
  const outputDir = 'storybook-static';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await createTokens();
  await createComponentElementsJson(outputDir);
  await createGlobalCSS(outputDir);

  execSync('build-storybook');

  console.log('Storybook build completed');
};

main();

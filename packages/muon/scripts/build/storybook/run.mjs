#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

import commandLineArgs from 'command-line-args';

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

  execSync(`build-storybook --output-dir ${outputDir} --config-dir ${configDir}`);

  console.log('Storybook build completed');
};

main();

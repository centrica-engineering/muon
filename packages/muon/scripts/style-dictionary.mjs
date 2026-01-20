import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const prefix = 'mn';
const root = path.join(__filename, '..', '..');
const buildPath = path.join(root, 'build', 'tokens');

export default {
  include: [root + '/tokens/**/*.json', root + '/tokens/*.json', root + '/components/**/**/config-tokens.json', root + '/components/**/**/design-tokens.json', root + '/directives/tokens.json'],
  platforms: {
    js: {
      buildPath: path.join(buildPath, 'es6/'),
      transforms: ['color/css', 'size/rem'],
      files: [
        {
          destination: 'muon-tokens-module.js',
          format: 'es6/module'
        }
      ]
    },
    ref: {
      buildPath: path.join(buildPath, 'json/'),
      transforms: ['color/css', 'size/rem'],
      files: [
        {
          destination: 'muon-tokens-reference.json',
          format: 'json/reference'
        }
      ]
    },
    es6: {
      buildPath: path.join(buildPath, 'es6/'),
      transforms: ['name/constant', 'color/css', 'size/rem'],
      files: [
        {
          destination: 'muon-tokens.js',
          format: 'javascript/es6'
        },
        {
          destination: 'muon-tokens.mjs',
          format: 'javascript/es6'
        }
      ]
    },
    'font-face': {
      buildPath: path.join(buildPath, 'css/'),
      files: [
        {
          destination: prefix + '-fonts.css',
          format: 'css/fonts'
        }
      ]
    }
  }
};

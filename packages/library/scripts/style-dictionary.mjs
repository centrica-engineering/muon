import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const prefix = 'mn';
const root = path.join(__filename, '..', '..');
const buildPath = path.join(root, 'build', 'tokens');

export default {
  include: [root + '/tokens/**/*.js', root + '/tokens/**/*.json', root + '/tokens/*.json', root + '/components/**/**/token.json'],
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
    es6: {
      buildPath: path.join(buildPath, 'es6/'),
      transforms: ['name/cti/constant', 'color/css', 'size/rem'],
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
      ],
      filter: {
        attributes: {
          category: 'asset',
          type: 'font'
        }
      }
    }
  }
};

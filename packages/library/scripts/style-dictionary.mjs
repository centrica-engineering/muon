import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const prefix = 'mn';
const root = path.join(__filename, '..', '..');
const buildPath = path.join(root, 'build', 'tokens');

export default {
  include: [root + '/tokens/**/*.js', root + '/tokens/**/*.json', root + '/tokens/*.json', root + '/components/**/**/token.json'],
  platforms: {
    css: {
      buildPath: path.join(buildPath, 'css/'),
      transforms: [`attribute/cti`, `name/cti/kebab`, `color/css`, `string/css`, `size/rem`],
      prefix: prefix,
      files: [{
        destination: prefix + '-tokens.css',
        format: 'css/variables'
      }]
    },
    less: {
      buildPath: path.join(buildPath, 'less/'),
      prefix: prefix,
      transformGroup: 'less',
      files: [{
        destination: prefix + '-tokens.less',
        format: 'less/variables'
      }]
    },
    js: {
      buildPath: path.join(buildPath, 'js/'),
      files: [{
        destination: prefix + '-tokens.js',
        format: 'javascript/module'
      }]
    },
    es6: {
      buildPath: path.join(buildPath, 'es6/'),
      transforms: ['name/cti/constant', 'color/css', 'size/rem'],
      files: [{
        destination: 'muon-tokens.js',
        format: 'javascript/es6'
      },
      {
        destination: 'muon-tokens.mjs',
        format: 'javascript/es6'
      }]
    },
    json: {
      buildPath: path.join(buildPath, 'json/'),
      files: [{
        destination: prefix + '-tokens.json',
        format: 'json/nested'
      }]
    },
    'font-face': {
      buildPath: path.join(buildPath, 'css/'),
      files: [{
        destination: prefix + '-fonts.css',
        format: 'css/fonts'
      }],
      filter: {
        attributes: {
          category: 'asset',
          type: 'font'
        }
      }
    }
  }
};

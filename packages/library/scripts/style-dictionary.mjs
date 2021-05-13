import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const prefix = 'mn';
const root = path.join(__filename, '..', '..');
const buildPath = path.join(root, 'build', 'tokens');

export default {
  include: [root + '/tokens/default/**/*.js', root + '/tokens/default/**/*.json', root + '/tokens/*.json', root + '/components/**/**/token.json'],
  platforms: {
    css: {
      buildPath: path.join(buildPath, 'css/'),
      transforms: [`attribute/cti`, `name/cti/kebab`, `color/css`],
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
    "es6": {
      "buildPath": path.join(buildPath, 'es6/'),
      "transforms": ['name/cti/constant'],
      "files": [{
        "destination": "ns-tokens.js",
        "format": "javascript/es6"
      }]
    },
    json: {
      buildPath: path.join(buildPath, 'json/'),
      files: [{
        destination: prefix + '-tokens.json',
        format: 'json/nested'
      }]
    },
    'json-full': {
      buildPath: path.join(buildPath, 'json/'),
      transforms: ['attribute/color'],
      files: [{
        destination: prefix + '-tokens-full.json',
        format: 'json'
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

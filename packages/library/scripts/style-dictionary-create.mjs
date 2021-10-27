import StyleDictionary from 'style-dictionary';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import styleConfig from './style-dictionary.mjs';
import colorTransform from '../tokens/utils/transforms/color.js';
import stringTransform from '../tokens/utils/transforms/string.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {};

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

styleDictionary.registerTransform(stringTransform);
styleDictionary.registerTransform(colorTransform);

const createTokens = async () => {
  await styleDictionary.buildAllPlatforms();
};

export {
  styleDictionary,
  createTokens
};

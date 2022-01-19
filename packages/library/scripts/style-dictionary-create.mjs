import StyleDictionary from 'style-dictionary';
import formatHelpers from 'style-dictionary/lib/common/formatHelpers/index.js';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import { getConfig } from './get-config.mjs';
import styleConfig from './style-dictionary.mjs';
import colorTransform from '../tokens/utils/transforms/color.js';
import stringTransform from '../tokens/utils/transforms/string.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const styleDictionary = async () => {
  const config = await getConfig();

  // Set the overriding tokens if there are any
  if (config.tokens && config.tokens.dir) {
    styleConfig.source = config.tokens.dir;
  }

  const tokenUtils = path.join(__dirname, '..', 'tokens', 'utils');
  const cssFontTemplate = _.template(fs.readFileSync(path.join(tokenUtils, 'templates', 'font-face.css.template')));

  const styleDict = StyleDictionary.extend(styleConfig);

  styleDict.registerFormat({
    name: 'css/fonts',
    formatter: cssFontTemplate
  });

  styleDict.registerFormat({
    name: 'es6/module',
    formatter: function ({ dictionary, file }) {
      return formatHelpers.fileHeader({ file }) +
        'export default ' +
        JSON.stringify(dictionary.tokens, null, 2) + ';';
    }
  });

  styleDict.registerTransform(stringTransform);
  styleDict.registerTransform(colorTransform);

  return styleDict;
};

const createTokens = async () => {
  const dictionary = await styleDictionary();

  return dictionary.buildAllPlatforms();
};

export {
  styleDictionary,
  createTokens
};

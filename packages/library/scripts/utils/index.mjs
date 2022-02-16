import { analyzeAndTransformGlobs } from 'web-component-analyzer/lib/cjs/cli.js';
import StyleDictionary from 'style-dictionary';
import formatHelpers from 'style-dictionary/lib/common/formatHelpers/index.js';
import _ from 'lodash';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

import styleConfig from '../style-dictionary.mjs';
import colorTransform from '../../tokens/utils/transforms/color.js';
import stringTransform from '../../tokens/utils/transforms/string.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {};

const cleanup = (destination) => {
  return new Promise((resolve) => {
    fs.rmSync(destination, { force: true, recursive: true });
    fs.rmSync(path.join(__filename, '..', '..', '..', 'build'), { force: true, recursive: true });

    fs.mkdirSync(destination);
    fs.mkdirSync(path.join(__filename, '..', '..', '..', 'build'));

    return resolve();
  });
};

const getConfig = (configFile = 'muon.config.json') => {
  try {
    config = JSON.parse(fs.readFileSync(configFile).toString());
  } catch (e) {
    console.error('Missing config, is this the right folder?', e);
    process.exit(1);
  }

  return config;
};

const filterPathToCustomElements = async (componentsList) => {
  let pathPattern = '*';
  if (Array.isArray(componentsList) && componentsList?.length > 0) {
    if (componentsList.length > 1) {
      pathPattern = `{${componentsList.toString()}}`;
    } else {
      pathPattern = componentsList[0] === 'all' ? '*' : componentsList[0]; // single component defined within array
    }
  } else {
    pathPattern = componentsList === 'all' ? '*' : componentsList; // single component defined as string
  }
  return pathPattern;
};

const createComponentElementsJson = async (overrideDest) => {
  const config = await getConfig();
  const destination = overrideDest || config.destination || 'dist';
  const additional = config?.components?.dir;
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', '..', 'components', '**', `${pathPattern}-component.js`);
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  const files = glob.sync(muonComponents).map((f) => path.resolve(f));
  const results = await analyzeAndTransformGlobs(files, {
    format: 'json'
  });

  const jsonResults = JSON.parse(results);
  const tagNames = jsonResults?.tags.map((tag) => tag.name);
  const tagsSet = new Set(tagNames);
  if (tagsSet?.size !== tagNames?.length) {
    console.error('---------------------------------------------');
    console.error('No two custom elements can have same tag name `%s`', tagNames);
    console.error('---------------------------------------------');
    process.exit(1);
  }

  fs.writeFileSync(path.join(destination, 'custom-elements.json'), results);
  return results;
};

const styleDictionary = async () => {
  const config = await getConfig();

  // Set the overriding tokens if there are any
  if (config.tokens && config.tokens.dir) {
    styleConfig.source = config.tokens.dir;
  }

  const tokenUtils = path.join(__dirname, '..', '..', 'tokens', 'utils');
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

const getAllComponentNames = async (source) => {
  return (fs.readdirSync(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);
};

const componentDefiner = async () => {
  const config = await getConfig();
  let componentsList = config?.components?.included;

  if(!componentsList || componentsList === 'all') {
    componentsList = await getAllComponentNames(path.join(__dirname, '..', '..', 'components'));
  }

  let componentDefinition = '';
  const prefix = config?.prefix || 'muon';
  componentsList.forEach((componentName) => {
    const tagName = prefix + '-'+ componentName;
    const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    componentDefinition += `import { ${componentClassName} } from '@muons/library/components/${componentName}';`;
    componentDefinition += `\ncustomElements.define(\'${tagName}\', ${componentClassName});\n`; 
  });
  return componentDefinition;
};

const runner = async (file, overrideDestination) => {
  const config = await getConfig();
  const destination = overrideDestination || config?.destination || 'dist';
  console.log(destination);

  cleanup(destination).then(async () => {
    await createTokens();

    import(file);
  });
};

export {
  cleanup,
  getConfig,
  createComponentElementsJson,
  filterPathToCustomElements,
  styleDictionary,
  createTokens,
  componentDefiner,
  runner
};

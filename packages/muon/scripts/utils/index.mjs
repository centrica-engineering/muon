import { analyzeText } from 'web-component-analyzer';
import { analyzeAndTransformGlobs } from 'web-component-analyzer/lib/cjs/cli.js';
import StyleDictionary from 'style-dictionary';
import formatHelpers from 'style-dictionary/lib/common/formatHelpers/index.js';
import _ from 'lodash';
import appRoot from 'app-root-path';
import deepEqual from 'deep-equal';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

import styleConfig from '../style-dictionary.mjs';
import colorTransform from '../../tokens/utils/transforms/color.js';
import stringTransform from '../../tokens/utils/transforms/string.js';

import postcss from 'postcss';
import { postcssPlugins } from '../rollup-plugins.mjs';

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
    let configPath = path.join(process.cwd(), configFile);

    if (!fs.existsSync(configPath)) {
      configPath = path.join(`${appRoot}/${configFile}`);
    }
    config = JSON.parse(fs.readFileSync(configPath).toString());
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

const findComponents = async () => {
  const config = await getConfig();
  const additional = config?.components?.dir;
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', '..', 'components', '**', `${pathPattern}-component.js`);
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  return glob.sync(muonComponents).map((f) => path.resolve(f));
};

const analyze = async () => {
  const files = (await findComponents()).map((file) => {
    const code = fs.readFileSync(file);

    return { fileName: file, text: code.toString() };
  });

  const { results } = analyzeText(files);

  return results.map((result) => {
    // @TODO: An assumption that the first component in the file is the component we are looking for
    return {
      file: result.sourceFile.fileName,
      name: result.componentDefinitions[0].tagName,
      exportName: result.sourceFile?.symbol?.exports?.keys()?.next()?.value
    };
  });
};

const createComponentElementsJson = async (files) => {
  if (!files) {
    files = await findComponents();
  }
  const config = await getConfig();
  const destination = config.destination || 'dist';

  const results = await analyzeAndTransformGlobs(files, {
    format: 'json',
    // discoverNodeModules: true
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

  const content = JSON.parse(fs.readFileSync(path.join(destination, 'custom-elements.json')));

  if (!deepEqual(content, jsonResults)) {
    fs.writeFileSync(path.join(destination, 'custom-elements.json'), results);
  }
  return results;
};

const createGlobalCSS = async (destination) => {
  const globalCSSUrl = path.join(__filename, '..', '..', '..', 'css', 'global.css');
  const globalCSSDest = path.join(destination, 'muon.min.css');
  const globalCSS = fs.readFileSync(globalCSSUrl);
  const processedCSS = await postcss(postcssPlugins).process(globalCSS, { from: globalCSSUrl, to: globalCSSDest });

  fs.writeFileSync(globalCSSDest, processedCSS.css, 'utf8');
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

const componentDefiner = async () => {
  const config = await getConfig();
  const compList = await analyze();
  const prefix = config?.components?.prefix || 'muon';
  let componentDefinition = `import '@webcomponents/scoped-custom-element-registry';`;

  componentDefinition += compList.map(({ file, name, exportName }) => {
    const elName = `${prefix}-${name}`;

    return `import { ${exportName} } from '${file}';
    customElements.define('${elName}', ${exportName});
    `;
  }).join('');

  return componentDefinition;
};

const runner = async (file, overrideDestination) => {
  const config = getConfig();
  const destination = overrideDestination || config?.destination || 'dist';

  cleanup(destination).then(async () => {
    import(file);
  });
};

export {
  cleanup,
  getConfig,
  createComponentElementsJson,
  filterPathToCustomElements,
  createGlobalCSS,
  styleDictionary,
  createTokens,
  componentDefiner,
  findComponents,
  runner
};
